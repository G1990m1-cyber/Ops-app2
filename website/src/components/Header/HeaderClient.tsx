'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

import { BookNowButton } from '@/components/BookNow/BookNowButton'
import { Icon } from '@/components/Icons'
import { hrefFromReference } from '@/components/Link'
import type { Hotel, Media, Navigation } from '@/payload-types'
import type { BookTarget } from '@/utilities/booking'
import { mediaUrl } from '@/components/Media'
import { cn } from '@/utilities/ui'

type HotelLite = { name: string; slug: string; location: string }

type Props = {
  nav: Navigation
  siteName: string
  logo: Media | null
  hotels: HotelLite[]
  bookTargets: BookTarget[]
  hotel: Hotel | null
}

const Wordmark: React.FC<{ siteName: string; logo: Media | null; light: boolean }> = ({ siteName, logo, light }) => {
  if (logo?.url) {
    // Any logo colour works: forced to white over photos, to charcoal on the cream bar.
    // Rendered through next/image so it is served same-origin, resized and preloaded (it is often the largest thing above the fold).
    const h = 64
    const w = logo.width && logo.height ? Math.round((h * logo.width) / logo.height) : h * 2
    return (
      <Image
        src={mediaUrl(logo) || logo.url}
        alt={siteName}
        width={w}
        height={h}
        priority
        quality={90}
        className={cn('h-12 w-auto md:h-16', light ? 'brightness-0 invert' : 'brightness-0')}
      />
    )
  }
  return (
    <span className={cn('font-display text-[1.6rem] leading-none tracking-[0.04em] md:text-[1.9rem]', light ? 'text-cream' : 'text-ink')}>
      {siteName}
    </span>
  )
}

export const HeaderClient: React.FC<Props> = ({ nav, siteName, logo, hotels, bookTargets, hotel }) => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hotelsOpen, setHotelsOpen] = useState(false)
  const hotelsRef = useRef<HTMLLIElement>(null)

  // Transparent over a hero at the top of a page, solid cream once scrolled.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
    setHotelsOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (hotelsRef.current && !hotelsRef.current.contains(e.target as Node)) setHotelsOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [])

  const items = (nav.header || [])
    .map((i) => {
      const l = i.link
      const href = l.type === 'reference' ? hrefFromReference(l.reference as never) : l.url || null
      return href ? { href, label: l.label || '', newTab: Boolean(l.newTab) } : null
    })
    .filter((x): x is { href: string; label: string; newTab: boolean } => Boolean(x))

  const onHero = !scrolled && !open
  const light = onHero

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:bg-cream focus:px-4 focus:py-2">
        Skip to content
      </a>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500',
          onHero ? 'bg-transparent' : 'bg-cream/92 backdrop-blur-md border-b border-linen/70',
        )}
        data-light={light}
      >
        <div className="container-site flex h-[4.25rem] items-center justify-between gap-6 md:h-[5.25rem]">
          <Link href="/" className="shrink-0" aria-label={`${siteName} home`}>
            <Wordmark siteName={siteName} logo={logo} light={light} />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className={cn('flex items-center gap-8 text-[1.05rem] tracking-[0.02em]', light ? 'text-cream' : 'text-ink')}>
              <li ref={hotelsRef} className="relative">
                <button
                  type="button"
                  className="link-underline inline-flex items-center gap-1.5 py-2"
                  aria-expanded={hotelsOpen}
                  aria-controls="hotels-menu"
                  onClick={() => setHotelsOpen((v) => !v)}
                >
                  Our hotels <Icon name="chevron" className={cn('h-4 w-4 transition-transform', hotelsOpen && 'rotate-180')} />
                </button>
                <div
                  id="hotels-menu"
                  className={cn(
                    'absolute left-1/2 top-full z-50 mt-3 w-[34rem] -translate-x-1/2 rounded-2xl border border-linen bg-cream p-3 text-ink transition-all duration-300',
                    hotelsOpen ? 'visible opacity-100 translate-y-0' : 'invisible opacity-0 -translate-y-1',
                  )}
                >
                  <ul className="grid grid-cols-2 gap-1">
                    {hotels.map((h) => (
                      <li key={h.slug}>
                        <Link
                          href={`/${h.slug}`}
                          prefetch={false}
                          className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-sand"
                          aria-current={pathname === `/${h.slug}` ? 'page' : undefined}
                        >
                          <span className="block leading-tight">{h.name}</span>
                          <span className="block text-[0.9rem] text-ink-soft">{h.location}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <Link href="/hotels" prefetch={false} className="mt-2 flex items-center justify-between rounded-xl px-3 py-2.5 text-cocoa hover:bg-sand">
                    See all hotels <Icon name="arrow" className="h-5 w-5" />
                  </Link>
                </div>
              </li>
              {items.map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    prefetch={false}
                    className="link-underline py-2"
                    target={i.newTab ? '_blank' : undefined}
                    aria-current={pathname === i.href ? 'page' : undefined}
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <BookNowButton
                hotel={hotel}
                hotels={bookTargets}
                placement="header"
                size="md"
                variant={light ? 'onImage' : 'primary'}
              />
            </div>
            <button
              type="button"
              className={cn('rounded-full p-2 lg:hidden', light ? 'text-cream' : 'text-ink')}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              <Icon name={open ? 'close' : 'menu'} className="h-7 w-7" />
            </button>
          </div>
        </div>

      </header>
      {/* Mobile menu. Lives outside the header: the header's backdrop blur would otherwise trap this fixed panel inside it. */}
      <div
        id="mobile-menu"
        className={cn(
          'fixed inset-0 z-40 flex flex-col overflow-y-auto bg-cream pt-[4.25rem] transition-opacity duration-300 lg:hidden',
          open ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="container-site flex-1 pb-32 pt-6">
          <ul className="grid gap-1">
            {items.map((i) => (
              <li key={i.href}>
                <Link href={i.href} prefetch={false} className="block border-b border-linen py-3.5 font-display text-[1.9rem] leading-none text-bronze">
                  {i.label}
                </Link>
              </li>
            ))}
          </ul>
          <p className="eyebrow mb-3 mt-10">Our hotels</p>
          <ul className="grid gap-1">
            {hotels.map((h) => (
              <li key={h.slug}>
                <Link href={`/${h.slug}`} prefetch={false} className="flex flex-col gap-0.5 border-b border-linen py-3 text-[1.25rem] text-ink">
                  <span>{h.name}</span>
                  <span className="text-[0.95rem] text-ink-soft">{h.location}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </>
  )
}
