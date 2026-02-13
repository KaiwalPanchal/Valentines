"""
Step 2: Preprocessing & Noise Filtering
Removes noise messages while preserving emotional context.
"""
import json
import os
import re


# Messages to remove entirely
NOISE_PATTERNS = [
    r"^Liked a message$",
    r"^Reacted .+ to your message",
    r"^You sent an attachment\.$",
    r"^Disha sent an attachment\.$",
    r"^.+sent an attachment\.$",
    r"^\(file attached\)$",
    r"^<Media omitted>$",
    r"^This message was deleted$",
    r"^You deleted this message$",
    r"^Messages and calls are end-to-end encrypted",
    r"^Missed (?:voice|video) call$",
    r"^null$",
]
NOISE_RE = [re.compile(p, re.IGNORECASE) for p in NOISE_PATTERNS]

# Pure media file references (WhatsApp)
MEDIA_FILE_RE = re.compile(
    r'^(?:IMG|VID|PTT|STK|AUD)-\d{8}-WA\d+\.\w+\s*(?:\(file attached\))?$',
    re.IGNORECASE
)
MEDIA_ATTACHED_RE = re.compile(r'.*\(file attached\)\s*$')


def is_noise(msg: dict) -> bool:
    """Check if message is noise that should be removed."""
    content = (msg.get("content") or "").strip()

    # Empty
    if not content:
        # But keep if it has meaningful media (audio = voice note)
        if msg.get("media_type") == "audio":
            return False
        return True

    # Match noise patterns
    for pattern in NOISE_RE:
        if pattern.match(content):
            return True

    # Pure media file references
    if MEDIA_FILE_RE.match(content):
        return True

    # Media attached lines with just filename
    if MEDIA_ATTACHED_RE.match(content) and len(content) < 60:
        # Check if it's JUST a filename + (file attached)
        clean = content.replace("(file attached)", "").strip()
        if MEDIA_FILE_RE.match(clean) or not clean:
            return True

    return False


def compute_time_gaps(messages: list[dict]) -> list[dict]:
    """Add time_gap_minutes field showing gap from previous message."""
    for i, msg in enumerate(messages):
        if i == 0:
            msg["time_gap_minutes"] = 0
        else:
            prev_ts = messages[i - 1]["timestamp_ms"]
            curr_ts = msg["timestamp_ms"]
            gap_ms = curr_ts - prev_ts
            msg["time_gap_minutes"] = round(gap_ms / 60000, 1)
    return messages


def run(output_dir: str):
    input_path = os.path.join(output_dir, "01_all_messages.json")
    with open(input_path, 'r', encoding='utf-8') as f:
        messages = json.load(f)

    print(f"  Input: {len(messages)} messages")

    # Filter noise
    cleaned = [msg for msg in messages if not is_noise(msg)]
    print(f"  After noise removal: {len(cleaned)} messages ({len(messages) - len(cleaned)} removed)")

    # Add time gaps
    cleaned = compute_time_gaps(cleaned)

    # Tag voice notes as intimate context
    for msg in cleaned:
        if msg.get("media_type") == "audio":
            msg["content"] = (msg.get("content") or "") + " [voice note]"
            msg["is_voice_note"] = True

    output_path = os.path.join(output_dir, "02_cleaned_messages.json")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(cleaned, f, ensure_ascii=False, indent=2)

    print(f"✓ Cleaned: {len(cleaned)} messages → {output_path}")
    return cleaned


if __name__ == "__main__":
    BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    run(os.path.join(BASE, "memory_engine", "output"))
