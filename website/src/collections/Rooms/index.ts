import type { CollectionConfig } from 'payload'

import {
  adminOrAssignedHotel,
  defaultHotelForUser,
  hotelFilterOptions,
  publishedOrScoped,
} from '@/access'
import { richLexical } from '@/fields/lexical'
import { slugField } from '@/fields/slug'
import { enforceHotelScope } from '@/hooks/enforceHotelScope'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'
import { generatePreviewPath, hotelPath } from '@/utilities/generatePreviewPath'

export const ROOM_FEATURES = [
  { value: 'en-suite', label: 'En suite' },
  { value: 'bath', label: 'Bath' },
  { value: 'walk-in-shower', label: 'Walk-in shower' },
  { value: 'king-bed', label: 'King-size bed' },
  { value: 'super-king-bed', label: 'Super-king bed' },
  { value: 'twin-option', label: 'Twin option' },
  { value: 'sofa-bed', label: 'Sofa bed' },
  { value: 'dog-friendly', label: 'Dog friendly' },
  { value: 'ground-floor', label: 'Ground floor' },
  { value: 'accessible', label: 'Accessible' },
  { value: 'view', label: 'A view' },
  { value: 'seating-area', label: 'Seating area' },
  { value: 'tea-coffee', label: 'Tea & coffee tray' },
  { value: 'smart-tv', label: 'Smart TV' },
  { value: 'wifi', label: 'Free Wi-Fi' },
]

export const Rooms: CollectionConfig = {
  slug: 'rooms',
  labels: { singular: 'Room', plural: 'Rooms' },
  access: {
    create: adminOrAssignedHotel(),
    delete: adminOrAssignedHotel(),
    read: publishedOrScoped(),
    update: adminOrAssignedHotel(),
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'hotel', 'sleeps', 'fromPrice', '_status'],
    group: 'Content',
    livePreview: {
      url: ({ data }) => {
        const base = hotelPath(data?.hotel)
        return generatePreviewPath({ path: base && data?.slug ? `${base}/rooms/${data.slug}` : null })
      },
    },
    preview: (data) => {
      const base = hotelPath(data?.hotel)
      return generatePreviewPath({ path: base && data?.slug ? `${base}/rooms/${data.slug}` : null })
    },
  },
  versions: { drafts: true, maxPerDoc: 30 },
  hooks: {
    beforeValidate: [enforceHotelScope()],
    afterChange: [revalidateCollection('rooms')],
    afterDelete: [revalidateCollectionDelete('rooms')],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
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
    slugField({ fallbackField: 'name', unique: false }),
    {
      type: 'row',
      fields: [
        { name: 'sleeps', type: 'number', min: 1, max: 12, defaultValue: 2, admin: { width: '33%' } },
        { name: 'bedType', type: 'text', label: 'Bed', admin: { width: '33%', description: 'e.g. 6ft super-king' } },
        { name: 'fromPrice', type: 'number', label: 'From £ per night', admin: { width: '33%', description: 'Optional' } },
      ],
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 220,
      admin: { description: 'One or two sentences for the room card.' },
    },
    { name: 'description', type: 'richText', editor: richLexical },
    {
      name: 'features',
      type: 'select',
      hasMany: true,
      options: ROOM_FEATURES,
    },
    {
      name: 'gallery',
      type: 'array',
      labels: { singular: 'Photo', plural: 'Photos' },
      minRows: 1,
      fields: [{ name: 'image', type: 'upload', relationTo: 'media', required: true }],
    },
    {
      name: 'bookingUrl',
      type: 'text',
      label: 'Booking link for this room (optional)',
      admin: { description: 'Overrides the hotel booking link for this room only.' },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 50,
      admin: { position: 'sidebar', description: 'Lower numbers show first.' },
    },
  ],
}
