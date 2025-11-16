'use client'
import { useEffect, useRef, useState } from 'react'
import FFT from 'fft.js'

function toGray(data: Uint8ClampedArray) {
  const out = new Float32Array(data.length/4)
  for(let i=0, j=0; i<data.length; i+=4, j++){
    const r = data[i], g = data[i+1], b = data[i+2]
    out[j] = 0.299*r + 0.587*g + 0.114*b
  }
  return out
}

function estimatePitchPx(gray: Float32Array, w: number, h: number) {
  // Average 1D FFT across rows to find dominant spatial frequency
  const N = 1<<Math.floor(Math.log2(w))
  const f = new FFT(N)
  const mag = new Float32Array(N/2)
  let rows = Math.min(h, 256)
  let step = Math.floor(h/rows)

  for(let r=0; r<h; r+=step){
    const row = new Float32Array(N)
    for(let c=0;c<N;c++){
      row[c] = gray[r*w + c] - 128
    }
    // Convert real input to interleaved complex array
    const inputComplex = f.toComplexArray(row, undefined)
    // Create output complex array
    const outputComplex = f.createComplexArray()
    // Perform FFT transform
    f.transform(outputComplex, inputComplex)
    // Extract magnitude from interleaved complex output
    for(let k=1;k<N/2;k++){ // skip DC
      const re = outputComplex[k*2]
      const im = outputComplex[k*2+1]
      const m = Math.hypot(re, im)
      mag[k] += m
    }
  }
  let kmax = 1, vmax = -1
  for(let k=1;k<N/2;k++){
    if(mag[k] > vmax){ vmax = mag[k]; kmax = k }
  }
  const freq = kmax / N            // cycles per pixel
  const pitchPx = 1.0 / freq       // pixels per cycle
  return pitchPx
}

export default function AFMVision(){
  const [imgURL, setImgURL] = useState<string>('')
  const [scale, setScale] = useState(10) // nm per pixel
  const [pitch, setPitch] = useState<number|null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  function onFile(e: React.ChangeEvent<HTMLInputElement>){
    const f = e.target.files?.[0]
    if(!f) return
    const url = URL.createObjectURL(f)
    setImgURL(url)
  }

  useEffect(()=>{
    if(!imgURL) return
    const img = new Image()
    img.src = imgURL
    img.onload = ()=>{
      const cvs = canvasRef.current!
      const ctx = cvs.getContext('2d')!
      cvs.width = img.width
      cvs.height = img.height
      ctx.drawImage(img, 0, 0)
      const id = ctx.getImageData(0,0,cvs.width, cvs.height)
      const g = toGray(id.data)
      const ppx = estimatePitchPx(g, cvs.width, cvs.height)
      setPitch(ppx*scale)
      // simple defect map: threshold on deviation from local mean
      const out = ctx.createImageData(cvs.width, cvs.height)
      const win = 9
      for(let y=0;y<cvs.height;y++){
        for(let x=0;x<cvs.width;x++){
          let sum=0, count=0
          for(let dy=-win;dy<=win;dy++){
            for(let dx=-win;dx<=win;dx++){
              const xx = Math.min(cvs.width-1, Math.max(0, x+dx))
              const yy = Math.min(cvs.height-1, Math.max(0, y+dy))
              sum += g[yy*cvs.width+xx]; count++
            }
          }
          const local = sum/count
          const idx = (y*cvs.width+x)*4
          const val = Math.abs(g[y*cvs.width+x]-local)
          const v = val>25 ? 255 : 0
          out.data[idx] = v; out.data[idx+1] = 0; out.data[idx+2] = 0; out.data[idx+3] = 255
        }
      }
      ctx.putImageData(id,0,0)
      ctx.globalAlpha = 0.35
      ctx.putImageData(out,0,0)
      ctx.globalAlpha = 1.0
    }
  }, [imgURL, scale])

  return (
    <div className="space-y-12">
      <header className="space-y-6">
        <div className="inline-block">
          <div className="accent-line mb-4"></div>
        </div>
        <h1 className="h1">AFM-Vision Quality Assurance</h1>
        <p className="lead max-w-3xl">
          Automated analysis tool for AFM microscopy images. Upload grating topography data 
          to estimate pitch via FFT analysis and identify potential surface defects through 
          local contrast detection.
        </p>
        <a href="/thesis" className="btn-outline">
          View Research Context
        </a>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Control Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-red space-y-4">
            <div>
              <p className="section-heading">UPLOAD</p>
              <h3 className="h4 text-accent mb-4">AFM Image</h3>
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="w-full" />
            <p className="text-xs text-ink/60">
              Supported: PNG, JPEG, BMP. Works best with grayscale topography images.
            </p>
          </div>

          <div className="card space-y-4">
            <div>
              <p className="section-heading">CALIBRATION</p>
              <h3 className="h4 mb-2">Scale Factor</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-ink">nm per pixel</label>
                <span className="mono text-accent font-bold text-lg">{scale.toFixed(1)}</span>
              </div>
              <input type="range" min="1" max="50" step="0.5" value={scale} onChange={e=>setScale(parseFloat(e.target.value))}/>
              <p className="text-xs text-ink/60">
                Adjust based on AFM scan parameters (typical: 5–20 nm/px)
              </p>
            </div>
          </div>

          <div className="card-red bg-gradient-to-br from-accent/10 to-accent/5 border-l-4 border-accent">
            <h4 className="font-bold text-accent mb-3">Analysis Results</h4>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-ink/60 mb-1">Estimated Grating Pitch</p>
                <p className="mono text-2xl font-bold text-accent">
                  {pitch ? pitch.toFixed(1)+' nm' : '–'}
                </p>
              </div>
              {pitch && (
                <div className="pt-3 border-t border-accent/20">
                  <p className="text-xs text-ink/60 mb-1">Theoretical Comparison</p>
                  <p className="text-sm text-ink/80">
                    Target pitches: 623, 668, 717 nm
                  </p>
                  {[623, 668, 717].map(target => (
                    <p key={target} className="text-xs text-ink/60">
                      {target} nm: <strong>{Math.abs(pitch - target).toFixed(1)} nm</strong> deviation
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2 card space-y-4">
          <div>
            <p className="section-heading">VISUALIZATION</p>
            <h3 className="h3">Image Analysis</h3>
          </div>
          {!imgURL ? (
            <div className="aspect-[4/3] bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl border-2 border-dashed border-accent/30 flex items-center justify-center">
              <div className="text-center space-y-4 p-8">
                <svg className="w-20 h-20 mx-auto text-accent/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                <div>
                  <p className="font-semibold text-ink mb-1">No image loaded</p>
                  <p className="text-sm text-ink/60">Upload an AFM image to begin analysis</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <canvas ref={canvasRef} className="w-full max-w-full rounded-xl border-2 border-accent/20 shadow-soft" style={{maxWidth: '100%', height: 'auto'}} />
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-primary/5 rounded-lg p-3 border-l-4 border-primary">
                  <p className="text-xs font-semibold text-primary mb-1">FFT Analysis</p>
                  <p className="text-xs text-ink/70">Spatial frequency peak detection identifies dominant grating period</p>
                </div>
                <div className="bg-accent/5 rounded-lg p-3 border-l-4 border-accent">
                  <p className="text-xs font-semibold text-accent mb-1">Defect Overlay</p>
                  <p className="text-xs text-ink/70">Red regions indicate local contrast anomalies (potential defects)</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Methodology */}
      <section className="card bg-gradient-to-br from-primary/5 to-highlight/5">
        <p className="section-heading">METHODOLOGY</p>
        <h3 className="h3 mb-6">How It Works</h3>
        <div className="grid md:grid-cols-2 gap-8 body">
          <div className="space-y-3">
            <h4 className="font-bold text-primary">FFT-Based Pitch Estimation</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">1.</span>
                <span>Convert AFM image to grayscale intensity map</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">2.</span>
                <span>Apply Fast Fourier Transform to detect spatial frequencies</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">3.</span>
                <span>Identify dominant frequency peak corresponding to grating period</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">4.</span>
                <span>Scale pixel measurement to nanometers using calibration factor</span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-accent">Defect Detection Heuristic</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Local contrast analysis with sliding window (9×9 pixels)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Flag regions with high deviation from local mean intensity</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Red overlay highlights potential defects: dust, scratches, center deformation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span><strong>Production upgrade:</strong> Replace with trained CNN or YOLO detector</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="card-red">
        <p className="section-heading">APPLICATIONS</p>
        <h3 className="h3 mb-6 text-accent">Quality Control Use Cases</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="h4 text-accent">Fabrication QA</h4>
            <p className="body">
              Rapid post-fabrication verification that inscribed pitch matches design specifications
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="h4 text-accent">Failure Analysis</h4>
            <p className="body">
              Identify systematic defects (e.g., center mountain feature) for process correction
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="h4 text-accent">Batch Testing</h4>
            <p className="body">
              Automated screening of multiple samples for consistent grating properties
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary rounded-3xl p-8 md:p-12 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Explore More Tools</h3>
          <p className="text-xl text-white/90 leading-relaxed">
            See other interactive demonstrations from this photonics research
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="/case-studies/ai-spr" className="btn bg-white text-primary hover:bg-cream">
              AI-SPR Designer
            </a>
            <a href="/demos/polarization" className="btn bg-white text-primary hover:bg-cream">
              Polarization Explorer
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
