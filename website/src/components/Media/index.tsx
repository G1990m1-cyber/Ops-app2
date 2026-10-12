import React from 'react'

import { FadeImage as NextImage } from './FadeImage'

import type { Media as MediaType } from '@/payload-types'
import { cn } from '@/utilities/ui'

type SizeName = 'thumbnail' | 'card' | 'square' | 'large' | 'hero' | 'og'

export type MediaProps = {
  resource?: MediaType | number | string | null
  alt?: string
  className?: string
  imgClassName?: string
  fill?: boolean
  priority?: boolean
  sizes?: string
  size?: SizeName
  /** For videos: show a poster image instead of autoplaying. */
  poster?: MediaType | number | string | null
  videoClassName?: string
  decorative?: boolean
}

export const isMediaObject = (m: unknown): m is MediaType =>
  Boolean(m && typeof m === 'object' && 'url' in (m as object))

/** Payload prefixes file URLs with the server URL; Next's image optimiser wants same-origin paths kept relative. */
const toLocalPath = (url: string): string => {
  if (!/^https?:\/\//.test(url)) return url
  try {
    const u = new URL(url)
    if (u.pathname.startsWith('/api/media/') || u.pathname.startsWith('/media/')) return u.pathname + u.search
    return url
  } catch {
    return url
  }
}

export const mediaUrl = (m: MediaType | null | undefined, size?: SizeName): string | null => {
  if (!m) return null
  const raw = (size && m.sizes?.[size]?.url) || m.url || null
  return raw ? toLocalPath(raw) : null
}

export const isVideo = (m: unknown): boolean => isMediaObject(m) && Boolean(m.mimeType?.startsWith('video/'))

/** Focal-point-aware object-position for cropped images. */
const focal = (m: MediaType) =>
  typeof m.focalX === 'number' && typeof m.focalY === 'number'
    ? `${m.focalX}% ${m.focalY}%`
    : '50% 50%'

export const Media: React.FC<MediaProps> = ({
  resource,
  alt,
  className,
  imgClassName,
  fill,
  priority,
  sizes,
  size,
  poster,
  videoClassName,
  decorative,
}) => {
  if (!isMediaObject(resource)) return null

  if (isVideo(resource)) {
    const posterUrl = isMediaObject(poster) ? mediaUrl(poster, 'hero') : undefined
    return (
      <div className={cn('relative overflow-hidden', className)}>
        <video
          className={cn('h-full w-full object-cover', videoClassName)}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={posterUrl || undefined}
          aria-hidden="true"
        >
          <source src={resource.url || ''} type={resource.mimeType || 'video/mp4'} />
        </video>
      </div>
    )
  }

  const src = mediaUrl(resource, size) || ''
  if (!src) return null
  const altText = decorative ? '' : alt ?? resource.alt ?? ''
  const width = (size && resource.sizes?.[size]?.width) || resource.width || 1600
  const height = (size && resource.sizes?.[size]?.height) || resource.height || 1000
  const style = { objectPosition: focal(resource) }

  if (fill) {
    return (
      <NextImage
        alt={altText}
        src={src}
        fill
        priority={priority}
        sizes={sizes || '100vw'}
        className={cn('object-cover', imgClassName)}
        style={style}
        quality={78}
      />
    )
  }

  return (
    <NextImage
      alt={altText}
      src={src}
      width={width}
      height={height}
      priority={priority}
      sizes={sizes || '(max-width: 768px) 100vw, 50vw'}
      className={cn(className, imgClassName)}
      style={style}
      quality={78}
    />
  )
}
