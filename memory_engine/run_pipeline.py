"""
Valentine Memory Engine — Pipeline Runner
Runs all steps in sequence, each saving intermediate output.
Each step can also be run independently.

Usage:
    python memory_engine/run_pipeline.py              # Run all steps
    python memory_engine/run_pipeline.py --from 3     # Resume from step 3
    python memory_engine/run_pipeline.py --only 7     # Run only step 7
"""
import argparse
import os
import sys
import time

# Ensure package is importable
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from memory_engine import parse_chats, preprocess, chunker, embedder, cluster, adoration, inside_refs, summarize


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTPUT_DIR = os.path.join(BASE_DIR, "memory_engine", "output")


STEPS = {
    1: ("Parse Chats", lambda: parse_chats.run(BASE_DIR, OUTPUT_DIR)),
    2: ("Preprocess & Filter", lambda: preprocess.run(OUTPUT_DIR)),
    3: ("Semantic Chunking", lambda: chunker.run(OUTPUT_DIR)),
    4: ("Embed Chunks (GPU)", lambda: embedder.run(OUTPUT_DIR)),
    5: ("Cluster Moments", lambda: cluster.run(OUTPUT_DIR)),
    6: ("Detect Adorations", lambda: adoration.run(OUTPUT_DIR)),
    7: ("Extract Inside References", lambda: inside_refs.run(OUTPUT_DIR)),
    8: ("Summarize via Groq LLM", lambda: summarize.run(OUTPUT_DIR)),
}


def run_step(step_num: int):
    name, func = STEPS[step_num]
    print(f"\n{'='*60}")
    print(f"  STEP {step_num}: {name}")
    print(f"{'='*60}")
    start = time.time()
    result = func()
    elapsed = time.time() - start
    print(f"  ⏱ {elapsed:.1f}s")
    return result


def main():
    parser = argparse.ArgumentParser(description="Valentine Memory Engine Pipeline")
    parser.add_argument("--from", dest="from_step", type=int, default=1,
                        help="Start from this step (1-8)")
    parser.add_argument("--only", type=int, default=None,
                        help="Run only this step")
    parser.add_argument("--skip-llm", action="store_true",
                        help="Skip step 8 (LLM summarization)")
    args = parser.parse_args()

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    print(f"Valentine Memory Engine")
    print(f"Base directory: {BASE_DIR}")
    print(f"Output directory: {OUTPUT_DIR}")

    if args.only:
        run_step(args.only)
    else:
        max_step = 7 if args.skip_llm else 8
        for step_num in range(args.from_step, max_step + 1):
            run_step(step_num)

    print(f"\n{'='*60}")
    print(f"  ✓ PIPELINE COMPLETE")
    print(f"  Output files in: {OUTPUT_DIR}")
    print(f"{'='*60}")

    # List output files
    if os.path.exists(OUTPUT_DIR):
        files = sorted(os.listdir(OUTPUT_DIR))
        for f in files:
            size = os.path.getsize(os.path.join(OUTPUT_DIR, f))
            print(f"  {f:40s} {size:>10,} bytes")


if __name__ == "__main__":
    main()
