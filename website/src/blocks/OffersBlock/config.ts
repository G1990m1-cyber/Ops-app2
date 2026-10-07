import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

export const OffersBlock: Block = {
  slug: 'offers',
  interfaceName: 'OffersBlock',
  labels: { singular: 'Offers', plural: 'Offers blocks' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Offers' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'hotel',
      type: 'relationship',
      relationTo: 'hotels',
      admin: { description: 'Leave blank for group-wide and all hotels. Hotel pages show their own plus group-wide offers.' },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'cards',
      options: [
        { label: 'Cards', value: 'cards' },
        { label: 'One big feature', value: 'feature' },
      ],
    },
    { name: 'limit', type: 'number', defaultValue: 3, min: 1, max: 12 },
    blockStyle(),
  ],
}
