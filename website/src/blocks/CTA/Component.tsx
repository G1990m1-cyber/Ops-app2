import React from 'react'

import { CMSLink, type CMSLinkType } from '@/components/Link'
import { Media, isMediaObject } from '@/components/Media'
import { Section } from '@/components/Section'
import type { CTABlock as C, Hotel } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const CTABlockComponent: React.FC<C & { contextHotel?: Hotel | null }> = ({ title, text, links, backgroundImage, style, contextHotel }) => {
  const hasImage = isMediaObject(backgroundImage)
  const center = style?.align === 'center'
  if (hasImage) {
    return (
      <section className="relative overflow-hidden bg-charcoal text-cream">
        <Media resource={backgroundImage} fill size="hero" sizes="100vw" className="absolute inset-0" decorative />
        <div className="absolute inset-0 overlay-tint50" aria-hidden="true" />
        <div className={cn('container-site relative z-10 py-24 md:py-36', center && 'text-center')}>
          <div className={cn('measure-wide', center && 'mx-auto')} data-reveal>
            <h2 className="font-display text-[2.2rem] leading-[1.05] md:text-[3.25rem]">{title}</h2>
            {text && <p className="mt-5 text-[1.2rem] text-cream/90 md:text-[1.35rem]">{text}</p>}
            {links && links.length > 0 && (
              <div className={cn('mt-8 flex flex-wrap gap-4', center && 'justify-center')}>
                {links.map(({ link }, i) => (
                  <CMSLink key={i} {...(link as unknown as CMSLinkType)} contextHotel={contextHotel || null} onImage size="lg" className={link.appearance === 'secondary' ? 'border-cream text-cream hover:bg-cream hover:text-ink' : undefined} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }
  return (
    <Section style={style}>
      <div className={cn('measure-wide', center && 'mx-auto')} data-reveal>
        <h2 className="font-display text-[2rem] leading-[1.08] md:text-[2.75rem]">{title}</h2>
        {text && <p className="mt-4 text-[1.15rem] text-ink-soft [.tone-charcoal_&]:text-cream/85">{text}</p>}
        {links && links.length > 0 && (
          <div className={cn('mt-8 flex flex-wrap gap-4', center && 'justify-center')}>
            {links.map(({ link }, i) => (
              <CMSLink key={i} {...(link as unknown as CMSLinkType)} contextHotel={contextHotel || null} size="lg" />
            ))}
          </div>
        )}
      </div>
    </Section>
  )
}
