'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

import type { Hotel } from '@/payload-types'
import type { BookTarget } from '@/utilities/booking'

import { BookNowButton } from './BookNowButton'

/** Fixed bottom bar on phones. Hidden in the admin and on the picker itself. */
export const MobileBookBar: React.FC<{ hotel?: Hotel | null; hotels: BookTarget[] }> = ({ hotel, hotels }) => {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  // On a hotel page, deep-link Book now to that hotel; the first path segment is its slug.
  const currentSlug = pathname?.split('/')[1] || ''
  const current: Hotel | BookTarget | null = hotel || hotels.find((t) => t.slug === currentSlug) || null
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-linen bg-cream/95 px-4 pt-2 backdrop-blur md:hidden"
      style={{ paddingBottom: 'calc(0.5rem + env(safe-area-inset-bottom, 0px))' }}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 text-[0.95rem] leading-tight">
          <span className="block truncate font-medium">{current ? current.name : 'GR Hotels'}</span>
          <span className="block truncate text-ink-soft">{current ? 'Best rates when you book direct' : 'Eight hotels, one click'}</span>
        </div>
        <BookNowButton hotel={current} hotels={hotels} placement="mobile-bar" size="md" className="shrink-0" />
      </div>
    </div>
  )
}
