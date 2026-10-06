import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { HotelOverview } from '@/components/HotelPage/HotelOverview'
import { HotelJsonLd } from '@/components/JsonLd'
import { getHotelBySlug, getPageBySlug, getPayloadClient } from '@/utilities/data'
import { generateMeta } from '@/utilities/generateMeta'
import { redirectOrNotFound } from '@/utilities/redirects'

type Args = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const payload = await getPayloadClient()
  const [pages, hotels] = await Promise.all([
    payload.find({ collection: 'pages', limit: 500, pagination: false, overrideAccess: true, select: { slug: true }, where: { _status: { equals: 'published' } } }),
    payload.find({ collection: 'hotels', limit: 100, pagination: false, overrideAccess: true, select: { slug: true }, where: { _status: { equals: 'published' } } }),
  ])
  return [...pages.docs.filter((p) => p.slug && p.slug !== 'home'), ...hotels.docs].map((d) => ({ slug: d.slug as string }))
}

export default async function SlugPage({ params }: Args) {
  const { slug } = await params
  const { isEnabled: draft } = await draftMode()
  const decoded = decodeURIComponent(slug)

  const hotel = await getHotelBySlug(decoded, draft)
  if (hotel) {
    return (
      <>
        <HotelOverview hotel={hotel} />
        <HotelJsonLd hotel={hotel} />
      </>
    )
  }

  const page = await getPageBySlug(decoded, draft)
  if (!page) await redirectOrNotFound(`/${decoded}`)
  return <RenderBlocks blocks={page!.layout} />
}

export async function generateMetadata({ params }: Args): Promise<Metadata> {
  const { slug } = await params
  const decoded = decodeURIComponent(slug)
  const hotel = await getHotelBySlug(decoded)
  if (hotel) return generateMeta({ doc: hotel, path: `/${decoded}` })
  const page = await getPageBySlug(decoded)
  return generateMeta({ doc: page, path: `/${decoded}` })
}
