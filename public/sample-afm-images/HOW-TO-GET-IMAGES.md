# How to Get AFM Images for the Portfolio

## Option 1: Use Free Online AFM Image Galleries (RECOMMENDED)

### 1. AFMWorkshop Gallery
**Website**: https://www.afmworkshop.com/applications/atomic-force-microscopy-images/

**Best images for your tool:**
- Thin Films section - periodic structures
- Nanostructures - array patterns
- Look for grayscale topography images

**How to download:**
1. Visit the gallery page
2. Right-click on any AFM image
3. Save as PNG or JPG
4. Use these directly in the AFM-Vision tool

### 2. Asylum Research (Oxford Instruments)
**Website**: https://afm.oxinst.com/gallery/

**Categories to explore:**
- Semiconductors & Microelectronics
- Materials Science
- Thin Films

**Benefits:**
- High-quality professional images
- Real AFM data
- Free to use for educational purposes

### 3. Bruker AFM Gallery
**Website**: https://www.bruker.com (search for "AFM image gallery")

**Features:**
- Diverse material samples
- Well-documented scan parameters
- High resolution

## Option 2: Generate Synthetic Test Images

If you want to create test images programmatically:

### Requirements:
```bash
pip install Pillow numpy
```

### Then run:
```bash
cd public/sample-afm-images
python3 generate-test-images.py
```

This will create 3 test images simulating circular gratings at 623nm, 668nm, and 717nm pitches.

## Option 3: Quick Test with Online Image Generators

### Create Concentric Circle Patterns:
Use any graphics editor to create test patterns:

1. **GIMP** (Free):
   - Create new image (512x512px)
   - Filters → Render → Gforge → Circle
   - Add some noise: Filters → Noise → RGB Noise
   - Save as grayscale PNG

2. **Online Tools**:
   - https://www.photopea.com (Photoshop-like web app)
   - Create concentric circles with gradient
   - Export as grayscale

## Option 4: Use Actual Research Data

If you have access to actual AFM scans from the thesis:
- Export as PNG/JPG from AFM software
- Grayscale topography maps work best
- Typical dimensions: 5-50 micrometers
- Resolution: 256x256 to 1024x1024 pixels

## What Makes a Good Test Image:

✅ **Good:**
- Grayscale images
- Clear periodic structures
- Visible contrast
- Square dimensions (256x256 to 1024x1024)
- PNG or JPG format

❌ **Avoid:**
- Color images (convert to grayscale first)
- Very low resolution (<200x200)
- Images with text overlays
- Highly compressed/artifacted images

## Testing Your Images:

1. Upload to `/case-studies/afm-vision`
2. Adjust scale slider (typical: 5-20 nm/pixel)
3. Tool should detect:
   - Dominant frequency (pitch)
   - Surface defects (red overlay)
4. Compare estimated pitch to known values

## Example Scale Factors:

| Scan Size | Image Size | nm/pixel |
|-----------|------------|----------|
| 5 µm      | 512px      | ~10 nm   |
| 10 µm     | 1024px     | ~10 nm   |
| 2.5 µm    | 256px      | ~10 nm   |

## Quick Links:

- **AFMWorkshop**: https://www.afmworkshop.com/applications/atomic-force-microscopy-images/thin-films
- **Asylum Research**: https://afm.oxinst.com/gallery/
- **NanoScience Instruments**: https://www.nanoscience.com/applications/
- **Park Systems**: https://www.parksystems.com/en/learning-center

## Need Help?

If the Python script doesn't work:
```bash
# Install dependencies
pip3 install Pillow numpy

# Run the generator
python3 generate-test-images.py
```

Or simply download real AFM images from the galleries above - they'll work perfectly with the tool!

