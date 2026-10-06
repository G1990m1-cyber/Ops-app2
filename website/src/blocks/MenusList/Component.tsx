import React from 'react'

import { MenuCard } from '@/components/Cards/MenuCard'
import { Section, SectionHeading } from '@/components/Section'
import type { Hotel, MenusListBlock as M } from '@/payload-types'
import { getCurrentMenus } from '@/utilities/data'

export const MenusListBlock: React.FC<M & { contextHotel?: Hotel | null }> = async ({ heading, intro, hotel: picked, types, style, contextHotel }) => {
  const hotel = (picked && typeof picked === 'object' ? picked : contextHotel) as Hotel | null
  if (!hotel) return null
  const menus = await getCurrentMenus(hotel, types || undefined)
  return (
    <Section style={style} id="menus">
      <SectionHeading heading={heading} intro={intro} align={style?.align} />
      {menus.length ? (
        <div className="grid gap-6 lg:grid-cols-2">
          {menus.map((m, i) => (
            <MenuCard key={m.id} menu={m} index={i} />
          ))}
        </div>
      ) : (
        <p className="text-ink-soft [.tone-charcoal_&]:text-cream/70">Our new menus are on their way. Please call {hotel.phone || 'the hotel'} for today&apos;s dishes.</p>
      )}
    </Section>
  )
}
