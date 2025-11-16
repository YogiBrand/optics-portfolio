'use client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { renderPlot } from '@/components/Chart'
import surrogate from '@/data/surrogate.json'

type SR = typeof surrogate

function predictSurrogate(L: number, e: number, n: number) {
  const f = [
    1,
    L, e, n,
    L*L, e*e, n*n,
    L*e, L*n, e*n
  ]
  const w = (surrogate as SR).weights
  let y = 0
  for (let i=0;i<w.length;i++) y += w[i]*f[i]
  return y
}

// Planar approximation for comparison (Eq. 2.3.18, theta_i = 0)
function predictPlanar(L: number, e: number, n: number) {
  const absE = Math.abs(e)
  const ratio = Math.sqrt(absE / (n*n + absE))
  return n * ratio * L
}

function lorentz(x: number, x0: number, gamma: number, A: number) {
  return A * (gamma*gamma) / ((x-x0)*(x-x0) + gamma*gamma)
}

export default function AISPR() {
  const [L, setL] = useState(668)       // grating pitch nm
  const [e, setE] = useState(-12.8)     // real(ε_m) for Au near 632nm
  const [n, setN] = useState(1.0)       // dielectric index (air/water)
  const [depth, setDepth] = useState(60) // groove depth nm
  const [theta, setTheta] = useState(0) // LP angle relative to GV (deg)

  const pred = useMemo(()=>predictSurrogate(L,e,n), [L,e,n])
  const planar = useMemo(()=>predictPlanar(L,e,n), [L,e,n])

  const el = useRef<HTMLDivElement>(null)

  useEffect(()=>{
    if(!el.current) return

    const renderChart = async () => {
      if(!el.current) return

      // Build synthetic spectra around both predictions
      const wl = new Array(400).fill(0).map((_,i)=> 450 + i*1.5) // 450–1050 nm
      const polFactor = Math.pow(Math.cos(theta*Math.PI/180), 2) // ~cos^2 for LP coupling
      const gwidth = 10 + (80 - depth*1.0) * 0.4 // deeper grooves => narrower resonance (crude)
      const A = 1.2 * polFactor + 0.05

      const ySur = wl.map(x=> lorentz(x, pred, gwidth, A))
      const yPla = wl.map(x=> lorentz(x, planar, gwidth*1.1, A*0.9))

      // Responsive margins and font sizes
      const isMobile = window.innerWidth < 768
      const chartMargins = isMobile 
        ? {l: 50, r: 20, t: 20, b: 50}  // More space for y-axis labels on mobile
        : {l: 60, r: 20, t: 30, b: 60}

      const traces = [{
        x: wl, 
        y: ySur, 
        mode: 'lines', 
        name: 'Surrogate Model',
        line: { width: isMobile ? 2 : 3, color: '#134686' }
      }, {
        x: wl, 
        y: yPla, 
        mode: 'lines', 
        name: 'Planar Approx', 
        line: { dash: 'dot', width: isMobile ? 1.5 : 2, color: '#ED3F27' }
      }]

      await renderPlot(el.current!, traces as any, {
        template: 'plotly_dark',
        margin: chartMargins,
        xaxis: { 
          title: {
            text: 'Wavelength (nm)',
            font: { size: isMobile ? 12 : 14 }
          },
          tickfont: { size: isMobile ? 10 : 12 }
        },
        yaxis: { 
          title: {
            text: 'Transmission (a.u.)',
            font: { size: isMobile ? 12 : 14 }
          },
          tickfont: { size: isMobile ? 10 : 12 }
        },
        showlegend: true,
        legend: {
          orientation: isMobile ? 'h' : 'v',
          x: isMobile ? 0.5 : 1,
          xanchor: isMobile ? 'center' : 'left',
          y: isMobile ? 1.1 : 1,
          yanchor: isMobile ? 'bottom' : 'top',
          font: { size: isMobile ? 10 : 12 }
        },
        responsive: true,
        autosize: true,
        displayModeBar: !isMobile // Hide toolbar on mobile
      })
    }

    renderChart()

    // Re-render on window resize (handles device rotation)
    const handleResize = () => renderChart()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [pred, planar, depth, theta])

  return (
    <div className="space-y-12">
      <header className="space-y-6">
        <div className="inline-block">
          <div className="accent-line mb-4"></div>
        </div>
        <h1 className="h1">AI-Accelerated SPR Designer</h1>
        <p className="lead max-w-3xl">
          A lightweight machine learning surrogate (polynomial regression) trained on the planar coupling model
          predicts SPR wavelength for circular gratings. Compare against the closed-form
          planar approximation (θ=0) from <strong>Eq. 2.3.18</strong> of the thesis, then explore how polarization
          and groove depth change the synthetic spectrum.
        </p>
        <a href="/thesis" className="btn-outline">
          View Thesis Reference
        </a>
      </header>

      <section className="grid lg:grid-cols-2 gap-8">
        <div className="card-blue space-y-6">
          <div>
            <p className="section-heading">PARAMETERS</p>
            <h3 className="h3 text-primary">Grating & Material Properties</h3>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-ink">Pitch Λ (nm)</label>
                <span className="mono text-primary font-bold text-lg">{L.toFixed(0)}</span>
              </div>
              <input type="range" min="500" max="900" value={L} onChange={e=>setL(parseFloat(e.target.value))}/>
              <p className="text-xs text-ink/60">Grating period: 500–900 nm</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-ink">Re(ε<sub>m</sub>) [Au]</label>
                <span className="mono text-primary font-bold text-lg">{e.toFixed(1)}</span>
              </div>
              <input type="range" min="-36" max="-4" step="0.1" value={e} onChange={e=>setE(parseFloat(e.target.value))}/>
              <p className="text-xs text-ink/60">Real part of metal permittivity</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-ink">n<sub>d</sub> (ambient)</label>
                <span className="mono text-primary font-bold text-lg">{n.toFixed(2)}</span>
              </div>
              <input type="range" min="1.0" max="1.5" step="0.01" value={n} onChange={e=>setN(parseFloat(e.target.value))}/>
              <p className="text-xs text-ink/60">Dielectric index (air: 1.0, water: 1.33)</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-ink">Groove Depth (nm)</label>
                <span className="mono text-primary font-bold text-lg">{depth.toFixed(0)}</span>
              </div>
              <input type="range" min="10" max="100" value={depth} onChange={e=>setDepth(parseFloat(e.target.value))}/>
              <p className="text-xs text-ink/60">Affects resonance width (qualitative)</p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-semibold text-ink">LP Angle θ (deg)</label>
                <span className="mono text-primary font-bold text-lg">{theta.toFixed(0)}</span>
              </div>
              <input type="range" min="0" max="180" value={theta} onChange={e=>setTheta(parseFloat(e.target.value))}/>
              <p className="text-xs text-ink/60">Linear polarization relative to grating vector</p>
            </div>
          </div>

          <div className="bg-primary/5 rounded-xl p-6 space-y-3 border-l-4 border-primary">
            <h4 className="font-bold text-primary">Predictions</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-ink/70">Surrogate Model:</span>
                <span className="mono text-primary font-bold text-xl">{pred.toFixed(1)} nm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-ink/70">Planar Approximation:</span>
                <span className="mono text-accent font-bold text-xl">{planar.toFixed(1)} nm</span>
              </div>
              <p className="text-xs text-ink/60 pt-2">
                Difference: <strong>{Math.abs(pred - planar).toFixed(1)} nm</strong>
              </p>
            </div>
          </div>
        </div>

        <div className="card space-y-4">
          <div>
            <p className="section-heading">SPECTROSCOPY</p>
            <h3 className="h3">Synthetic Transmission Spectrum</h3>
          </div>
          <div 
            ref={el} 
            className="rounded-xl border-2 border-primary/20 overflow-hidden bg-[#1e1e1e]" 
            style={{
              width: '100%', 
              minHeight: '350px',
              height: 'clamp(350px, 50vh, 600px)'
            }} 
          />
          <p className="text-xs text-ink/60">
            <span className="inline-block w-3 h-3 bg-[#134686] rounded-sm mr-1 align-middle"></span> 
            Surrogate model prediction 
            <span className="inline-block w-3 h-3 bg-[#ED3F27] rounded-sm ml-3 mr-1 align-middle"></span> 
            Planar approximation
          </p>
        </div>
      </section>

      <section className="card bg-gradient-to-br from-highlight/5 to-accent/5">
        <p className="section-heading">METHODOLOGY</p>
        <h3 className="h3 mb-4">How This Tool Works</h3>
        <div className="grid md:grid-cols-2 gap-6 body">
          <div className="space-y-3">
            <h4 className="font-bold text-accent">Machine Learning Approach</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Polynomial regression surrogate trained on planar coupling theory</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Fast predictions enable real-time interactive exploration</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-accent">•</span>
                <span>Captures nonlinear relationships between parameters and λ<sub>SPR</sub></span>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-primary">Limitations & Extensions</h4>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span>Not a full RCWA/FDTD solver; simplified synthetic spectra</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span>For production: swap in RCWA-generated training dataset</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">→</span>
                <span>Could incorporate deep learning for inverse design workflows</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-primary rounded-3xl p-8 md:p-12 text-white">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Explore More Tools</h3>
          <p className="text-xl text-white/90 leading-relaxed">
            Check out the other interactive demonstrations from this research
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="/demos/polarization" className="btn bg-white text-primary hover:bg-cream">
              Polarization Explorer
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
