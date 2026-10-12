import React from 'react'

import { Section, SectionHeading } from '@/components/Section'
import { isMediaObject, isVideo, mediaUrl } from '@/components/Media'
import type { HotelsMapBlock as H, Hotel } from '@/payload-types'
import { getHotels } from '@/utilities/data'

import { GoogleHotelsMap, type HotelPin } from './GoogleHotelsMap'

/** Pulls each published hotel's pin (coordinates + a card photo) for the interactive map. */
const toPin = (h: Hotel): HotelPin | null => {
  const lat = h.map?.lat
  const lng = h.map?.lng
  if (typeof lat !== 'number' || typeof lng !== 'number') return null
  const hero = isMediaObject(h.heroMedia) ? h.heroMedia : null
  const still = hero && isVideo(hero) ? (isMediaObject(h.heroPoster) ? h.heroPoster : null) : hero
  return {
    name: h.name,
    slug: h.slug || '',
    location: h.location || '',
    lat,
    lng,
    image: still ? mediaUrl(still, 'card') : null,
    imageAlt: still?.alt || h.name,
  }
}

export const HotelsMapBlock: React.FC<H> = async ({ heading, intro, style }) => {
  const hotels = await getHotels()
  const pins = hotels.map(toPin).filter((p): p is HotelPin => p !== null)
  if (!pins.length) return null
  return (
    <Section style={style}>
      <SectionHeading heading={heading} intro={intro} />
      <GoogleHotelsMap pins={pins} />
    </Section>
  )
}
