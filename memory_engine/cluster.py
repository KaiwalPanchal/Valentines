"""
Step 5: Moment Discovery — Two-Pass Clustering
DBSCAN for natural cluster discovery + Agglomerative for refinement.
"""
import json
import os
import numpy as np
from sklearn.cluster import DBSCAN, AgglomerativeClustering
from sklearn.metrics.pairwise import cosine_distances
from collections import Counter


def run(output_dir: str, dbscan_eps: float = 0.35, dbscan_min_samples: int = 3,
        max_cluster_size: int = 25, target_subcluster_size: int = 10):
    """
    Two-pass clustering:
    1. DBSCAN to discover natural moment groups
    2. Agglomerative to split large clusters into sub-moments
    """
    # Load embeddings and chunk metadata
    emb_path = os.path.join(output_dir, "04_embeddings.npz")
    embeddings = np.load(emb_path)["embeddings"]

    chunks_path = os.path.join(output_dir, "03_chunks_texts.json")
    with open(chunks_path, 'r', encoding='utf-8') as f:
        chunks = json.load(f)

    print(f"  Input: {len(chunks)} chunks, embeddings shape: {embeddings.shape}")

    # --- Pass 1: DBSCAN ---
    # Use cosine distance (1 - cosine_similarity)
    distance_matrix = cosine_distances(embeddings)

    dbscan = DBSCAN(eps=dbscan_eps, min_samples=dbscan_min_samples, metric="precomputed")
    labels = dbscan.fit_predict(distance_matrix)

    n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
    n_noise = list(labels).count(-1)
    print(f"  DBSCAN: {n_clusters} clusters, {n_noise} noise points (discarded)")

    if n_clusters == 0:
        # DBSCAN too tight, try with larger eps
        for eps in [0.4, 0.45, 0.5, 0.55, 0.6]:
            dbscan = DBSCAN(eps=eps, min_samples=dbscan_min_samples, metric="precomputed")
            labels = dbscan.fit_predict(distance_matrix)
            n_clusters = len(set(labels)) - (1 if -1 in labels else 0)
            n_noise = list(labels).count(-1)
            print(f"  Retry eps={eps}: {n_clusters} clusters, {n_noise} noise")
            if n_clusters >= 5:
                break

    # --- Pass 2: Agglomerative refinement of large clusters ---
    # Assign final cluster IDs
    final_cluster_id = 0
    cluster_assignments = {}  # chunk_id -> final_cluster_id

    unique_labels = sorted(set(labels))
    for label in unique_labels:
        if label == -1:
            continue  # Skip noise

        cluster_indices = [i for i, l in enumerate(labels) if l == label]

        if len(cluster_indices) > max_cluster_size:
            # Split large cluster with Agglomerative
            n_sub = max(2, len(cluster_indices) // target_subcluster_size)
            sub_embeddings = embeddings[cluster_indices]
            agg = AgglomerativeClustering(n_clusters=n_sub, metric="cosine", linkage="average")
            sub_labels = agg.fit_predict(sub_embeddings)

            for idx, sub_label in zip(cluster_indices, sub_labels):
                cluster_assignments[idx] = final_cluster_id + sub_label

            final_cluster_id += n_sub
        else:
            for idx in cluster_indices:
                cluster_assignments[idx] = final_cluster_id
            final_cluster_id += 1

    # --- Build cluster objects ---
    clusters = {}
    for chunk_idx, cluster_id in cluster_assignments.items():
        if cluster_id not in clusters:
            clusters[cluster_id] = {
                "cluster_id": cluster_id,
                "chunk_indices": [],
                "chunks": [],
            }
        clusters[cluster_id]["chunk_indices"].append(chunk_idx)
        clusters[cluster_id]["chunks"].append(chunks[chunk_idx])

    # Compute metadata for each cluster
    cluster_list = []
    for cid, cluster in sorted(clusters.items()):
        indices = cluster["chunk_indices"]
        cluster_embeddings = embeddings[indices]
        centroid = cluster_embeddings.mean(axis=0)

        # Dominant tone
        tones = [c["tone"] for c in cluster["chunks"]]
        dominant_tone = Counter(tones).most_common(1)[0][0]

        # Time range
        all_starts = [c["timestamp_ms_start"] for c in cluster["chunks"] if c.get("timestamp_ms_start")]
        all_ends = [c["timestamp_ms_end"] for c in cluster["chunks"] if c.get("timestamp_ms_end")]

        # Reaction density
        total_reactions = sum(c.get("reaction_count", 0) for c in cluster["chunks"])

        # Get representative texts (closest to centroid)
        dists_to_centroid = cosine_distances([centroid], cluster_embeddings)[0]
        sorted_indices = np.argsort(dists_to_centroid)
        top_texts = [cluster["chunks"][i]["text"] for i in sorted_indices[:5]]

        cluster_list.append({
            "cluster_id": cid,
            "size": len(indices),
            "dominant_tone": dominant_tone,
            "total_reactions": total_reactions,
            "time_start": min(all_starts) if all_starts else 0,
            "time_end": max(all_ends) if all_ends else 0,
            "representative_texts": top_texts,
            "chunk_indices": indices,
        })

    # Sort clusters by size descending
    cluster_list.sort(key=lambda c: c["size"], reverse=True)

    # Save
    output_path = os.path.join(output_dir, "05_clusters.json")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(cluster_list, f, ensure_ascii=False, indent=2)

    print(f"\n✓ Final: {len(cluster_list)} clusters → {output_path}")
    print(f"  Cluster sizes: {[c['size'] for c in cluster_list[:15]]}...")
    print(f"  Tone distribution: {Counter(c['dominant_tone'] for c in cluster_list)}")

    return cluster_list


if __name__ == "__main__":
    BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    run(os.path.join(BASE, "memory_engine", "output"))
