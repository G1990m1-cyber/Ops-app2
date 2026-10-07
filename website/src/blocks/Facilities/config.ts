import type { Block } from 'payload'

import { FACILITIES } from '@/collections/facilities'
import { blockStyle } from '@/fields/blockStyle'

export const Facilities: Block = {
  slug: 'facilities',
  interfaceName: 'FacilitiesBlock',
  labels: { singular: 'Facilities icons', plural: 'Facilities icons' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Facilities' },
    {
      name: 'source',
      type: 'radio',
      defaultValue: 'hotel',
      options: [
        { label: "This hotel's facilities", value: 'hotel' },
        { label: 'Choose a custom list', value: 'custom' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Facility', plural: 'Facilities' },
      admin: { condition: (_, siblingData) => siblingData?.source === 'custom' },
      fields: [
        {
          type: 'row',
          fields: [
            {
              name: 'icon',
              type: 'select',
              required: true,
              options: FACILITIES.map((f) => ({ label: f.label, value: f.value })),
              admin: { width: '50%' },
            },
            { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
          ],
        },
        { name: 'description', type: 'text' },
      ],
    },
    blockStyle(),
  ],
}
