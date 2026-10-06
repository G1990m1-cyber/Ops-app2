import type { CollectionConfig, Where } from 'payload'

import {
  adminOrAssignedHotel,
  defaultHotelForUser,
  getUserHotelIds,
  hotelFilterOptions,
  isAdminUser,
} from '@/access'
import { richLexical } from '@/fields/lexical'
import { enforceHotelScope } from '@/hooks/enforceHotelScope'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'
import type { User } from '@/payload-types'

export const Offers: CollectionConfig = {
  slug: 'offers',
  labels: { singular: 'Offer', plural: 'Offers' },
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: adminOrAssignedHotel(),
    read: ({ req }) => {
      const user = req.user as User | null
      if (!user) return { _status: { equals: 'published' } }
      if (isAdminUser(user)) return true
      const ids = getUserHotelIds(user)
      if (!ids.length) return false
      const where: Where = { hotel: { in: ids } }
      return where
    },
    update: adminOrAssignedHotel(),
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'hotel', 'startDate', 'endDate', '_status'],
    group: 'Content',
    description: 'Offers show between their start and end dates, then disappear on their own.',
  },
  versions: { drafts: true, maxPerDoc: 20 },
  hooks: {
    beforeValidate: [
      ({ data, req, ...rest }) => {
        // Admins may leave hotel blank for a group-wide offer; managers must pick a hotel.
        if (isAdminUser(req.user as User | null) && !data?.hotel) return data
        return enforceHotelScope()({ data, req, ...rest })
      },
    ],
    afterChange: [revalidateCollection('offers')],
    afterDelete: [revalidateCollectionDelete('offers')],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'hotel',
      type: 'relationship',
      relationTo: 'hotels',
      index: true,
      filterOptions: hotelFilterOptions,
      defaultValue: defaultHotelForUser,
      admin: { position: 'sidebar', description: 'Admins: leave blank for a group-wide offer.' },
    },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'summary',
      type: 'textarea',
      maxLength: 240,
      required: true,
      admin: { description: 'The headline deal in one or two sentences.' },
    },
    { name: 'terms', type: 'richText', editor: richLexical, label: 'Details and terms' },
    {
      type: 'row',
      fields: [
        {
          name: 'startDate',
          type: 'date',
          label: 'Show from',
          admin: { width: '50%', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } },
        },
        {
          name: 'endDate',
          type: 'date',
          label: 'Show until',
          required: true,
          index: true,
          admin: { width: '50%', date: { pickerAppearance: 'dayOnly', displayFormat: 'd MMM yyyy' } },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'promoCode', type: 'text', label: 'Promo code (optional)', admin: { width: '50%' } },
        {
          name: 'linkUrl',
          type: 'text',
          label: 'Button link (optional)',
          admin: { width: '50%', description: 'Leave blank to use the hotel booking link.' },
        },
      ],
    },
  ],
}
