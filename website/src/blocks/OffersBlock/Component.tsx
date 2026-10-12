import React from 'react'

import { OfferCard } from '@/components/Cards/OfferCard'
import { Section, SectionHeading } from '@/components/Section'
import type { Hotel, OffersBlock as O } from '@/payload-types'
import { getCurrentOffers } from '@/utilities/data'

export const OffersBlockComponent: React.FC<O & { contextHotel?: Hotel | null }> = async ({ heading, intro, hotel: picked, layout, limit, style, contextHotel }) => {
  const hotel = (picked && typeof picked === 'object' ? picked : contextHotel) as Hotel | null
  const offers = await getCurrentOffers(hotel, limit || 3)
  if (!offers.length) return null
  return (
    <Section style={style} id="offers">
      <SectionHeading heading={heading} intro={intro} align={style?.align} />
      {layout === 'feature' ? (
        <div className="grid gap-8">
          {offers.map((o, i) => (
            <OfferCard key={o.id} offer={o} feature index={i} contextHotel={hotel} />
          ))}
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((o, i) => (
            <OfferCard key={o.id} offer={o} index={i} contextHotel={hotel} />
          ))}
        </div>
      )}
    </Section>
  )
}
