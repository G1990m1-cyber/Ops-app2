'use client'

import NextImage from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { Icon } from '@/components/Icons'

type Img = { src: string; alt: string; caption?: string; width: number; height: number }

/** Delegates clicks from any child with data-lightbox-index and shows a simple, accessible lightbox. */
export const Lightbox: React.FC<{ images: Img[]; children: React.ReactNode }> = ({ images, children }) => {
  const [index, setIndex] = useState<number | null>(null)

  const onClick = (e: React.MouseEvent) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>('[data-lightbox-index]')
    if (!el) return
    setIndex(Number(el.dataset.lightboxIndex))
  }

  const close = useCallback(() => setIndex(null), [])
  const step = useCallback((d: number) => setIndex((i) => (i === null ? null : (i + d + images.length) % images.length)), [images.length])

  useEffect(() => {
    if (index === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') step(1)
      if (e.key === 'ArrowLeft') step(-1)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, close, step])

  const img = index !== null ? images[index] : null

  return (
    <div onClick={onClick}>
      {children}
      {img &&
        createPortal(
          <div role="dialog" aria-modal="true" aria-label={img.alt || 'Photo'} className="fixed inset-0 z-[110] flex items-center justify-center bg-charcoal/92 p-4 motion-safe:animate-[fade-up_0.25s_ease-out]">
            <button type="button" onClick={close} aria-label="Close" className="absolute right-4 top-4 rounded-full bg-cream/10 p-2 text-cream hover:bg-cream/20">
              <Icon name="close" className="h-6 w-6" />
            </button>
            {images.length > 1 && (
              <>
                <button type="button" onClick={() => step(-1)} aria-label="Previous photo" className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 p-2 text-cream hover:bg-cream/20 md:left-6">
                  <Icon name="arrow" className="h-6 w-6 rotate-180" />
                </button>
                <button type="button" onClick={() => step(1)} aria-label="Next photo" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-cream/10 p-2 text-cream hover:bg-cream/20 md:right-6">
                  <Icon name="arrow" className="h-6 w-6" />
                </button>
              </>
            )}
            <figure className="max-h-full max-w-6xl">
              <NextImage key={img.src} src={img.src} alt={img.alt} width={img.width} height={img.height} sizes="100vw" className="max-h-[82vh] w-auto rounded-lg object-contain" priority />
              {img.caption && <figcaption className="mt-3 text-center text-cream/80">{img.caption}</figcaption>}
            </figure>
          </div>,
          document.body,
        )}
    </div>
  )
}
