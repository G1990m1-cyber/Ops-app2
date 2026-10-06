import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

export const EventsList: Block = {
  slug: 'eventsList',
  interfaceName: 'EventsListBlock',
  labels: { singular: "What's on", plural: "What's on lists" },
  fields: [
    { name: 'heading', type: 'text', defaultValue: "What's on" },
    { name: 'intro', type: 'textarea' },
    {
      name: 'hotel',
      type: 'relationship',
      relationTo: 'hotels',
      admin: { description: 'Leave blank for every hotel. Hotel pages show their own events automatically.' },
    },
    { name: 'limit', type: 'number', defaultValue: 6, min: 1, max: 24, admin: { description: 'How many to show' } },
    blockStyle(),
  ],
}
