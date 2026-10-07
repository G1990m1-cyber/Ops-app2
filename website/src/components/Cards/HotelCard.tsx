import Link from 'next/link'
import React from 'react'

import { BookNowButton } from '@/components/BookNow/BookNowButton'
import { Icon } from '@/components/Icons'
import { Media } from '@/components/Media'
import type { Hotel } from '@/payload-types'
import { lexicalToPlainText } from '@/utilities/lexicalToPlainText'
import { cn } from '@/utilities/ui'

export const HotelCard: React.FC<{ hotel: Hotel; index?: number; className?: string; priority?: boolean }> = ({
  hotel,
  index = 0,
  className,
  priority,
}) => {
  const intro = lexicalToPlainText(hotel.intro)
  const media = hotel.heroMedia && typeof hotel.heroMedia === 'object' && hotel.heroMedia.mimeType?.startsWith('video/')
    ? hotel.heroPoster
    : hotel.heroMedia
  return (
    <article
      className={cn('group lift flex flex-col', className)}
      data-reveal
      style={{ '--reveal-delay': `${Math.min(index, 5) * 90}ms` } as React.CSSProperties}
    >
      <Link href={`/${hotel.slug}`} className="img-hover relative block aspect-[4/3] overflow-hidden rounded-2xl bg-linen" aria-label={hotel.name}>
        <Media resource={media} fill size="card" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" priority={priority} />
      </Link>
      <div className="flex flex-1 flex-col pt-5">
        <p className="eyebrow mb-2">{hotel.location}</p>
        <h3 className="font-display text-[1.6rem] leading-tight">
          <Link href={`/${hotel.slug}`} className="transition-colors group-hover:text-cocoa">
            {hotel.name}
          </Link>
        </h3>
        {intro && <p className="mt-3 line-clamp-3 text-[1.05rem] text-ink-soft [.tone-charcoal_&]:text-cream/80">{intro}</p>}
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
          <BookNowButton hotel={hotel} placement="card" size="sm" />
          <Link href={`/${hotel.slug}`} className="link-underline inline-flex items-center gap-1.5 text-cocoa [.tone-charcoal_&]:text-gold">
            Explore <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
