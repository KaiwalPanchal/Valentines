"""
Step 3: Semantic Chunking
Creates overlapping conversation windows optimized for emotional continuity.
"""
import json
import os
import re

# Emoji/reaction patterns for tone detection
AFFECTIONATE_RE = re.compile(r'❤️|🥰|😍|♥|love|miss you|miss ya|baby|bbg|princess|cutie|sweetie|sweetheart|jaan', re.IGNORECASE)
PLAYFUL_RE = re.compile(r'😂|💀|🤡|😭|lmao|lmfao|bruh|bro|idiot|gadheda|dafod|shut up|ew|disgusting', re.IGNORECASE)
DEEP_RE = re.compile(r'proud of you|believe in|strong|worry|scared|fear|trauma|vulnerable|trust|care about|matters?|important|hurt|sorry|understand', re.IGNORECASE)

# Time format from timestamp
def format_time(iso_str: str) -> str:
    """Extract just HH:MM from ISO timestamp."""
    if not iso_str:
        return ""
    try:
        # Format: 2025-10-01T05:16:00+00:00
        parts = iso_str.split("T")
        if len(parts) > 1:
            time_part = parts[1][:5]
            return time_part
    except Exception:
        pass
    return ""


def detect_tone(messages: list[dict]) -> str:
    """Auto-detect tone of a message window using simple heuristics."""
    all_text = " ".join((m.get("content") or "") for m in messages)
    all_reactions = []
    for m in messages:
        all_reactions.extend(m.get("reactions", []))
    all_text += " " + " ".join(all_reactions)

    scores = {
        "affectionate": len(AFFECTIONATE_RE.findall(all_text)),
        "playful": len(PLAYFUL_RE.findall(all_text)),
        "deep": len(DEEP_RE.findall(all_text)),
    }

    # Check for voice notes (intimate signal)
    voice_count = sum(1 for m in messages if m.get("is_voice_note"))
    scores["affectionate"] += voice_count * 2

    # Average message length > 80 chars = likely deep conversation
    avg_len = sum(len(m.get("content", "") or "") for m in messages) / max(len(messages), 1)
    if avg_len > 80:
        scores["deep"] += 3

    best = max(scores, key=scores.get)
    if scores[best] == 0:
        return "casual"
    return best


def format_chunk_text(messages: list[dict]) -> str:
    """Format a chunk of messages into embedding-ready text."""
    tone = detect_tone(messages)
    lines = [f"Conversation between Kaiwal and Disha. Tone: {tone}.", "---"]

    for msg in messages:
        sender = "Kaiwal" if msg["sender"] == "kaiwal" else "Disha"
        time_str = format_time(msg.get("timestamp_iso", ""))
        content = (msg.get("content") or "").strip()
        if not content:
            content = "[voice note]" if msg.get("is_voice_note") else "[media]"

        reactions_str = ""
        if msg.get("reactions"):
            reactions_str = " " + "".join(msg["reactions"])

        lines.append(f"[{sender} {time_str}] {content}{reactions_str}")

    return "\n".join(lines)


def create_chunks(messages: list[dict], window_size: int = 12, stride: int = 7,
                  max_gap_minutes: float = 120) -> list[dict]:
    """
    Create overlapping conversation windows.
    
    Args:
        window_size: Messages per chunk (8-15)
        stride: How many messages to slide (controls overlap)
        max_gap_minutes: Max gap before starting new conversation
    """
    # First, split into conversations based on time gaps
    conversations = []
    current_conv = []

    for msg in messages:
        if current_conv and msg.get("time_gap_minutes", 0) > max_gap_minutes:
            conversations.append(current_conv)
            current_conv = []
        current_conv.append(msg)

    if current_conv:
        conversations.append(current_conv)

    print(f"  Found {len(conversations)} distinct conversations (>{max_gap_minutes}min gaps)")

    # Create chunked windows within each conversation
    chunks = []
    chunk_id = 0

    for conv in conversations:
        if len(conv) < 4:  # Skip very short conversations
            continue

        i = 0
        while i < len(conv):
            window = conv[i:i + window_size]

            # Skip windows with < 3 actual text messages
            text_msgs = [m for m in window if (m.get("content") or "").strip()]
            if len(text_msgs) < 3:
                i += stride
                continue

            chunk_text = format_chunk_text(window)
            tone = detect_tone(window)

            # Compute reaction density (signals emotional weight)
            total_reactions = sum(len(m.get("reactions", [])) for m in window)

            chunks.append({
                "chunk_id": chunk_id,
                "text": chunk_text,
                "tone": tone,
                "message_count": len(window),
                "text_message_count": len(text_msgs),
                "reaction_count": total_reactions,
                "time_start": window[0].get("timestamp_iso", ""),
                "time_end": window[-1].get("timestamp_iso", ""),
                "timestamp_ms_start": window[0].get("timestamp_ms", 0),
                "timestamp_ms_end": window[-1].get("timestamp_ms", 0),
                "messages": window,  # Keep raw messages for later
            })
            chunk_id += 1
            i += stride

    return chunks


def run(output_dir: str):
    input_path = os.path.join(output_dir, "02_cleaned_messages.json")
    with open(input_path, 'r', encoding='utf-8') as f:
        messages = json.load(f)

    print(f"  Input: {len(messages)} cleaned messages")

    chunks = create_chunks(messages)

    # Save without raw messages (too large) — save separately
    chunks_meta = []
    for c in chunks:
        meta = {k: v for k, v in c.items() if k != "messages"}
        chunks_meta.append(meta)

    # Save full chunks (with messages) for later use
    output_full = os.path.join(output_dir, "03_chunks_full.json")
    with open(output_full, 'w', encoding='utf-8') as f:
        json.dump(chunks, f, ensure_ascii=False, indent=2)

    # Save just the embedding texts
    output_texts = os.path.join(output_dir, "03_chunks_texts.json")
    with open(output_texts, 'w', encoding='utf-8') as f:
        json.dump(chunks_meta, f, ensure_ascii=False, indent=2)

    tone_dist = {}
    for c in chunks:
        t = c["tone"]
        tone_dist[t] = tone_dist.get(t, 0) + 1

    print(f"✓ Created {len(chunks)} chunks → {output_texts}")
    print(f"  Tone distribution: {tone_dist}")
    return chunks


if __name__ == "__main__":
    BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    run(os.path.join(BASE, "memory_engine", "output"))
