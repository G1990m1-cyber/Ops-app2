import type { MetadataRoute } from 'next'

import { getPayloadClient } from '@/utilities/data'
import { getServerSideURL } from '@/utilities/getURL'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getServerSideURL()
  const payload = await getPayloadClient()
  const [pages, hotels, rooms] = await Promise.all([
    payload.find({ collection: 'pages', where: { and: [{ _status: { equals: 'published' } }, { showInSitemap: { not_equals: false } }] }, limit: 500, depth: 0, pagination: false, overrideAccess: true, select: { slug: true, updatedAt: true, meta: true } }),
    payload.find({ collection: 'hotels', where: { _status: { equals: 'published' } }, limit: 100, depth: 0, pagination: false, overrideAccess: true, select: { slug: true, updatedAt: true, hasWeddings: true, meta: true } }),
    payload.find({ collection: 'rooms', where: { _status: { equals: 'published' } }, limit: 1000, depth: 1, pagination: false, overrideAccess: true, select: { slug: true, updatedAt: true, hotel: true } }),
  ])

  const out: MetadataRoute.Sitemap = []
  for (const p of pages.docs) {
    if (p.meta?.noIndex) continue
    out.push({ url: p.slug === 'home' ? `${base}/` : `${base}/${p.slug}`, lastModified: p.updatedAt, changeFrequency: 'monthly', priority: p.slug === 'home' ? 1 : 0.6 })
  }
  for (const h of hotels.docs) {
    if (h.meta?.noIndex) continue
    out.push({ url: `${base}/${h.slug}`, lastModified: h.updatedAt, changeFrequency: 'weekly', priority: 0.9 })
    for (const sub of ['rooms', 'dining', 'events', 'offers', 'contact', ...(h.hasWeddings ? ['weddings-and-functions'] : [])]) {
      out.push({ url: `${base}/${h.slug}/${sub}`, lastModified: h.updatedAt, changeFrequency: 'weekly', priority: 0.7 })
    }
  }
  for (const r of rooms.docs) {
    const hotel = typeof r.hotel === 'object' ? r.hotel : null
    if (hotel?.slug) out.push({ url: `${base}/${hotel.slug}/rooms/${r.slug}`, lastModified: r.updatedAt, changeFrequency: 'monthly', priority: 0.6 })
  }
  return out
}
