import React from 'react'

import { BookNowButton } from '@/components/BookNow/BookNowButton'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/Button'
import type { Hotel, Offer } from '@/payload-types'
import { formatShortDate } from '@/utilities/formatDateTime'
import { cn } from '@/utilities/ui'

export const OfferCard: React.FC<{ offer: Offer; feature?: boolean; index?: number; className?: string; contextHotel?: Hotel | null }> = ({
  offer,
  feature,
  index = 0,
  className,
  contextHotel,
}) => {
  const hotel = typeof offer.hotel === 'object' && offer.hotel ? offer.hotel : contextHotel || null
  return (
    <article
      className={cn(
        'group overflow-hidden rounded-xl [.tone-cream_&]:bg-sand/70 [.tone-sand_&]:bg-cream [.tone-linen_&]:bg-cream/70 [.tone-charcoal_&]:bg-white/5',
        feature ? 'grid md:grid-cols-2' : 'flex flex-col',
        className,
      )}
      data-reveal
      style={{ '--reveal-delay': `${Math.min(index, 5) * 90}ms` } as React.CSSProperties}
    >
      <div className={cn('img-hover relative bg-linen', feature ? 'aspect-[4/3] md:aspect-auto md:min-h-[24rem]' : 'aspect-[4/3]')}>
        <Media resource={offer.image} fill size={feature ? 'large' : 'card'} sizes={feature ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 640px) 100vw, 33vw'} />
      </div>
      <div className={cn('flex flex-1 flex-col', feature ? 'p-8 md:p-12' : 'p-6')}>
        <p className="eyebrow mb-2">{hotel ? hotel.name : 'All hotels'}</p>
        <h3 className={cn('font-display leading-tight', feature ? 'text-[2rem] md:text-[2.5rem]' : 'text-[1.5rem]')}>{offer.title}</h3>
        <p className="mt-3 text-[1.05rem]">{offer.summary}</p>
        <p className="mt-3 text-[0.95rem] text-ink-soft [.tone-charcoal_&]:text-cream/70">
          Until {formatShortDate(offer.endDate)}
          {offer.promoCode ? (
            <>
              {' '}· Code <span className="font-semibold tracking-wider text-ink [.tone-charcoal_&]:text-cream">{offer.promoCode}</span>
            </>
          ) : null}
        </p>
        <div className="mt-auto pt-5">
          {offer.linkUrl ? (
            <Button href={offer.linkUrl} newTab size="sm">
              Claim offer
            </Button>
          ) : (
            <BookNowButton hotel={hotel} placement="card" size="sm" label="Book this offer" />
          )}
        </div>
      </div>
    </article>
  )
}
