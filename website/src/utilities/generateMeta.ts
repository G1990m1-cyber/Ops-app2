import type { Metadata } from 'next'

import type { Hotel, Media, Page, Room } from '@/payload-types'

import { getCachedGlobal } from './getGlobals'
import { getServerSideURL } from './getURL'
import { lexicalToPlainText } from './lexicalToPlainText'

type Doc = Partial<Hotel> | Partial<Page>

const imageUrl = (m?: Media | number | string | null): string | null => {
  if (!m || typeof m !== 'object') return null
  const u = m.sizes?.og?.url || m.url
  if (!u) return null
  return u.startsWith('http') ? u : `${getServerSideURL()}${u}`
}

/**
 * Builds <head> metadata with sensible fallbacks:
 * title → meta title | hotel/page title + suffix
 * description → meta description | hotel intro | site default
 * image → meta image | hotel hero | site default
 */
export const generateMeta = async (args: {
  doc: Doc | null
  path: string
  titleOverride?: string
  descriptionOverride?: string
  imageOverride?: Media | number | string | null
  room?: Room | null
}): Promise<Metadata> => {
  const { doc, path, titleOverride, descriptionOverride, imageOverride } = args
  const settings = await getCachedGlobal('site-settings', 1)()
  const suffix = settings.seo?.titleSuffix || settings.siteName || 'GR Hotels'
  const base = getServerSideURL()
  const url = `${base}${path === '/' ? '' : path}`

  const isHotel = Boolean(doc && 'location' in doc)
  const hotel = isHotel ? (doc as Partial<Hotel>) : null
  const page = !isHotel ? (doc as Partial<Page> | null) : null

  const baseTitle = titleOverride || (hotel ? `${hotel.name} | ${hotel.location}` : page?.title === 'Home' ? null : page?.title)
  const metaTitle = doc?.meta?.title || (baseTitle ? `${baseTitle} | ${suffix}` : settings.tagline ? `${suffix} | ${settings.tagline}` : suffix)
  const description =
    doc?.meta?.description ||
    descriptionOverride ||
    (hotel ? lexicalToPlainText(hotel.intro).slice(0, 158) : '') ||
    settings.seo?.defaultDescription ||
    'Characterful hotels and pubs with rooms across Britain. Book direct with GR Hotels.'
  const ogImage = imageUrl(imageOverride) || imageUrl(doc?.meta?.image) || imageUrl(hotel?.heroPoster) || imageUrl(hotel?.heroMedia) || imageUrl(settings.seo?.defaultImage)
  const ogTitle = doc?.meta?.ogTitle || metaTitle
  const ogDescription = doc?.meta?.ogDescription || description
  const canonical = doc?.meta?.canonicalUrl || url
  const noIndex = Boolean(doc?.meta?.noIndex)

  return {
    title: metaTitle,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      type: 'website',
      siteName: settings.siteName,
      locale: 'en_GB',
      url,
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
    },
    twitter: {
      card: (doc?.meta?.twitterCard as 'summary' | 'summary_large_image') || 'summary_large_image',
      title: ogTitle,
      description: ogDescription,
      images: ogImage ? [ogImage] : undefined,
      site: settings.seo?.twitterHandle ? `@${settings.seo.twitterHandle}` : undefined,
    },
  }
}
