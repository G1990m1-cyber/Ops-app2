import type { CollectionConfig } from 'payload'

import {
  adminOrAssignedHotel,
  defaultHotelForUser,
  hotelFilterOptions,
  publishedOrScoped,
} from '@/access'
import { richLexical } from '@/fields/lexical'
import { enforceHotelScope } from '@/hooks/enforceHotelScope'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'
import { generatePreviewPath, hotelPath } from '@/utilities/generatePreviewPath'

export const Events: CollectionConfig = {
  slug: 'events',
  labels: { singular: 'Event', plural: 'Events' },
  access: {
    create: adminOrAssignedHotel(),
    delete: adminOrAssignedHotel(),
    read: publishedOrScoped(),
    update: adminOrAssignedHotel(),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'hotel', 'start', '_status'],
    group: 'Content',
    description: 'Past events drop off the website automatically the day after they end.',
    preview: (data) => generatePreviewPath({ path: hotelPath(data?.hotel) ? `${hotelPath(data?.hotel)}/events` : null }),
  },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    beforeValidate: [enforceHotelScope()],
    afterChange: [revalidateCollection('events')],
    afterDelete: [revalidateCollectionDelete('events')],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
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
      type: 'row',
      fields: [
        {
          name: 'start',
          type: 'date',
          required: true,
          index: true,
          label: 'Starts',
          admin: { width: '50%', date: { pickerAppearance: 'dayAndTime', displayFormat: 'd MMM yyyy h:mm a', timeIntervals: 15 } },
        },
        {
          name: 'end',
          type: 'date',
          label: 'Ends (optional)',
          admin: { width: '50%', date: { pickerAppearance: 'dayAndTime', displayFormat: 'd MMM yyyy h:mm a', timeIntervals: 15 } },
        },
      ],
    },
    { name: 'image', type: 'upload', relationTo: 'media' },
    {
      name: 'summary',
      type: 'textarea',
      maxLength: 240,
      required: true,
      admin: { description: 'One or two sentences shown on the event card.' },
    },
    { name: 'description', type: 'richText', editor: richLexical, label: 'Full details' },
    {
      type: 'row',
      fields: [
        { name: 'price', type: 'text', admin: { width: '50%', description: 'e.g. "£45 per person" or "Free"' } },
        { name: 'ticketUrl', type: 'text', label: 'Ticket or booking link', admin: { width: '50%' } },
      ],
    },
  ],
}
