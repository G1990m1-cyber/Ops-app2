import React from 'react'

import { BookNowButton } from '@/components/BookNow/BookNowButton'
import { CMSLink, type CMSLinkType } from '@/components/Link'
import { Button } from '@/components/ui/Button'
import { Media, isMediaObject, isVideo } from '@/components/Media'
import type { HeroBlock as HeroBlockType, Hotel } from '@/payload-types'
import { cn } from '@/utilities/ui'

const heights: Record<string, string> = {
  full: 'min-h-[100svh]',
  tall: 'min-h-[78svh] md:min-h-[82vh]',
  short: 'min-h-[52svh] md:min-h-[58vh]',
}
const overlays: Record<string, string> = {
  gradient: 'overlay-gradient',
  tint40: 'overlay-tint40',
  tint50: 'overlay-tint50',
  tint60: 'overlay-tint60',
}

type Props = HeroBlockType & { hotel?: Hotel | null; isFirst?: boolean; titleAs?: 'h1' | 'h2' }

export const HeroBlock: React.FC<Props> = ({ media, poster, eyebrow, title, subtitle, links, height, overlay, showBookNow, hotel, isFirst, titleAs = 'h1' }) => {
  const resource = isMediaObject(media) ? media : hotel?.heroMedia
  const posterRes = isMediaObject(poster) ? poster : hotel?.heroPoster
  const heading = title || hotel?.name
  const kicker = eyebrow || (title ? null : hotel?.location)
  const sub = subtitle || (title ? null : hotel?.tagline)
  const Title = titleAs

  return (
    <section className={cn('relative flex items-end overflow-hidden bg-charcoal text-cream', heights[height || 'tall'])} data-hero>
      <div className="absolute inset-[-12%_0_0_0]" data-hero-media>
        {isMediaObject(resource) && (
          <Media
            resource={resource}
            poster={posterRes}
            fill
            size="hero"
            sizes="100vw"
            priority={isFirst}
            className="absolute inset-0 h-full w-full"
            imgClassName={cn(!isVideo(resource) && 'motion-safe:animate-kenburns')}
            videoClassName="h-full w-full"
            decorative
          />
        )}
        <div className={cn('absolute inset-0', overlays[overlay || 'gradient'])} aria-hidden="true" />
      </div>
      <div className="container-site relative z-10 w-full pb-14 pt-40 md:pb-20">
        <div className="max-w-3xl motion-safe:animate-fade-up">
          {kicker && <p className="eyebrow mb-4 !text-cream/90">{kicker}</p>}
          {heading && (
            <Title className="font-display text-[clamp(2.6rem,7vw,5.25rem)] leading-[1.02] text-cream">{heading}</Title>
          )}
          {sub && <p className="mt-5 max-w-xl text-[1.2rem] text-cream/90 md:text-[1.4rem]">{sub}</p>}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {showBookNow !== false && <BookNowButton hotel={hotel || null} placement="hero" size="lg" variant="onImage" />}
            {hotel?.tableBookingUrl && (
              <Button href={hotel.tableBookingUrl} newTab variant="link" size="lg" className="text-cream" onClick={undefined}>
                Book a table
              </Button>
            )}
            {(links || []).map(({ link }, i) => (
              <CMSLink key={i} {...(link as unknown as CMSLinkType)} contextHotel={hotel || null} onImage appearance={link.appearance === 'secondary' ? 'link' : link.appearance} size="lg" className={link.appearance === 'secondary' ? 'text-cream' : undefined} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
