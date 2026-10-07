'use client'

import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { Icon } from '@/components/Icons'
import { type BookTarget, telHref, withUtm } from '@/utilities/booking'
import { gtmEvent } from '@/utilities/gtm'

type Props = { hotels?: BookTarget[]; onClose: () => void; placement: string }

/** A clean, focus-trapped dialog listing every hotel. Choosing one goes straight to its engine. */
export const HotelPicker: React.FC<Props> = ({ hotels: provided, onClose, placement }) => {
  const [hotels, setHotels] = useState<BookTarget[]>(provided || [])
  const [loading, setLoading] = useState(!provided)
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (provided) return
    fetch('/api/book-targets')
      .then((r) => r.json())
      .then((d: { hotels: BookTarget[] }) => setHotels(d.hotels || []))
      .catch(() => setHotels([]))
      .finally(() => setLoading(false))
  }, [provided])

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    const first = dialogRef.current?.querySelector<HTMLElement>('a,button')
    first?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && dialogRef.current) {
        const f = dialogRef.current.querySelectorAll<HTMLElement>('a,button')
        if (!f.length) return
        const firstEl = f[0]
        const lastEl = f[f.length - 1]
        if (e.shiftKey && document.activeElement === firstEl) {
          e.preventDefault()
          lastEl.focus()
        } else if (!e.shiftKey && document.activeElement === lastEl) {
          e.preventDefault()
          firstEl.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [onClose])

  const utm = { source: process.env.NEXT_PUBLIC_UTM_SOURCE || 'grhotels.co.uk', medium: 'website' }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center" role="presentation">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-charcoal/55 backdrop-blur-[2px] motion-safe:animate-[fade-up_0.3s_ease-out]"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hotel-picker-title"
        className="relative z-10 max-h-[88vh] w-full overflow-y-auto rounded-t-2xl bg-cream p-6 shadow-none sm:max-w-xl sm:rounded-2xl sm:p-10 motion-safe:animate-fade-up"
      >
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow mb-2">Book direct</p>
            <h2 id="hotel-picker-title" className="font-display text-[1.75rem] leading-tight md:text-[2.25rem]">
              Where would you like to stay?
            </h2>
          </div>
          <button type="button" onClick={onClose} aria-label="Close" className="rounded-full p-2 text-ink hover:bg-sand">
            <Icon name="close" className="h-5 w-5" />
          </button>
        </div>
        {loading ? (
          <p className="text-ink-soft">Loading hotels…</p>
        ) : (
          <ul className="divide-y divide-linen">
            {hotels.map((h) => {
              const engine = h.bookingUrl
                ? withUtm(h.bookingUrl, { ...utm, campaign: h.slug, content: `picker-${placement}` })
                : null
              const tel = telHref(h.phone)
              const href = engine || tel || `/${h.slug}/contact`
              return (
                <li key={h.slug}>
                  <a
                    href={href}
                    target={engine ? '_blank' : undefined}
                    rel={engine ? 'noopener noreferrer' : undefined}
                    onClick={() => {
                      gtmEvent('book_now_click', {
                        hotel: h.name,
                        hotel_slug: h.slug,
                        placement: `picker-${placement}`,
                        method: engine ? 'engine' : tel ? 'phone' : 'enquiry',
                        destination: href,
                      })
                      if (!engine) onClose()
                    }}
                    className="group flex items-center gap-4 py-3 text-left"
                  >
                    <span className="relative block h-16 w-24 shrink-0 overflow-hidden rounded-xl bg-linen">
                      {h.image && (
                        <Image src={h.image} alt="" fill sizes="96px" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-display text-[1.35rem] leading-tight text-bronze">{h.name}</span>
                      <span className="block truncate text-[0.95rem] text-ink-soft">{h.location || ''}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5 text-[0.95rem] text-bronze-deep">
                      <span className="hidden sm:inline">{engine ? 'Book online' : tel ? 'Call' : 'Enquire'}</span>
                      <Icon name={engine ? 'arrowUpRight' : 'arrow'} className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </a>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>,
    document.body,
  )
}
