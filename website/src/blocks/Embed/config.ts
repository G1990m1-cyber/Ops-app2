import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'

export const Embed: Block = {
  slug: 'embed',
  interfaceName: 'EmbedBlock',
  labels: { singular: 'Embed', plural: 'Embeds' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'provider',
      type: 'select',
      required: true,
      defaultValue: 'youtube',
      options: [
        { label: 'YouTube', value: 'youtube' },
        { label: 'Vimeo', value: 'vimeo' },
        { label: 'Google Maps', value: 'google-maps' },
        { label: 'Other trusted page', value: 'other' },
      ],
    },
    {
      name: 'url',
      type: 'text',
      required: true,
      admin: { description: 'Paste the normal share link, e.g. https://www.youtube.com/watch?v=... or a Google Maps embed link.' },
    },
    { name: 'title', type: 'text', required: true, admin: { description: 'Short description for screen readers.' } },
    {
      name: 'aspect',
      type: 'select',
      defaultValue: '16:9',
      options: [
        { label: '16:9', value: '16:9' },
        { label: '4:3', value: '4:3' },
        { label: 'Square', value: '1:1' },
      ],
    },
    blockStyle({ align: false }),
  ],
}
