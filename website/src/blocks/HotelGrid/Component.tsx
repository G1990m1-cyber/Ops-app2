import Link from 'next/link'
import React from 'react'

import { BookNowButton } from '@/components/BookNow/BookNowButton'
import { HotelCard } from '@/components/Cards/HotelCard'
import { Icon } from '@/components/Icons'
import { Media } from '@/components/Media'
import { Section, SectionHeading } from '@/components/Section'
import type { Hotel, HotelGridBlock as H } from '@/payload-types'
import { getHotels } from '@/utilities/data'
import { lexicalToPlainText } from '@/utilities/lexicalToPlainText'
import { cn } from '@/utilities/ui'

export const HotelGridBlock: React.FC<H> = async ({ heading, intro, hotels: picked, layout, style }) => {
  let hotels: Hotel[] = []
  if (Array.isArray(picked) && picked.length) hotels = picked.filter((h): h is Hotel => typeof h === 'object' && h !== null)
  else hotels = await getHotels()
  if (!hotels.length) return null

  return (
    <Section style={style} id="hotels">
      <SectionHeading heading={heading} intro={intro} align={style?.align} />
      {layout === 'rows' ? (
        <div className="grid gap-16 md:gap-24">
          {hotels.map((h, i) => {
            const intro = lexicalToPlainText(h.intro)
            const media = h.heroMedia && typeof h.heroMedia === 'object' && h.heroMedia.mimeType?.startsWith('video/') ? h.heroPoster : h.heroMedia
            return (
              <article key={h.id} className="grid items-center gap-8 md:grid-cols-12 md:gap-12">
                <Link href={`/${h.slug}`} className={cn('img-hover relative block aspect-[4/3] overflow-hidden rounded-xl bg-linen md:col-span-7', i % 2 === 1 && 'md:order-2')} aria-label={h.name} data-reveal>
                  <Media resource={media} fill size="large" sizes="(max-width: 768px) 100vw, 58vw" />
                </Link>
                <div className="md:col-span-5" data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
                  <p className="eyebrow mb-3">{h.location}</p>
                  <h3 className="font-display text-[2rem] leading-[1.05] md:text-[2.6rem]">
                    <Link href={`/${h.slug}`} className="hover:text-cocoa">{h.name}</Link>
                  </h3>
                  {h.tagline && <p className="mt-2 text-[1.15rem] italic text-ink-soft">{h.tagline}</p>}
                  {intro && <p className="mt-4 line-clamp-4">{intro}</p>}
                  <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                    <BookNowButton hotel={h} placement="card" />
                    <Link href={`/${h.slug}`} className="link-underline inline-flex items-center gap-1.5 text-cocoa">
                      Explore {h.name} <Icon name="arrow" className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      ) : (
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {hotels.map((h, i) => (
            <HotelCard key={h.id} hotel={h} index={i} priority={i < 3} />
          ))}
        </div>
      )}
    </Section>
  )
}
