import React from 'react'

import { CMSLink, type CMSLinkType } from '@/components/Link'
import { getCachedGlobal } from '@/utilities/getGlobals'

import { Dismissible } from './Dismissible'

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
  // Changes to the wording or a re-save bring the bar back for people who dismissed the previous one.
  const messageKey = `${bar.updatedAt || ''}:${bar.text}`
  return (
    <Dismissible messageKey={messageKey}>
      <span>{bar.text}</span>
      {bar.hasLink && bar.link && (
        <>
          {' '}
          <CMSLink {...(bar.link as unknown as CMSLinkType)} className="underline underline-offset-2" appearance="inline" />
        </>
      )}
    </Dismissible>
  )
}
