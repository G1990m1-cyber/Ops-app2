import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

export const MapBlock: Block = {
  slug: 'map',
  interfaceName: 'MapBlock',
  labels: { singular: 'Map & directions', plural: 'Maps & directions' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Find us' },
    {
      name: 'hotel',
      type: 'relationship',
      relationTo: 'hotels',
      admin: { description: 'Only needed on a group page. Hotel pages use their own pin and address.' },
    },
    { name: 'showDirections', type: 'checkbox', defaultValue: true, label: 'Show the "How to find us" text from the hotel' },
    blockStyle({ align: false }),
  ],
}
