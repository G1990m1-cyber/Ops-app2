import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'
import { richLexical } from '@/fields/lexical'
import { linkGroup } from '@/fields/linkGroup'

export const TextWithImage: Block = {
  slug: 'textWithImage',
  interfaceName: 'TextWithImageBlock',
  labels: { singular: 'Text with image', plural: 'Text with image' },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true, admin: { width: '60%' } },
        {
          name: 'imagePosition',
          type: 'radio',
          defaultValue: 'left',
          options: [
            { label: 'Image left', value: 'left' },
            { label: 'Image right', value: 'right' },
          ],
          admin: { width: '40%', layout: 'horizontal' },
        },
      ],
    },
    { name: 'eyebrow', type: 'text' },
    { name: 'richText', type: 'richText', editor: richLexical, label: false, required: true },
    linkGroup({ overrides: { maxRows: 2 } }),
    blockStyle({ align: false }),
  ],
}
