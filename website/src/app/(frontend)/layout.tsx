import type { Metadata, Viewport } from 'next'
import { draftMode } from 'next/headers'
import React from 'react'

import { AnnouncementBar } from '@/components/AnnouncementBar'
import { MobileBookBar } from '@/components/BookNow/MobileBookBar'
import { CookieConsent } from '@/components/Consent/CookieConsent'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RevealObserver } from '@/components/Reveal'
import { toBookTarget } from '@/utilities/booking'
import { getHotels } from '@/utilities/data'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { getServerSideURL } from '@/utilities/getURL'
import { cn } from '@/utilities/ui'

import { bodyFont, displayFont } from './fonts'
import './globals.css'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: draft } = await draftMode()
  const [settings, hotels] = await Promise.all([getCachedGlobal('site-settings', 1)(), getHotels()])

  return (
    <html lang="en-GB" className={cn(bodyFont.variable, displayFont.variable)}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <AnnouncementBar />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileBookBar hotels={hotels.map(toBookTarget)} />
        <CookieConsent gtmId={process.env.NEXT_PUBLIC_GTM_ID} title={settings.cookies?.title} text={settings.cookies?.text} />
        <RevealObserver />
        {draft && <LivePreviewListener />}
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  title: { default: 'GR Hotels', template: '%s' },
}

export const viewport: Viewport = {
  themeColor: '#faf6f1',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}
