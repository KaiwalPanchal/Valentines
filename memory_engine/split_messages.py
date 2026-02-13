"""
Split cleaned messages into ~100k token chunks for LLM processing.
Uses tiktoken for accurate counting.
"""
import json
import os
import tiktoken

def count_tokens(text: str, encoding) -> int:
    """Count tokens in a string using tiktoken."""
    return len(encoding.encode(text))

def format_msg_for_token_counting(msg: dict) -> str:
    """Simple string representation of a message for token estimation."""
    sender = msg.get("sender", "unknown")
    content = msg.get("content", "")
    return f"{sender}: {content}\n"

def run_split(output_dir: str, target_tokens: int = 100000):
    input_path = os.path.join(output_dir, "02_cleaned_messages.json")
    split_folder = os.path.join(output_dir, "split_messages")
    
    if not os.path.exists(split_folder):
        os.makedirs(split_folder)
        print(f"  Created directory: {split_folder}")

    with open(input_path, 'r', encoding='utf-8') as f:
        messages = json.load(f)

    print(f"  Input: {len(messages)} messages")
    
    # Use gpt-4o encoding for estimation
    encoding = tiktoken.encoding_for_model("gpt-4o")
    
    batches = []
    current_batch = []
    current_tokens = 0
    
    for msg in messages:
        msg_text = format_msg_for_token_counting(msg)
        msg_tokens = count_tokens(msg_text, encoding)
        
        # Approximate the JSON overhead per message (quotes, colons, commas, etc.)
        # Each message in JSON has structural tokens. 
        # Experimentation showed ~125k tokens when target was 100k with overhead 60.
        # This suggests we need to be more conservative.
        json_overhead_tokens = 90 
        total_msg_tokens = msg_tokens + json_overhead_tokens
        
        if current_tokens + total_msg_tokens > target_tokens and current_batch:
            batches.append(current_batch)
            current_batch = []
            current_tokens = 0
            
        current_batch.append(msg)
        current_tokens += total_msg_tokens
        
    if current_batch:
        batches.append(current_batch)

    print(f"  Split into {len(batches)} batches")

    for i, batch in enumerate(batches):
        part_name = f"cleaned_part_{i+1:02d}.json"
        part_path = os.path.join(split_folder, part_name)
        
        # Calculate actual tokens in this batch (approx)
        batch_text = json.dumps(batch, ensure_ascii=False)
        actual_tokens = count_tokens(batch_text, encoding)
        
        with open(part_path, 'w', encoding='utf-8') as f:
            json.dump(batch, f, ensure_ascii=False, indent=2)
            
        print(f"  ✓ {part_name}: {len(batch)} messages (~{actual_tokens} tokens)")

    print(f"\n✓ Finished splitting into {len(batches)} files in {split_folder}")

if __name__ == "__main__":
    BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    run_split(os.path.join(BASE, "memory_engine", "output"))
