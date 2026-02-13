"""
Step 1: Unified Chat Parser
Parses Instagram JSON + WhatsApp txt into a single sorted JSON file.
"""
import json
import os
import re
import hashlib
from datetime import datetime, timezone


# --- Sender normalization ---
DISHA_NAMES = {"Disha Joshi", "sahee.dishaa", "disha joshi"}
KAIWAL_NAMES = {"Kaiwal Panchal", "Kaiwal", "kaiwal panchal", "Kaiwal Panchal"}


def normalize_sender(name: str) -> str:
    if name in DISHA_NAMES or name.lower() in {n.lower() for n in DISHA_NAMES}:
        return "disha"
    return "kaiwal"


# --- Instagram UTF-8 fix ---
def fix_instagram_encoding(text: str) -> str:
    """Instagram exports UTF-8 text as Latin-1 escaped. Decode it properly."""
    if text is None:
        return ""
    try:
        return text.encode('latin-1').decode('utf-8')
    except (UnicodeDecodeError, UnicodeEncodeError):
        return text


def timestamp_ms_to_iso(ts_ms: int) -> str:
    dt = datetime.fromtimestamp(ts_ms / 1000, tz=timezone.utc)
    return dt.isoformat()


# --- Instagram JSON parser ---
def parse_instagram_json(filepath: str, source_label: str) -> list[dict]:
    """Parse a single Instagram message JSON file."""
    with open(filepath, 'r', encoding='utf-8') as f:
        data = json.load(f)

    messages = []
    for msg in data.get("messages", []):
        sender = normalize_sender(msg.get("sender_name", ""))
        ts_ms = msg.get("timestamp_ms", 0)
        content = fix_instagram_encoding(msg.get("content", ""))

        # Determine media type
        has_media = False
        media_type = None
        if "photos" in msg:
            has_media, media_type = True, "photo"
        elif "audio_files" in msg:
            has_media, media_type = True, "audio"
        elif "videos" in msg:
            has_media, media_type = True, "video"
        elif "share" in msg:
            has_media, media_type = True, "reel"
            # Include share_text as context
            share_text = fix_instagram_encoding(msg["share"].get("share_text", ""))
            if share_text and len(share_text) > 10:
                content = f"{content} [shared: {share_text[:100]}]" if content else f"[shared: {share_text[:100]}]"

        # Extract reactions
        reactions = []
        for r in msg.get("reactions", []):
            reactions.append(fix_instagram_encoding(r.get("reaction", "")))

        messages.append({
            "sender": sender,
            "timestamp_iso": timestamp_ms_to_iso(ts_ms),
            "timestamp_ms": ts_ms,
            "content": content,
            "has_media": has_media,
            "media_type": media_type,
            "reactions": reactions,
            "source": source_label,
        })

    return messages


# --- WhatsApp txt parser ---
WHATSAPP_LINE_RE = re.compile(
    r'^(\d{2}/\d{2}/\d{2}),\s*(\d{1,2}:\d{2}\s*[ap]m)\s*-\s*([^:]+):\s*(.*)',
    re.IGNORECASE
)
WHATSAPP_SYSTEM_RE = re.compile(
    r'^(\d{2}/\d{2}/\d{2}),\s*(\d{1,2}:\d{2}\s*[ap]m)\s*-\s*(?!.*:)',
    re.IGNORECASE
)


def parse_whatsapp_txt(filepath: str) -> list[dict]:
    """Parse WhatsApp exported txt chat."""
    messages = []
    current_msg = None

    with open(filepath, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.rstrip('\n')

            # Skip system messages (no sender)
            if WHATSAPP_SYSTEM_RE.match(line):
                if current_msg:
                    messages.append(current_msg)
                    current_msg = None
                continue

            match = WHATSAPP_LINE_RE.match(line)
            if match:
                # Save previous message
                if current_msg:
                    messages.append(current_msg)

                date_str, time_str, sender_raw, text = match.groups()
                sender = normalize_sender(sender_raw.strip())

                # Parse timestamp
                try:
                    dt = datetime.strptime(
                        f"{date_str} {time_str.strip()}",
                        "%d/%m/%y %I:%M %p"
                    )
                    ts_ms = int(dt.timestamp() * 1000)
                except ValueError:
                    ts_ms = 0

                # Check for media
                has_media = False
                media_type = None
                if "(file attached)" in text or "<Media omitted>" in text:
                    has_media = True
                    if any(ext in text.lower() for ext in ['.jpg', '.png', '.jpeg', '.gif', '.webp']):
                        media_type = "photo"
                    elif any(ext in text.lower() for ext in ['.mp4', '.mov', '.avi']):
                        media_type = "video"
                    elif any(ext in text.lower() for ext in ['.opus', '.mp3', '.ogg']):
                        media_type = "audio"
                    else:
                        media_type = "media"

                current_msg = {
                    "sender": sender,
                    "timestamp_iso": timestamp_ms_to_iso(ts_ms) if ts_ms else "",
                    "timestamp_ms": ts_ms,
                    "content": text.strip(),
                    "has_media": has_media,
                    "media_type": media_type,
                    "reactions": [],
                    "source": "whatsapp",
                }
            elif current_msg:
                # Continuation of previous message (multiline)
                current_msg["content"] += "\n" + line.strip()

    # Don't forget last message
    if current_msg:
        messages.append(current_msg)

    return messages


# --- Deduplication ---
def dedup_messages(messages: list[dict]) -> list[dict]:
    """Remove duplicates that appear in multiple Instagram accounts."""
    seen = set()
    deduped = []
    for msg in messages:
        content_hash = hashlib.md5(
            (msg.get("content", "") or "").encode()
        ).hexdigest()[:12]
        key = (msg["sender"], msg["timestamp_ms"], content_hash)
        if key not in seen:
            seen.add(key)
            deduped.append(msg)
    return deduped


# --- Main ---
def run(base_dir: str, output_dir: str):
    os.makedirs(output_dir, exist_ok=True)
    all_messages = []

    # Instagram sources
    ig_files = [
        (os.path.join(base_dir, "chat_analysis", "arreyykaiwal", "message_1.json"), "ig_arreyykaiwal"),
        (os.path.join(base_dir, "chat_analysis", "arreyykaiwal", "message_2.json"), "ig_arreyykaiwal"),
        (os.path.join(base_dir, "chat_analysis", "arreyykaiwal", "message_1saheedishaarreykaiwal.json"), "ig_arreyykaiwal_group"),
        (os.path.join(base_dir, "chat_analysis", "kaiwal4u", "message_1.json"), "ig_kaiwal4u"),
    ]

    for filepath, label in ig_files:
        if os.path.exists(filepath):
            msgs = parse_instagram_json(filepath, label)
            print(f"  [{label}] Parsed {len(msgs)} messages from {os.path.basename(filepath)}")
            all_messages.extend(msgs)
        else:
            print(f"  [SKIP] {filepath} not found")

    # WhatsApp
    wa_path = os.path.join(base_dir, "chat_analysis", "whatsapp", "WhatsApp Chat with Disha Joshi.txt")
    if os.path.exists(wa_path):
        wa_msgs = parse_whatsapp_txt(wa_path)
        print(f"  [whatsapp] Parsed {len(wa_msgs)} messages")
        all_messages.extend(wa_msgs)

    # Dedup and sort chronologically
    all_messages = dedup_messages(all_messages)
    all_messages.sort(key=lambda m: m["timestamp_ms"])

    output_path = os.path.join(output_dir, "01_all_messages.json")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_messages, f, ensure_ascii=False, indent=2)

    print(f"\n✓ Total: {len(all_messages)} unique messages → {output_path}")
    return all_messages


if __name__ == "__main__":
    BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    run(BASE, os.path.join(BASE, "memory_engine", "output"))
