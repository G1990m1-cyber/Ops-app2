'use client'

import React, { useEffect, useState } from 'react'

import { Icon } from '@/components/Icons'
import { cn } from '@/utilities/ui'

type Item = { quote: string; name: string; source?: string; hotel?: string; rating?: number }

const SOURCE: Record<string, string> = { google: 'Google', tripadvisor: 'TripAdvisor', booking: 'Booking.com', guestbook: 'Guest book', email: 'Email' }

/** Fades gently between quotes. Pauses on hover/focus and honours reduced motion. */
export const TestimonialCarousel: React.FC<{ items: Item[] }> = ({ items }) => {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (items.length < 2 || paused) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const t = setInterval(() => setI((v) => (v + 1) % items.length), 7000)
    return () => clearInterval(t)
  }, [items.length, paused])

  return (
    <div className="mx-auto max-w-3xl text-center" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onFocus={() => setPaused(true)} onBlur={() => setPaused(false)}>
      <Icon name="quote" className="mx-auto h-9 w-9 text-bronze [.tone-charcoal_&]:text-gold" />
      {/* The active quote sits in normal flow so the box grows with it; the others fade out underneath. */}
      <div aria-live="polite" className="relative mt-4 min-h-[9rem]">
        {items.map((it, idx) => (
          <blockquote key={idx} className={cn('transition-opacity duration-700', idx === i ? 'relative opacity-100' : 'pointer-events-none absolute inset-0 opacity-0')} aria-hidden={idx !== i}>
            <p className="font-body text-[1.4rem] italic leading-snug md:text-[1.75rem]">“{it.quote}”</p>
            <footer className="mt-5 text-[1rem] text-ink-soft [.tone-charcoal_&]:text-cream/70">
              {it.rating ? <span className="mr-2 tracking-[0.2em] text-bronze [.tone-charcoal_&]:text-gold" aria-label={`${it.rating} out of 5`}>{'★'.repeat(it.rating)}</span> : null}
              <cite className="not-italic">{it.name}</cite>
              {it.hotel ? ` · ${it.hotel}` : ''}
              {it.source ? ` · ${SOURCE[it.source] || it.source}` : ''}
            </footer>
          </blockquote>
        ))}
      </div>
      {items.length > 1 && (
        <div className="mt-4 flex justify-center">
          {items.map((_, idx) => (
            <button key={idx} type="button" aria-label={`Show review ${idx + 1}`} aria-pressed={idx === i} onClick={() => setI(idx)} className="flex h-11 w-11 items-center justify-center">
              <span className={cn('block h-2 w-2 rounded-full transition-colors', idx === i ? 'bg-bronze [.tone-charcoal_&]:bg-gold' : 'bg-linen [.tone-charcoal_&]:bg-cream/30')} />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
