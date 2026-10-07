import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: { singular: 'Guest reviews', plural: 'Guest reviews' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'What our guests say' },
    {
      name: 'source',
      type: 'radio',
      defaultValue: 'auto',
      options: [
        { label: 'Automatic (this hotel, or featured group-wide)', value: 'auto' },
        { label: 'Pick reviews', value: 'custom' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'items',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: { condition: (_, siblingData) => siblingData?.source === 'custom' },
    },
    { name: 'limit', type: 'number', defaultValue: 4, min: 1, max: 12 },
    blockStyle(),
  ],
}
