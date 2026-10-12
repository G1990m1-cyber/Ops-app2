'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

export type HotelPin = {
  name: string
  slug: string
  location: string
  lat: number
  lng: number
  image: string | null
  imageAlt: string
}

const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
// A cloud-styled Map ID (Maps Studio). When set, the cloud style controls the look and the inline
// brand style below is ignored. Not secret; the GR Hotels Map ID is the default, overridable by env.
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || 'e8cff4cdf600b8aec8c25a72'

/** Loads the Google Maps JS API once for the whole page. */
let loaderPromise: Promise<any> | null = null
const loadGoogleMaps = (): Promise<any> => {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'))
  if ((window as any).google?.maps) return Promise.resolve((window as any).google)
  if (loaderPromise) return loaderPromise
  loaderPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    // Note: no `loading=async` — with it, google.maps.Map is not defined yet at onload, so the
    // map constructor throws and the block falls back to the link list. Classic loading makes the
    // Map constructor available as soon as the script's onload fires.
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(KEY)}&v=quarterly`
    s.async = true
    s.defer = true
    s.onload = () => resolve((window as any).google)
    s.onerror = () => reject(new Error('Google Maps failed to load'))
    document.head.appendChild(s)
  })
  return loaderPromise
}

/** Muted, warm map styling so the map sits with the brand rather than shouting. */
const MAP_STYLE: any[] = [
  { elementType: 'geometry', stylers: [{ color: '#efe7db' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#6f6040' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#faf6f1' }, { weight: 2 }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#d9c7a8' }] },
  { featureType: 'landscape.natural', elementType: 'geometry', stylers: [{ color: '#e7dcc6' }] },
  { featureType: 'poi', stylers: [{ visibility: 'off' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#f3ecdf' }] },
  { featureType: 'road', elementType: 'labels', stylers: [{ visibility: 'off' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#e5d6b8' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#bcd2d6' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#8aa0a3' }] },
]

const PIN_SVG = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="46" viewBox="0 0 34 46"><path d="M17 0C7.6 0 0 7.6 0 17c0 12.2 17 29 17 29s17-16.8 17-29C34 7.6 26.4 0 17 0z" fill="#88764c"/><circle cx="17" cy="17" r="6" fill="#faf6f1"/></svg>`,
)

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
    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !ref.current) return
        const map = new google.maps.Map(ref.current, {
          ...(MAP_ID ? { mapId: MAP_ID } : { styles: MAP_STYLE }),
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          gestureHandling: 'cooperative',
          backgroundColor: '#efe7db',
        })
        const bounds = new google.maps.LatLngBounds()
        const info = new google.maps.InfoWindow()
        const icon = {
          url: `data:image/svg+xml;charset=UTF-8,${PIN_SVG}`,
          scaledSize: new google.maps.Size(34, 46),
          anchor: new google.maps.Point(17, 46),
        }
        pins.forEach((p) => {
          const position = { lat: p.lat, lng: p.lng }
          bounds.extend(position)
          const marker = new google.maps.Marker({ position, map, icon, title: p.name })
          const open = () => {
            info.setContent(infoHtml(p))
            info.open({ map, anchor: marker })
          }
          marker.addListener('mouseover', open)
          marker.addListener('click', open)
        })
        map.fitBounds(bounds, 56)
        // Never zoom in too far when there is only one pin.
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
