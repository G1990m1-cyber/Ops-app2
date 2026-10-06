import React, { Fragment } from 'react'

import type { Hotel, Page } from '@/payload-types'

import { CTABlockComponent } from './CTA/Component'
import { EmbedBlockComponent } from './Embed/Component'
import { EnquiryFormBlockComponent } from './EnquiryForm/Component'
import { EventsListBlock } from './EventsList/Component'
import { FacilitiesBlock } from './Facilities/Component'
import { FAQBlockComponent } from './FAQ/Component'
import { GalleryBlock } from './Gallery/Component'
import { HeroBlock } from './Hero/Component'
import { HotelGridBlock } from './HotelGrid/Component'
import { MapBlockComponent } from './Map/Component'
import { MenusListBlock } from './MenusList/Component'
import { NewsletterBlockComponent } from './Newsletter/Component'
import { OffersBlockComponent } from './OffersBlock/Component'
import { RoomCardsBlock } from './RoomCards/Component'
import { TestimonialsBlockComponent } from './Testimonials/Component'
import { TextBlock } from './Text/Component'
import { TextWithImageBlock } from './TextWithImage/Component'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const components: Record<string, React.ComponentType<any>> = {
  hero: HeroBlock,
  text: TextBlock,
  textWithImage: TextWithImageBlock,
  gallery: GalleryBlock,
  roomCards: RoomCardsBlock,
  facilities: FacilitiesBlock,
  menusList: MenusListBlock,
  eventsList: EventsListBlock,
  offers: OffersBlockComponent,
  testimonials: TestimonialsBlockComponent,
  map: MapBlockComponent,
  faq: FAQBlockComponent,
  cta: CTABlockComponent,
  newsletter: NewsletterBlockComponent,
  enquiryForm: EnquiryFormBlockComponent,
  embed: EmbedBlockComponent,
  hotelGrid: HotelGridBlock,
}

type Blocks = NonNullable<Page['layout']> | NonNullable<Hotel['layout']>

/**
 * Renders a page's block stack. `hotel` is the hotel the page belongs to (if any),
 * so hotel-aware blocks (rooms, menus, map, Book Now) know which hotel to use without being told.
 */
export const RenderBlocks: React.FC<{ blocks?: Blocks | null; hotel?: Hotel | null; hasH1?: boolean }> = ({ blocks, hotel, hasH1 }) => {
  if (!blocks?.length) return null
  const firstHeroIndex = blocks.findIndex((b) => b.blockType === 'hero')
  return (
    <Fragment>
      {blocks.map((block, index) => {
        const Component = components[block.blockType]
        if (!Component) return null
        const isHero = block.blockType === 'hero'
        const extra = isHero
          ? { hotel, isFirst: index === 0, titleAs: index === firstHeroIndex && !hasH1 ? 'h1' : 'h2' }
          : { contextHotel: hotel }
        return <Component key={block.id || index} {...block} {...extra} />
      })}
    </Fragment>
  )
}
