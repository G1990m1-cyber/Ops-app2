import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

export const HotelsMap: Block = {
  slug: 'hotelsMap',
  interfaceName: 'HotelsMapBlock',
  labels: { singular: 'Hotels map', plural: 'Hotels maps' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Where to find us' },
    {
      name: 'intro',
      type: 'textarea',
      admin: { description: 'Optional line under the heading, e.g. "Eight hotels and inns across Britain."' },
    },
    blockStyle({ align: false }),
  ],
}
