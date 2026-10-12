import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'
import { richLexical } from '@/fields/lexical'

export const Text: Block = {
  slug: 'text',
  interfaceName: 'TextBlock',
  labels: { singular: 'Text', plural: 'Text blocks' },
  fields: [
    { name: 'eyebrow', type: 'text', admin: { description: 'Optional small heading above the text.' } },
    { name: 'richText', type: 'richText', editor: richLexical, label: false, required: true },
    {
      name: 'narrow',
      type: 'checkbox',
      defaultValue: true,
      label: 'Narrow column (easier to read)',
    },
    blockStyle(),
  ],
}
