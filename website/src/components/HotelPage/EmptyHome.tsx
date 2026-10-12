import Link from 'next/link'
import React from 'react'

import type { Hotel } from '@/payload-types'

/** Shown only before the site has been seeded, so a fresh deployment is never a blank page. */
export const EmptyHome: React.FC<{ hotels: Hotel[] }> = ({ hotels }) => (
  <section className="container-site py-40">
    <p className="eyebrow mb-4">GR Hotels</p>
    <h1 className="font-display text-[3rem] leading-none">The site is nearly ready</h1>
    <p className="mt-4 measure text-ink-soft">
      No home page has been published yet. Log in to <Link href="/admin" className="underline">/admin</Link> and publish the page called “home”, or run the seed script.
    </p>
    {hotels.length > 0 && (
      <ul className="mt-8 grid gap-2">
        {hotels.map((h) => (
          <li key={h.id}>
            <Link href={`/${h.slug}`} className="link-underline text-cocoa">{h.name}</Link>
          </li>
        ))}
      </ul>
    )}
  </section>
)
