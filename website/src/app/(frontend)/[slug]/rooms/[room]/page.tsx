import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

import { GalleryBlock } from '@/blocks/Gallery/Component'
import { BookNowButton } from '@/components/BookNow/BookNowButton'
import { RoomCard } from '@/components/Cards/RoomCard'
import { HotelSubnav } from '@/components/HotelPage/HotelSubnav'
import { SubpageHeader } from '@/components/HotelPage/SubpageHeader'
import { Icon } from '@/components/Icons'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import RichText from '@/components/RichText'
import { Section } from '@/components/Section'
import { ROOM_FEATURES } from '@/collections/Rooms'
import { getHotelBySlug, getRoomBySlug, getRooms } from '@/utilities/data'
import { generateMeta } from '@/utilities/generateMeta'
import { redirectOrNotFound } from '@/utilities/redirects'

type Args = { params: Promise<{ slug: string; room: string }> }

export default async function RoomPage({ params }: Args) {
  const { slug, room: roomSlug } = await params
  const { isEnabled: draft } = await draftMode()
  const hotel = await getHotelBySlug(decodeURIComponent(slug), draft)
  if (!hotel) await redirectOrNotFound(`/${slug}/rooms/${roomSlug}`)
  const room = await getRoomBySlug(hotel!, decodeURIComponent(roomSlug), draft)
  if (!room) await redirectOrNotFound(`/${slug}/rooms/${roomSlug}`)
  if (!hotel || !room) notFound()
  const others = (await getRooms(hotel, draft)).filter((r) => r.id !== room.id).slice(0, 3)
  const gallery = (room.gallery || []).map((g) => ({ image: g.image, caption: '' }))

  return (
    <>
      <SubpageHeader hotel={hotel} title={room.name} intro={room.shortDescription} image={room.gallery?.[0]?.image} />
      <HotelSubnav hotel={hotel} current="rooms" />
      <Section>
        <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2" data-reveal>
            <Link href={`/${hotel.slug}/rooms`} className="link-underline mb-6 inline-flex items-center gap-1.5 text-cocoa">
              <Icon name="arrow" className="h-4 w-4 rotate-180" /> All rooms
            </Link>
            <RichText data={room.description} />
            {room.features && room.features.length > 0 && (
              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 text-[1.05rem] sm:grid-cols-3">
                {room.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Icon name="check" className="h-5 w-5 shrink-0 text-bronze" />
                    {ROOM_FEATURES.find((x) => x.value === f)?.label || f}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <aside className="h-fit rounded-2xl bg-sand p-7 lg:sticky lg:top-36" data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
            {room.fromPrice ? (
              <p className="text-ink-soft">
                From <span className="font-display text-[2.2rem] text-ink">£{room.fromPrice}</span> per night
              </p>
            ) : (
              <p className="font-display text-[1.5rem]">Book direct for the best rate</p>
            )}
            <ul className="mt-4 grid gap-2 text-[1.05rem]">
              {room.sleeps ? <li className="flex items-center gap-2"><Icon name="guests" className="h-5 w-5 text-bronze" /> Sleeps {room.sleeps}</li> : null}
              {room.bedType ? <li className="flex items-center gap-2"><Icon name="bed" className="h-5 w-5 text-bronze" /> {room.bedType}</li> : null}
              <li className="flex items-center gap-2"><Icon name="clock" className="h-5 w-5 text-bronze" /> Check-in from {hotel.checkIn || '3pm'}</li>
            </ul>
            <div className="mt-6 grid gap-3">
              <BookNowButton hotel={hotel} roomUrl={room.bookingUrl} placement="room" size="lg" className="w-full" />
              {hotel.phone && (
                <a href={`tel:${hotel.phone.replace(/[^\d+]/g, '')}`} className="text-center text-cocoa link-underline">
                  or call {hotel.phone}
                </a>
              )}
            </div>
          </aside>
        </div>
      </Section>
      {gallery.length > 1 && <GalleryBlock blockType="gallery" source="custom" images={gallery as never} layout="masonry" columns="3" heading="Gallery" style={{ tone: 'sand', spacing: 'normal' }} />}
      {others.length > 0 && (
        <Section>
          <h2 className="mb-8 font-display text-[2rem]">Other rooms at {hotel.name}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((r, i) => <RoomCard key={r.id} room={r} hotel={hotel} index={i} />)}
          </div>
        </Section>
      )}
      <BreadcrumbJsonLd items={[{ name: 'Home', path: '/' }, { name: hotel.name, path: `/${hotel.slug}` }, { name: 'Rooms', path: `/${hotel.slug}/rooms` }, { name: room.name, path: `/${hotel.slug}/rooms/${room.slug}` }]} />
    </>
  )
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug, room: roomSlug } = await params
  const hotel = await getHotelBySlug(decodeURIComponent(slug))
  if (!hotel) return {}
  const room = await getRoomBySlug(hotel, decodeURIComponent(roomSlug))
  if (!room) return {}
  return generateMeta({
    doc: hotel,
    path: `/${hotel.slug}/rooms/${room.slug}`,
    titleOverride: `${room.name} | ${hotel.name}`,
    descriptionOverride: room.shortDescription || `${room.name} at ${hotel.name}, ${hotel.location}.`,
    imageOverride: room.gallery?.[0]?.image,
  })
}
