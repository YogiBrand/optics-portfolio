'use client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="space-y-20 md:space-y-32">
      {/* Hero Section */}
      <section className={`hero-gradient rounded-3xl p-8 md:p-16 lg:p-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
          <div className="inline-block">
            <div className="accent-line mx-auto mb-6"></div>
          </div>
          
          <h1 className="h1 animate-fade-in">
            I design, simulate, and measure light.
          </h1>
          
          <p className="lead mx-auto max-w-2xl animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            Hands-on optical design engineer specializing in circular SPR gratings, 
            polarization mapping, and code-driven tools that accelerate iteration cycles.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <a href="#projects" className="btn-primary">
              Explore Projects
            </a>
            <a href="/thesis" className="btn-outline">
              Read Thesis
            </a>
          </div>
        </div>
      </section>

      {/* Projects Showcase */}
      <section id="projects" className="space-y-8">
        <div className="text-center space-y-4">
          <p className="section-heading">INTERACTIVE DEMOS</p>
          <h2 className="h2">Featured Work</h2>
          <p className="lead max-w-3xl mx-auto">
            Explore interactive tools that demonstrate complex optical phenomena and 
            computational approaches to photonics challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* AI-SPR Card */}
          <a href="/case-studies/ai-spr" className="card-blue project-card group">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-primary/60 uppercase tracking-wider">Machine Learning</span>
              </div>
              
              <h3 className="h3 group-hover:text-primary transition-colors">
                AI-accelerated SPR
              </h3>
              
              <p className="body">
                Physics-guided surrogate model predicts λ<sub>SPR</sub> with interactive sliders. 
                Compare predictions against reference planar models in real-time.
              </p>

              <div className="flex items-center text-primary font-semibold text-sm group-hover:translate-x-2 transition-transform">
                Explore tool 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>

          {/* AFM-Vision Card */}
          <a href="/case-studies/afm-vision" className="card-red project-card group">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-accent/60 uppercase tracking-wider">Computer Vision</span>
              </div>
              
              <h3 className="h3 group-hover:text-accent transition-colors">
                AFM-Vision QA
              </h3>
              
              <p className="body">
                Upload AFM images to automatically estimate grating pitch and groove depth 
                via FFT analysis. Flags potential surface defects with heatmap overlay.
              </p>

              <div className="flex items-center text-accent font-semibold text-sm group-hover:translate-x-2 transition-transform">
                Try analyzer 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>

          {/* Polarization Explorer Card */}
          <a href="/demos/polarization" className="card-yellow project-card group md:col-span-2 lg:col-span-1">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 rounded-full bg-highlight/10 flex items-center justify-center text-highlight group-hover:bg-highlight group-hover:text-ink transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-highlight/80 uppercase tracking-wider">Interactive</span>
              </div>
              
              <h3 className="h3 group-hover:text-highlight transition-colors">
                Polarization Explorer
              </h3>
              
              <p className="body">
                Visualize sin²(ξ+θ) and crossed-polarizer intensity patterns derived from 
                thesis equations. Real-time interactive maps of polarization-dependent SPR coupling.
              </p>

              <div className="flex items-center text-highlight font-semibold text-sm group-hover:translate-x-2 transition-transform">
                Open explorer 
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Expertise & Achievements */}
      <section className="space-y-8">
        <div className="text-center">
          <p className="section-heading">EXPERTISE</p>
          <h2 className="h2">What I Bring to the Table</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card-blue">
            <h3 className="h3 mb-6 text-primary">Technical Skills</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl mt-1">→</span>
                <span className="body">
                  <strong className="text-ink font-semibold">SPR Gratings:</strong> Inscription, gold deposition, 
                  spectroscopy in transmission/reflection modes
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl mt-1">→</span>
                <span className="body">
                  <strong className="text-ink font-semibold">Polarization Optics:</strong> Jones/Stokes formalism, 
                  crossed-polarizer diagnostics, cylindrical-vector beams
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary text-xl mt-1">→</span>
                <span className="body">
                  <strong className="text-ink font-semibold">Computational Tools:</strong> Automation & analysis 
                  in Python/MATLAB; reproducible modeling & visualization
                </span>
              </li>
            </ul>
          </div>

          <div className="card-red">
            <h3 className="h3 mb-6 text-accent">Key Achievements</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl mt-1">✦</span>
                <span className="body">
                  Measured <strong className="text-ink font-semibold">transmission amplification 
                  factors ~1.8–4.2×</strong> at SPR across grating pitches (623/668/717 nm)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl mt-1">✦</span>
                <span className="body">
                  Built complete <strong className="text-ink font-semibold">theory→measurement loop</strong> for 
                  polarization-dependent SPR on circular gratings
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent text-xl mt-1">✦</span>
                <span className="body">
                  Diagnosed <strong className="text-ink font-semibold">center deformation failure mode</strong> from 
                  AFM & imaging analysis; proposed corrective fixes
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary rounded-3xl p-8 md:p-12 text-center text-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Interested in Collaboration?</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            I'm open to research opportunities, consulting projects, and technical discussions 
            about optical design and photonics applications.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="/cv" className="btn bg-white text-primary hover:bg-cream">
              View Full CV
            </a>
            <a href="/thesis" className="btn bg-transparent border-2 border-white text-white hover:bg-white/10">
              Read My Research
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
