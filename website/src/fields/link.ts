import type { Field, GroupField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'primary' | 'secondary' | 'link'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  primary: { label: 'Solid button', value: 'primary' },
  secondary: { label: 'Outline button', value: 'secondary' },
  link: { label: 'Text link', value: 'link' },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: { hideGutter: true },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: { layout: 'horizontal', width: '50%' },
            defaultValue: 'reference',
            options: [
              { label: 'A page on this site', value: 'reference' },
              { label: 'Web address', value: 'custom' },
              { label: 'Book Now', value: 'book' },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: { style: { alignSelf: 'flex-end' }, width: '50%' },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: { condition: (_, siblingData) => siblingData?.type === 'reference', width: '50%' },
      label: 'Page',
      relationTo: ['pages', 'hotels'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: { condition: (_, siblingData) => siblingData?.type === 'custom', width: '50%' },
      label: 'Web address',
      required: true,
    },
    {
      name: 'bookHotel',
      type: 'relationship',
      relationTo: 'hotels',
      label: 'Hotel to book (leave blank for the hotel picker)',
      admin: { condition: (_, siblingData) => siblingData?.type === 'book', width: '50%' },
    },
  ]

  if (!disableLabel) {
    linkResult.fields.push({
      type: 'row',
      fields: [
        ...linkTypes,
        {
          name: 'label',
          type: 'text',
          admin: { width: '50%' },
          label: 'Button text',
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [
      appearanceOptions.primary,
      appearanceOptions.secondary,
      appearanceOptions.link,
    ]
    if (appearances) appearanceOptionsToUse = appearances.map((a) => appearanceOptions[a])
    linkResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: { description: 'How the link looks.' },
      defaultValue: 'primary',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
