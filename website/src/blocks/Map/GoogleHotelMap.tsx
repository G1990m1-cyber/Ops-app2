'use client'

import React, { useEffect, useRef, useState } from 'react'

import { KEY, MAP_ID, loadGoogleMaps, markerIcon } from '@/blocks/HotelsMap/googleMaps'

/** A single hotel's location, loaded straight away (no "Show map" tap), styled and cookieless-until-seen. */
export const GoogleHotelMap: React.FC<{ lat: number; lng: number; name: string }> = ({ lat, lng, name }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [failed, setFailed] = useState(!KEY)

  useEffect(() => {
    const el = ref.current
    if (!el || !KEY) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true)
          io.disconnect()
        }
      },
      { rootMargin: '200px' },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || !ref.current) return
    let cancelled = false
    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !ref.current) return
        const map = new google.maps.Map(ref.current, {
          mapId: MAP_ID,
          center: { lat, lng },
          zoom: 14,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: 'cooperative',
          backgroundColor: '#efe7db',
        })
        new google.maps.Marker({ position: { lat, lng }, map, icon: markerIcon(google), title: name })
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [inView, lat, lng, name])

  if (failed) {
    // Without a key the map can't load; a static fallback keeps the layout intact.
    return <div className="flex aspect-[4/3] w-full items-center justify-center rounded-2xl bg-linen text-ink-soft md:aspect-[16/10]">Map unavailable</div>
  }

  return (
    <div
      ref={ref}
      className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-linen md:aspect-[16/10]"
      role="application"
      aria-label={`Map showing ${name}`}
    />
  )
}
