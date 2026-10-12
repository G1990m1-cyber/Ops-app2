import Link from 'next/link'
import React from 'react'

import { BookNowButton } from '@/components/BookNow/BookNowButton'
import { Icon } from '@/components/Icons'
import { Media } from '@/components/Media'
import type { Hotel, Room } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const RoomCard: React.FC<{ room: Room; hotel: Hotel; index?: number; className?: string }> = ({ room, hotel, index = 0, className }) => {
  const image = room.gallery?.[0]?.image
  const href = `/${hotel.slug}/rooms/${room.slug}`
  return (
    <article
      className={cn('group lift flex flex-col overflow-hidden rounded-2xl bg-white/60 [.tone-cream_&]:bg-sand/70 [.tone-sand_&]:bg-cream [.tone-charcoal_&]:bg-white/5', className)}
      data-reveal
      style={{ '--reveal-delay': `${Math.min(index, 5) * 90}ms` } as React.CSSProperties}
    >
      <Link href={href} className="img-hover relative block aspect-[4/3] bg-linen" aria-label={room.name}>
        <Media resource={image} fill size="card" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      </Link>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.45rem] leading-tight">
            <Link href={href} className="transition-colors group-hover:text-cocoa">
              {room.name}
            </Link>
          </h3>
          {room.fromPrice ? (
            <p className="shrink-0 text-right text-[0.95rem] leading-tight text-ink-soft [.tone-charcoal_&]:text-cream/70">
              from
              <span className="block text-[1.25rem] text-ink [.tone-charcoal_&]:text-cream">£{room.fromPrice}</span>
            </p>
          ) : null}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[0.95rem] text-ink-soft [.tone-charcoal_&]:text-cream/70">
          {room.sleeps ? (
            <li className="inline-flex items-center gap-1.5">
              <Icon name="guests" className="h-4 w-4 text-bronze" /> Sleeps {room.sleeps}
            </li>
          ) : null}
          {room.bedType ? (
            <li className="inline-flex items-center gap-1.5">
              <Icon name="bed" className="h-4 w-4 text-bronze" /> {room.bedType}
            </li>
          ) : null}
          {room.features?.includes('dog-friendly') ? (
            <li className="inline-flex items-center gap-1.5">
              <Icon name="dog-friendly" className="h-4 w-4 text-bronze" /> Dog friendly
            </li>
          ) : null}
        </ul>
        {room.shortDescription && <p className="mt-3 text-[1.05rem]">{room.shortDescription}</p>}
        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-3 pt-5">
          <BookNowButton hotel={hotel} roomUrl={room.bookingUrl} placement="room" size="sm" />
          <Link href={href} className="link-underline inline-flex items-center gap-1.5 text-cocoa [.tone-charcoal_&]:text-gold">
            Details <Icon name="arrow" className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
