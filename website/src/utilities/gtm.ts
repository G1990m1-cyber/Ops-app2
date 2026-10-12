declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

/** Pushes an event to the GTM data layer. Safe to call before GTM loads: the queue is flushed later. */
export const gtmEvent = (event: string, data: Record<string, unknown> = {}) => {
  if (typeof window === 'undefined') return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ event, ...data })
}
