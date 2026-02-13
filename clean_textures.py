import cv2
import numpy as np
import os

def clean_textures(input_dir, output_dir):
    # Create output directory if it doesn't exist
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    # Loop through all files in the input directory
    for filename in os.listdir(input_dir):
        if filename.lower().endswith(('.png', '.jpg', '.jpeg')):
            input_path = os.path.join(input_dir, filename)
            output_path = os.path.join(output_dir, filename)

            # Read the image with alpha channel
            img = cv2.imread(input_path, cv2.IMREAD_UNCHANGED)

            if img is None:
                print(f"Could not read {filename}")
                continue

            # If image doesn't have an alpha channel, add one
            if len(img.shape) == 2:  # Grayscale
                img = cv2.cvtColor(img, cv2.COLOR_GRAY2BGRA)
            elif img.shape[2] == 3:  # RGB
                img = cv2.cvtColor(img, cv2.COLOR_BGR2BGRA)

            # Extract the alpha channel
            alpha_channel = img[:, :, 3]

            # Threshold the alpha channel to get a binary mask of non-transparent areas
            # Increased threshold to 15 to ignore very faint shadow/glow that might connect objects
            _, thresh = cv2.threshold(alpha_channel, 15, 255, cv2.THRESH_BINARY)

            # Perform morphological opening to remove small noise and separate weakly connected objects
            kernel = np.ones((5, 5), np.uint8)
            thresh = cv2.morphologyEx(thresh, cv2.MORPH_OPEN, kernel, iterations=2)

            # Find contours
            contours, _ = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

            if contours:
                # Find the contour with the largest area
                largest_contour = max(contours, key=cv2.contourArea)

                # Create a blank mask for the largest contour
                mask = np.zeros_like(alpha_channel)

                # Draw the largest contour on the mask with 255 (white) and filled
                cv2.drawContours(mask, [largest_contour], -1, 255, thickness=cv2.FILLED)

                # Dilate the mask slightly to recover any valid edges lost during erosion/opening
                # but keep it constrained to the main shape
                mask = cv2.dilate(mask, kernel, iterations=1)
                
                # Apply the mask to the alpha channel:
                # We need to be careful not to introduce a hard jaggy edge if possible,
                # but for "removing stuff" a hard mask is safer. 
                # To be improved: smooth edge blending. For now, strict masking.
                new_alpha = cv2.bitwise_and(alpha_channel, mask)

                # Update the alpha channel of the image
                img[:, :, 3] = new_alpha
                
                # Bounding box of the cleaning mask
                x, y, w, h = cv2.boundingRect(mask) # Use mask bounding box
                cropped_img = img[y:y+h, x:x+w]

                # Save the cleaned image
                cv2.imwrite(output_path, cropped_img)
                print(f"Processed and cleaned: {filename}")
            else:
                print(f"No contours found in {filename} after filtering, skipping.")

if __name__ == "__main__":
    # Define directories
    # Assuming the script is run from the project root
    INPUT_DIR = os.path.join('assets', 'textures')
    OUTPUT_DIR = os.path.join('assets', 'textures_cleaned')
    
    print(f"Processing images from {INPUT_DIR} to {OUTPUT_DIR}...")
    clean_textures(INPUT_DIR, OUTPUT_DIR)
    print("Done!")
