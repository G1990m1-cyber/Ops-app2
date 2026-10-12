import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

export const Newsletter: Block = {
  slug: 'newsletter',
  interfaceName: 'NewsletterBlock',
  labels: { singular: 'Newsletter signup', plural: 'Newsletter signups' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Stay in the loop' },
    {
      name: 'text',
      type: 'textarea',
      defaultValue: 'Hotel news, seasonal offers and the occasional exclusive, straight to your inbox.',
    },
    {
      name: 'consentText',
      type: 'text',
      defaultValue: 'By signing up you agree to receive emails from GR Hotels. Unsubscribe any time.',
    },
    blockStyle(),
  ],
}
