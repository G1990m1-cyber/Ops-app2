import Link from 'next/link'
import React from 'react'

import { Media, isMediaObject } from '@/components/Media'
import type { Hotel, Media as MediaType } from '@/payload-types'

/** Short hero for hotel sub-pages: the hotel's image, tinted, with the section title. */
export const SubpageHeader: React.FC<{ hotel: Hotel; title: string; intro?: string | null; image?: MediaType | number | string | null }> = ({ hotel, title, intro, image }) => {
  const media = isMediaObject(image) ? image : hotel.heroMedia && typeof hotel.heroMedia === 'object' && hotel.heroMedia.mimeType?.startsWith('video/') ? hotel.heroPoster : hotel.heroMedia
  return (
    <section className="relative flex min-h-[46svh] items-end overflow-hidden bg-charcoal text-cream md:min-h-[52vh]">
      <Media resource={media} fill size="hero" sizes="100vw" priority className="absolute inset-0" decorative />
      <div className="absolute inset-0 overlay-gradient" aria-hidden="true" />
      <div className="container-site relative z-10 w-full pb-10 pt-36 md:pb-14">
        <p className="eyebrow mb-3 !text-gold">
          <Link href={`/${hotel.slug}`} className="hover:underline">{hotel.name}</Link> · {hotel.location}
        </p>
        <h1 className="font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.03] text-cream">{title}</h1>
        {intro && <p className="mt-4 max-w-2xl text-[1.15rem] text-cream/90 md:text-[1.3rem]">{intro}</p>}
      </div>
    </section>
  )
}
