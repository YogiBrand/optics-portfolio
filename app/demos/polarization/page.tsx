'use client'
import { useEffect, useRef, useState } from 'react'

function drawMap(cvs: HTMLCanvasElement, thetaDeg: number, cross?: boolean){
  // Responsive canvas size based on container
  const containerWidth = cvs.parentElement?.clientWidth || 420
  const size = Math.min(420, containerWidth - 32) // 32px padding
  const w = size, h = size
  cvs.width = w; cvs.height = h
  cvs.style.width = '100%'
  cvs.style.height = 'auto'
  const ctx = cvs.getContext('2d')!
  const img = ctx.createImageData(w, h)
  const cx=w/2, cy=h/2
  const theta = thetaDeg*Math.PI/180

  for(let y=0;y<h;y++){
    for(let x=0;x<w;x++){
      const dx = x-cx, dy=y-cy
      const xi = Math.atan2(dy, dx) // ξ
      let val = 0
      if(cross) {
        // Eq. 2.3.36: I ∝ sin^2 ξ * sin^2 (ξ - θ)
        val = Math.pow(Math.sin(xi), 2) * Math.pow(Math.sin(xi-theta),2)
      } else {
        // Eq. 2.3.27: I ∝ sin^2 (ξ + θ0)
        val = Math.pow(Math.sin(xi + theta), 2)
      }
      const c = Math.floor(255*val)
      const idx = (y*w + x)*4
      img.data[idx] = c; img.data[idx+1]=c; img.data[idx+2]=c; img.data[idx+3]=255
    }
  }
  ctx.putImageData(img, 0, 0)
}

export default function Polarization(){
  const [theta, setTheta] = useState(0)
  const [cross, setCross] = useState(false)
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(()=>{ if(ref.current) drawMap(ref.current, theta, cross) }, [theta, cross])

  return (
    <div className="space-y-12">
      <header className="space-y-6">
        <div className="inline-block">
          <div className="accent-line mb-4"></div>
        </div>
        <h1 className="h1">Polarization Explorer</h1>
        <p className="lead max-w-3xl">
          Interactive visualization of polarization-dependent coupling patterns derived from thesis equations. 
          Toggle between single-polarizer coupling (<em>I ∝ sin²(ξ+θ)</em>) and crossed-polarizer 
          SPR transmission (<em>I ∝ sin²ξ · sin²(ξ−θ)</em>) to see how angular orientation affects intensity.
        </p>
        <a href="/thesis" className="btn-outline">
          View Theoretical Framework
        </a>
      </header>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Control Panel */}
        <div className="lg:col-span-1 space-y-6">
          <div className="card-yellow space-y-4">
            <div>
              <p className="section-heading">PARAMETERS</p>
              <h3 className="h4 text-highlight">Polarization Angle</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-ink">θ (degrees)</label>
                <span className="mono text-highlight font-bold text-2xl">{theta.toFixed(0)}°</span>
              </div>
              <input type="range" min="0" max="180" value={theta} onChange={e=>setTheta(parseFloat(e.target.value))} className="w-full" />
              <p className="text-xs text-ink/60">
                Adjust linear polarizer orientation relative to grating vector
              </p>
            </div>
          </div>

          <div className="card space-y-4">
            <div>
              <p className="section-heading">MODE</p>
              <h3 className="h4 mb-3">Equation Selection</h3>
            </div>
            <label className="flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/5" 
                   style={{borderColor: !cross ? '#134686' : '#E5E7EB'}}>
              <input 
                type="radio" 
                checked={!cross} 
                onChange={()=>setCross(false)} 
                className="mt-1"
              />
              <div>
                <p className="font-semibold text-ink">Single Polarizer</p>
                <p className="text-xs text-ink/60 mt-1">Eq. 2.3.27: I ∝ sin²(ξ + θ)</p>
              </div>
            </label>
            <label className="flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all hover:border-accent/50 hover:bg-accent/5" 
                   style={{borderColor: cross ? '#ED3F27' : '#E5E7EB'}}>
              <input 
                type="radio" 
                checked={cross} 
                onChange={()=>setCross(true)} 
                className="mt-1"
              />
              <div>
                <p className="font-semibold text-ink">Crossed Polarizers</p>
                <p className="text-xs text-ink/60 mt-1">Eq. 2.3.36: I ∝ sin²ξ · sin²(ξ − θ)</p>
              </div>
            </label>
          </div>

          <div className={`card border-l-4 ${cross ? 'border-accent bg-accent/5' : 'border-primary bg-primary/5'}`}>
            <h4 className="font-bold mb-2" style={{color: cross ? '#ED3F27' : '#134686'}}>
              Current Equation
            </h4>
            <div className="bg-white rounded-lg p-4">
              <p className="text-lg font-mono text-ink text-center">
                {cross ? 'I ∝ sin²ξ · sin²(ξ − θ)' : 'I ∝ sin²(ξ + θ)'}
              </p>
            </div>
            <p className="text-xs text-ink/60 mt-3">
              {cross 
                ? 'Transmission through crossed polarizers at SPR, showing characteristic four-lobe pattern'
                : 'Direct polarization coupling to circular gratings, showing two-lobe pattern'}
            </p>
          </div>
        </div>

        {/* Visualization */}
        <div className="lg:col-span-2 card space-y-4">
          <div>
            <p className="section-heading">VISUALIZATION</p>
            <h3 className="h3">Intensity Map</h3>
          </div>
          <div className="flex justify-center w-full overflow-hidden">
            <canvas ref={ref} className="rounded-2xl border-2 shadow-lift max-w-full" 
                    style={{borderColor: cross ? '#ED3F27' : '#134686', maxWidth: '100%'}} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/50 rounded-lg p-4 text-center">
              <p className="text-xs font-semibold text-ink/60 mb-1">Pattern Type</p>
              <p className="font-bold text-ink">
                {cross ? 'Four-Lobe' : 'Two-Lobe'}
              </p>
            </div>
            <div className="bg-white/50 rounded-lg p-4 text-center">
              <p className="text-xs font-semibold text-ink/60 mb-1">Angular Period</p>
              <p className="font-bold text-ink">
                {cross ? '90°' : '180°'}
              </p>
            </div>
          </div>
          <p className="text-xs text-ink/60">
            <strong>Interpretation:</strong> Brighter regions indicate higher transmission/coupling efficiency. 
            The pattern rotates as θ changes, demonstrating polarization-dependent behavior critical for SPR characterization.
          </p>
        </div>
      </div>

      {/* Theory Section */}
      <section className="card bg-gradient-to-br from-primary/5 to-highlight/5">
        <p className="section-heading">THEORETICAL BACKGROUND</p>
        <h3 className="h3 mb-6">Equations from Thesis</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 border-l-4 border-primary">
            <h4 className="font-bold text-primary mb-3">Equation 2.3.27: Single Polarizer</h4>
            <p className="text-lg font-mono text-ink mb-4">I ∝ sin²(ξ + θ₀)</p>
            <p className="text-sm text-ink/70 leading-relaxed">
              Describes the intensity distribution when linearly polarized light couples to 
              circular gratings. The azimuthal angle <em>ξ</em> and polarizer angle <em>θ₀</em> 
              determine the coupling efficiency at each point.
            </p>
          </div>
          <div className="bg-white rounded-xl p-6 border-l-4 border-accent">
            <h4 className="font-bold text-accent mb-3">Equation 2.3.36: Crossed Polarizers</h4>
            <p className="text-lg font-mono text-ink mb-4">I ∝ sin²ξ · sin²(ξ − θ)</p>
            <p className="text-sm text-ink/70 leading-relaxed">
              Transmission through crossed polarizers at SPR conditions shows a characteristic 
              four-lobe pattern. This configuration enhances visibility of polarization-dependent 
              effects and is useful for alignment verification.
            </p>
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="card-yellow">
        <p className="section-heading">APPLICATIONS</p>
        <h3 className="h3 mb-6 text-highlight">Practical Use Cases</h3>
        <div className="grid md:grid-cols-3 gap-6 body">
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-highlight/20 flex items-center justify-center text-highlight mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h4 className="font-bold text-ink">Alignment Verification</h4>
            <p>
              Compare experimental imaging with theoretical patterns to verify 
              optical setup alignment and grating orientation
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-highlight/20 flex items-center justify-center text-highlight mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h4 className="font-bold text-ink">SPR Optimization</h4>
            <p>
              Predict optimal polarization angles for maximum coupling efficiency 
              in different grating configurations
            </p>
          </div>
          <div className="space-y-2">
            <div className="w-12 h-12 rounded-full bg-highlight/20 flex items-center justify-center text-highlight mb-3">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h4 className="font-bold text-ink">Teaching Tool</h4>
            <p>
              Interactive demonstration of polarization optics principles 
              for education and training purposes
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary rounded-3xl p-8 md:p-12 text-white text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Explore More Research Tools</h3>
          <p className="text-xl text-white/90 leading-relaxed">
            See how theory translates to practical applications in other interactive demos
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="/case-studies/ai-spr" className="btn bg-white text-primary hover:bg-cream">
              AI-SPR Designer
            </a>
            <a href="/case-studies/afm-vision" className="btn bg-white text-primary hover:bg-cream">
              AFM Analyzer
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
