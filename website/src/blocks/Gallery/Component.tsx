import React from 'react'

import { Media } from '@/components/Media'
import { Section, SectionHeading } from '@/components/Section'
import type { GalleryBlock as G, Hotel, Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { Lightbox } from './Lightbox'

export const GalleryBlock: React.FC<G & { hotel?: Hotel | null }> = ({ heading, source, images, layout, columns, style, hotel }) => {
  const items = (source === 'hotel' ? hotel?.gallery : images) || []
  const resolved = items
    .map((i) => (i.image && typeof i.image === 'object' ? { image: i.image as MediaType, caption: i.caption || i.image.caption || '' } : null))
    .filter((x): x is { image: MediaType; caption: string } => Boolean(x))
  if (!resolved.length) return null

  const cols = Number(columns || 3)
  const colClass = cols === 2 ? 'sm:columns-2' : cols === 4 ? 'sm:columns-2 lg:columns-4' : 'sm:columns-2 lg:columns-3'
  const gridClass = cols === 2 ? 'sm:grid-cols-2' : cols === 4 ? 'sm:grid-cols-2 lg:grid-cols-4' : 'sm:grid-cols-2 lg:grid-cols-3'

  return (
    <Section style={style} flush={layout === 'strip'}>
      <div className={cn(layout === 'strip' && 'container-site')}>
        <SectionHeading heading={heading} />
      </div>
      <Lightbox images={resolved.map((r) => ({ src: r.image.sizes?.large?.url || r.image.url || '', alt: r.image.alt, caption: r.caption, width: r.image.sizes?.large?.width || r.image.width || 1600, height: r.image.sizes?.large?.height || r.image.height || 1000 }))}>
        {layout === 'strip' ? (
          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:px-10">
            {resolved.map((r, i) => (
              <button key={i} type="button" data-lightbox-index={i} className="img-hover relative aspect-[4/3] w-[78vw] shrink-0 snap-center overflow-hidden rounded-2xl bg-linen sm:w-[48vw] lg:w-[32vw]" aria-label={`Open photo ${i + 1}${r.caption ? `: ${r.caption}` : ''}`}>
                <Media resource={r.image} fill size="large" sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 33vw" />
              </button>
            ))}
          </div>
        ) : layout === 'grid' ? (
          <div className={cn('grid gap-4', gridClass)}>
            {resolved.map((r, i) => (
              <button key={i} type="button" data-lightbox-index={i} className="img-hover relative aspect-[4/3] overflow-hidden rounded-2xl bg-linen" aria-label={`Open photo ${i + 1}${r.caption ? `: ${r.caption}` : ''}`} data-reveal style={{ '--reveal-delay': `${(i % 4) * 70}ms` } as React.CSSProperties}>
                <Media resource={r.image} fill size="card" sizes="(max-width: 640px) 100vw, 33vw" />
              </button>
            ))}
          </div>
        ) : (
          <div className={cn('columns-1 gap-4 [&>*]:mb-4', colClass)}>
            {resolved.map((r, i) => (
              <button key={i} type="button" data-lightbox-index={i} className="img-hover block w-full overflow-hidden rounded-2xl bg-linen break-inside-avoid" aria-label={`Open photo ${i + 1}${r.caption ? `: ${r.caption}` : ''}`} data-reveal style={{ '--reveal-delay': `${(i % 4) * 70}ms` } as React.CSSProperties}>
                <Media resource={r.image} size="large" sizes="(max-width: 640px) 100vw, 33vw" className="h-auto w-full" />
              </button>
            ))}
          </div>
        )}
      </Lightbox>
    </Section>
  )
}
