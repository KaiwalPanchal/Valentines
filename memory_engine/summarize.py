"""
Step 8: Moment Summarization via Groq LLM
Uses gpt-oss-20b for bulk moment summarization (fast, cheap) and
gpt-oss-120b for adoration theme naming (higher quality, fewer calls).

Token Budget Optimization:
- 258 moments × ~150 output tokens = ~39k output tokens ← fits easily
- But 258 requests is a lot. We summarize top 100 by emotional weight.
- Adoration themes: ~3 requests (batched 5 at a time) ← negligible
- Total: ~103 requests out of 1000 budget, ~16k output tokens out of 200k
"""
import json
import os
import time


def get_groq_client():
    """Initialize Groq client from .env"""
    from dotenv import load_dotenv
    load_dotenv()

    from groq import Groq
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY not found in .env file. Get one at https://console.groq.com")
    return Groq(api_key=api_key)


def summarize_moment(client, moment: dict, model: str = "openai/gpt-oss-20b") -> dict:
    """
    Summarize a single moment into a short memory description.
    Uses top 3 representative texts, truncated to save input tokens.
    """
    rep_texts = moment.get("representative_texts", [])[:3]

    # Truncate each text to ~400 chars
    truncated = []
    for t in rep_texts:
        lines = t.split("\n")
        meaningful = [l for l in lines if l.strip() and l.strip() != "---"]
        truncated.append("\n".join(meaningful[:12]))

    combined = "\n\n---\n\n".join(truncated)

    prompt = f"""These are chat excerpts from a conversation between Kaiwal and Disha (a young couple).
They speak in English, Gujarati, and Hindi mixed. Date: {moment.get('date', 'unknown')}.
Dominant tone: {moment['dominant_tone']}. This conversation had {moment.get('total_reactions', 0)} reactions.

Messages:
{combined}

Summarize this as ONE short "moment" description (1-2 sentences max).
What is the ESSENCE of this conversation? What memory does it capture?
Do NOT invent details. Keep it authentic. Be specific, not generic.
Also provide a 3-5 word label for this moment.

Reply in this exact format:
LABEL: <3-5 word theme label>
MOMENT: <1-2 sentence summary>"""

    try:
        response = client.chat.completions.create(
            model=model,
            messages=[{"role": "user", "content": prompt}],
            max_tokens=150,
            temperature=0.7,
        )
        text = response.choices[0].message.content.strip()

        # Parse response
        label = ""
        moment_text = ""
        for line in text.split("\n"):
            line = line.strip()
            if line.upper().startswith("LABEL:"):
                label = line[6:].strip()
            elif line.upper().startswith("MOMENT:"):
                moment_text = line[7:].strip()

        if not label and not moment_text:
            moment_text = text[:200]
            label = f"Moment {moment['moment_id']}"

        return {
            "moment_id": moment["moment_id"],
            "date": moment.get("date", ""),
            "label": label,
            "summary": moment_text,
            "dominant_tone": moment["dominant_tone"],
            "emotional_weight": moment.get("emotional_weight", 0),
            "total_reactions": moment.get("total_reactions", 0),
            "n_chunks": moment.get("n_chunks", 0),
        }

    except Exception as e:
        error_str = str(e)
        if "rate_limit" in error_str.lower() or "429" in error_str:
            print(f"  Rate limited, waiting 30s...")
            time.sleep(30)
            return summarize_moment(client, moment, model)
        else:
            print(f"  Error on moment {moment['moment_id']}: {e}")
            return {
                "moment_id": moment["moment_id"],
                "date": moment.get("date", ""),
                "label": f"Moment {moment['moment_id']}",
                "summary": f"[Error: {str(e)[:100]}]",
                "dominant_tone": moment["dominant_tone"],
                "emotional_weight": moment.get("emotional_weight", 0),
            }


def name_adoration_themes(client, themes: list[dict],
                          model: str = "openai/gpt-oss-120b") -> list[dict]:
    """
    Use the 120b model to name adoration themes with higher quality.
    Batches multiple themes per request to save on request count.
    """
    import re as re_module
    batch_size = 5
    named_themes = []

    for i in range(0, len(themes), batch_size):
        batch = themes[i:i + batch_size]

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

            for line in text.split("\n"):
                line = line.strip()
                if not line:
                    continue
                match = re_module.match(r"THEME\s+(\d+):\s*(.+?)\s*\|\s*(.+)", line, re_module.IGNORECASE)
                if match:
                    idx = int(match.group(1)) - 1
                    if 0 <= idx < len(batch):
                        batch[idx]["theme_name"] = match.group(2).strip()
                        batch[idx]["poetic_line"] = match.group(3).strip()

            named_themes.extend(batch)
            time.sleep(1)

        except Exception as e:
            if "rate_limit" in str(e).lower() or "429" in str(e):
                print(f"  Rate limited, waiting 30s...")
                time.sleep(30)
                named_themes.extend(name_adoration_themes(client, batch, model))
            else:
                print(f"  Error naming themes: {e}")
                named_themes.extend(batch)

    return named_themes


def run(output_dir: str, max_moments: int = 100):
    """
    Summarize top moments by emotional weight.
    
    Args:
        max_moments: Max moments to summarize (default 100, stays within budget)
    """
    client = get_groq_client()

    # --- Summarize moments ---
    moments_path = os.path.join(output_dir, "05_moments.json")
    with open(moments_path, 'r', encoding='utf-8') as f:
        moments = json.load(f)

    # Already sorted by emotional weight (descending) from step 5
    top_moments = moments[:max_moments]

    print(f"  Summarizing top {len(top_moments)}/{len(moments)} moments with gpt-oss-20b...")
    print(f"  Estimated: {len(top_moments)} requests, ~{len(top_moments) * 150} output tokens")

    summaries = []
    # Progressive save — save after every 10 to avoid losing progress
    save_path = os.path.join(output_dir, "07_summaries.json")

    for i, moment in enumerate(top_moments):
        print(f"  [{i+1}/{len(top_moments)}] Moment #{moment['moment_id']} ({moment.get('date', '?')})...", end=" ")
        summary = summarize_moment(client, moment)
        summaries.append(summary)
        print(f"→ {summary['label']}")

        # Progressive save every 10
        if (i + 1) % 10 == 0:
            with open(save_path, 'w', encoding='utf-8') as f:
                json.dump(summaries, f, ensure_ascii=False, indent=2)
            print(f"  [saved {len(summaries)} summaries]")

        time.sleep(0.3)  # Gentle rate limiting

    # Final save
    with open(save_path, 'w', encoding='utf-8') as f:
        json.dump(summaries, f, ensure_ascii=False, indent=2)
    print(f"✓ Summaries: {len(summaries)} → {save_path}")

    # --- Name adoration themes ---
    adorations_path = os.path.join(output_dir, "06_adorations.json")
    if os.path.exists(adorations_path):
        with open(adorations_path, 'r', encoding='utf-8') as f:
            themes = json.load(f)

        if themes:
            print(f"\n  Naming {len(themes)} adoration themes with gpt-oss-120b...")
            n_requests = (len(themes) + 4) // 5
            print(f"  Estimated: {n_requests} requests, ~{n_requests * 300} output tokens")

            named_themes = name_adoration_themes(client, themes)

            adorations_named_path = os.path.join(output_dir, "07_adorations_named.json")
            with open(adorations_named_path, 'w', encoding='utf-8') as f:
                json.dump(named_themes, f, ensure_ascii=False, indent=2)
            print(f"✓ Named themes: {len(named_themes)} → {adorations_named_path}")

            for t in named_themes[:5]:
                name = t.get("theme_name", "?")
                poetic = t.get("poetic_line", "?")
                print(f"  • {name}: {poetic}")

    # --- Print budget usage ---
    total_requests = len(top_moments) + ((len(themes) + 4) // 5 if themes else 0)
    total_output_tokens_est = len(top_moments) * 150 + ((len(themes) + 4) // 5) * 300
    print(f"\n  Budget usage: ~{total_requests}/1000 requests, ~{total_output_tokens_est}/200k output tokens")

    return summaries


if __name__ == "__main__":
    BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    run(os.path.join(BASE, "memory_engine", "output"))
