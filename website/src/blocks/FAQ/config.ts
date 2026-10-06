import type { Block } from 'payload'

import { blockStyle } from '@/fields/blockStyle'
import { richLexical } from '@/fields/lexical'

export const FAQ: Block = {
  slug: 'faq',
  interfaceName: 'FAQBlock',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    { name: 'heading', type: 'text', defaultValue: 'Good to know' },
    {
      name: 'items',
      type: 'array',
      labels: { singular: 'Question', plural: 'Questions' },
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        { name: 'answer', type: 'richText', editor: richLexical, required: true },
      ],
    },
    blockStyle(),
  ],
}
