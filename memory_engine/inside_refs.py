"""
Step 6b: Inside Reference Extractor
Finds recurring pet names, shared references, and inside jokes.
"""
import json
import os
import re
from collections import Counter


# Known pet name patterns
PET_NAME_PATTERNS = [
    r"\bbbg\b", r"\bbaby\b", r"\bcutie\b", r"\bprincess\b", r"\bjaan\b",
    r"\bsweetheart\b", r"\bsweetie\b", r"\bkiddo\b", r"\bbro\b",
    r"\bsenior citizen\b", r"\bgadheda\b", r"\bdafod\b",
]

# Pop culture / shared reference patterns
REFERENCE_PATTERNS = [
    r"\bdonna\b", r"\blouis\b", r"\bharvey\b", r"\bsuits\b",
    r"\bmanufacturing defect", r"\bsach kahu toh\b",
    r"\bpakka?\b", r"\btheek che\b",
]


def extract_inside_references(messages: list[dict]) -> dict:
    """Extract recurring references, pet names, and shared vocabulary."""
    pet_names = Counter()
    references = Counter()
    # Track who uses which pet name
    pet_name_usage = {}

    for msg in messages:
        content = (msg.get("content") or "").lower()
        sender = msg["sender"]

        for pattern in PET_NAME_PATTERNS:
            matches = re.findall(pattern, content)
            for m in matches:
                pet_names[m] += 1
                key = (m, sender)
                pet_name_usage[key] = pet_name_usage.get(key, 0) + 1

        for pattern in REFERENCE_PATTERNS:
            matches = re.findall(pattern, content)
            for m in matches:
                references[m] += 1

    # Find frequently shared reels/posts (shared interests)
    shared_content = Counter()
    for msg in messages:
        content = (msg.get("content") or "")
        if "[shared:" in content:
            share_text = content.split("[shared:")[1].split("]")[0].strip()
            if len(share_text) > 10:
                shared_content[share_text[:60]] += 1

    # Extract common short phrases used uniquely between them
    # (words/phrases used > 5 times that aren't common English)
    common_english = {
        "the", "a", "an", "is", "are", "was", "were", "i", "you", "he", "she",
        "it", "we", "they", "me", "him", "her", "us", "them", "my", "your",
        "his", "its", "our", "their", "this", "that", "these", "those", "and",
        "but", "or", "so", "yet", "for", "nor", "not", "no", "yes", "yeah",
        "yea", "ok", "okay", "to", "in", "on", "at", "of", "with", "by",
        "from", "up", "out", "if", "then", "else", "do", "did", "done",
        "have", "has", "had", "will", "would", "can", "could", "should",
        "shall", "may", "might", "must", "just", "like", "know", "think",
        "get", "go", "come", "make", "see", "say", "tell", "what", "when",
        "where", "who", "how", "why", "all", "also", "very", "much", "too",
        "some", "any", "each", "every", "more", "most", "be", "been", "being",
        "about", "than", "as", "well", "still", "even",
    }

    # Results
    result = {
        "pet_names": [
            {"name": name, "count": count}
            for name, count in pet_names.most_common(20)
            if count >= 3
        ],
        "shared_references": [
            {"reference": ref, "count": count}
            for ref, count in references.most_common(20)
            if count >= 2
        ],
        "shared_content_interests": [
            {"content": content, "count": count}
            for content, count in shared_content.most_common(10)
            if count >= 2
        ],
        "pet_name_usage": {
            f"{name}_{sender}": count
            for (name, sender), count in sorted(pet_name_usage.items())
            if count >= 2
        },
    }

    return result


def run(output_dir: str):
    input_path = os.path.join(output_dir, "02_cleaned_messages.json")
    with open(input_path, 'r', encoding='utf-8') as f:
        messages = json.load(f)

    print(f"  Scanning {len(messages)} messages for inside references...")

    refs = extract_inside_references(messages)

    output_path = os.path.join(output_dir, "06_inside_references.json")
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(refs, f, ensure_ascii=False, indent=2)

    print(f"✓ Inside references → {output_path}")
    print(f"  Pet names: {[p['name'] for p in refs['pet_names']]}")
    print(f"  References: {[r['reference'] for r in refs['shared_references']]}")

    return refs


if __name__ == "__main__":
    BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    run(os.path.join(BASE, "memory_engine", "output"))
