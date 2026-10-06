import React from 'react'

import { EventCard } from '@/components/Cards/EventCard'
import { Section, SectionHeading } from '@/components/Section'
import type { EventsListBlock as E, Hotel } from '@/payload-types'
import { getUpcomingEvents } from '@/utilities/data'

export const EventsListBlock: React.FC<E & { contextHotel?: Hotel | null }> = async ({ heading, intro, hotel: picked, limit, style, contextHotel }) => {
  const hotel = (picked && typeof picked === 'object' ? picked : contextHotel) as Hotel | null
  const events = await getUpcomingEvents(hotel, limit || 6)
  return (
    <Section style={style} id="events">
      <SectionHeading heading={heading} intro={intro} align={style?.align} />
      {events.length ? (
        <div className="grid gap-5 lg:grid-cols-2">
          {events.map((e, i) => (
            <EventCard key={e.id} event={e} index={i} showHotel={!hotel} />
          ))}
        </div>
      ) : (
        <p className="text-ink-soft [.tone-charcoal_&]:text-cream/70">Nothing in the diary just now. Follow us on social media for the next date.</p>
      )}
    </Section>
  )
}
