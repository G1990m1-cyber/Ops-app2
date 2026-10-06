import Link from 'next/link'
import React from 'react'

import { Button } from '@/components/ui/Button'
import { getHotels } from '@/utilities/data'

export default async function NotFound() {
  const hotels = await getHotels().catch(() => [])
  return (
    <section className="container-site py-40 md:py-52">
      <p className="eyebrow mb-4">Page not found</p>
      <h1 className="font-display text-[2.6rem] leading-none md:text-[4rem]">We can&apos;t find that page</h1>
      <p className="mt-5 measure text-ink-soft">It may have moved when we rebuilt the site. Try one of our hotels below, or head back to the start.</p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Button href="/">Home</Button>
        <Button href="/contact-us" variant="secondary">Contact us</Button>
      </div>
      {hotels.length > 0 && (
        <ul className="mt-12 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {hotels.map((h) => (
            <li key={h.id}>
              <Link href={`/${h.slug}`} className="link-underline text-cocoa">{h.name}</Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
