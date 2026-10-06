'use client'

import React, { useState } from 'react'

import { Icon } from '@/components/Icons'

/**
 * Static-first map: a lightweight OpenStreetMap tile preview, then the live
 * Google Maps embed only after a tap. Keeps pages fast and avoids third-party cookies until asked.
 */
export const MapEmbed: React.FC<{ lat: number | null; lng: number | null; query: string; name: string }> = ({ lat, lng, query, name }) => {
  const [live, setLive] = useState(false)
  const hasPin = typeof lat === 'number' && typeof lng === 'number'
  const src = hasPin ? `https://www.google.com/maps?q=${lat},${lng}&z=14&output=embed` : `https://www.google.com/maps?q=${query}&z=14&output=embed`
  const z = 13
  const tile = hasPin
    ? (() => {
        const n = Math.pow(2, z)
        const x = Math.floor(((lng! + 180) / 360) * n)
        const latRad = (lat! * Math.PI) / 180
        const y = Math.floor(((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n)
        return `https://tile.openstreetmap.org/${z}/${x}/${y}.png`
      })()
    : null

  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-linen md:aspect-[16/10]">
      {live ? (
        <iframe title={`Map showing ${name}`} src={src} className="absolute inset-0 h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      ) : (
        <button type="button" onClick={() => setLive(true)} className="group absolute inset-0 flex items-center justify-center" aria-label={`Show interactive map of ${name}`}>
          {tile && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={tile} alt="" className="absolute inset-0 h-full w-full scale-[2.2] object-cover opacity-70 blur-[1px] transition-transform duration-700 group-hover:scale-[2.3]" aria-hidden="true" />
          )}
          <span className="relative z-10 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-3 text-ink">
            <Icon name="pin" className="h-5 w-5 text-bronze" /> Show map
          </span>
          <span className="absolute inset-0 bg-cocoa/20" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
