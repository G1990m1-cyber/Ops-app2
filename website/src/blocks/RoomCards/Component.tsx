import React from 'react'

import { RoomCard } from '@/components/Cards/RoomCard'
import { Section, SectionHeading } from '@/components/Section'
import type { Hotel, Room, RoomCardsBlock as R } from '@/payload-types'
import { getRooms } from '@/utilities/data'

export const RoomCardsBlock: React.FC<R & { contextHotel?: Hotel | null }> = async ({ heading, intro, source, hotel: pickedHotel, rooms: picked, style, contextHotel }) => {
  const hotel = (source === 'hotel' && pickedHotel && typeof pickedHotel === 'object' ? pickedHotel : contextHotel) as Hotel | null
  let rooms: Room[] = []
  if (source === 'custom' && Array.isArray(picked)) {
    rooms = picked.filter((r): r is Room => typeof r === 'object' && r !== null)
  } else if (hotel) {
    rooms = await getRooms(hotel)
  }
  if (!rooms.length) return null
  return (
    <Section style={style} id="rooms">
      <SectionHeading heading={heading} intro={intro} align={style?.align} />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room, i) => {
          const h = (typeof room.hotel === 'object' && room.hotel ? room.hotel : hotel) as Hotel
          return <RoomCard key={room.id} room={room} hotel={h} index={i} />
        })}
      </div>
    </Section>
  )
}
