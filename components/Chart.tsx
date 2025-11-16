'use client'

export type Trace = any
export type Layout = any

export async function renderPlot(el: HTMLDivElement, traces: Trace[], layout: Layout) {
  // Dynamic import to avoid SSR issues with Plotly's browser globals
  const Plot = (await import('plotly.js-dist-min')).default
  await Plot.newPlot(el, traces as any, layout, {responsive: true})
}
