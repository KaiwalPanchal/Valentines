"""
Step 5: Moment Discovery — Time-Based Conversation Clustering
Uses the natural conversation boundaries (2-hour time gaps, already detected
in step 3) as the primary moments, then uses embeddings to:
1. Score each conversation by "emotional weight" (reaction density, tone)
2. Compute a summary embedding per conversation for the LLM step
3. Optionally merge very short adjacent conversations into one moment
"""
import json
import os
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from collections import Counter
from datetime import datetime, timezone


class NumpyEncoder(json.JSONEncoder):
    """JSON encoder that handles numpy types."""
    def default(self, obj):
        if isinstance(obj, (np.integer,)):
            return int(obj)
        if isinstance(obj, (np.floating,)):
            return float(obj)
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return super().default(obj)


def build_conversations(chunks: list[dict]) -> list[dict]:
    """
    Group chunks back into their parent conversations based on time continuity.
    Two chunks belong to the same conversation if they overlap in time
    (which they will, since chunks have ~40% overlap within a conversation).
    """
    if not chunks:
        return []

    # Sort chunks by start time
    sorted_chunks = sorted(chunks, key=lambda c: c.get("timestamp_ms_start", 0))

    conversations = []
    current_conv_chunks = [sorted_chunks[0]]

    for chunk in sorted_chunks[1:]:
        prev_end = current_conv_chunks[-1].get("timestamp_ms_end", 0)
        curr_start = chunk.get("timestamp_ms_start", 0)

        # If this chunk starts after the previous conversation's last chunk ended
        # by more than the gap threshold, it's a new conversation.
        # Since chunks overlap within conversations, gap = start > prev_end
        gap_minutes = (curr_start - prev_end) / 60000 if prev_end and curr_start else 0

        if gap_minutes > 120:  # Same 2-hour gap as chunker
            conversations.append(current_conv_chunks)
            current_conv_chunks = [chunk]
        else:
            current_conv_chunks.append(chunk)

    if current_conv_chunks:
        conversations.append(current_conv_chunks)

    return conversations


def score_conversation(conv_chunks: list[dict]) -> float:
    """
    Score a conversation's emotional weight. Higher = more interesting moment.
    Based on: reaction count, tone, message count, text density.
    """
    total_reactions = sum(c.get("reaction_count", 0) for c in conv_chunks)
    total_text_msgs = sum(c.get("text_message_count", 0) for c in conv_chunks)

    # Tone weights
    tone_scores = {"deep": 3.0, "affectionate": 2.0, "playful": 1.5, "casual": 0.5}
    tones = [c.get("tone", "casual") for c in conv_chunks]
    tone_score = sum(tone_scores.get(t, 0.5) for t in tones) / len(tones)

    # Combine: reactions are strong signal, tone adds context
    score = (total_reactions * 2.0) + (tone_score * 3.0) + (total_text_msgs * 0.1)
    return round(score, 2)


def merge_short_conversations(conversations: list[list[dict]], min_chunks: int = 2) -> list[list[dict]]:
    """
    Merge very short conversations (< min_chunks) into their nearest neighbor
    (the conversation immediately before or after in time).
    """
    merged = []
    buffer = []

    for conv in conversations:
        if len(conv) < min_chunks:
            buffer.extend(conv)
        else:
            if buffer:
                # Attach buffer to this conversation
                conv = buffer + conv
                buffer = []
            merged.append(conv)

    # Handle trailing buffer
    if buffer:
        if merged:
            merged[-1].extend(buffer)
        else:
            merged.append(buffer)

    return merged


def run(output_dir: str, min_chunks_per_moment: int = 2):
    """
    Build moments from time-based conversation groups.
    Each conversation (separated by >2hr gaps) = one moment.
    """
    # Load chunks and embeddings
    chunks_path = os.path.join(output_dir, "03_chunks_texts.json")
    with open(chunks_path, 'r', encoding='utf-8') as f:
        chunks = json.load(f)

    emb_path = os.path.join(output_dir, "04_embeddings.npz")
    embeddings = np.load(emb_path)["embeddings"]

    print(f"  Input: {len(chunks)} chunks, {embeddings.shape}")

    # --- Group chunks into conversations by time ---
    conversations = build_conversations(chunks)
    print(f"  Found {len(conversations)} conversations (by time gaps)")

    # --- Merge very short conversations ---
    conversations = merge_short_conversations(conversations, min_chunks=min_chunks_per_moment)
    print(f"  After merging short ones: {len(conversations)} moments")

    # --- Build moment objects ---
    moments = []
    for i, conv_chunks in enumerate(conversations):
        # Time range
        all_starts = [c["timestamp_ms_start"] for c in conv_chunks if c.get("timestamp_ms_start")]
        all_ends = [c["timestamp_ms_end"] for c in conv_chunks if c.get("timestamp_ms_end")]

        # Compute moment embedding as mean of chunk embeddings
        chunk_indices = [c["chunk_id"] for c in conv_chunks]
        moment_embedding_indices = [idx for idx in chunk_indices if idx < len(embeddings)]
        if moment_embedding_indices:
            moment_emb = embeddings[moment_embedding_indices].mean(axis=0)
        else:
            moment_emb = np.zeros(embeddings.shape[1])

        # Dominant tone
        tones = [c["tone"] for c in conv_chunks]
        dominant_tone = Counter(tones).most_common(1)[0][0]

        # Reaction density
        total_reactions = sum(c.get("reaction_count", 0) for c in conv_chunks)

        # Emotional weight score
        weight = score_conversation(conv_chunks)

        # Representative texts (already sorted by relevance in chunks)
        rep_texts = [c["text"] for c in conv_chunks[:5]]

        # Format readable time
        time_start_ms = min(all_starts) if all_starts else 0
        time_end_ms = max(all_ends) if all_ends else 0

        try:
            date_str = datetime.fromtimestamp(time_start_ms / 1000, tz=timezone.utc).strftime("%b %d, %Y %I:%M%p")
        except (ValueError, OSError):
            date_str = "unknown"

        moments.append({
            "moment_id": i,
            "date": date_str,
            "n_chunks": len(conv_chunks),
            "dominant_tone": dominant_tone,
            "total_reactions": int(total_reactions),
            "emotional_weight": weight,
            "time_start": int(time_start_ms),
            "time_end": int(time_end_ms),
            "representative_texts": rep_texts,
            "chunk_ids": [int(c["chunk_id"]) for c in conv_chunks],
        })

    # Sort by emotional weight (most interesting first)
    moments.sort(key=lambda m: m["emotional_weight"], reverse=True)

    # Save
    output_path = os.path.join(output_dir, "05_moments.json")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(moments, f, ensure_ascii=False, indent=2, cls=NumpyEncoder)

    # Also save a compact version for quick browsing
    compact = [{
        "moment_id": m["moment_id"],
        "date": m["date"],
        "tone": m["dominant_tone"],
        "reactions": m["total_reactions"],
        "weight": m["emotional_weight"],
        "chunks": m["n_chunks"],
        "preview": m["representative_texts"][0][:200] if m["representative_texts"] else "",
    } for m in moments]

    compact_path = os.path.join(output_dir, "05_moments_compact.json")
    with open(compact_path, 'w', encoding='utf-8') as f:
        json.dump(compact, f, ensure_ascii=False, indent=2)

    print(f"\n✓ Final: {len(moments)} moments → {output_path}")
    print(f"  Compact view → {compact_path}")

    # Stats
    tone_dist = Counter(m["dominant_tone"] for m in moments)
    print(f"  Tone distribution: {tone_dist}")
    print(f"\n  Top 10 moments by emotional weight:")
    for m in moments[:10]:
        print(f"    #{m['moment_id']:3d} | {m['date']:20s} | {m['dominant_tone']:14s} | "
              f"weight={m['emotional_weight']:6.1f} | reactions={m['total_reactions']:3d} | "
              f"chunks={m['n_chunks']:3d}")

    return moments


if __name__ == "__main__":
    BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    run(os.path.join(BASE, "memory_engine", "output"))
