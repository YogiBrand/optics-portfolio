'use client'

export default function CV(){
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <header className="hero-gradient rounded-3xl p-8 md:p-16 lg:p-20 text-center space-y-6">
        {/* Headshot */}
        <div className="flex justify-center mb-6">
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-primary/20 shadow-lift">
            <img 
              src="/headshot.jpg" 
              alt="Eoin Dawson" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback to initials if image not found
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                if (target.nextElementSibling) {
                  (target.nextElementSibling as HTMLElement).style.display = 'flex';
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-4xl md:text-5xl font-bold" style={{display: 'none'}}>
              ED
            </div>
          </div>
        </div>
        
        <div className="inline-block">
          <div className="accent-line mx-auto mb-6"></div>
        </div>
        <h1 className="h1">Eoin Dawson</h1>
        <p className="lead max-w-3xl mx-auto">
          Optical Design Engineer
        </p>
        <p className="body max-w-2xl mx-auto text-ink/70">
          Dynamic and innovative Optical Design Engineer with extensive experience in optical lab environments. 
          Proven expertise in plasmonic polarization conversion, laser operation, and nanostructured surface inscription.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a href="/resume.pdf" download className="btn-primary">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download PDF
          </a>
          <a href="mailto:dawson.eoin@gmail.com" className="btn-outline">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Me
          </a>
          <a href="https://calendly.com/eoindawson" target="_blank" rel="noopener noreferrer" className="btn-highlight">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Schedule Chat
          </a>
        </div>
      </header>

      {/* At a Glance */}
      <section className="grid md:grid-cols-4 gap-6">
        <div className="text-center space-y-3 p-6 rounded-2xl bg-white shadow-soft hover:shadow-lift transition-all">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="font-bold text-primary">Role</h3>
          <p className="text-sm text-ink/70">Optical Design Engineer</p>
        </div>

        <div className="text-center space-y-3 p-6 rounded-2xl bg-white shadow-soft hover:shadow-lift transition-all">
          <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="font-bold text-accent">Education</h3>
          <p className="text-sm text-ink/70">M.Sc. Optical Materials</p>
        </div>

        <div className="text-center space-y-3 p-6 rounded-2xl bg-white shadow-soft hover:shadow-lift transition-all">
          <div className="w-16 h-16 rounded-full bg-highlight/10 flex items-center justify-center text-highlight mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="font-bold text-highlight">Expertise</h3>
          <p className="text-sm text-ink/70">SPR • Polarization • ML</p>
        </div>

        <div className="text-center space-y-3 p-6 rounded-2xl bg-white shadow-soft hover:shadow-lift transition-all">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 className="font-bold text-primary">Location</h3>
          <p className="text-sm text-ink/70">Kingston, ON</p>
        </div>
      </section>

      {/* Experience */}
      <section className="space-y-8">
        <div className="text-center">
          <p className="section-heading">PROFESSIONAL EXPERIENCE</p>
          <h2 className="h2">Experience</h2>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {/* Master's Research */}
          <div className="relative pl-8 border-l-4 border-primary">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary"></div>
            <div className="space-y-4 pb-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h3 className="h3 text-primary">Graduate Researcher — Optical Materials</h3>
                  <p className="text-lg text-ink/80 font-medium">Master's Thesis Research</p>
                  <p className="text-ink/60">Queen's University, Kingston ON</p>
                </div>
                <span className="text-ink/60 font-semibold whitespace-nowrap">2023 – 2024</span>
              </div>
              
              <p className="body text-ink/80 font-medium">
                Thesis: "Circular Gratings & Polarization-Dependent Surface Plasmon Resonance"
              </p>

              <div className="space-y-3">
                <h4 className="font-bold text-ink">Key Contributions:</h4>
                <ul className="space-y-2 body">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Designed and fabricated large-aperture circular surface relief gratings (SRGs) using interference lithography, demonstrating expertise in advanced nanofabrication techniques</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Measured <strong>transmission amplification factors of 1.8–4.2×</strong> at SPR wavelengths across multiple grating pitches through precise spectroscopy measurements</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Validated polarization-dependent coupling theory through comprehensive optical characterization including crossed-polarizer imaging and AFM surface analysis</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Developed Python and MATLAB tools for automated data analysis, optical simulations, and theoretical modeling of plasmonic systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold mt-1">•</span>
                    <span>Established complete theory→fabrication→measurement pipeline, demonstrating strong problem-solving and project management skills</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">Nd:YAG Lasers</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">AFM Microscopy</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">Interference Lithography</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">Python/MATLAB</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">SPR Spectroscopy</span>
                <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">Polarization Optics</span>
              </div>
            </div>
          </div>

          {/* Teaching Assistant */}
          <div className="relative pl-8 border-l-4 border-accent">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-accent"></div>
            <div className="space-y-4 pb-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h3 className="h3 text-accent">Teaching Assistant</h3>
                  <p className="text-lg text-ink/80 font-medium">Mathematical Physics</p>
                  <p className="text-ink/60">Queen's University, Kingston ON</p>
                </div>
                <span className="text-ink/60 font-semibold whitespace-nowrap">2020 – 2022</span>
              </div>

              <div className="space-y-3">
                <ul className="space-y-2 body">
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span><strong>Enhanced Student Learning:</strong> Significantly improved student performance in Mathematical Physics through innovative teaching methods</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span><strong>Leadership in Academics:</strong> Led group projects effectively, fostering critical thinking and collaborative skills among students</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-accent font-bold mt-1">•</span>
                    <span><strong>Curriculum Innovation:</strong> Developed and updated course materials, aligning with the latest scientific developments</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">Teaching</span>
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">Leadership</span>
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">Curriculum Development</span>
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">Mathematical Physics</span>
              </div>
            </div>
          </div>

          {/* Optical Lab Researcher */}
          <div className="relative pl-8 border-l-4 border-highlight">
            <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-highlight"></div>
            <div className="space-y-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h3 className="h3 text-highlight">Undergraduate Research Assistant</h3>
                  <p className="text-lg text-ink/80 font-medium">Experimental Optics Laboratory</p>
                  <p className="text-ink/60">Queen's University, Kingston ON</p>
                </div>
                <span className="text-ink/60 font-semibold whitespace-nowrap">2019 – 2020</span>
              </div>

              <div className="space-y-3">
                <ul className="space-y-2 body">
                  <li className="flex items-start gap-3">
                    <span className="text-highlight font-bold mt-1">•</span>
                    <span><strong>Advanced Research Execution:</strong> Led cutting-edge optical experiments, significantly advancing lab capabilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-highlight font-bold mt-1">•</span>
                    <span><strong>Laser Proficiency:</strong> Mastered Nd:YAG and Argon Gas lasers, enhancing experiment accuracy</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-highlight font-bold mt-1">•</span>
                    <span><strong>Instrument Expertise:</strong> Operated Atomic Force Microscope and CCD Spectrometers for critical data acquisition</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-highlight font-bold mt-1">•</span>
                    <span><strong>Innovative Thin Film Techniques:</strong> Pioneered spin coating methods for nanostructured surfaces, setting new lab standards</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <span className="px-3 py-1 bg-highlight/10 text-highlight text-xs font-semibold rounded-full">Nd:YAG/Argon Lasers</span>
                <span className="px-3 py-1 bg-highlight/10 text-highlight text-xs font-semibold rounded-full">AFM</span>
                <span className="px-3 py-1 bg-highlight/10 text-highlight text-xs font-semibold rounded-full">CCD Spectrometers</span>
                <span className="px-3 py-1 bg-highlight/10 text-highlight text-xs font-semibold rounded-full">Thin Film Fabrication</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education */}
      <section className="space-y-8">
        <div className="text-center">
          <p className="section-heading">EDUCATION</p>
          <h2 className="h2">Academic Background</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="space-y-4 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border-l-4 border-primary">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <span className="text-primary font-bold text-lg">2023 – 2024</span>
            </div>
            
            <h3 className="h3 text-primary">Master of Science</h3>
            <p className="text-xl font-semibold text-ink">Optical Materials</p>
            <p className="text-ink/70">Queen's University • Kingston, ON</p>
            
            <div className="pt-3 space-y-2">
              <p className="text-sm font-semibold text-ink">Thesis:</p>
              <p className="body italic">
                "Circular Gratings & Polarization-Dependent Surface Plasmon Resonance"
              </p>
              <p className="text-sm text-ink/60 mt-2">
                Specialized in plasmonic polarization conversion and nanophotonic device fabrication. 
                Led comprehensive research on circular surface relief gratings, achieving significant transmission amplification 
                at SPR wavelengths through innovative interference lithography and optical characterization techniques.
              </p>
            </div>

            <div className="pt-3">
              <p className="text-sm font-semibold text-ink mb-2">Key Coursework:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white text-xs text-ink/70 rounded">Advanced Optics</span>
                <span className="px-2 py-1 bg-white text-xs text-ink/70 rounded">Photonics Devices</span>
                <span className="px-2 py-1 bg-white text-xs text-ink/70 rounded">Electromagnetic Theory</span>
                <span className="px-2 py-1 bg-white text-xs text-ink/70 rounded">Nanophotonics</span>
              </div>
            </div>
          </div>

          <div className="space-y-4 p-8 rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 border-l-4 border-accent">
            <div className="flex items-start justify-between">
              <div className="w-14 h-14 rounded-full bg-accent/10 flex items-center justify-center text-accent">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-accent font-bold text-lg">2018 – 2022</span>
            </div>
            
            <h3 className="h3 text-accent">B.Sc. Honours</h3>
            <p className="text-xl font-semibold text-ink">Mathematical Physics</p>
            <p className="text-ink/70">Queen's University • Kingston, ON</p>
            
            <div className="pt-3 space-y-2">
              <p className="text-sm text-ink/60">
                Strong foundation in mathematical modeling, quantitative analysis, and theoretical physics. 
                Specialized in wave optics, electromagnetic theory, and light-matter interactions. 
                Developed computational and analytical skills essential for advanced optical research.
              </p>
            </div>

            <div className="pt-3">
              <p className="text-sm font-semibold text-ink mb-2">Relevant Coursework:</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-white text-xs text-ink/70 rounded">Optics & Waves</span>
                <span className="px-2 py-1 bg-white text-xs text-ink/70 rounded">E&M</span>
                <span className="px-2 py-1 bg-white text-xs text-ink/70 rounded">Quantum Physics</span>
                <span className="px-2 py-1 bg-white text-xs text-ink/70 rounded">Computational Physics</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="space-y-8">
        <div className="text-center">
          <p className="section-heading">TECHNICAL EXPERTISE</p>
          <h2 className="h2">Skills & Proficiencies</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Experimental */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
            <h3 className="h4 text-primary">Experimental</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Nd:YAG and Argon Gas Laser Operation</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Atomic Force Microscope Utilization</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>CCD Spectrometer Expertise</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Polarimetric Analysis Proficiency</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Interference Lithography for Nanostructuring</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span>Thin Film Fabrication</span>
            </li>
          </ul>
        </div>

          {/* Computational */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
            <h3 className="h4 text-accent">Computational</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Python Computational Modeling</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>MATLAB Computational Modeling</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Optical System Simulation</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Data Analysis & Visualization</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Mathematical Modeling</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span>Problem-Solving Algorithms</span>
            </li>
          </ul>
        </div>

          {/* Theoretical */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-highlight/10 flex items-center justify-center text-highlight">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
            <h3 className="h4 text-highlight">Theoretical</h3>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-highlight"></div>
              <span>Optical System Design</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-highlight"></div>
              <span>Polarization Theory</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-highlight"></div>
              <span>Surface Plasmon Resonance</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-highlight"></div>
              <span>Wave Optics & Light-Matter Interaction</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-highlight"></div>
              <span>Diffraction Theory</span>
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-highlight"></div>
              <span>Gaussian Optics</span>
            </li>
          </ul>
        </div>
        </div>

        <div className="pt-6">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="h4">Additional Tools & Technologies</h3>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-soft">Laser Spectroscopy</span>
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-soft">Optical Fabrication</span>
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-soft">Problem-Solving</span>
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-soft">Team Collaboration</span>
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-soft">Project Management</span>
            <span className="px-4 py-2 bg-white rounded-full text-sm font-medium shadow-soft">Technical Writing</span>
          </div>
        </div>
      </section>

      {/* Portfolio Projects */}
      <section className="space-y-8">
        <div className="text-center">
          <p className="section-heading">PORTFOLIO</p>
          <h2 className="h2">Interactive Demonstrations</h2>
          <p className="lead max-w-3xl mx-auto mt-4">
            Live web applications showcasing research expertise and technical capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <a href="/case-studies/ai-spr" className="group space-y-4 p-6 rounded-2xl bg-white shadow-soft hover:shadow-lift transition-all">
            <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="h4 group-hover:text-primary transition-colors">AI-SPR Designer</h3>
            <p className="text-sm text-ink/70">
              Physics-guided machine learning surrogate for rapid SPR wavelength prediction. 
              Interactive parameter exploration with real-time synthetic spectra.
            </p>
            <div className="flex items-center text-primary text-sm font-semibold group-hover:translate-x-2 transition-transform">
              View Project
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          <a href="/case-studies/afm-vision" className="group space-y-4 p-6 rounded-2xl bg-white shadow-soft hover:shadow-lift transition-all">
            <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="h4 group-hover:text-accent transition-colors">AFM-Vision QA</h3>
            <p className="text-sm text-ink/70">
              Automated quality assurance tool for AFM microscopy images. FFT-based pitch 
              estimation and computer vision defect detection.
            </p>
            <div className="flex items-center text-accent text-sm font-semibold group-hover:translate-x-2 transition-transform">
              View Project
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          <a href="/demos/polarization" className="group space-y-4 p-6 rounded-2xl bg-white shadow-soft hover:shadow-lift transition-all">
            <div className="w-14 h-14 rounded-xl bg-highlight/10 flex items-center justify-center text-highlight group-hover:bg-highlight group-hover:text-ink transition-all">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="h4 group-hover:text-highlight transition-colors">Polarization Explorer</h3>
            <p className="text-sm text-ink/70">
              Real-time visualization of polarization-dependent coupling patterns. 
              Interactive implementation of thesis-derived equations.
            </p>
            <div className="flex items-center text-highlight text-sm font-semibold group-hover:translate-x-2 transition-transform">
              View Project
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>
      </section>

      {/* Key Achievements */}
      <section className="rounded-3xl bg-gradient-to-br from-primary/5 via-cream to-accent/5 p-8 md:p-12">
        <div className="text-center mb-8">
          <p className="section-heading">HIGHLIGHTS</p>
          <h2 className="h2">Key Achievements</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl p-6 text-center space-y-3 shadow-soft">
            <div className="text-4xl font-bold text-primary">4.2×</div>
            <p className="text-sm text-ink/70">Peak transmission amplification factor measured at SPR</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center space-y-3 shadow-soft">
            <div className="text-4xl font-bold text-accent">3</div>
            <p className="text-sm text-ink/70">Interactive research tools developed & deployed</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center space-y-3 shadow-soft">
            <div className="text-4xl font-bold text-highlight">100+</div>
            <p className="text-sm text-ink/70">Hours of cleanroom fabrication experience</p>
          </div>

          <div className="bg-white rounded-xl p-6 text-center space-y-3 shadow-soft">
            <div className="text-4xl font-bold text-primary">2+</div>
            <p className="text-sm text-ink/70">Years of optics research experience</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary rounded-3xl p-8 md:p-12 lg:p-16 text-center text-white">
        <div className="max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Let's Connect</h2>
          <p className="text-xl text-white/90 leading-relaxed">
            I'm actively seeking opportunities in optical engineering, photonics R&D, and computational optics. 
            Whether it's advancing sensor technology, developing photonic devices, or building analysis tools—let's discuss how I can contribute to your team.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <a href="mailto:dawson.eoin@gmail.com" className="btn bg-white text-primary hover:bg-cream">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Send Email
            </a>
            <a href="https://calendly.com/eoindawson" target="_blank" rel="noopener noreferrer" className="btn bg-highlight text-ink hover:bg-highlight/90">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Schedule a 15-Minute Chat
            </a>
            <a href="/resume.pdf" download className="btn bg-transparent border-2 border-white text-white hover:bg-white/10">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CV
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
