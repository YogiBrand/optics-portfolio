'use client'
import '../styles/globals.css'
import { useState } from 'react'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Eoin Dawson — Optical Design Portfolio</title>
        <meta name="description" content="Optical design & photonics R&D portfolio: SPR gratings, polarization optics, AFM metrology, and code-driven modeling." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body suppressHydrationWarning>
        <nav className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-primary/10 shadow-sm">
          <div className="container py-5 flex items-center justify-between">
            <a href="/" className="text-primary font-bold text-xl md:text-2xl tracking-tight hover:text-accent transition-colors">
              Eoin Dawson
            </a>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/case-studies/ai-spr" className="nav-link text-ink/80 hover:text-primary font-medium transition-all relative group">
                AI SPR
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="/case-studies/afm-vision" className="nav-link text-ink/80 hover:text-accent font-medium transition-all relative group">
                AFM-Vision
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="/demos/polarization" className="nav-link text-ink/80 hover:text-highlight font-medium transition-all relative group">
                Polarization
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-highlight group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="/thesis" className="nav-link text-ink/80 hover:text-primary font-medium transition-all relative group">
                Thesis
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="https://calendly.com/eoindawson" target="_blank" rel="noopener noreferrer" className="btn-highlight text-sm flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedule Chat
              </a>
              <a href="/cv" className="btn-primary text-sm">
                View CV
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-primary hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-primary/10 bg-cream animate-slide-down">
              <div className="container py-4 flex flex-col space-y-4">
                <a href="/case-studies/ai-spr" className="text-ink/80 hover:text-primary font-medium transition-colors py-2">
                  AI SPR
                </a>
                <a href="/case-studies/afm-vision" className="text-ink/80 hover:text-accent font-medium transition-colors py-2">
                  AFM-Vision
                </a>
                <a href="/demos/polarization" className="text-ink/80 hover:text-highlight font-medium transition-colors py-2">
                  Polarization
                </a>
                <a href="/thesis" className="text-ink/80 hover:text-primary font-medium transition-colors py-2">
                  Thesis
                </a>
                <a href="https://calendly.com/eoindawson" target="_blank" rel="noopener noreferrer" className="btn-highlight text-center flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Schedule Chat
                </a>
                <a href="/cv" className="btn-primary text-center">
                  View CV
                </a>
              </div>
            </div>
          )}
        </nav>

        <main className="container py-12 md:py-16 lg:py-20 min-h-screen">
          {children}
        </main>

                <footer className="bg-white border-t border-primary/10">
                  <div className="container py-12">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
                      <div className="space-y-3">
                        <h3 className="font-bold text-primary text-lg">Eoin Dawson</h3>
                        <p className="text-ink/60 text-sm">
                          Optical Design Engineer • Photonics Researcher
                        </p>
                        <div className="space-y-2 text-sm text-ink/60">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <a href="mailto:dawson.eoin@gmail.com" className="hover:text-primary transition-colors">
                              dawson.eoin@gmail.com
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                            <a href="tel:+16133408658" className="hover:text-primary transition-colors">
                              +1 (613) 340-8658
                            </a>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:items-end gap-3">
                        <div className="flex gap-6 text-sm">
                          <a href="/case-studies/ai-spr" className="text-ink/60 hover:text-primary transition-colors">Projects</a>
                          <a href="/thesis" className="text-ink/60 hover:text-primary transition-colors">Research</a>
                          <a href="/cv" className="text-ink/60 hover:text-primary transition-colors">CV</a>
                        </div>
                        <p className="text-ink/40 text-sm">
                          © {new Date().getFullYear()} Eoin Dawson. All rights reserved.
                        </p>
                    </div>
                  </div>
                </div>
              </footer>
      </body>
    </html>
  )
}
