import type { CollectionConfig } from 'payload'

import {
  adminOrAssignedHotel,
  defaultHotelForUser,
  hotelFilterOptions,
  publishedOrScoped,
} from '@/access'
import { enforceHotelScope } from '@/hooks/enforceHotelScope'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'
import { generatePreviewPath, hotelPath } from '@/utilities/generatePreviewPath'

export const MENU_TYPES = [
  { label: 'Food', value: 'food' },
  { label: 'Drinks', value: 'drinks' },
  { label: 'Breakfast', value: 'breakfast' },
  { label: 'Sunday lunch', value: 'sunday' },
  { label: 'Afternoon tea', value: 'afternoon-tea' },
  { label: 'Christmas', value: 'christmas' },
  { label: 'Specials', value: 'specials' },
  { label: 'Children', value: 'children' },
  { label: 'Other', value: 'other' },
]

export const DIETARY = [
  { label: 'Vegetarian (V)', value: 'v' },
  { label: 'Vegan (VG)', value: 'vg' },
  { label: 'Gluten free (GF)', value: 'gf' },
  { label: 'Dairy free (DF)', value: 'df' },
  { label: 'Contains nuts (N)', value: 'n' },
] as const

/** Dietary flags as a row of tick boxes (a multi-select this deep in nested arrays is not supported by Postgres versions). */
const dietaryField = {
  name: 'dietary',
  type: 'group' as const,
  label: 'Dietary',
  admin: { hideGutter: true },
  fields: [
    {
      type: 'row' as const,
      fields: DIETARY.map((d) => ({
        name: d.value,
        type: 'checkbox' as const,
        label: d.label,
        admin: { width: '20%' },
      })),
    },
  ],
}

export const Menus: CollectionConfig = {
  slug: 'menus',
  labels: { singular: 'Menu', plural: 'Menus' },
  access: {
    create: adminOrAssignedHotel(),
    delete: adminOrAssignedHotel(),
    read: publishedOrScoped(),
    update: adminOrAssignedHotel(),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'hotel', 'type', 'validTo', '_status'],
    group: 'Content',
    description:
      'Upload a PDF or type the menu in. Set a "valid to" date and the menu disappears from the website on its own.',
    preview: (data) => generatePreviewPath({ path: hotelPath(data?.hotel) ? `${hotelPath(data?.hotel)}/dining` : null }),
  },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    beforeValidate: [enforceHotelScope()],
    afterChange: [revalidateCollection('menus')],
    afterDelete: [revalidateCollectionDelete('menus')],
  },
  fields: [
    { name: 'title', type: 'text', required: true, admin: { description: 'e.g. "Autumn à la carte"' } },
    {
      name: 'hotel',
      type: 'relationship',
      relationTo: 'hotels',
      required: true,
      index: true,
      filterOptions: hotelFilterOptions,
      defaultValue: defaultHotelForUser,
      admin: { position: 'sidebar' },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'food',
      options: MENU_TYPES,
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      fields: [
        { name: 'validFrom', type: 'date', label: 'Show from', admin: { width: '50%', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } } },
        {
          name: 'validTo',
          type: 'date',
          label: 'Show until',
          admin: {
            width: '50%',
            date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' },
            description: 'The menu is hidden after this day. Leave blank to show indefinitely.',
          },
        },
      ],
    },
    {
      name: 'format',
      type: 'radio',
      required: true,
      defaultValue: 'pdf',
      options: [
        { label: 'Upload a PDF', value: 'pdf' },
        { label: 'Type the menu in', value: 'structured' },
      ],
      admin: { layout: 'horizontal' },
    },
    {
      name: 'pdf',
      type: 'upload',
      relationTo: 'media',
      label: 'Menu PDF',
      filterOptions: { mimeType: { equals: 'application/pdf' } },
      admin: { condition: (_, siblingData) => siblingData?.format === 'pdf' },
    },
    {
      name: 'note',
      type: 'textarea',
      label: 'Note shown above the menu',
      admin: { description: 'e.g. serving times, allergen note, "menu changes weekly".' },
    },
    {
      name: 'sections',
      type: 'array',
      labels: { singular: 'Section', plural: 'Sections' },
      admin: { condition: (_, siblingData) => siblingData?.format === 'structured', initCollapsed: true },
      fields: [
        { name: 'title', type: 'text', required: true, admin: { description: 'e.g. Starters' } },
        { name: 'description', type: 'text' },
        {
          name: 'items',
          type: 'array',
          labels: { singular: 'Dish', plural: 'Dishes' },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'name', type: 'text', required: true, admin: { width: '70%' } },
                { name: 'price', type: 'text', admin: { width: '30%', description: 'e.g. 14.50' } },
              ],
            },
            { name: 'description', type: 'text' },
            dietaryField,
          ],
        },
      ],
    },
  ],
}
