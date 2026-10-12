import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

export const HotelGrid: Block = {
  slug: 'hotelGrid',
  interfaceName: 'HotelGridBlock',
  labels: { singular: 'Hotel grid', plural: 'Hotel grids' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Our hotels' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'hotels',
      type: 'relationship',
      relationTo: 'hotels',
      hasMany: true,
      admin: { description: 'Leave blank to show every hotel in display order.' },
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'grid',
      options: [
        { label: 'Grid of cards', value: 'grid' },
        { label: 'Large alternating rows', value: 'rows' },
      ],
    },
    blockStyle(),
  ],
}
