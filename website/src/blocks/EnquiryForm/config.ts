import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

export const EnquiryForm: Block = {
  slug: 'enquiryForm',
  interfaceName: 'EnquiryFormBlock',
  labels: { singular: 'Enquiry form', plural: 'Enquiry forms' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Send us a message' },
    { name: 'intro', type: 'textarea' },
    {
      name: 'hotel',
      type: 'relationship',
      relationTo: 'hotels',
      admin: {
        description:
          'Messages go to this hotel. Leave blank on a group page to let the visitor choose. Hotel pages use their own.',
      },
    },
    {
      name: 'showStayFields',
      type: 'checkbox',
      defaultValue: true,
      label: 'Ask for arrival, departure and number of guests',
    },
    blockStyle(),
  ],
}
