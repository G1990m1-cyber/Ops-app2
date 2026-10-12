'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import { MarkerClusterer } from '@googlemaps/markerclusterer'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

import { KEY, MAP_ID, clusterRenderer, loadGoogleMaps, markerIcon } from './googleMaps'

export type HotelPin = {
  name: string
  slug: string
  location: string
  lat: number
  lng: number
  image: string | null
  imageAlt: string
}

const infoHtml = (p: HotelPin): string => {
  const img = p.image
    ? `<img src="${p.image}" alt="${p.imageAlt.replace(/"/g, '&quot;')}" style="width:100%;height:118px;object-fit:cover;display:block;border-radius:10px 10px 0 0" loading="lazy"/>`
    : ''
  return `<a href="/${p.slug}" style="display:block;width:190px;text-decoration:none;color:#262626;font-family:Georgia,serif">
      ${img}
      <span style="display:block;padding:10px 12px 12px">
        <span style="display:block;font-size:17px;line-height:1.15">${p.name}</span>
        <span style="display:block;margin-top:2px;font-size:13px;color:#6f6040">${p.location}</span>
        <span style="display:inline-block;margin-top:8px;font-size:13px;color:#88764c">View hotel &rarr;</span>
      </span>
    </a>`
}

export const GoogleHotelsMap: React.FC<{ pins: HotelPin[] }> = ({ pins }) => {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  const [failed, setFailed] = useState(!KEY)

  // Load the map only once it scrolls into view: keeps the page fast and defers Google's cookies.
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
    let clusterer: any = null
    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !ref.current) return
        const map = new google.maps.Map(ref.current, {
          mapId: MAP_ID,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: 'cooperative',
          backgroundColor: '#efe7db',
        })
        const bounds = new google.maps.LatLngBounds()
        const info = new google.maps.InfoWindow()
        const markers = pins.map((p) => {
          const position = { lat: p.lat, lng: p.lng }
          bounds.extend(position)
          const marker = new google.maps.Marker({ position, icon: markerIcon(google), title: p.name })
          const open = () => {
            info.setContent(infoHtml(p))
            info.open({ map, anchor: marker })
          }
          marker.addListener('mouseover', open)
          marker.addListener('click', open)
          return marker
        })
        // Group nearby hotels (e.g. the two in Berwick) into a numbered cluster when zoomed out.
        clusterer = new MarkerClusterer({ map, markers, renderer: clusterRenderer(google) })
        map.fitBounds(bounds, 56)
        const once = google.maps.event.addListener(map, 'idle', () => {
          if ((map.getZoom() || 0) > 12) map.setZoom(12)
          google.maps.event.removeListener(once)
        })
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
      if (clusterer) clusterer.clearMarkers()
    }
  }, [inView, pins])

  // No API key, or the map could not load: show a simple, useful list of links instead.
  if (failed) {
    return (
      <ul className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
        {pins.map((p) => (
          <li key={p.slug}>
            <Link href={`/${p.slug}`} className="link-underline text-cocoa">
              {p.name}
              <span className="text-ink-soft"> · {p.location}</span>
            </Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <div
      ref={ref}
      className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-linen md:aspect-[16/9]"
      role="application"
      aria-label="Map of GR Hotels locations"
    />
  )
}
