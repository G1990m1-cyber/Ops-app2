'use client'

import React, { useEffect, useState } from 'react'

import { Icon } from '@/components/Icons'

const KEY = 'gr-announcement-dismissed'

/**
 * Wraps the announcement strip with a dismiss button. The dismissal is remembered per message,
 * so a new announcement shows again even if an older one was closed.
 */
export const Dismissible: React.FC<{ messageKey: string; children: React.ReactNode }> = ({ messageKey, children }) => {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === messageKey) setHidden(true)
    } catch {
      /* storage unavailable: just show the bar */
    }
  }, [messageKey])

  if (hidden) return null

  const dismiss = () => {
    setHidden(true)
    try {
      localStorage.setItem(KEY, messageKey)
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="relative bg-bronze text-white" role="region" aria-label="Announcement">
      <div className="px-12 py-2 text-center text-[0.95rem]">{children}</div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-1 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-white/85 transition-colors hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <Icon name="close" className="h-4 w-4" />
      </button>
    </div>
  )
}
