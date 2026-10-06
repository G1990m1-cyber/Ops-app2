import type { Block } from 'payload'

import { linkGroup } from '@/fields/linkGroup'

export const Hero: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  labels: { singular: 'Hero banner', plural: 'Hero banners' },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Image or video',
          admin: { width: '50%', description: 'Leave blank on a hotel page to use the hotel hero.' },
        },
        {
          name: 'poster',
          type: 'upload',
          relationTo: 'media',
          label: 'Still image (for video)',
          admin: { width: '50%' },
        },
      ],
    },
    { name: 'eyebrow', type: 'text', admin: { description: 'Small line above the title, e.g. the location.' } },
    { name: 'title', type: 'text', admin: { description: 'Leave blank on a hotel page to use the hotel name.' } },
    { name: 'subtitle', type: 'textarea', maxLength: 200 },
    linkGroup({ appearances: ['primary', 'secondary'], overrides: { maxRows: 2 } }),
    {
      type: 'row',
      fields: [
        {
          name: 'height',
          type: 'select',
          defaultValue: 'tall',
          admin: { width: '50%' },
          options: [
            { label: 'Full screen', value: 'full' },
            { label: 'Tall', value: 'tall' },
            { label: 'Short', value: 'short' },
          ],
        },
        {
          name: 'overlay',
          type: 'select',
          defaultValue: 'gradient',
          admin: { width: '50%', description: 'Keeps text readable over the photo.' },
          options: [
            { label: 'Soft gradient', value: 'gradient' },
            { label: 'Brown tint 40%', value: 'tint40' },
            { label: 'Brown tint 50%', value: 'tint50' },
            { label: 'Brown tint 60%', value: 'tint60' },
          ],
        },
      ],
    },
    {
      name: 'showBookNow',
      type: 'checkbox',
      defaultValue: true,
      label: 'Show a Book Now button',
    },
  ],
}
