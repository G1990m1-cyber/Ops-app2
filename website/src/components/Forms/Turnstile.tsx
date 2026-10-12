'use client'

import Script from 'next/script'
import React, { useEffect, useRef } from 'react'

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: Record<string, unknown>) => string
      remove: (id: string) => void
    }
  }
}

/** Cloudflare Turnstile widget. Renders nothing when no site key is configured. */
export const Turnstile: React.FC<{ onToken: (token: string) => void }> = ({ onToken }) => {
  const ref = useRef<HTMLDivElement>(null)
  const idRef = useRef<string | null>(null)
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY

  useEffect(() => {
    if (!siteKey) return
    let cancelled = false
    const tryRender = () => {
      if (cancelled || !ref.current || !window.turnstile || idRef.current) return
      idRef.current = window.turnstile.render(ref.current, {
        sitekey: siteKey,
        theme: 'light',
        appearance: 'interaction-only',
        callback: (token: string) => onToken(token),
        'expired-callback': () => onToken(''),
      })
    }
    const t = setInterval(tryRender, 300)
    tryRender()
    return () => {
      cancelled = true
      clearInterval(t)
      if (idRef.current && window.turnstile) window.turnstile.remove(idRef.current)
      idRef.current = null
    }
  }, [siteKey, onToken])

  if (!siteKey) return null
  return (
    <>
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="lazyOnload" />
      <div ref={ref} className="min-h-[1px]" />
    </>
  )
}
