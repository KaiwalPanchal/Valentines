"""
Step 4: Embedding Generation
Uses sentence-transformers on GPU for semantic embeddings.
"""
import json
import os
import numpy as np


def run(output_dir: str, model_name: str = "BAAI/bge-large-en-v1.5", batch_size: int = 64):
    """
    Generate embeddings for all chunks using GPU-accelerated sentence-transformers.
    
    Uses bge-large-en-v1.5 (1024-dim) since GPU is available.
    Alternative: 'all-MiniLM-L6-v2' (384-dim, faster but less accurate)
    """
    # Lazy import to avoid loading torch unnecessarily
    from sentence_transformers import SentenceTransformer
    import torch

    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"  Device: {device}")
    if device == "cuda":
        print(f"  GPU: {torch.cuda.get_device_name(0)}")

    # Load chunks
    input_path = os.path.join(output_dir, "03_chunks_texts.json")
    with open(input_path, 'r', encoding='utf-8') as f:
        chunks = json.load(f)

    texts = [c["text"] for c in chunks]
    print(f"  Encoding {len(texts)} chunks with {model_name} on {device}...")

    # Load model
    model = SentenceTransformer(model_name, device=device)

    # Encode
    embeddings = model.encode(
        texts,
        batch_size=batch_size,
        show_progress_bar=True,
        normalize_embeddings=True,  # For cosine similarity
    )

    # Save embeddings
    output_path = os.path.join(output_dir, "04_embeddings.npz")
    np.savez_compressed(output_path, embeddings=embeddings)

    print(f"✓ Embeddings: {embeddings.shape} → {output_path}")
    print(f"  Embedding dim: {embeddings.shape[1]}")
    return embeddings


if __name__ == "__main__":
    BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    run(os.path.join(BASE, "memory_engine", "output"))
