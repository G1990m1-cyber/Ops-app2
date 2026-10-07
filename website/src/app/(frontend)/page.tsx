import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { OrganizationJsonLd } from '@/components/JsonLd'
import { getHotels, getPageBySlug } from '@/utilities/data'
import { generateMeta } from '@/utilities/generateMeta'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { EmptyHome } from '@/components/HotelPage/EmptyHome'

export default async function HomePage() {
  const { isEnabled: draft } = await draftMode()
  const [page, hotels, settings] = await Promise.all([getPageBySlug('home', draft), getHotels(), getCachedGlobal('site-settings', 1)()])
  if (!page) return <EmptyHome hotels={hotels} />
  return (
    <>
      <RenderBlocks blocks={page.layout} />
      <OrganizationJsonLd
        name={settings.siteName}
        logo={settings.logo && typeof settings.logo === 'object' ? settings.logo.url : null}
        sameAs={[settings.social?.facebook, settings.social?.instagram, settings.social?.linkedin, settings.social?.x]}
        hotels={hotels}
      />
    </>
  )
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageBySlug('home')
  return generateMeta({ doc: page, path: '/' })
}
