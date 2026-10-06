import React from 'react'

import { Icon } from '@/components/Icons'
import RichText from '@/components/RichText'
import { Section, SectionHeading } from '@/components/Section'
import { Button } from '@/components/ui/Button'
import type { Hotel, MapBlock as M } from '@/payload-types'
import { telHref } from '@/utilities/booking'

import { MapEmbed } from './MapEmbed'

export const MapBlockComponent: React.FC<M & { contextHotel?: Hotel | null }> = ({ heading, hotel: picked, showDirections, style, contextHotel }) => {
  const hotel = (picked && typeof picked === 'object' ? picked : contextHotel) as Hotel | null
  if (!hotel) return null
  const a = hotel.address || {}
  const lines = [a.line1, a.line2, [a.town, a.postcode].filter(Boolean).join(' '), a.county].filter(Boolean)
  const lat = hotel.map?.lat
  const lng = hotel.map?.lng
  const q = encodeURIComponent(`${hotel.name}, ${lines.join(', ')}`)
  const directions = hotel.map?.directionsUrl || (lat && lng ? `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}` : `https://www.google.com/maps/dir/?api=1&destination=${q}`)

  return (
    <Section style={style} id="find-us">
      <SectionHeading heading={heading} />
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2" data-reveal>
          <address className="not-italic">
            <p className="font-display text-[1.5rem]">{hotel.name}</p>
            {lines.map((l) => (
              <p key={l}>{l}</p>
            ))}
          </address>
          <ul className="mt-6 grid gap-3 text-[1.05rem]">
            {hotel.phone && (
              <li className="flex items-center gap-3">
                <Icon name="phone" className="h-5 w-5 text-bronze [.tone-charcoal_&]:text-gold" />
                <a href={telHref(hotel.phone)} className="link-underline">{hotel.phone}</a>
              </li>
            )}
            {hotel.email && (
              <li className="flex items-center gap-3">
                <Icon name="mail" className="h-5 w-5 text-bronze [.tone-charcoal_&]:text-gold" />
                <a href={`mailto:${hotel.email}`} className="link-underline break-all">{hotel.email}</a>
              </li>
            )}
            {(hotel.checkIn || hotel.checkOut) && (
              <li className="flex items-center gap-3">
                <Icon name="clock" className="h-5 w-5 text-bronze [.tone-charcoal_&]:text-gold" />
                <span>Check-in from {hotel.checkIn || '3pm'}, check-out by {hotel.checkOut || '11am'}</span>
              </li>
            )}
          </ul>
          <div className="mt-7">
            <Button href={directions} newTab variant="secondary">
              <Icon name="pin" className="h-5 w-5" /> Get directions
            </Button>
          </div>
          {showDirections !== false && hotel.directions && (
            <div className="mt-8">
              <RichText data={hotel.directions} className="text-[1.05rem]" />
            </div>
          )}
        </div>
        <div className="lg:col-span-3" data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
          <MapEmbed lat={lat ?? null} lng={lng ?? null} query={q} name={hotel.name} />
        </div>
      </div>
    </Section>
  )
}
