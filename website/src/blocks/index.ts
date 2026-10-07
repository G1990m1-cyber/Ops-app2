import type { Block } from 'payload'

import { CTA } from './CTA/config'
import { Embed } from './Embed/config'
import { EnquiryForm } from './EnquiryForm/config'
import { EventsList } from './EventsList/config'
import { Facilities } from './Facilities/config'
import { FAQ } from './FAQ/config'
import { Gallery } from './Gallery/config'
import { Hero } from './Hero/config'
import { HotelGrid } from './HotelGrid/config'
import { MapBlock } from './Map/config'
import { MenusList } from './MenusList/config'
import { Newsletter } from './Newsletter/config'
import { OffersBlock } from './OffersBlock/config'
import { RoomCards } from './RoomCards/config'
import { TestimonialsBlock } from './Testimonials/config'
import { Text } from './Text/config'
import { TextWithImage } from './TextWithImage/config'

/** Every block an editor can add to a page or hotel. Order here is the order in the "Add block" menu. */
export const pageBlocks: Block[] = [
  Hero,
  Text,
  TextWithImage,
  Gallery,
  RoomCards,
  Facilities,
  MenusList,
  EventsList,
  OffersBlock,
  TestimonialsBlock,
  MapBlock,
  FAQ,
  CTA,
  Newsletter,
  EnquiryForm,
  Embed,
  HotelGrid,
]
