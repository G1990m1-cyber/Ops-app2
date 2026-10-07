import React from 'react'

import { getHotels } from '@/utilities/data'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { toBookTarget } from '@/utilities/booking'
import type { Hotel } from '@/payload-types'

import { AnnouncementBar } from '@/components/AnnouncementBar'

import { HeaderClient } from './HeaderClient'

export const Header: React.FC<{ hotel?: Hotel | null }> = async ({ hotel }) => {
  const [nav, settings, hotels] = await Promise.all([
    getCachedGlobal('navigation', 1)(),
    getCachedGlobal('site-settings', 1)(),
    getHotels(),
  ])
  return (
    <HeaderClient
      nav={nav}
      siteName={settings.siteName}
      logo={settings.logo && typeof settings.logo === 'object' ? settings.logo : null}
      hotels={hotels.map((h) => ({ name: h.name, slug: h.slug || '', location: h.location }))}
      bookTargets={hotels.map(toBookTarget)}
      hotel={hotel || null}
      announcement={<AnnouncementBar />}
    />
  )
}
