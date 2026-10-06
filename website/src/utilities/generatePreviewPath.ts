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
