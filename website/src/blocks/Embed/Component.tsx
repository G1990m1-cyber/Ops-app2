import React from 'react'

import { Section, SectionHeading } from '@/components/Section'
import type { EmbedBlock as E } from '@/payload-types'

import { ConsentGate } from './ConsentGate'

const ratio: Record<string, string> = { '16:9': 'aspect-video', '4:3': 'aspect-[4/3]', '1:1': 'aspect-square' }

/** Turns share links into embeddable URLs for a short allowlist of providers. */
const toEmbedUrl = (provider: string, url: string): string | null => {
  try {
    const u = new URL(url)
    if (provider === 'youtube') {
      const id = u.hostname.includes('youtu.be') ? u.pathname.slice(1) : u.searchParams.get('v') || u.pathname.split('/').pop()
      return id ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1` : null
    }
    if (provider === 'vimeo') {
      const id = u.pathname.split('/').filter(Boolean).pop()
      return id ? `https://player.vimeo.com/video/${id}?dnt=1` : null
    }
    if (provider === 'google-maps') return u.hostname.endsWith('google.com') ? url : null
    const allowed = ['youtube.com', 'youtube-nocookie.com', 'vimeo.com', 'google.com', 'eviivo.com', 'mews.com', 'guestline.com', 'resdiary.com', 'opentable.co.uk', 'sevenrooms.com', 'hubspot.com', 'tockify.com']
    return allowed.some((d) => u.hostname === d || u.hostname.endsWith(`.${d}`)) ? url : null
  } catch {
    return null
  }
}

export const EmbedBlockComponent: React.FC<E> = ({ heading, provider, url, title, aspect, style }) => {
  const src = toEmbedUrl(provider, url)
  if (!src) return null
  return (
    <Section style={style}>
      <SectionHeading heading={heading} />
      <div className={`${ratio[aspect || '16:9']} overflow-hidden rounded-2xl bg-linen`} data-reveal>
        <ConsentGate src={src} title={title} provider={provider} />
      </div>
    </Section>
  )
}
