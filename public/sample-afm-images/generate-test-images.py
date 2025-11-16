"""
Generate synthetic AFM-like images for testing the AFM-Vision tool
These simulate circular surface relief gratings with realistic features
"""

import numpy as np
from PIL import Image
import os

def generate_circular_grating(size=512, pitch_pixels=68, noise_level=10, center_defect=True):
    """
    Generate a synthetic circular grating AFM image
    
    Args:
        size: Image size in pixels (square)
        pitch_pixels: Grating pitch in pixels
        noise_level: Amount of random noise (0-255)
        center_defect: Add center "mountain" defect
    """
    # Create coordinate grids
    x = np.linspace(-size/2, size/2, size)
    y = np.linspace(-size/2, size/2, size)
    X, Y = np.meshgrid(x, y)
    
    # Calculate radial distance from center
    R = np.sqrt(X**2 + Y**2)
    
    # Create circular grating pattern using sine wave
    grating = 128 + 50 * np.sin(2 * np.pi * R / pitch_pixels)
    
    # Add some Gaussian noise for realism
    noise = np.random.normal(0, noise_level, (size, size))
    grating += noise
    
    # Add center defect (mountain feature)
    if center_defect:
        center_mask = np.exp(-R**2 / (30**2))
        grating += center_mask * 40
    
    # Add some random surface defects
    for _ in range(5):
        defect_x = np.random.randint(size//4, 3*size//4)
        defect_y = np.random.randint(size//4, 3*size//4)
        defect_size = np.random.randint(10, 30)
        defect_mask = np.exp(-((X - (defect_x - size/2))**2 + (Y - (defect_y - size/2))**2) / (defect_size**2))
        grating += defect_mask * np.random.randint(-30, 30)
    
    # Clip to valid range and convert to uint8
    grating = np.clip(grating, 0, 255).astype(np.uint8)
    
    return grating

def main():
    """Generate sample AFM images with different pitches"""
    
    # Create output directory if it doesn't exist
    output_dir = os.path.dirname(os.path.abspath(__file__))
    
    print("Generating synthetic AFM images...")
    
    # Parameters for different grating pitches
    # Assuming 10 nm/pixel scale factor
    samples = [
        {
            'name': 'circular-grating-623nm.png',
            'pitch_pixels': 62,  # 623nm / 10nm per pixel
            'description': '623nm pitch grating'
        },
        {
            'name': 'circular-grating-668nm.png',
            'pitch_pixels': 67,  # 668nm / 10nm per pixel
            'description': '668nm pitch grating (with center defect)'
        },
        {
            'name': 'circular-grating-717nm.png',
            'pitch_pixels': 72,  # 717nm / 10nm per pixel
            'description': '717nm pitch grating'
        },
    ]
    
    for sample in samples:
        print(f"Creating {sample['description']}...")
        
        # Generate the image
        img_array = generate_circular_grating(
            size=512,
            pitch_pixels=sample['pitch_pixels'],
            noise_level=8,
            center_defect=True
        )
        
        # Convert to PIL Image and save
        img = Image.fromarray(img_array, mode='L')
        output_path = os.path.join(output_dir, sample['name'])
        img.save(output_path)
        print(f"  Saved: {sample['name']}")
    
    print("\nDone! Generated 3 test images.")
    print("\nTo use these images:")
    print("1. Go to /case-studies/afm-vision on the portfolio")
    print("2. Upload any of the generated PNG files")
    print("3. Set scale to 10 nm/pixel")
    print("4. The tool should detect the pitch close to the expected values")

if __name__ == "__main__":
    main()


