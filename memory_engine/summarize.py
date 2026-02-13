"""
Step 7: Moment Summarization via Groq LLM
Uses gpt-oss-20b for bulk cluster summarization (fast, cheap) and
gpt-oss-120b for adoration theme naming (higher quality, fewer calls).

Token Budget:
- gpt-oss-20b: 1000 requests, 200k output tokens → used for cluster summaries (~50-80 clusters)
- gpt-oss-120b: 1000 requests, 200k output tokens → used for adoration themes (~10-15 themes)
"""
import json
import os
import time
from datetime import datetime, timezone


def get_groq_client():
    """Initialize Groq client from .env"""
    from dotenv import load_dotenv
    load_dotenv()

    from groq import Groq
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY not found in .env file. Get one at https://console.groq.com")
    return Groq(api_key=api_key)


def summarize_cluster(client, cluster: dict, model: str = "openai/gpt-oss-20b") -> dict:
    """
    Summarize a single cluster into a short moment description.
    Uses only the top 3 representative texts to stay tokens-efficient.
    """
    # Take top 3 representative chunks (closest to centroid, already sorted)
    rep_texts = cluster.get("representative_texts", [])[:3]

    # Truncate each text to ~500 chars to save input tokens
    truncated = []
    for t in rep_texts:
        lines = t.split("\n")
        # Keep header (tone line) + actual message lines, skip "---" separator
        meaningful = [l for l in lines if l.strip() and l.strip() != "---"]
        truncated.append("\n".join(meaningful[:15]))  # Max 15 lines per text

    combined = "\n\n---\n\n".join(truncated)

    prompt = f"""These are chat excerpts from a conversation between Kaiwal and Disha (a young couple).
They speak in English, Gujarati, and Hindi mixed. This cluster has {cluster['size']} similar conversation windows.
Dominant tone: {cluster['dominant_tone']}.

Messages:
{combined}

Summarize this as ONE short "moment" description (1-2 sentences max).
What is the ESSENCE of these conversations? What memory or emotional thread connects them?
Do NOT invent details. Keep it authentic. Be specific, not generic.
Also provide a 3-5 word label for this moment theme.

Reply in this exact format:
LABEL: <3-5 word theme label>
MOMENT: <1-2 sentence summary>"""

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150,  # Keep output tokens low
            temperature=0.7,
        )
        text = response.choices[0].message.content.strip()

        # Parse response
        label = ""
        moment = ""
        for line in text.split("\n"):
            line = line.strip()
            if line.upper().startswith("LABEL:"):
                label = line[6:].strip()
            elif line.upper().startswith("MOMENT:"):
                moment = line[7:].strip()

        if not label and not moment:
            # Fallback: use entire response as moment
            moment = text[:200]
            label = f"Cluster {cluster['cluster_id']}"

        return {
            "cluster_id": cluster["cluster_id"],
            "label": label,
            "moment": moment,
            "size": cluster["size"],
            "dominant_tone": cluster["dominant_tone"],
            "total_reactions": cluster.get("total_reactions", 0),
            "time_start": cluster.get("time_start", 0),
            "time_end": cluster.get("time_end", 0),
        }

    except Exception as e:
        error_str = str(e)
        if "rate_limit" in error_str.lower() or "429" in error_str:
            print(f"  Rate limited, waiting 30s...")
            time.sleep(30)
            return summarize_cluster(client, cluster, model)  # Retry
        else:
            print(f"  Error on cluster {cluster['cluster_id']}: {e}")
            return {
                "cluster_id": cluster["cluster_id"],
                "label": f"Cluster {cluster['cluster_id']}",
                "moment": f"[Error: {str(e)[:100]}]",
                "size": cluster["size"],
                "dominant_tone": cluster["dominant_tone"],
            }


def name_adoration_themes(client, themes: list[dict],
                          model: str = "openai/gpt-oss-120b") -> list[dict]:
    """
    Use the 120b model to name adoration themes with higher quality.
    Batches multiple themes per request to save on request count.
    """
    # Batch themes in groups of 5 to save requests
    batch_size = 5
    named_themes = []

    for i in range(0, len(themes), batch_size):
        batch = themes[i:i + batch_size]

        # Format batch
        theme_texts = []
        for j, theme in enumerate(batch):
            samples = theme.get("sample_messages", [])[:3]
            perspective = theme.get("dominant_perspective", "unknown")
            theme_texts.append(
                f"Theme {j+1} ({perspective}'s words, {theme['size']} messages):\n" +
                "\n".join(f"  - {s[:120]}" for s in samples)
            )

        combined = "\n\n".join(theme_texts)

        prompt = f"""These are adoration themes extracted from chats between Kaiwal (M, engineer) and Disha (F, law student).
Each theme is a cluster of messages where one person expresses what they adore about the other.

{combined}

For each theme, provide:
1. A 3-5 word THEME NAME (the core thing being adored)
2. A one-sentence POETIC rewrite that captures the essence

Format your response EXACTLY like this (one per theme):
THEME 1: <name> | <poetic line>
THEME 2: <name> | <poetic line>
..."""

        try:
            response = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=300,
                temperature=0.75,
            )
            text = response.choices[0].message.content.strip()

            # Parse response
            for line in text.split("\n"):
                line = line.strip()
                if not line:
                    continue
                # Match "THEME N: name | poetic" pattern
                import re
                match = re.match(r"THEME\s+(\d+):\s*(.+?)\s*\|\s*(.+)", line, re.IGNORECASE)
                if match:
                    idx = int(match.group(1)) - 1
                    if 0 <= idx < len(batch):
                        batch[idx]["theme_name"] = match.group(2).strip()
                        batch[idx]["poetic_line"] = match.group(3).strip()

            named_themes.extend(batch)
            time.sleep(1)  # Be nice to rate limits

        except Exception as e:
            if "rate_limit" in str(e).lower() or "429" in str(e):
                print(f"  Rate limited, waiting 30s...")
                time.sleep(30)
                # Retry this batch
                named_themes.extend(name_adoration_themes(client, batch, model))
            else:
                print(f"  Error naming themes: {e}")
                named_themes.extend(batch)

    return named_themes


def run(output_dir: str):
    client = get_groq_client()

    # --- Summarize clusters ---
    clusters_path = os.path.join(output_dir, "05_clusters.json")
    with open(clusters_path, 'r', encoding='utf-8') as f:
        clusters = json.load(f)

    print(f"  Summarizing {len(clusters)} clusters with gpt-oss-20b...")
    print(f"  Estimated cost: {len(clusters)} requests, ~{len(clusters) * 150} output tokens")

    summaries = []
    for i, cluster in enumerate(clusters):
        print(f"  [{i+1}/{len(clusters)}] Cluster {cluster['cluster_id']} ({cluster['size']} chunks)...", end=" ")
        summary = summarize_cluster(client, cluster)
        summaries.append(summary)
        print(f"→ {summary['label']}")
        time.sleep(0.5)  # Gentle rate limiting

    summaries_path = os.path.join(output_dir, "07_summaries.json")
    with open(summaries_path, 'w', encoding='utf-8') as f:
        json.dump(summaries, f, ensure_ascii=False, indent=2)
    print(f"✓ Summaries: {len(summaries)} → {summaries_path}")

    # --- Name adoration themes ---
    adorations_path = os.path.join(output_dir, "06_adorations.json")
    if os.path.exists(adorations_path):
        with open(adorations_path, 'r', encoding='utf-8') as f:
            themes = json.load(f)

        if themes:
            print(f"\n  Naming {len(themes)} adoration themes with gpt-oss-120b...")
            n_requests = (len(themes) + 4) // 5
            print(f"  Estimated cost: {n_requests} requests, ~{n_requests * 300} output tokens")

            named_themes = name_adoration_themes(client, themes)

            adorations_named_path = os.path.join(output_dir, "07_adorations_named.json")
            with open(adorations_named_path, 'w', encoding='utf-8') as f:
                json.dump(named_themes, f, ensure_ascii=False, indent=2)
            print(f"✓ Named themes: {len(named_themes)} → {adorations_named_path}")

            for t in named_themes[:5]:
                name = t.get("theme_name", "?")
                poetic = t.get("poetic_line", "?")
                print(f"  • {name}: {poetic}")

    return summaries


if __name__ == "__main__":
    BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    run(os.path.join(BASE, "memory_engine", "output"))
