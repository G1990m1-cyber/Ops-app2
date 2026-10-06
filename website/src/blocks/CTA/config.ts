import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'
import { linkGroup } from '@/fields/linkGroup'

export const CTA: Block = {
  slug: 'cta',
  interfaceName: 'CTABlock',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'text', type: 'textarea', maxLength: 240 },
    linkGroup({ appearances: ['primary', 'secondary'], overrides: { maxRows: 2 } }),
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Optional. With an image the text sits on a brown tint for contrast.' },
    },
    blockStyle(),
  ],
}
