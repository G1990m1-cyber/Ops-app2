import React from 'react'

import { CMSLink, type CMSLinkType } from '@/components/Link'
import { getCachedGlobal } from '@/utilities/getGlobals'

const isLive = (bar: { enabled?: boolean | null; text?: string | null; startDate?: string | null; endDate?: string | null }) => {
  if (!bar?.enabled || !bar.text) return false
  const now = Date.now()
  if (bar.startDate && new Date(bar.startDate).getTime() > now) return false
  if (bar.endDate && new Date(bar.endDate).getTime() < now) return false
  return true
}

export const AnnouncementBar: React.FC = async () => {
  const bar = await getCachedGlobal('announcement-bar', 1)()
  if (!isLive(bar)) return null
  return (
    <div className="relative z-[60] bg-bronze px-4 py-2 text-center text-[0.95rem] text-white">
      <span>{bar.text}</span>
      {bar.hasLink && bar.link && (
        <>
          {' '}
          <CMSLink {...(bar.link as unknown as CMSLinkType)} className="underline underline-offset-2" appearance="inline" />
        </>
      )}
    </div>
  )
}
