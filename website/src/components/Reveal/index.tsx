'use client'

import { useEffect } from 'react'

/**
 * Marks [data-reveal] elements as revealed when they scroll into view.
 * Content is visible without JS and when the visitor prefers reduced motion.
 */
export const RevealObserver: React.FC = () => {
  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || !('IntersectionObserver' in window)) return
    root.classList.add('js')

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            ;(e.target as HTMLElement).dataset.revealed = 'true'
            io.unobserve(e.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )

    const observeAll = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight * 0.9) el.dataset.revealed = 'true'
        else io.observe(el)
      })
    }
    observeAll()
    const mo = new MutationObserver(observeAll)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
      root.classList.remove('js')
    }
  }, [])
  return null
}
