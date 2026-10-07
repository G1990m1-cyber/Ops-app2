import React from 'react'

import type { Hotel, Media } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { lexicalToPlainText } from '@/utilities/lexicalToPlainText'

const abs = (u?: string | null) => (u ? (u.startsWith('http') ? u : `${getServerSideURL()}${u}`) : undefined)
const img = (m?: Media | number | string | null) => (m && typeof m === 'object' ? abs(m.sizes?.large?.url || m.url) : undefined)

/** Hotel / LodgingBusiness structured data for Google. */
export const HotelJsonLd: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const base = getServerSideURL()
  const a = hotel.address || {}
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': ['Hotel', 'LodgingBusiness'],
    '@id': `${base}/${hotel.slug}#hotel`,
    name: hotel.name,
    url: `${base}/${hotel.slug}`,
    description: lexicalToPlainText(hotel.intro) || undefined,
    image: [img(hotel.heroPoster), img(hotel.heroMedia), ...(hotel.gallery || []).slice(0, 4).map((g) => img(g.image))].filter(Boolean),
    telephone: hotel.phone || undefined,
    email: hotel.email || undefined,
    priceRange: hotel.priceRange || undefined,
    checkinTime: hotel.checkIn || undefined,
    checkoutTime: hotel.checkOut || undefined,
    address: {
      '@type': 'PostalAddress',
      streetAddress: [a.line1, a.line2].filter(Boolean).join(', ') || undefined,
      addressLocality: a.town || undefined,
      addressRegion: a.county || undefined,
      postalCode: a.postcode || undefined,
      addressCountry: 'GB',
    },
    geo: hotel.map?.lat && hotel.map?.lng ? { '@type': 'GeoCoordinates', latitude: hotel.map.lat, longitude: hotel.map.lng } : undefined,
    amenityFeature: (hotel.facilities || []).map((f) => ({ '@type': 'LocationFeatureSpecification', name: f.replace(/-/g, ' '), value: true })),
    sameAs: [hotel.social?.facebook, hotel.social?.instagram, hotel.social?.tripadvisor, hotel.social?.x].filter(Boolean),
    parentOrganization: { '@type': 'Organization', name: 'GR Hotels', url: base },
    potentialAction: hotel.bookingUrl ? { '@type': 'ReserveAction', target: hotel.bookingUrl } : undefined,
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export const OrganizationJsonLd: React.FC<{ name: string; logo?: string | null; sameAs?: (string | null | undefined)[]; hotels: Hotel[] }> = ({ name, logo, sameAs, hotels }) => {
  const base = getServerSideURL()
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${base}#org`,
    name,
    url: base,
    logo: abs(logo),
    sameAs: (sameAs || []).filter(Boolean),
    subOrganization: hotels.map((h) => ({ '@type': 'Hotel', name: h.name, url: `${base}/${h.slug}` })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export const BreadcrumbJsonLd: React.FC<{ items: { name: string; path: string }[] }> = ({ items }) => {
  const base = getServerSideURL()
  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({ '@type': 'ListItem', position: i + 1, name: it.name, item: `${base}${it.path}` })),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
