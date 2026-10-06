import React from 'react'

import { EnquiryForm } from '@/components/Forms/EnquiryForm'
import { Section, SectionHeading } from '@/components/Section'
import type { EnquiryFormBlock as E, Hotel } from '@/payload-types'
import { getHotels } from '@/utilities/data'

export const EnquiryFormBlockComponent: React.FC<E & { contextHotel?: Hotel | null }> = async ({ heading, intro, hotel: picked, showStayFields, style, contextHotel }) => {
  const hotel = (picked && typeof picked === 'object' ? picked : contextHotel) as Hotel | null
  const hotels = hotel ? [] : (await getHotels()).map((h) => ({ id: h.id, name: h.name }))
  return (
    <Section style={style} id="enquire">
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2" data-reveal>
          <SectionHeading heading={heading} intro={intro} className="mb-0" />
          {hotel && (
            <p className="mt-4 text-ink-soft [.tone-charcoal_&]:text-cream/70">
              Your message goes straight to the team at {hotel.name}.
              {hotel.phone ? ` Prefer to talk? Call ${hotel.phone}.` : ''}
            </p>
          )}
        </div>
        <div className="lg:col-span-3" data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
          <EnquiryForm hotelId={hotel?.id} hotelName={hotel?.name} hotels={hotels} showStayFields={showStayFields !== false} />
        </div>
      </div>
    </Section>
  )
}
