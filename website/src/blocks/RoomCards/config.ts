import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

export const RoomCards: Block = {
  slug: 'roomCards',
  interfaceName: 'RoomCardsBlock',
  labels: { singular: 'Room cards', plural: 'Room cards' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Rooms' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'source',
      type: 'radio',
      defaultValue: 'hotel',
      options: [
        { label: "All of this hotel's rooms", value: 'hotel' },
        { label: 'Pick rooms', value: 'custom' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'hotel',
      type: 'relationship',
      relationTo: 'hotels',
      admin: {
        condition: (_, siblingData) => siblingData?.source === 'hotel',
        description: 'Only needed on a group page. Hotel pages use their own rooms.',
      },
    },
    {
      name: 'rooms',
      type: 'relationship',
      relationTo: 'rooms',
      hasMany: true,
      admin: { condition: (_, siblingData) => siblingData?.source === 'custom' },
    },
    blockStyle(),
  ],
}
