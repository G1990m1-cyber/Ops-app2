'use client'

import Script from 'next/script'
import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/Button'
import Link from 'next/link'

const KEY = 'gr-consent'
type Choice = 'granted' | 'denied'

type Props = { gtmId?: string; title?: string | null; text?: string | null }

/**
 * First-party cookie banner. GTM only loads after "Accept". The choice is kept
 * for 12 months in localStorage and mirrored to a cookie so the server can read it later.
 */
export const CookieConsent: React.FC<Props> = ({ gtmId, title, text }) => {
  const [choice, setChoice] = useState<Choice | null | 'unknown'>('unknown')

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) {
        const parsed = JSON.parse(raw) as { choice: Choice; at: number }
        if (Date.now() - parsed.at < 365 * 24 * 3600 * 1000) {
          setChoice(parsed.choice)
          return
        }
      }
    } catch {
      /* ignore */
    }
    setChoice(null)
  }, [])

  const decide = (c: Choice) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ choice: c, at: Date.now() }))
      document.cookie = `${KEY}=${c}; max-age=${365 * 24 * 3600}; path=/; SameSite=Lax`
    } catch {
      /* ignore */
    }
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: 'consent_update', analytics_storage: c, ad_storage: c })
    setChoice(c)
  }

  useEffect(() => {
    // Expose a way to reopen the banner from the footer "Cookie settings" link.
    const handler = () => setChoice(null)
    window.addEventListener('gr:open-consent', handler)
    return () => window.removeEventListener('gr:open-consent', handler)
  }, [])

  return (
    <>
      {choice === 'granted' && gtmId && (
        <>
          <Script id="gtm-consent" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)};gtag('consent','default',{'ad_storage':'granted','analytics_storage':'granted','ad_user_data':'granted','ad_personalization':'granted'});`}
          </Script>
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        </>
      )}
      {choice === null && (
        <div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie choices"
          className="fixed inset-x-3 bottom-[4.75rem] z-50 mx-auto max-w-xl rounded-2xl border border-linen bg-cream p-5 md:inset-x-auto md:bottom-6 md:left-6 md:p-6 motion-safe:animate-fade-up"
        >
          <p className="font-display text-[1.35rem] leading-tight">{title || 'A word about cookies'}</p>
          <p className="mt-2 text-[1rem] leading-snug text-ink-soft">
            {text || 'We use cookies to understand how the site is used and to measure our advertising. Analytics only run if you accept.'}{' '}
            <Link href="/cookie-policy" className="underline underline-offset-2">
              Cookie policy
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="sm" onClick={() => decide('granted')}>
              Accept
            </Button>
            <Button size="sm" variant="secondary" onClick={() => decide('denied')}>
              Essential only
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export const openConsent = () => window.dispatchEvent(new Event('gr:open-consent'))
