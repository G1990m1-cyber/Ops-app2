import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  ItalicFeature,
  LinkFeature,
  OrderedListFeature,
  ParagraphFeature,
  UnderlineFeature,
  UnorderedListFeature,
  lexicalEditor,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

const linkFeature = () =>
  LinkFeature({
    enabledCollections: ['pages', 'hotels'],
    fields: ({ defaultFields }) => {
      const withoutUrl = defaultFields.filter((field) => !('name' in field && field.name === 'url'))
      return [
        ...withoutUrl,
        {
          name: 'url',
          type: 'text',
          admin: { condition: (_data, siblingData) => siblingData?.linkType !== 'internal' },
          label: ({ t }) => t('fields:enterURL'),
          required: true,
          validate: ((value, options) => {
            if ((options?.siblingData as LinkFields)?.linkType === 'internal') return true
            return value ? true : 'URL is required'
          }) as TextFieldSingleValidation,
        },
      ]
    },
  })

/** Simple inline editor: paragraphs, bold, italic, links. Used for intros and short copy. */
export const simpleLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    linkFeature(),
    InlineToolbarFeature(),
  ],
})

/** Full editor for page copy: headings, lists, links. Heading sizes limited to keep hierarchy sane. */
export const richLexical = lexicalEditor({
  features: [
    ParagraphFeature(),
    HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
    BoldFeature(),
    ItalicFeature(),
    UnderlineFeature(),
    UnorderedListFeature(),
    OrderedListFeature(),
    linkFeature(),
    FixedToolbarFeature(),
    InlineToolbarFeature(),
  ],
})
