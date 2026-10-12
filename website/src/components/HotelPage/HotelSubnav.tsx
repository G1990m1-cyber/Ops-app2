import Link from 'next/link'
import React from 'react'

import type { Hotel } from '@/payload-types'
import type { HotelSectionFlags } from '@/utilities/data'
import { cn } from '@/utilities/ui'

export type HotelSection = 'overview' | 'rooms' | 'dining' | 'events' | 'offers' | 'weddings-and-functions' | 'contact'

export const hotelSections = (
  hotel: Hotel,
  flags?: HotelSectionFlags,
): { key: HotelSection; label: string; href: string }[] =>
  [
    { key: 'overview' as const, label: 'Overview', href: `/${hotel.slug}`, show: true },
    { key: 'rooms' as const, label: 'Rooms', href: `/${hotel.slug}/rooms`, show: true },
    { key: 'dining' as const, label: 'Dining', href: `/${hotel.slug}/dining`, show: flags ? flags.dining : true },
    { key: 'events' as const, label: "What's on", href: `/${hotel.slug}/events`, show: flags ? flags.events : true },
    { key: 'offers' as const, label: 'Offers', href: `/${hotel.slug}/offers`, show: flags ? flags.offers : true },
    ...(hotel.hasWeddings
      ? [{ key: 'weddings-and-functions' as const, label: 'Weddings & functions', href: `/${hotel.slug}/weddings-and-functions`, show: true }]
      : []),
    { key: 'contact' as const, label: 'Find us', href: `/${hotel.slug}/contact`, show: true },
  ]
    .filter((s) => s.show)
    .map(({ key, label, href }) => ({ key, label, href }))

/** Sticky in-page navigation under the hero on every hotel page. */
export const HotelSubnav: React.FC<{ hotel: Hotel; current: HotelSection; flags?: HotelSectionFlags }> = ({ hotel, current, flags }) => (
  <nav aria-label={`${hotel.name} sections`} className="sticky top-[4.25rem] z-30 border-b border-linen bg-cream/95 backdrop-blur md:top-[5.25rem]">
    <div className="container-site">
      <ul className="no-scrollbar -mx-5 flex gap-7 overflow-x-auto px-5 text-[1rem] tracking-[0.02em] md:mx-0 md:px-0">
        {hotelSections(hotel, flags).map((s) => (
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
