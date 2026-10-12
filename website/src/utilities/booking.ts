import { isMediaObject, mediaUrl } from '@/components/Media'
import type { Hotel } from '@/payload-types'

/** Adds UTM tags to a booking engine URL. Existing query strings are kept. */
export const withUtm = (
  url: string,
  params: { source?: string; medium?: string; campaign?: string; content?: string },
): string => {
  try {
    const u = new URL(url)
    if (params.source && !u.searchParams.has('utm_source')) u.searchParams.set('utm_source', params.source)
    if (params.medium && !u.searchParams.has('utm_medium')) u.searchParams.set('utm_medium', params.medium)
    if (params.campaign && !u.searchParams.has('utm_campaign')) u.searchParams.set('utm_campaign', params.campaign)
    if (params.content && !u.searchParams.has('utm_content')) u.searchParams.set('utm_content', params.content)
    return u.toString()
  } catch {
    return url
  }
}

export const telHref = (phone?: string | null) => (phone ? `tel:${phone.replace(/[^\d+]/g, '')}` : undefined)

export type BookTarget = {
  name: string
  slug: string
  location?: string | null
  /** Small photo for pickers and menus (card size). */
  image?: string | null
  imageAlt?: string | null
  bookingUrl?: string | null
  phone?: string | null
}

export const toBookTarget = (hotel: Hotel): BookTarget => {
  const hero = isMediaObject(hotel.heroMedia) ? hotel.heroMedia : null
  const still = hero && hero.mimeType?.startsWith('video/') ? (isMediaObject(hotel.heroPoster) ? hotel.heroPoster : null) : hero
  return {
    name: hotel.name,
    slug: hotel.slug || '',
    location: hotel.location,
    image: still ? mediaUrl(still, 'card') : null,
    imageAlt: still?.alt || hotel.name,
    bookingUrl: hotel.bookingUrl,
    phone: hotel.phone,
  }
}
