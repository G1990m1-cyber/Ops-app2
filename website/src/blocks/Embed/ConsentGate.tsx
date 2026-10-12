'use client'

import React, { useEffect, useState } from 'react'

import { Icon } from '@/components/Icons'

/** Third-party frames load only after the visitor has accepted cookies, or taps to load this one. */
export const ConsentGate: React.FC<{ src: string; title: string; provider: string }> = ({ src, title, provider }) => {
  const [allowed, setAllowed] = useState(false)
  useEffect(() => {
    try {
      const raw = localStorage.getItem('gr-consent')
      if (raw && JSON.parse(raw).choice === 'granted') setAllowed(true)
    } catch {
      /* ignore */
    }
  }, [])
  if (allowed) {
    return <iframe src={src} title={title} className="h-full w-full border-0" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
  }
  return (
    <button type="button" onClick={() => setAllowed(true)} className="flex h-full w-full flex-col items-center justify-center gap-3 bg-sand p-6 text-center">
      <Icon name="play" className="h-10 w-10 text-bronze" />
      <span className="text-[1.05rem]">Load {provider === 'google-maps' ? 'map' : 'video'} from {provider.replace('-', ' ')}</span>
      <span className="text-[0.9rem] text-ink-soft">This loads content from a third party which may set cookies.</span>
    </button>
  )
}
