'use client'
import { useEffect, useRef, useState, useMemo } from 'react'
import { createPortal } from 'react-dom'

// Helper function to draw polarization pattern
function drawPolarizationMiniMap(cvs: HTMLCanvasElement, thetaDeg: number, cross: boolean) {
  const containerWidth = cvs.parentElement?.clientWidth || 200
  const size = Math.min(200, containerWidth - 32)
  const w = size, h = size
  cvs.width = w; cvs.height = h
  cvs.style.width = '100%'
  cvs.style.height = 'auto'
  const ctx = cvs.getContext('2d')!
  const img = ctx.createImageData(w, h)
  const cx = w/2, cy = h/2
  const theta = thetaDeg * Math.PI/180

  for(let y=0; y<h; y++){
    for(let x=0; x<w; x++){
      const dx = x-cx, dy = y-cy
      const xi = Math.atan2(dy, dx)
      let val = 0
      if(cross) {
        val = Math.pow(Math.sin(xi), 2) * Math.pow(Math.sin(xi-theta), 2)
      } else {
        val = Math.pow(Math.sin(xi + theta), 2)
      }
      const c = Math.floor(255*val)
      const idx = (y*w + x)*4
      img.data[idx] = c; img.data[idx+1] = c; img.data[idx+2] = c; img.data[idx+3] = 255
    }
  }
  ctx.putImageData(img, 0, 0)
}

// Helper function to generate synthetic SPR spectrum
function generateSPRSpectrum(pitch: number, ambient: number) {
  const wavelengths = []
  const intensity = []
  
  // Simplified SPR calculation
  const epsilon = -12.8 // Au permittivity
  const sprWavelength = pitch * Math.sqrt(Math.abs(epsilon) / (ambient * ambient + Math.abs(epsilon)))
  const width = 15 + (pitch - 600) * 0.03
  
  for(let wl = 450; wl <= 900; wl += 2) {
    wavelengths.push(wl)
    // Lorentzian peak
    const amplitude = 0.8
    const trans = 0.3 + amplitude * (width * width) / ((wl - sprWavelength) * (wl - sprWavelength) + width * width)
    intensity.push(trans)
  }
  
  return { wavelengths, intensity, sprWavelength: sprWavelength.toFixed(1) }
}

// Interactive Figures Gallery Component
function FiguresGallery() {
  const [openModal, setOpenModal] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  // Client-side mount check
  useEffect(() => {
    setMounted(true)
  }, [])

  // Lock body scroll when modal is open
  useEffect(() => {
    if (openModal) {
      document.body.style.overflow = 'hidden'
      document.body.style.paddingRight = '0px' // Prevent layout shift
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
    return () => {
      document.body.style.overflow = 'unset'
      document.body.style.paddingRight = '0px'
    }
  }, [openModal])

  const figures = [
    {
      id: 'setup',
      title: 'Experimental Setup',
      subtitle: 'Transmission Spectroscopy Configuration',
      color: 'primary',
      bgGradient: 'from-primary/5 to-sky/20',
      borderColor: 'border-primary/20',
      hoverBorder: 'hover:border-primary',
      description: 'Schematic of transmission spectroscopy configuration with polarization control',
      svg: (
        <svg viewBox="0 0 200 150" className="w-full h-full">
          <circle cx="20" cy="75" r="8" fill="#ED3F27" />
          <text x="20" y="95" fontSize="8" fill="#134686" textAnchor="middle">Laser</text>
          <line x1="28" y1="75" x2="80" y2="75" stroke="#ED3F27" strokeWidth="2" />
          <rect x="80" y="65" width="8" height="20" fill="#134686" />
          <text x="84" y="95" fontSize="7" fill="#134686" textAnchor="middle">LP</text>
          <line x1="88" y1="75" x2="120" y2="75" stroke="#ED3F27" strokeWidth="2" strokeDasharray="3,2" />
          <circle cx="130" cy="75" r="12" fill="none" stroke="#FEB21A" strokeWidth="2" />
          <circle cx="130" cy="75" r="8" fill="none" stroke="#FEB21A" strokeWidth="1" />
          <circle cx="130" cy="75" r="4" fill="none" stroke="#FEB21A" strokeWidth="1" />
          <text x="130" y="95" fontSize="7" fill="#134686" textAnchor="middle">Grating</text>
          <line x1="142" y1="75" x2="170" y2="75" stroke="#134686" strokeWidth="2" />
          <rect x="170" y="65" width="15" height="20" fill="#134686" />
          <text x="177" y="95" fontSize="7" fill="#134686" textAnchor="middle">Det.</text>
        </svg>
      ),
      details: {
        overview: 'The experimental setup uses a linearly polarized laser source directed through a circular surface relief grating (SRG) with gold coating to measure transmission spectra and study SPR coupling.',
        components: [
          { name: 'Laser Source', description: 'Tunable wavelength source (450-900 nm) for spectroscopy measurements' },
          { name: 'Linear Polarizer (LP)', description: 'Controls incident polarization angle θ relative to grating vector' },
          { name: 'Circular Grating', description: 'Azopolymer SRG with gold layer, pitch 623-717 nm' },
          { name: 'Detector', description: 'Measures transmitted intensity for spectroscopy analysis' }
        ],
        keyFindings: [
          'Polarization-dependent coupling confirmed through angular scans',
          'Transmission amplification observed at SPR wavelengths',
          'Four-lobe pattern in crossed-polarizer configuration'
        ]
      }
    },
    {
      id: 'spectra',
      title: 'SPR Transmission Spectra',
      subtitle: 'Amplification at Resonance',
      color: 'accent',
      bgGradient: 'from-accent/5 to-accent/10',
      borderColor: 'border-accent/20',
      hoverBorder: 'hover:border-accent',
      description: 'Measured amplification at resonance for three different grating pitches',
      svg: (
        <svg viewBox="0 0 200 150" className="w-full h-full p-4">
          <line x1="20" y1="120" x2="180" y2="120" stroke="#1a1a1a" strokeWidth="1.5" />
          <line x1="20" y1="20" x2="20" y2="120" stroke="#1a1a1a" strokeWidth="1.5" />
          <line x1="20" y1="70" x2="180" y2="70" stroke="#e5e7eb" strokeWidth="0.5" />
          <path d="M 20,100 Q 60,95 80,70 T 100,100" fill="none" stroke="#134686" strokeWidth="2" />
          <path d="M 20,105 Q 80,100 105,65 T 130,105" fill="none" stroke="#ED3F27" strokeWidth="2" />
          <path d="M 20,110 Q 100,105 130,60 T 160,110" fill="none" stroke="#FEB21A" strokeWidth="2" />
          <text x="100" y="140" fontSize="10" fill="#666" textAnchor="middle">Wavelength (nm)</text>
          <text x="10" y="70" fontSize="10" fill="#666" textAnchor="middle" transform="rotate(-90, 10, 70)">T (%)</text>
          <circle cx="140" cy="30" r="2" fill="#134686" />
          <text x="145" y="32" fontSize="7" fill="#134686">623nm</text>
          <circle cx="140" cy="40" r="2" fill="#ED3F27" />
          <text x="145" y="42" fontSize="7" fill="#ED3F27">668nm</text>
          <circle cx="140" cy="50" r="2" fill="#FEB21A" />
          <text x="145" y="52" fontSize="7" fill="#FEB21A">717nm</text>
        </svg>
      ),
      details: {
        overview: 'Transmission spectroscopy measurements reveal distinct SPR peaks for each grating pitch, with amplification factors ranging from 1.8× to 4.2× at resonance wavelengths.',
        components: [
          { name: 'Pitch 623 nm', description: 'SPR at ~650 nm, amplification factor 1.8×' },
          { name: 'Pitch 668 nm', description: 'SPR at ~695 nm, amplification factor 3.2×' },
          { name: 'Pitch 717 nm', description: 'SPR at ~745 nm, amplification factor 4.2×' }
        ],
        keyFindings: [
          'Larger pitch shifts SPR to longer wavelengths as predicted by theory',
          'Peak amplification increases with pitch (1.8× → 4.2×)',
          'Spectral width varies with groove depth and metal quality',
          'Measurements match planar approximation λ_SPR = Λ·√(|ε|/(n²+|ε|))'
        ]
      }
    },
    {
      id: 'afm',
      title: 'AFM Surface Map',
      subtitle: 'Topography Characterization',
      color: 'highlight',
      bgGradient: 'from-highlight/5 to-highlight/15',
      borderColor: 'border-highlight/20',
      hoverBorder: 'hover:border-highlight',
      description: 'Circular grating topography showing center deformation feature',
      svg: (
        <svg viewBox="0 0 200 150" className="w-full h-full">
          <defs>
            <radialGradient id="afmGrad">
              <stop offset="0%" stopColor="#FEB21A" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#134686" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ED3F27" stopOpacity="0.1" />
            </radialGradient>
          </defs>
          {[15, 25, 35, 45, 55, 65, 75].map((r, i) => (
            <circle 
              key={r} 
              cx="100" 
              cy="75" 
              r={r} 
              fill="none" 
              stroke={i % 2 === 0 ? '#134686' : '#FEB21A'} 
              strokeWidth="2"
              opacity={0.6}
            />
          ))}
          <circle cx="100" cy="75" r="8" fill="#ED3F27" opacity="0.4" />
          <line x1="150" y1="130" x2="180" y2="130" stroke="#1a1a1a" strokeWidth="2" />
          <text x="165" y="142" fontSize="8" fill="#1a1a1a" textAnchor="middle">5 µm</text>
        </svg>
      ),
      details: {
        overview: 'AFM characterization reveals well-defined circular gratings with consistent pitch across the pattern, but identifies a systematic center deformation feature requiring fabrication optimization.',
        components: [
          { name: 'Circular Grooves', description: 'Concentric patterns with measured pitch matching design specifications' },
          { name: 'Groove Depth', description: 'Typical depth 50-80 nm, sufficient for SPR coupling' },
          { name: 'Center Feature', description: 'Elevated "mountain" defect from inscription geometry' },
          { name: 'Surface Quality', description: 'Smooth sidewalls with minimal defects outside center region' }
        ],
        keyFindings: [
          'Pitch accuracy within ±5% of target values',
          'Center deformation extends ~100 µm radius',
          'Corrective measures: adjust beam overlap and substrate alignment',
          'AFM-Vision tool developed for automated QA of future samples'
        ]
      }
    }
  ]

  return (
    <section className="card">
      <p className="section-heading">VISUAL DOCUMENTATION</p>
      <h3 className="h3 mb-4">Representative Figures</h3>
      <p className="body mb-6 text-ink/60">
        Click on any figure to explore detailed findings and technical specifications. 
        Full documentation available in the complete PDF.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {figures.map((figure) => (
          <button
            key={figure.id}
            onClick={() => setOpenModal(figure.id)}
            className={`bg-white rounded-xl border-2 ${figure.borderColor} ${figure.hoverBorder} p-4 transition-all duration-300 hover:shadow-lift hover:-translate-y-1 cursor-pointer text-left group`}
          >
            <div className={`aspect-[4/3] bg-gradient-to-br ${figure.bgGradient} rounded-lg mb-3 flex items-center justify-center relative overflow-hidden transition-all duration-300 group-hover:scale-105`}>
              {figure.svg}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
            <h4 className={`font-bold text-sm mb-1 ${
              figure.color === 'primary' ? 'text-primary' :
              figure.color === 'accent' ? 'text-accent' :
              'text-highlight'
            }`}>{figure.title}</h4>
            <p className="text-xs text-ink/60">{figure.description}</p>
            <p className="text-xs text-primary mt-2 font-semibold">Click to explore →</p>
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-primary/10">
        <a href="/thesis.pdf" download className="btn-outline">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          View Full Figures in Thesis PDF
        </a>
      </div>

      {/* Modal */}
      {mounted && openModal && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
          style={{animation: 'fadeIn 0.2s ease-out'}}
          onClick={() => setOpenModal(null)}
        >
          <div 
            className="bg-cream rounded-2xl sm:rounded-3xl max-w-4xl w-full max-h-[95vh] overflow-y-auto shadow-lift my-auto"
            style={{animation: 'fadeInUp 0.3s ease-out'}}
            onClick={(e) => e.stopPropagation()}
          >
            {figures.map((figure) => (
              openModal === figure.id && (
                <div key={figure.id}>
                  {/* Header */}
                  <div className={`bg-gradient-to-br ${figure.bgGradient} p-6 md:p-8 rounded-t-3xl relative`}>
                    <button
                      onClick={() => setOpenModal(null)}
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center text-ink/60 hover:text-ink transition-all z-10"
                      aria-label="Close modal"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                    
                    <div className="flex flex-col md:flex-row gap-6 items-start">
                      <div className="w-full md:w-1/3 bg-white rounded-xl p-4 shadow-soft">
                        {figure.svg}
                      </div>
                      <div className="flex-1">
                        <h3 className={`text-3xl md:text-4xl font-bold mb-2 ${
                          figure.color === 'primary' ? 'text-primary' :
                          figure.color === 'accent' ? 'text-accent' :
                          'text-highlight'
                        }`}>{figure.title}</h3>
                        <p className="text-lg md:text-xl font-semibold text-ink/80 mb-4">{figure.subtitle}</p>
                        <p className="text-base md:text-lg text-ink/70 leading-relaxed">{figure.details.overview}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-6 lg:p-8 space-y-6 md:space-y-8">
                    {/* Components */}
                    <div>
                      <h4 className="text-xl md:text-2xl font-semibold text-ink mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-primary flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                        <span>Key Components</span>
                      </h4>
                      <div className="grid md:grid-cols-2 gap-3 md:gap-4">
                        {figure.details.components.map((comp, idx) => (
                          <div key={idx} className="bg-white rounded-xl p-3 md:p-4 border-l-4 border-primary">
                            <h5 className="font-bold text-primary text-sm md:text-base mb-2">{comp.name}</h5>
                            <p className="text-xs md:text-sm text-ink/70 leading-relaxed">{comp.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Key Findings */}
                    <div>
                      <h4 className="text-xl md:text-2xl font-semibold text-ink mb-4 flex items-center gap-2">
                        <svg className="w-5 h-5 md:w-6 md:h-6 text-accent flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Key Findings</span>
                      </h4>
                      <ul className="space-y-3">
                        {figure.details.keyFindings.map((finding, idx) => (
                          <li key={idx} className="flex items-start gap-3 bg-white rounded-xl p-3 md:p-4">
                            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                              <span className="text-sm md:text-base font-bold">{idx + 1}</span>
                            </div>
                            <p className="text-sm md:text-base text-ink/80 leading-relaxed flex-1">{finding}</p>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3 md:gap-4 pt-4 border-t border-primary/10">
                      <a href="/thesis.pdf" download className="btn-primary text-sm md:text-base">
                        <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="hidden sm:inline">Download Full Thesis</span>
                        <span className="sm:hidden">Download</span>
                      </a>
                      {figure.id === 'setup' && (
                        <a href="#interactive-demo" onClick={() => setOpenModal(null)} className="btn-outline text-sm md:text-base">
                          <span className="hidden sm:inline">Interactive Demonstration</span>
                          <span className="sm:hidden">Demo</span>
                        </a>
                      )}
                      {figure.id === 'spectra' && (
                        <a href="/case-studies/ai-spr" className="btn-outline text-sm md:text-base">
                          <span className="hidden sm:inline">Explore AI-SPR Tool</span>
                          <span className="sm:hidden">AI-SPR</span>
                        </a>
                      )}
                      {figure.id === 'afm' && (
                        <a href="/case-studies/afm-vision" className="btn-outline text-sm md:text-base">
                          <span className="hidden sm:inline">Try AFM-Vision QA</span>
                          <span className="sm:hidden">AFM-Vision</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>,
        document.body
      )}
    </section>
  )
}

export default function ThesisPage(){
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <header className="space-y-6">
        <div className="inline-block">
          <div className="accent-line mb-4"></div>
        </div>
        <h1 className="h1">Circular Gratings & Polarization-Dependent SPR</h1>
        <p className="lead max-w-4xl">
          Master's thesis exploring interference lithography on azopolymer films to inscribe 
          large-aperture circular surface relief gratings (SRGs), with comprehensive characterization 
          of polarization-dependent surface plasmon resonance in transmission and reflection modes.
        </p>
        <div className="flex flex-wrap gap-4 pt-4">
          <a href="/thesis.pdf" download className="btn-primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Full Thesis (PDF)
          </a>
          <a href="#interactive-demo" className="btn-outline">
            Interactive Demonstration
          </a>
        </div>
      </header>

      {/* Overview */}
      <section className="card-blue">
        <p className="section-heading">OVERVIEW</p>
        <h2 className="h2 mb-6">Research Context</h2>
        <div className="space-y-4 body">
          <p>
            This research investigates the fabrication and optical characterization of circular 
            surface relief gratings (SRGs) for enhanced surface plasmon resonance (SPR) applications. 
            Using interference lithography on azopolymer films, large-aperture circular gratings 
            were successfully inscribed and characterized.
          </p>
          <p>
            The work establishes a complete theory-to-measurement pipeline for understanding 
            polarization-dependent coupling in circular grating geometries, with particular focus 
            on transmission amplification at SPR wavelengths and the relationship between 
            inscription parameters and resulting optical properties.
          </p>
        </div>
      </section>

      {/* Key Results */}
      <section className="space-y-6">
        <div className="text-center">
          <p className="section-heading">KEY FINDINGS</p>
          <h2 className="h2">Research Outcomes</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="card-blue">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="h4 mb-3 text-primary">Amplification Factors</h3>
            <p className="body">
              Measured transmission amplification factors of <strong>~1.8–4.2×</strong> at SPR 
              across different grating pitches (623, 668, 717 nm), demonstrating effective 
              coupling enhancement.
            </p>
          </div>

          <div className="card-red">
            <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="h4 mb-3 text-accent">Pattern Validation</h3>
            <p className="body">
              Cross-polarizer imaging results match theoretically derived intensity patterns 
              <em> I ∝ sin²ξ · sin²(ξ−θ)</em>, confirming polarization-dependent coupling models.
            </p>
          </div>

          <div className="card-yellow">
            <div className="w-14 h-14 rounded-full bg-highlight/10 flex items-center justify-center text-highlight mb-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="h4 mb-3 text-highlight">AFM Insights</h3>
            <p className="body">
              AFM characterization revealed a center "mountain" feature linked to inscription 
              geometry, identifying a key failure mode and suggesting corrective measures.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="card">
          <p className="section-heading">METHODOLOGY</p>
          <h3 className="h3 mb-4">Fabrication Process</h3>
          <ul className="space-y-3 body">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">1.</span>
              <span><strong>Interference Lithography:</strong> Two-beam interference setup 
              on azopolymer films to create circular SRG patterns with controlled pitch</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">2.</span>
              <span><strong>Gold Deposition:</strong> Thin metallic layer application 
              for SPR excitation at the grating interface</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold">3.</span>
              <span><strong>AFM Characterization:</strong> High-resolution topography 
              mapping to measure groove depth and pitch accuracy</span>
            </li>
          </ul>
        </div>

        <div className="card">
          <p className="section-heading">CHARACTERIZATION</p>
          <h3 className="h3 mb-4">Optical Measurements</h3>
          <ul className="space-y-3 body">
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">→</span>
              <span><strong>Spectroscopy:</strong> Transmission and reflection measurements 
              across visible/NIR spectrum to identify SPR wavelengths</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">→</span>
              <span><strong>Polarization Analysis:</strong> Jones calculus and Stokes parameter 
              measurements for angular-dependent coupling</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-accent font-bold">→</span>
              <span><strong>Imaging:</strong> Crossed-polarizer imaging to visualize 
              spatial intensity distributions matching theoretical predictions</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Interactive Polarization Demo */}
      <div id="interactive-demo">
        <InteractivePolarizationDemo />
      </div>

      {/* Interactive SPR Prediction */}
      <InteractiveSPRDemo />

      {/* Theoretical Framework */}
      <section className="card bg-gradient-to-br from-primary/5 to-highlight/5">
        <p className="section-heading">THEORETICAL FRAMEWORK</p>
        <h2 className="h2 mb-6">Key Equations & Models</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border-l-4 border-primary">
              <h4 className="font-bold text-primary mb-2">Single-Polarizer Coupling</h4>
              <p className="text-sm text-ink/70 mb-2">Equation 2.3.27</p>
              <p className="text-lg font-mono text-ink">I ∝ sin²(ξ + θ₀)</p>
              <p className="text-sm text-ink/60 mt-2">
                Intensity distribution for linear polarization coupling to circular gratings
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border-l-4 border-accent">
              <h4 className="font-bold text-accent mb-2">Crossed-Polarizer SPR</h4>
              <p className="text-sm text-ink/70 mb-2">Equation 2.3.36</p>
              <p className="text-lg font-mono text-ink">I ∝ sin²ξ · sin²(ξ − θ)</p>
              <p className="text-sm text-ink/60 mt-2">
                Transmission through crossed polarizers at SPR conditions
              </p>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-xl border-l-4 border-highlight">
              <h4 className="font-bold text-highlight mb-2">Planar Approximation</h4>
              <p className="text-sm text-ink/70 mb-2">Equation 2.3.18 (θᵢ = 0)</p>
              <p className="text-lg font-mono text-ink">λ<sub>SPR</sub> = Λ·√(ε/(n² + ε))</p>
              <p className="text-sm text-ink/60 mt-2">
                Simplified model for resonance wavelength prediction
              </p>
            </div>
            <p className="body text-ink/70">
              These equations form the foundation for the interactive polarization explorer 
              and AI-accelerated SPR prediction tools showcased in this portfolio.
            </p>
          </div>
        </div>
      </section>
      
      {/* Interactive Amplification Factors */}
      <InteractiveAmplificationDemo />

      {/* Industry Implications */}
      <section className="card-blue">
        <p className="section-heading">APPLICATIONS</p>
        <h2 className="h2 mb-6">Industry Relevance</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <h4 className="h4 text-primary">Quality Assurance</h4>
            <p className="body">
              Fast polarization-aware checks for SPR alignment verification and 
              manufacturing quality control
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="h4 text-primary">Inverse Design</h4>
            <p className="body">
              Clear pathway to AI-assisted design optimization, as demonstrated 
              in the AI-SPR surrogate model tool
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="h4 text-primary">Reproducible Pipelines</h4>
            <p className="body">
              Established fabricate → measure → model workflow applicable to 
              various photonic device development
            </p>
          </div>
        </div>
      </section>

      {/* Figures Gallery - Interactive */}
      <FiguresGallery />

      {/* CTA */}
      <section className="bg-primary rounded-3xl p-8 md:p-12 text-center text-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Explore the Interactive Tools</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            See the theory in action through interactive demos built from thesis equations 
            and experimental data.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="/demos/polarization" className="btn bg-white text-primary hover:bg-cream">
              Polarization Explorer
            </a>
            <a href="/case-studies/ai-spr" className="btn bg-white text-primary hover:bg-cream">
              AI-SPR Tool
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

// Interactive Polarization Demo Component
function InteractivePolarizationDemo() {
  const [theta, setTheta] = useState(45)
  const [cross, setCross] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      drawPolarizationMiniMap(canvasRef.current, theta, cross)
    }
  }, [theta, cross])

  return (
    <section className="card-yellow">
      <p className="section-heading">INTERACTIVE DEMONSTRATION</p>
      <h2 className="h2 mb-6 text-highlight">Live Polarization Patterns</h2>
      <p className="body mb-6">
        Experience the polarization-dependent coupling in real-time. Adjust the angle and toggle 
        between modes to see how the intensity patterns change—exactly as observed in the experimental setup.
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border-l-4 border-highlight">
            <h4 className="font-bold text-highlight mb-4">Controls</h4>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-ink">Polarizer Angle θ</label>
                  <span className="mono text-highlight font-bold">{theta}°</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="180" 
                  value={theta} 
                  onChange={(e) => setTheta(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>

              <div className="pt-4 border-t border-highlight/20">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={cross} 
                    onChange={(e) => setCross(e.target.checked)}
                    className="w-5 h-5"
                  />
                  <span className="font-semibold text-ink">Crossed Polarizers Mode</span>
                </label>
                <p className="text-xs text-ink/60 mt-2 ml-8">
                  {cross ? 'Eq. 2.3.36: I ∝ sin²ξ · sin²(ξ − θ)' : 'Eq. 2.3.27: I ∝ sin²(ξ + θ)'}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-highlight/20">
              <h5 className="font-bold text-ink mb-2">Current Pattern</h5>
              <p className="text-sm text-ink/70">
                {cross 
                  ? 'Four-lobe pattern characteristic of crossed-polarizer SPR transmission'
                  : 'Two-lobe pattern from direct polarization coupling'}
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-highlight/10 to-accent/5 rounded-xl p-6 border-l-4 border-accent">
            <h5 className="font-bold text-accent mb-2">Experimental Validation</h5>
            <p className="text-sm text-ink/70">
              These patterns were confirmed through crossed-polarizer imaging of fabricated 
              gratings, demonstrating excellent agreement between theory and measurement.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 flex flex-col items-center justify-center overflow-hidden">
          <canvas 
            ref={canvasRef} 
            className="rounded-xl border-4 shadow-lg mb-4 max-w-full" 
            style={{borderColor: cross ? '#ED3F27' : '#134686', maxWidth: '100%'}}
          />
          <div className="text-center">
            <p className="text-sm font-semibold text-ink mb-1">
              Intensity Distribution
            </p>
            <p className="text-xs text-ink/60">
              Lighter regions = higher transmission
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-highlight/20 text-center">
        <a href="/demos/polarization" className="btn-highlight inline-flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Open Full Polarization Explorer
        </a>
      </div>
    </section>
  )
}

// Interactive SPR Prediction Component
function InteractiveSPRDemo() {
  const [pitch, setPitch] = useState(668)
  const [ambient, setAmbient] = useState(1.0)
  
  const { wavelengths, intensity, sprWavelength } = useMemo(() => 
    generateSPRSpectrum(pitch, ambient), [pitch, ambient]
  )

  const maxIntensity = Math.max(...intensity)
  const normalizedIntensity = intensity.map(i => (i / maxIntensity) * 100)

  return (
    <section className="card-blue">
      <p className="section-heading">INTERACTIVE DEMONSTRATION</p>
      <h2 className="h2 mb-6 text-primary">Live SPR Wavelength Prediction</h2>
      <p className="body mb-6">
        Explore how grating pitch and ambient medium affect the SPR wavelength. This simplified 
        model demonstrates the key relationships from Equation 2.3.18 used throughout the research.
      </p>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6 border-l-4 border-primary">
            <h4 className="font-bold text-primary mb-4">Parameters</h4>
            
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-ink">Grating Pitch Λ</label>
                  <span className="mono text-primary font-bold">{pitch} nm</span>
                </div>
                <input 
                  type="range" 
                  min="550" 
                  max="750" 
                  step="5"
                  value={pitch} 
                  onChange={(e) => setPitch(parseInt(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-ink/60 mt-1">
                  Experimental values: 623, 668, 717 nm
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-semibold text-ink">Ambient Index n<sub>d</sub></label>
                  <span className="mono text-primary font-bold">{ambient.toFixed(2)}</span>
                </div>
                <input 
                  type="range" 
                  min="1.0" 
                  max="1.5" 
                  step="0.01"
                  value={ambient} 
                  onChange={(e) => setAmbient(parseFloat(e.target.value))}
                  className="w-full"
                />
                <p className="text-xs text-ink/60 mt-1">
                  Air: 1.0, Water: 1.33, Glass: ~1.5
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-accent/5 rounded-xl p-6 border-l-4 border-accent">
            <h5 className="font-bold text-accent mb-3">Predicted λ<sub>SPR</sub></h5>
            <p className="mono text-4xl font-bold text-accent mb-2">{sprWavelength} nm</p>
            <p className="text-xs text-ink/60">
              Calculated using planar approximation with ε<sub>Au</sub> = -12.8
            </p>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl p-6">
            <h4 className="font-bold text-primary mb-4">Synthetic Transmission Spectrum</h4>
            <div className="relative w-full overflow-x-auto" style={{minHeight: '250px', height: '300px', maxHeight: '400px'}}>
              <svg viewBox="0 0 500 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
                {/* Background grid */}
                <g stroke="#e5e7eb" strokeWidth="0.5">
                  {[0, 50, 100, 150, 200, 250, 300].map(y => (
                    <line key={`h${y}`} x1="40" y1={y+10} x2="490" y2={y+10} />
                  ))}
                  {[50, 100, 150, 200, 250, 300, 350, 400, 450].map((x, i) => (
                    <line key={`v${x}`} x1={40+(i*50)} y1="10" x2={40+(i*50)} y2="310" />
                  ))}
                </g>
                
                {/* Axes */}
                <line x1="40" y1="310" x2="490" y2="310" stroke="#1a1a1a" strokeWidth="2" />
                <line x1="40" y1="10" x2="40" y2="310" stroke="#1a1a1a" strokeWidth="2" />
                
                {/* Wavelength labels */}
                <text x="40" y="330" fontSize="12" fill="#666" textAnchor="middle">450</text>
                <text x="265" y="330" fontSize="12" fill="#666" textAnchor="middle">675</text>
                <text x="490" y="330" fontSize="12" fill="#666" textAnchor="middle">900</text>
                <text x="265" y="345" fontSize="13" fill="#1a1a1a" textAnchor="middle" fontWeight="600">Wavelength (nm)</text>
                
                {/* Y-axis label */}
                <text x="15" y="160" fontSize="13" fill="#1a1a1a" fontWeight="600" textAnchor="middle" transform="rotate(-90, 15, 160)">Transmission (a.u.)</text>
                
                {/* Spectrum line */}
                <polyline
                  points={wavelengths.map((wl, i) => {
                    const x = 40 + ((wl - 450) / 450) * 450
                    const y = 310 - normalizedIntensity[i] * 2.8
                    return `${x},${y}`
                  }).join(' ')}
                  fill="none"
                  stroke="#134686"
                  strokeWidth="3"
                />
                
                {/* SPR marker */}
                <line 
                  x1={40 + ((parseFloat(sprWavelength) - 450) / 450) * 450} 
                  y1="10" 
                  x2={40 + ((parseFloat(sprWavelength) - 450) / 450) * 450} 
                  y2="310" 
                  stroke="#ED3F27" 
                  strokeWidth="2" 
                  strokeDasharray="5,5" 
                />
                <text 
                  x={40 + ((parseFloat(sprWavelength) - 450) / 450) * 450} 
                  y="25" 
                  fontSize="12" 
                  fill="#ED3F27" 
                  fontWeight="600"
                  textAnchor="middle"
                >
                  λ<tspan fontSize="10" baselineShift="sub">SPR</tspan>
                </text>
              </svg>
            </div>
            <p className="text-sm text-ink/60 text-center mt-4">
              Blue line: Transmission intensity • Red dashed line: Predicted SPR wavelength
            </p>
          </div>

          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-6 border-l-4 border-primary">
            <h5 className="font-bold text-primary mb-4">Key Findings</h5>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink mb-1">Pitch Effect</p>
                  <p className="text-xs text-ink/70">Larger pitch shifts SPR to longer wavelengths</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center text-accent flex-shrink-0 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink mb-1">Index Effect</p>
                  <p className="text-xs text-ink/70">Higher ambient index red-shifts the resonance</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-highlight/10 flex items-center justify-center text-highlight flex-shrink-0 mt-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink mb-1">Amplification</p>
                  <p className="text-xs text-ink/70">Measured: 1.8–4.2× at resonance</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-primary/20 text-center">
        <a href="/case-studies/ai-spr" className="btn-primary inline-flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Explore Advanced AI-SPR Tool
        </a>
      </div>
    </section>
  )
}

// Interactive Amplification Factors Component
function InteractiveAmplificationDemo() {
  const [selectedPitch, setSelectedPitch] = useState(668)
  
  const experimentalData = [
    { pitch: 623, amplification: 1.8, color: '#134686' },
    { pitch: 668, amplification: 3.2, color: '#ED3F27' },
    { pitch: 717, amplification: 4.2, color: '#FEB21A' }
  ]

  const selected = experimentalData.find(d => d.pitch === selectedPitch)!

  return (
    <section className="card-red">
      <p className="section-heading">INTERACTIVE DEMONSTRATION</p>
      <h2 className="h2 mb-6 text-accent">Measured Amplification Factors</h2>
      <p className="body mb-6">
        One of the key achievements: measuring transmission amplification at SPR across different 
        grating pitches. Click on a pitch value to see the measured enhancement factor.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6">
            <h4 className="font-bold text-accent mb-4">Select Grating Pitch</h4>
            <div className="space-y-3">
              {experimentalData.map(data => (
                <button
                  key={data.pitch}
                  onClick={() => setSelectedPitch(data.pitch)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedPitch === data.pitch
                      ? 'border-accent bg-accent/5 shadow-md'
                      : 'border-gray-200 hover:border-accent/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-ink">Λ = {data.pitch} nm</p>
                      <p className="text-sm text-ink/60">Amplification: {data.amplification}×</p>
                    </div>
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{backgroundColor: data.color}}
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-accent/10 to-highlight/5 rounded-xl p-6 border-l-4 border-highlight">
            <h5 className="font-bold text-highlight mb-2">What This Means</h5>
            <p className="text-sm text-ink/70">
              At SPR conditions, the circular grating enhances transmission by up to <strong>4.2×</strong> compared 
              to baseline. This demonstrates effective plasmon coupling and validates the fabrication methodology.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <h4 className="font-bold text-accent mb-6">Amplification Factor</h4>
          <div className="flex items-end justify-center gap-8 h-64 mb-6">
            {experimentalData.map(data => {
              const isSelected = data.pitch === selectedPitch
              const heightPercent = (data.amplification / 4.5) * 100
              
              return (
                <div key={data.pitch} className="flex flex-col items-center gap-2 flex-1">
                  <div className="relative w-full">
                    <div 
                      className={`w-full rounded-t-xl transition-all duration-500 ${
                        isSelected ? 'opacity-100' : 'opacity-40'
                      }`}
                      style={{
                        backgroundColor: data.color,
                        height: `${heightPercent * 2}px`,
                      }}
                    />
                    {isSelected && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <div className="bg-accent text-white px-3 py-1 rounded-full text-sm font-bold whitespace-nowrap">
                          {data.amplification}×
                        </div>
                      </div>
                    )}
                  </div>
                  <p className={`text-sm font-semibold transition-all ${
                    isSelected ? 'text-accent' : 'text-ink/60'
                  }`}>
                    {data.pitch} nm
                  </p>
                </div>
              )
            })}
          </div>

          <div className="pt-6 border-t border-accent/20">
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-primary/5 rounded-lg p-3">
                <p className="text-xs text-ink/60 mb-1">Pitch</p>
                <p className="font-bold text-primary">{selected.pitch} nm</p>
              </div>
              <div className="bg-accent/5 rounded-lg p-3">
                <p className="text-xs text-ink/60 mb-1">Enhancement</p>
                <p className="font-bold text-accent">{selected.amplification}×</p>
              </div>
            </div>
          </div>

          <p className="text-xs text-ink/60 text-center mt-4">
            Measured via spectroscopy in transmission mode with gold-coated gratings
          </p>
        </div>
      </div>
    </section>
  )
}
