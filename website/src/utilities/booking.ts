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

export type BookTarget = { name: string; slug: string; bookingUrl?: string | null; phone?: string | null }

export const toBookTarget = (hotel: Hotel): BookTarget => ({
  name: hotel.name,
  slug: hotel.slug || '',
  bookingUrl: hotel.bookingUrl,
  phone: hotel.phone,
})
