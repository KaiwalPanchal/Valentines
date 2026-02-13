"""
Step 6: Adoration Chain Detection
Finds explicit adoration patterns and clusters them into themes.
"""
import json
import os
import re
import numpy as np
from sklearn.cluster import AgglomerativeClustering
from sklearn.metrics.pairwise import cosine_distances


# --- Kaiwal's adoration patterns ---
KAIWAL_ADORATION_PATTERNS = [
    # Direct adoration
    r"i love how",
    r"i adore",
    r"i love that",
    r"the way you",
    r"you'?re so\s+\w+",
    r"you always",
    r"you look(?:ed)?\s+(?:so\s+)?(?:pretty|beautiful|gorgeous|amazing|cute|hot|stunning)",
    r"love that smile",
    r"love your",
    r"you'?re (?:the )?best",
    r"you'?re amazing",
    r"you'?re incredible",
    r"you'?re perfect",
    r"you'?re beautiful",
    r"you'?re gorgeous",
    r"you'?re cute",
    r"you mean",
    r"you'?re everything",
    # Pet name + compliment
    r"(?:bbg|baby|cutie|princess|sweetie|jaan|sweetheart)\s+you(?:'re|\s+are|\s+look)",
    r"cutie little",
    # Longing = hidden adoration
    r"miss ya",
    r"miss you",
    r"need you",
    r"wish you were",
    r"wish you are",
    r"i need some.+time.+with you",
    r"came in clutch while i'?m missing you",
    r"would love to have .+ with you",
    # Emotional openness
    r"you'?re more like cherry on top",
    r"you'?re pretty high on my",
    r"first thing .+ was .+ text you",
    r"or you looked extreamly pretty",
    r"physical presence .+ appreciated",
]

# --- Disha's adoration patterns ---
DISHA_ADORATION_PATTERNS = [
    r"you'?re genuinely",
    r"proud of you",
    r"you'?re pretty",
    r"how nice are you",
    r"you'?re someone who",
    r"rooting for you",
    r"you'?re doing great",
    r"you'?re a smart",
    r"i get you",
    r"you'?ll look nice",
    r"don'?t downplay",
    r"it'?s huge",
    r"you'?re very strong",
    r"i believe you",
    r"i can be yours",
    r"you'?ve got me",
    r"you'?re high on my .+ priorities",
    r"you don'?t have to be",
    r"you'?re not one to fight",
    # Caring
    r"tu theek che",
    r"pakku theek che",
    r"eat properly",
    r"eat peacefully",
    r"take care",
    r"did you eat",
    r"don'?t stress",
    r"i worry",
    r"worried for",
]

KAIWAL_RE = [re.compile(p, re.IGNORECASE) for p in KAIWAL_ADORATION_PATTERNS]
DISHA_RE = [re.compile(p, re.IGNORECASE) for p in DISHA_ADORATION_PATTERNS]


def find_adoration_messages(messages: list[dict]) -> list[dict]:
    """Find messages matching adoration patterns."""
    adorations = []

    for msg in messages:
        content = (msg.get("content") or "").strip()
        if not content or len(content) < 5:
            continue

        sender = msg["sender"]
        patterns = KAIWAL_RE if sender == "kaiwal" else DISHA_RE

        for pattern in patterns:
            if pattern.search(content):
                adorations.append({
                    **msg,
                    "matched_pattern": pattern.pattern,
                    "perspective": sender,
                })
                break  # One match per message is enough

    return adorations


def cluster_adorations(adorations: list[dict], output_dir: str,
                       n_clusters: int = None) -> list[dict]:
    """Cluster adoration messages into themes."""
    if len(adorations) < 3:
        print("  Not enough adoration messages to cluster")
        return []

    # Lazy import
    from sentence_transformers import SentenceTransformer
    import torch

    device = "cuda" if torch.cuda.is_available() else "cpu"
    model = SentenceTransformer("BAAI/bge-large-en-v1.5", device=device)

    texts = [(a.get("content") or "") for a in adorations]
    embeddings = model.encode(texts, normalize_embeddings=True, show_progress_bar=False)

    # Auto-determine cluster count
    if n_clusters is None:
        n_clusters = max(3, min(15, len(adorations) // 4))

    agg = AgglomerativeClustering(n_clusters=n_clusters, metric="cosine", linkage="average")
    labels = agg.fit_predict(embeddings)

    # Group by cluster
    themes = {}
    for i, label in enumerate(labels):
        if label not in themes:
            themes[label] = {
                "theme_id": label,
                "messages": [],
                "perspectives": [],
            }
        themes[label]["messages"].append({
            "content": adorations[i].get("content", ""),
            "sender": adorations[i]["sender"],
            "timestamp_iso": adorations[i].get("timestamp_iso", ""),
            "matched_pattern": adorations[i]["matched_pattern"],
        })
        themes[label]["perspectives"].append(adorations[i]["sender"])

    # Build theme list
    theme_list = []
    for tid, theme in sorted(themes.items()):
        from collections import Counter
        perspective_counts = Counter(theme["perspectives"])
        dominant_perspective = perspective_counts.most_common(1)[0][0]

        theme_list.append({
            "theme_id": tid,
            "size": len(theme["messages"]),
            "dominant_perspective": dominant_perspective,
            "perspective_breakdown": dict(perspective_counts),
            "sample_messages": [m["content"] for m in theme["messages"][:5]],
            "all_messages": theme["messages"],
        })

    theme_list.sort(key=lambda t: t["size"], reverse=True)
    return theme_list


def run(output_dir: str):
    input_path = os.path.join(output_dir, "02_cleaned_messages.json")
    with open(input_path, 'r', encoding='utf-8') as f:
        messages = json.load(f)

    print(f"  Scanning {len(messages)} messages for adoration patterns...")

    adorations = find_adoration_messages(messages)
    kaiwal_count = sum(1 for a in adorations if a["perspective"] == "kaiwal")
    disha_count = sum(1 for a in adorations if a["perspective"] == "disha")
    print(f"  Found {len(adorations)} adoration messages (Kaiwal: {kaiwal_count}, Disha: {disha_count})")

    # Save raw adorations
    raw_path = os.path.join(output_dir, "06_adorations_raw.json")
    with open(raw_path, 'w', encoding='utf-8') as f:
        # Save without embedding-unfriendly fields
        save_adorations = [{k: v for k, v in a.items()} for a in adorations]
        json.dump(save_adorations, f, ensure_ascii=False, indent=2)

    # Cluster into themes
    print("  Clustering adoration messages into themes...")
    themes = cluster_adorations(adorations, output_dir)

    output_path = os.path.join(output_dir, "06_adorations.json")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(themes, f, ensure_ascii=False, indent=2)

    print(f"✓ Adoration themes: {len(themes)} → {output_path}")
    for t in themes[:5]:
        print(f"  Theme {t['theme_id']}: {t['size']} msgs, {t['dominant_perspective']} perspective")
        print(f"    Sample: {t['sample_messages'][0][:80]}...")

    return themes


if __name__ == "__main__":
    BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    run(os.path.join(BASE, "memory_engine", "output"))
