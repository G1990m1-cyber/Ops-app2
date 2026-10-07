import Link from 'next/link'
import React from 'react'

import { Icon } from '@/components/Icons'
import { Media } from '@/components/Media'
import { Button } from '@/components/ui/Button'
import type { Event } from '@/payload-types'
import { formatDate, formatTime } from '@/utilities/formatDateTime'
import { cn } from '@/utilities/ui'

export const EventCard: React.FC<{ event: Event; showHotel?: boolean; index?: number; className?: string }> = ({
  event,
  showHotel,
  index = 0,
  className,
}) => {
  const hotel = typeof event.hotel === 'object' ? event.hotel : null
  const d = new Date(event.start)
  return (
    <article
      className={cn('group grid gap-5 rounded-2xl p-5 sm:grid-cols-[6.5rem_1fr] [.tone-cream_&]:bg-sand/70 [.tone-sand_&]:bg-cream [.tone-linen_&]:bg-cream/70 [.tone-charcoal_&]:bg-white/5', className)}
      data-reveal
      style={{ '--reveal-delay': `${Math.min(index, 5) * 80}ms` } as React.CSSProperties}
    >
      <div className="flex flex-row items-baseline gap-2 sm:flex-col sm:items-center sm:justify-center sm:rounded-xl sm:bg-cream sm:py-4 [.tone-charcoal_&]:sm:bg-white/10">
        <span className="font-display text-[2.4rem] leading-none text-bronze [.tone-charcoal_&]:text-gold">{d.getDate()}</span>
        <span className="uppercase tracking-[0.18em] text-[0.8rem]">{d.toLocaleString('en-GB', { month: 'short', timeZone: 'Europe/London' })}</span>
      </div>
      <div className="min-w-0">
        {event.image && (
          <div className="img-hover relative mb-4 aspect-[16/9] overflow-hidden rounded-xl bg-linen sm:hidden">
            <Media resource={event.image} fill size="card" sizes="100vw" />
          </div>
        )}
        <p className="text-[0.95rem] text-ink-soft [.tone-charcoal_&]:text-cream/70">
          {formatDate(event.start)} · {formatTime(event.start)}
          {event.end ? ` to ${formatTime(event.end)}` : ''}
          {showHotel && hotel ? ` · ${hotel.name}` : ''}
        </p>
        <h3 className="mt-1 font-display text-[1.5rem] leading-tight">{event.title}</h3>
        <p className="mt-2 text-[1.05rem]">{event.summary}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          {event.price && <span className="inline-flex items-center gap-1.5 text-[0.95rem]"><Icon name="check" className="h-4 w-4 text-bronze" />{event.price}</span>}
          {event.ticketUrl ? (
            <Button href={event.ticketUrl} newTab size="sm" variant="secondary">
              Book tickets
            </Button>
          ) : hotel ? (
            <Link href={`/${hotel.slug}/contact`} className="link-underline text-cocoa [.tone-charcoal_&]:text-gold">
              Enquire
            </Link>
          ) : null}
        </div>
      </div>
    </article>
  )
}
