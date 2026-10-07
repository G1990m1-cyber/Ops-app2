import configPromise from '@payload-config'
import { unstable_cache } from 'next/cache'
import { getPayload, type Where } from 'payload'

import type { Event, Hotel, Menu, Offer, Page, Room, Testimonial } from '@/payload-types'

export const getPayloadClient = () => getPayload({ config: configPromise })

const todayISO = () => new Date().toISOString()
const startOfTodayISO = () => {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d.toISOString()
}

/* ── Hotels ─────────────────────────────────────────────────────────────── */

export const getHotels = unstable_cache(
  async (): Promise<Hotel[]> => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'hotels',
      where: { _status: { equals: 'published' } },
      // Tie-break on id so hotels sharing a display-order number always list the same way.
      sort: ['order', 'id'],
      limit: 50,
      depth: 1,
      pagination: false,
      overrideAccess: true,
    })
    return res.docs
  },
  ['hotels-list'],
  { tags: ['collection_hotels'] },
)

export const getHotelBySlug = async (slug: string, draft = false): Promise<Hotel | null> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'hotels',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft,
    overrideAccess: draft,
    pagination: false,
  })
  return res.docs[0] || null
}

/* ── Pages ──────────────────────────────────────────────────────────────── */

export const getPageBySlug = async (slug: string, draft = false): Promise<Page | null> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    draft,
    overrideAccess: draft,
    pagination: false,
  })
  return res.docs[0] || null
}

/* ── Hotel content with date-based visibility ───────────────────────────── */

const hotelId = (hotel: Hotel | number | string) => (typeof hotel === 'object' ? hotel.id : hotel)

export const getRooms = async (hotel: Hotel | number | string, draft = false): Promise<Room[]> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'rooms',
    where: { hotel: { equals: hotelId(hotel) }, ...(draft ? {} : { _status: { equals: 'published' } }) },
    sort: 'order',
    limit: 50,
    depth: 1,
    draft,
    overrideAccess: true,
    pagination: false,
  })
  return res.docs
}

export const getRoomBySlug = async (hotel: Hotel, slug: string, draft = false): Promise<Room | null> => {
  const payload = await getPayloadClient()
  const res = await payload.find({
    collection: 'rooms',
    where: { and: [{ hotel: { equals: hotel.id } }, { slug: { equals: slug } }] },
    limit: 1,
    depth: 1,
    draft,
    overrideAccess: true,
    pagination: false,
  })
  return res.docs[0] || null
}

/** Menus whose date window includes today. Past menus drop off automatically. */
export const getCurrentMenus = async (
  hotel: Hotel | number | string,
  types?: string[] | null,
): Promise<Menu[]> => {
  const payload = await getPayloadClient()
  const now = todayISO()
  const and: Where[] = [
    { hotel: { equals: hotelId(hotel) } },
    { _status: { equals: 'published' } },
    { or: [{ validFrom: { exists: false } }, { validFrom: { less_than_equal: now } }] },
    { or: [{ validTo: { exists: false } }, { validTo: { greater_than_equal: startOfTodayISO() } }] },
  ]
  if (types && types.length) and.push({ type: { in: types } })
  const res = await payload.find({
    collection: 'menus',
    where: { and },
    sort: 'type',
    limit: 50,
    depth: 1,
    overrideAccess: true,
    pagination: false,
  })
  return res.docs
}

/** Upcoming events: anything that has not finished yet (end date, or start date if no end). */
export const getUpcomingEvents = async (
  hotel?: Hotel | number | string | null,
  limit = 6,
): Promise<Event[]> => {
  const payload = await getPayloadClient()
  const start = startOfTodayISO()
  const and: Where[] = [
    { _status: { equals: 'published' } },
    {
      or: [
        { end: { greater_than_equal: start } },
        { and: [{ end: { exists: false } }, { start: { greater_than_equal: start } }] },
      ],
    },
  ]
  if (hotel) and.push({ hotel: { equals: hotelId(hotel) } })
  const res = await payload.find({
    collection: 'events',
    where: { and },
    sort: 'start',
    limit,
    depth: 1,
    overrideAccess: true,
  })
  return res.docs
}

/** Offers live today. On a hotel page: that hotel's offers plus group-wide ones. */
export const getCurrentOffers = async (
  hotel?: Hotel | number | string | null,
  limit = 6,
): Promise<Offer[]> => {
  const payload = await getPayloadClient()
  const now = todayISO()
  const and: Where[] = [
    { _status: { equals: 'published' } },
    { or: [{ startDate: { exists: false } }, { startDate: { less_than_equal: now } }] },
    { endDate: { greater_than_equal: startOfTodayISO() } },
  ]
  if (hotel) and.push({ or: [{ hotel: { equals: hotelId(hotel) } }, { hotel: { exists: false } }] })
  const res = await payload.find({
    collection: 'offers',
    where: { and },
    sort: 'endDate',
    limit,
    depth: 1,
    overrideAccess: true,
  })
  return res.docs
}

export const getTestimonials = async (
  hotel?: Hotel | number | string | null,
  limit = 4,
): Promise<Testimonial[]> => {
  const payload = await getPayloadClient()
  const where: Where = hotel
    ? { or: [{ hotel: { equals: hotelId(hotel) } }, { and: [{ hotel: { exists: false } }, { featured: { equals: true } }] }] }
    : { featured: { equals: true } }
  const res = await payload.find({
    collection: 'testimonials',
    where,
    sort: '-featured,-createdAt',
    limit,
    depth: 1,
    overrideAccess: true,
  })
  return res.docs
}
