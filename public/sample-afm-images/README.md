# Sample AFM Images for Testing

This folder contains sample AFM images for testing the AFM-Vision QA tool.

## Sample Images

### 1. Circular Grating - 668nm pitch
- **File**: `circular-grating-668nm.png`
- **Description**: Simulated circular grating with 668nm pitch
- **Expected pitch**: ~668 nm (at 10 nm/pixel scale)
- **Features**: Concentric circular pattern with slight center deformation

### 2. Circular Grating - 623nm pitch  
- **File**: `circular-grating-623nm.png`
- **Description**: Simulated circular grating with 623nm pitch
- **Expected pitch**: ~623 nm
- **Features**: Tighter circular pattern

### 3. Circular Grating - 717nm pitch
- **File**: `circular-grating-717nm.png`
- **Description**: Simulated circular grating with 717nm pitch
- **Expected pitch**: ~717 nm
- **Features**: Wider spacing with visible surface defects

## How to Get Real AFM Images

### Free Resources:
1. **AFMWorkshop** - https://www.afmworkshop.com/applications/atomic-force-microscopy-images/thin-films
2. **Asylum Research Gallery** - https://afm.oxinst.com/gallery/
3. **Bruker BioAFM** - https://www.bruker.com (search for AFM galleries)

### What to Look For:
- Periodic structures (gratings, arrays)
- Surface topography images
- Grayscale images work best
- Square/circular scan areas
- Files should be PNG, JPG, or TIFF format

### Creating Your Own Test Images:
You can create test patterns using:
- GIMP (free image editor)
- Python with PIL/numpy (generate programmatically)
- Any graphics software with concentric circle tools

## Using the Images

1. Navigate to the AFM-Vision page
2. Upload any image file
3. Adjust the "nm per pixel" scale based on the image metadata
4. The tool will automatically:
   - Detect the dominant spatial frequency (pitch)
   - Overlay potential defects in red
   - Display the estimated grating period

## Note
The synthetic images provided here are for demonstration purposes only. For publication or research, use actual AFM scan data from your measurements.

