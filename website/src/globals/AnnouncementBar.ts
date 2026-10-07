import type { GlobalConfig } from 'payload'

import { hiddenUnlessAdmin, isAdmin } from '@/access'
import { link } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidate'

export const AnnouncementBar: GlobalConfig = {
  slug: 'announcement-bar',
  label: 'Announcement bar',
  access: { read: () => true, update: isAdmin },
  admin: { group: 'Settings', hidden: hiddenUnlessAdmin, description: 'A thin strip above the header for time-limited news.' },
  hooks: { afterChange: [revalidateGlobal('announcement-bar')] },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: false },
    { name: 'text', type: 'text', maxLength: 120, admin: { condition: (data) => Boolean(data?.enabled) } },
    {
      name: 'hasLink',
      type: 'checkbox',
      label: 'Add a link',
      admin: { condition: (data) => Boolean(data?.enabled) },
    },
    link({
      appearances: false,
      overrides: { admin: { condition: (data) => Boolean(data?.enabled && data?.hasLink) } },
    }),
    {
      type: 'row',
      admin: { condition: (data) => Boolean(data?.enabled) },
      fields: [
        { name: 'startDate', type: 'date', label: 'Show from', admin: { width: '50%', date: { pickerAppearance: 'dayAndTime' } } },
        { name: 'endDate', type: 'date', label: 'Show until', admin: { width: '50%', date: { pickerAppearance: 'dayAndTime' } } },
      ],
    },
  ],
}
