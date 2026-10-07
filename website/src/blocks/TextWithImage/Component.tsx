import React from 'react'

import { CMSLink, type CMSLinkType } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import { Section } from '@/components/Section'
import type { Hotel, TextWithImageBlock as T } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const TextWithImageBlock: React.FC<T & { contextHotel?: Hotel | null }> = ({ image, imagePosition, eyebrow, richText, links, style, contextHotel }) => (
  <Section style={style}>
    <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16 lg:gap-24">
      <div className={cn('img-hover relative aspect-[4/5] overflow-hidden rounded-2xl bg-linen md:aspect-[4/5]', imagePosition === 'right' && 'md:order-2')} data-reveal>
        <Media resource={image} fill size="large" sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      <div data-reveal style={{ '--reveal-delay': '120ms' } as React.CSSProperties}>
        {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
        <RichText data={richText} />
        {links && links.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-4">
            {links.map(({ link }, i) => (
              <CMSLink key={i} {...(link as unknown as CMSLinkType)} contextHotel={contextHotel || null} />
            ))}
          </div>
        )}
      </div>
    </div>
  </Section>
)
