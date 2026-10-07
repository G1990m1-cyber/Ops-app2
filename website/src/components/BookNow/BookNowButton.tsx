'use client'

import React, { useCallback, useState } from 'react'

import { Button, type ButtonSize, type ButtonVariant } from '@/components/ui/Button'
import type { Hotel } from '@/payload-types'
import { type BookTarget, telHref, withUtm } from '@/utilities/booking'
import { gtmEvent } from '@/utilities/gtm'
import { cn } from '@/utilities/ui'

import { HotelPicker } from './HotelPicker'

type Props = {
  /** The hotel to book. Null on group pages: a picker opens instead. */
  hotel?: Hotel | BookTarget | null
  label?: string
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  /** Where on the page the button sits; sent to GTM and used as utm_content. */
  placement: 'header' | 'mobile-bar' | 'hero' | 'block' | 'card' | 'picker' | 'room'
  hotels?: BookTarget[]
  roomUrl?: string | null
}

const utm = { source: process.env.NEXT_PUBLIC_UTM_SOURCE || 'grhotels.co.uk', medium: 'website' }

export const BookNowButton: React.FC<Props> = ({
  hotel,
  label = 'Book now',
  variant = 'primary',
  size = 'md',
  className,
  placement,
  hotels,
  roomUrl,
}) => {
  const [open, setOpen] = useState(false)
  const target: BookTarget | null =
    hotel && typeof hotel === 'object'
      ? { name: hotel.name, slug: hotel.slug || '', bookingUrl: hotel.bookingUrl, phone: hotel.phone }
      : null
  const bookingUrl = roomUrl || target?.bookingUrl || null

  const track = useCallback(
    (h: BookTarget | null, url: string | null, method: 'engine' | 'phone' | 'enquiry' | 'picker') => {
      gtmEvent('book_now_click', {
        hotel: h?.name || 'group',
        hotel_slug: h?.slug || null,
        placement,
        method,
        destination: url,
      })
    },
    [placement],
  )

  // Hotel page with a booking engine: straight out in a new tab.
  if (target && bookingUrl) {
    const href = withUtm(bookingUrl, { ...utm, campaign: target.slug, content: placement })
    return (
      <Button
        href={href}
        newTab
        variant={variant}
        size={size}
        className={className}
        onClick={() => track(target, href, 'engine')}
        data-book-now
      >
        {label}
      </Button>
    )
  }

  // Hotel page with no engine yet: phone, or the enquiry form.
  if (target && !bookingUrl) {
    const tel = telHref(target.phone)
    if (tel) {
      return (
        <Button href={tel} variant={variant} size={size} className={className} onClick={() => track(target, tel, 'phone')}>
          {label === 'Book now' ? `Call to book` : label}
        </Button>
      )
    }
    return (
      <Button
        href={`/${target.slug}/contact`}
        variant={variant}
        size={size}
        className={className}
        onClick={() => track(target, `/${target.slug}/contact`, 'enquiry')}
      >
        Enquire
      </Button>
    )
  }

  // Group page: open the hotel picker.
  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={cn(className)}
        onClick={() => {
          setOpen(true)
          track(null, null, 'picker')
        }}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        {label}
      </Button>
      {open && <HotelPicker hotels={hotels} onClose={() => setOpen(false)} placement={placement} />}
    </>
  )
}
