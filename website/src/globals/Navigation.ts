import type { GlobalConfig } from 'payload'

import { hiddenUnlessAdmin, isAdmin } from '@/access'
import { link } from '@/fields/link'
import { revalidateGlobal } from '@/hooks/revalidate'

export const Navigation: GlobalConfig = {
  slug: 'navigation',
  label: 'Navigation & footer',
  access: { read: () => true, update: isAdmin },
  admin: { group: 'Settings', hidden: hiddenUnlessAdmin },
  hooks: { afterChange: [revalidateGlobal('navigation')] },
  fields: [
    {
      name: 'header',
      type: 'array',
      label: 'Header menu',
      maxRows: 7,
      admin: { initCollapsed: true, description: 'Our Hotels is always shown and lists every hotel automatically.' },
      fields: [link({ appearances: false })],
    },
    {
      name: 'footerColumns',
      type: 'array',
      label: 'Footer columns',
      maxRows: 4,
      admin: { initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'links', type: 'array', fields: [link({ appearances: false })] },
      ],
    },
    {
      name: 'legalLinks',
      type: 'array',
      label: 'Small print links',
      maxRows: 5,
      admin: { initCollapsed: true },
      fields: [link({ appearances: false })],
    },
    { name: 'footerNote', type: 'textarea', label: 'Footer text', admin: { description: 'A sentence about the group.' } },
  ],
}
