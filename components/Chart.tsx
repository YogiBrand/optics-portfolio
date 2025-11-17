'use client'

export type Trace = any
export type Layout = any

let PlotlyModule: any = null

export async function renderPlot(el: HTMLDivElement, traces: Trace[], layout: Layout) {
  try {
    // Cache the Plotly module to avoid re-importing
    if (!PlotlyModule) {
      // Dynamic import to avoid SSR issues with Plotly's browser globals
      const module = await import('plotly.js-dist-min')
      // Handle both ES and CommonJS module formats
      PlotlyModule = module.default || module
    }
    
    if (!PlotlyModule || !PlotlyModule.newPlot) {
      console.error('Plotly not loaded correctly:', PlotlyModule)
      throw new Error('Plotly.newPlot is not available')
    }
    
    await PlotlyModule.newPlot(el, traces as any, layout, {responsive: true})
  } catch (error) {
    console.error('Error rendering plot:', error)
    // Display error message in the chart container
    el.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #e0e0e0; text-align: center; padding: 2rem;">
        <div>
          <p style="font-size: 1.2rem; margin-bottom: 0.5rem; font-weight: 600;">Unable to load chart</p>
          <p style="font-size: 0.9rem; opacity: 0.7;">Please refresh the page or try again later</p>
        </div>
      </div>
    `
  }
}
