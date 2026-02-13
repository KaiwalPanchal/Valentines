
import os
import json
import asyncio
import time
from dotenv import load_dotenv
from groq import AsyncGroq

# Load environment variables
load_dotenv()

# Initialize Groq client
api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY not found in .env file.")

client = AsyncGroq(api_key=api_key)

# Configuration
START_FILE_INDEX = 21
END_FILE_INDEX = 35
MODEL_NAME = "meta-llama/llama-4-maverick-17b-128e-instruct"
MESSAGES_PER_CHUNK = 50
OUTPUT_DIR = os.path.join("memory_engine", "output", "extracted_info")
PARTIALS_DIR = os.path.join(OUTPUT_DIR, "partials")
MAX_CONCURRENT_REQUESTS = 2

# Ensure output directories exist
os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(PARTIALS_DIR, exist_ok=True)

def chunk_messages(messages, chunk_size):
    """Yield successive chunks of messages."""
    for i in range(0, len(messages), chunk_size):
        yield messages[i:i + chunk_size]

def format_message(msg):
    """Format a message dictionary into a string."""
    sender = msg.get('sender', 'Unknown')
    content = msg.get('content', '')
    timestamp = msg.get('timestamp_iso', '')
    return f"[{timestamp}] {sender}: {content}"

async def process_chunk_wrapper(chunk_text, chunk_index, file_index, total_chunks, sem, retry_count=0):
    """
    Wrapper to handle checking/saving partials and calling the API.
    """
    partial_filename = f"file_{file_index}_chunk_{chunk_index}.txt"
    partial_path = os.path.join(PARTIALS_DIR, partial_filename)

    # Check if partial exists
    if os.path.exists(partial_path):
        # Verify it's not empty text
        with open(partial_path, 'r', encoding='utf-8') as f:
            content = f.read()
            if content.strip() and not content.startswith("[ERROR"):
                print(f"  [Chunk {chunk_index+1}/{total_chunks}] Found existing partial. Skipping.")
                return content

    # If not exists, process it
    result = await analyze_chunk_async(chunk_text, chunk_index, total_chunks, sem, retry_count)
    
    # Save partial immediately if valid
    if result and not result.startswith("[ERROR"):
        with open(partial_path, 'w', encoding='utf-8') as f:
            f.write(result)
            
    return result

async def analyze_chunk_async(chunk_text, chunk_index, total_chunks, sem, retry_count=0):
    """Analyze a chunk of text using Groq API with semaphore and retry logic."""
    prompt = f"""
    Analyze the following conversation segment between Kaiwal and Disha.
    
    EXTRACT the following information in bullet points:
    1. **Key Events**: What is happening?
    2. **Distinct Topics**: What are they talking about?
    3. **Emotional Undertones**: What is the mood? (e.g., playful, serious, romantic, arguing)
    
    CONVERSATION:
    {chunk_text}
    
    OUTPUT FORMAT:
    - **Key Events**: ...
    - **Distinct Topics**: ...
    - **Emotional Undertones**: ...
    """
    
    async with sem:
        try:
            print(f"  [Chunk {chunk_index+1}/{total_chunks}] Sending request...")
            start_time = time.time()
            response = await client.chat.completions.create(
                messages=[
                    {"role": "system", "content": "You are a helpful assistant that summarizes conversations."},
                    {"role": "user", "content": prompt}
                ],
                model=MODEL_NAME,
                temperature=0.6,
                max_tokens=1024,
            )
            elapsed = time.time() - start_time
            print(f"  [Chunk {chunk_index+1}/{total_chunks}] Completed in {elapsed:.1f}s.")
            return response.choices[0].message.content
        except Exception as e:
            error_str = str(e).lower()
            if "rate limit" in error_str or "429" in error_str:
                wait_time = (2 ** retry_count) * 20  # Start wait at 20s for safety
                print(f"  [Chunk {chunk_index+1}/{total_chunks}] Rate limited. Waiting {wait_time}s...")
                await asyncio.sleep(wait_time)
                if retry_count < 5:
                    return await analyze_chunk_async(chunk_text, chunk_index, total_chunks, sem, retry_count + 1)
            print(f"  [Chunk {chunk_index+1}/{total_chunks}] Error: {e}")
            return f"[ERROR analyzing chunk {chunk_index+1}: {e}]"

async def process_file_async(file_index, sem):
    """Process a single cleaned_part file."""
    input_filename = f"cleaned_part_{file_index}.json"
    input_path = os.path.join("memory_engine", "output", "split_messages", input_filename)
    output_filename = f"summary_{file_index}.txt"
    output_path = os.path.join(OUTPUT_DIR, output_filename)
    
    if os.path.exists(output_path):
        print(f"Skipping {input_filename} (Output already exists at {output_path})")
        return

    if not os.path.exists(input_path):
        print(f"File not found: {input_path}")
        return

    print(f"Processing {input_filename}...")
    
    try:
        with open(input_path, 'r', encoding='utf-8') as f:
            messages = json.load(f)
            
        chunks = list(chunk_messages(messages, MESSAGES_PER_CHUNK))
        total_chunks = len(chunks)
        
        tasks = []
        for i, chunk in enumerate(chunks):
            chunk_text = "\n".join([format_message(m) for m in chunk])
            tasks.append(process_chunk_wrapper(chunk_text, i, file_index, total_chunks, sem))
        
        results = await asyncio.gather(*tasks)
        
        full_summary = f"Summary for {input_filename}\n{'='*30}\n\n"
        valid_chunks_count = 0
        for i, analysis in enumerate(results):
            full_summary += f"--- Chunk {i+1} ---\n{analysis}\n\n"
            if analysis and not analysis.startswith("[ERROR"):
                valid_chunks_count += 1
            
        # Only save final file if we have a significant number of valid chunks (e.g., > 80%)
        # or if all returned (errors are returned as strings starting with [ERROR)
        # Actually, let's just save it. User can re-run if they see errors.
        
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(full_summary)
            
        print(f"Saved summary to {output_path}")
        
        # Cleanup partials for this file
        print(f"Cleaning up partials for {file_index}...")
        for i in range(total_chunks):
            p_path = os.path.join(PARTIALS_DIR, f"file_{file_index}_chunk_{i}.txt")
            if os.path.exists(p_path):
                os.remove(p_path)
        
    except Exception as e:
        print(f"Error processing {input_filename}: {e}")

async def main():
    sem = asyncio.Semaphore(MAX_CONCURRENT_REQUESTS)
    print(f"Starting async analysis for files {START_FILE_INDEX} to {END_FILE_INDEX} with concurrency {MAX_CONCURRENT_REQUESTS}...")
    print(f"Partials will be saved to: {PARTIALS_DIR}")
    
    for i in range(START_FILE_INDEX, END_FILE_INDEX + 1):
        await process_file_async(i, sem)
        
    print("All files processed.")

if __name__ == "__main__":
    asyncio.run(main())
