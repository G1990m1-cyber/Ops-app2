import type { PayloadRequest } from 'payload'

export type PreviewSearchParams = { path: string; previewSecret: string }

type Props = { path: string | null | undefined; req?: PayloadRequest }

/** Builds the `/next/preview?...` URL used by the admin Preview button and live preview. */
export const generatePreviewPath = ({ path }: Props): string | null => {
  if (!path) return null
  const params = new URLSearchParams({
    path,
    previewSecret: process.env.PREVIEW_SECRET || '',
  } satisfies PreviewSearchParams)
  return `/next/preview?${params.toString()}`
}

export const hotelPath = (hotel: unknown): string | null => {
  if (hotel && typeof hotel === 'object' && 'slug' in hotel && typeof hotel.slug === 'string')
    return `/${hotel.slug}`
  return null
}

/**
 * Like hotelPath, but resolves a bare hotel id to its slug using the request's Payload client.
 * The admin passes related docs at depth 0 (so `data.hotel` is a number), which is why the plain
 * Preview button was dead on Rooms, Menus and Events.
 */
export const resolveHotelPath = async (hotel: unknown, req?: PayloadRequest): Promise<string | null> => {
  const direct = hotelPath(hotel)
  if (direct) return direct
  if ((typeof hotel === 'number' || typeof hotel === 'string') && req?.payload) {
    try {
      const h = await req.payload.findByID({ collection: 'hotels', id: hotel, depth: 0, overrideAccess: true })
      if (h?.slug) return `/${h.slug}`
    } catch {
      /* hotel not set yet or not found */
    }
  }
  return null
}
