import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

export const Gallery: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  labels: { singular: 'Gallery', plural: 'Galleries' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'source',
      type: 'radio',
      defaultValue: 'custom',
      options: [
        { label: 'Choose photos', value: 'custom' },
        { label: "Use this hotel's gallery", value: 'hotel' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'images',
      type: 'array',
      labels: { singular: 'Photo', plural: 'Photos' },
      admin: { condition: (_, siblingData) => siblingData?.source !== 'hotel' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
        { name: 'caption', type: 'text' },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          name: 'layout',
          type: 'select',
          defaultValue: 'masonry',
          admin: { width: '50%' },
          options: [
            { label: 'Masonry', value: 'masonry' },
            { label: 'Even grid', value: 'grid' },
            { label: 'Film strip (scrolls sideways)', value: 'strip' },
          ],
        },
        {
          name: 'columns',
          type: 'select',
          defaultValue: '3',
          admin: { width: '50%' },
          options: [
            { label: '2', value: '2' },
            { label: '3', value: '3' },
            { label: '4', value: '4' },
          ],
        },
      ],
    },
    blockStyle({ align: false }),
  ],
}
