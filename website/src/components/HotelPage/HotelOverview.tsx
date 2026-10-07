import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { HeroBlock } from '@/blocks/Hero/Component'
import type { Hotel } from '@/payload-types'

import { HotelSubnav } from './HotelSubnav'

/**
 * The hotel's main page. If the editor's block stack does not start with a Hero,
 * we add one from the hotel's own hero media so every hotel page opens full-bleed.
 */
export const HotelOverview: React.FC<{ hotel: Hotel }> = ({ hotel }) => {
  const blocks = hotel.layout || []
  const startsWithHero = blocks[0]?.blockType === 'hero'
  return (
    <>
      {!startsWithHero && <HeroBlock blockType="hero" hotel={hotel} isFirst height="tall" overlay="gradient" showBookNow />}
      <HotelSubnav hotel={hotel} current="overview" />
      <RenderBlocks blocks={blocks} hotel={hotel} />
    </>
  )
}
