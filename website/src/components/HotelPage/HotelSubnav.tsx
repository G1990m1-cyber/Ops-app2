import Link from 'next/link'
import React from 'react'

import type { Hotel } from '@/payload-types'
import { cn } from '@/utilities/ui'

export type HotelSection = 'overview' | 'rooms' | 'dining' | 'events' | 'offers' | 'weddings-and-functions' | 'contact'

export const hotelSections = (hotel: Hotel): { key: HotelSection; label: string; href: string }[] => [
  { key: 'overview', label: 'Overview', href: `/${hotel.slug}` },
  { key: 'rooms', label: 'Rooms', href: `/${hotel.slug}/rooms` },
  { key: 'dining', label: 'Dining', href: `/${hotel.slug}/dining` },
  { key: 'events', label: "What's on", href: `/${hotel.slug}/events` },
  { key: 'offers', label: 'Offers', href: `/${hotel.slug}/offers` },
  ...(hotel.hasWeddings ? [{ key: 'weddings-and-functions' as const, label: 'Weddings & functions', href: `/${hotel.slug}/weddings-and-functions` }] : []),
  { key: 'contact', label: 'Find us', href: `/${hotel.slug}/contact` },
]

/** Sticky in-page navigation under the hero on every hotel page. */
export const HotelSubnav: React.FC<{ hotel: Hotel; current: HotelSection }> = ({ hotel, current }) => (
  <nav aria-label={`${hotel.name} sections`} className="sticky top-[4.25rem] z-30 border-b border-linen bg-cream/95 backdrop-blur md:top-[5.25rem]">
    <div className="container-site">
      <ul className="no-scrollbar -mx-5 flex gap-7 overflow-x-auto px-5 text-[1rem] tracking-[0.02em] md:mx-0 md:px-0">
        {hotelSections(hotel).map((s) => (
          <li key={s.key} className="shrink-0">
            <Link
              href={s.href}
              aria-current={s.key === current ? 'page' : undefined}
              className={cn('block border-b-2 py-3.5 transition-colors', s.key === current ? 'border-bronze text-ink' : 'border-transparent text-ink-soft hover:text-ink')}
            >
              {s.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </nav>
)
