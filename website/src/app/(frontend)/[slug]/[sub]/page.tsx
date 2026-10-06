import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import React from 'react'

import { EventCard } from '@/components/Cards/EventCard'
import { MenuCard } from '@/components/Cards/MenuCard'
import { OfferCard } from '@/components/Cards/OfferCard'
import { RoomCard } from '@/components/Cards/RoomCard'
import { EnquiryForm } from '@/components/Forms/EnquiryForm'
import { HotelSubnav, type HotelSection } from '@/components/HotelPage/HotelSubnav'
import { SubpageHeader } from '@/components/HotelPage/SubpageHeader'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import RichText from '@/components/RichText'
import { Section } from '@/components/Section'
import { MapBlockComponent } from '@/blocks/Map/Component'
import { getCurrentMenus, getCurrentOffers, getHotelBySlug, getRooms, getUpcomingEvents } from '@/utilities/data'
import { generateMeta } from '@/utilities/generateMeta'
import { redirectOrNotFound } from '@/utilities/redirects'

type Args = { params: Promise<{ slug: string; sub: string }> }

const SECTIONS: Record<string, { title: string; intro: (name: string) => string }> = {
  rooms: { title: 'Rooms', intro: (n) => `Every room at ${n} is individually furnished. Book direct for the best rate.` },
  dining: { title: 'Dining', intro: () => 'Seasonal menus, local produce and a proper welcome.' },
  events: { title: "What's on", intro: (n) => `Live music, supper clubs and seasonal celebrations at ${n}.` },
  offers: { title: 'Offers', intro: () => 'Seasonal breaks and exclusive direct-booking deals.' },
  'weddings-and-functions': { title: 'Weddings & functions', intro: () => 'A characterful setting and a team who will look after every detail.' },
  contact: { title: 'Find us', intro: () => 'Directions, contact details and a quick way to send us a message.' },
}

export default async function HotelSubPage({ params }: Args) {
  const { slug, sub } = await params
  const { isEnabled: draft } = await draftMode()
  const hotel = await getHotelBySlug(decodeURIComponent(slug), draft)
  if (!hotel) await redirectOrNotFound(`/${slug}/${sub}`)
  const section = SECTIONS[sub]
  if (!hotel || !section || (sub === 'weddings-and-functions' && !hotel.hasWeddings)) await redirectOrNotFound(`/${slug}/${sub}`)
  if (!hotel || !section) notFound()

  const crumbs = [
    { name: 'Home', path: '/' },
    { name: hotel.name, path: `/${hotel.slug}` },
    { name: section.title, path: `/${hotel.slug}/${sub}` },
  ]

  let body: React.ReactNode = null
  const hiddenHeading = <h2 className="sr-only">{`${section.title} at ${hotel.name}`}</h2>

  if (sub === 'rooms') {
    const rooms = await getRooms(hotel, draft)
    body = (
      <Section>
        {hiddenHeading}
        {rooms.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {rooms.map((r, i) => <RoomCard key={r.id} room={r} hotel={hotel} index={i} />)}
          </div>
        ) : (
          <p className="text-ink-soft">Room details are being added. Please call {hotel.phone || 'us'} to book.</p>
        )}
      </Section>
    )
  } else if (sub === 'dining') {
    const menus = await getCurrentMenus(hotel)
    body = (
      <Section>
        {hiddenHeading}
        {menus.length ? (
          <div className="grid gap-6 lg:grid-cols-2">
            {menus.map((m, i) => <MenuCard key={m.id} menu={m} index={i} />)}
          </div>
        ) : (
          <p className="text-ink-soft">Our new menus are on their way. Please call {hotel.phone || 'the hotel'} for today&apos;s dishes.</p>
        )}
      </Section>
    )
  } else if (sub === 'events') {
    const events = await getUpcomingEvents(hotel, 24)
    body = (
      <Section>
        {hiddenHeading}
        {events.length ? (
          <div className="grid gap-5 lg:grid-cols-2">
            {events.map((e, i) => <EventCard key={e.id} event={e} index={i} />)}
          </div>
        ) : (
          <p className="text-ink-soft">Nothing in the diary just now. Follow us on social media for the next date.</p>
        )}
      </Section>
    )
  } else if (sub === 'offers') {
    const offers = await getCurrentOffers(hotel, 12)
    body = (
      <Section>
        {hiddenHeading}
        {offers.length ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {offers.map((o, i) => <OfferCard key={o.id} offer={o} index={i} contextHotel={hotel} />)}
          </div>
        ) : (
          <p className="text-ink-soft">No offers running right now. Booking direct always gets you our best rate.</p>
        )}
      </Section>
    )
  } else if (sub === 'weddings-and-functions') {
    body = (
      <>
        <Section>
          <div className="measure" data-reveal>
            {hotel.weddingsIntro ? <RichText data={hotel.weddingsIntro} /> : <p>Tell us about your day and our events team will be in touch.</p>}
          </div>
        </Section>
        <Section style={{ tone: 'sand' }} id="enquire">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-display text-[2rem] leading-tight">Start planning</h2>
              <p className="mt-3 text-ink-soft">A few details and we will come back with dates and ideas.</p>
            </div>
            <div className="lg:col-span-3">
              <EnquiryForm hotelId={hotel.id} hotelName={hotel.name} showStayFields={false} />
            </div>
          </div>
        </Section>
      </>
    )
  } else if (sub === 'contact') {
    body = (
      <>
        <MapBlockComponent blockType="map" heading={null} showDirections contextHotel={hotel} style={{ tone: 'cream', spacing: 'normal' }} />
        <Section style={{ tone: 'sand' }} id="enquire">
          <div className="grid gap-10 lg:grid-cols-5 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="font-display text-[2rem] leading-tight">Send us a message</h2>
              <p className="mt-3 text-ink-soft">Your message goes straight to the team at {hotel.name}. We reply within one working day.</p>
            </div>
            <div className="lg:col-span-3">
              <EnquiryForm hotelId={hotel.id} hotelName={hotel.name} />
            </div>
          </div>
        </Section>
      </>
    )
  }

  return (
    <>
      <SubpageHeader hotel={hotel} title={section.title} intro={section.intro(hotel.name)} />
      <HotelSubnav hotel={hotel} current={sub as HotelSection} />
      {body}
      <BreadcrumbJsonLd items={crumbs} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug, sub } = await params
  const hotel = await getHotelBySlug(decodeURIComponent(slug))
  const section = SECTIONS[sub]
  if (!hotel || !section) return {}
  return generateMeta({
    doc: hotel,
    path: `/${hotel.slug}/${sub}`,
    titleOverride: `${section.title} | ${hotel.name}`,
    descriptionOverride: `${section.title} at ${hotel.name}, ${hotel.location}. ${section.intro(hotel.name)}`,
  })
}

export const dynamicParams = true
export function generateStaticParams() {
  return []
}
