import type { CollectionConfig, Where } from 'payload'

import { adminOrAssignedHotel, defaultHotelForUser, getUserHotelIds, hotelFilterOptions, isAdminUser } from '@/access'
import { enforceHotelScope } from '@/hooks/enforceHotelScope'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'
import type { User } from '@/payload-types'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  labels: { singular: 'Guest review', plural: 'Guest reviews' },
  access: {
    create: ({ req }) => Boolean(req.user),
    delete: adminOrAssignedHotel(),
    update: adminOrAssignedHotel(),
    read: ({ req }) => {
      const user = req.user as User | null
      if (!user) return true
      if (isAdminUser(user)) return true
      const ids = getUserHotelIds(user)
      if (!ids.length) return false
      const where: Where = { hotel: { in: ids } }
      return where
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'hotel', 'source', 'featured'],
    group: 'Content',
    description: 'Short guest quotes shown in the Testimonials block.',
  },
  hooks: {
    beforeValidate: [
      ({ data, req, ...rest }) => {
        if (isAdminUser(req.user as User | null) && !data?.hotel) return data
        return enforceHotelScope()({ data, req, ...rest })
      },
    ],
    afterChange: [revalidateCollection('testimonials')],
    afterDelete: [revalidateCollectionDelete('testimonials')],
  },
  fields: [
    { name: 'quote', type: 'textarea', required: true, maxLength: 400 },
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Guest name', admin: { width: '50%' } },
        {
          name: 'source',
          type: 'select',
          defaultValue: 'google',
          admin: { width: '50%' },
          options: [
            { label: 'Google', value: 'google' },
            { label: 'TripAdvisor', value: 'tripadvisor' },
            { label: 'Booking.com', value: 'booking' },
            { label: 'Guest book', value: 'guestbook' },
            { label: 'Email', value: 'email' },
          ],
        },
      ],
    },
    {
      name: 'hotel',
      type: 'relationship',
      relationTo: 'hotels',
      index: true,
      filterOptions: hotelFilterOptions,
      defaultValue: defaultHotelForUser,
      admin: { position: 'sidebar', description: 'Admins: leave blank for a group-wide quote.' },
    },
    { name: 'rating', type: 'number', min: 1, max: 5, defaultValue: 5, admin: { position: 'sidebar' } },
    { name: 'featured', type: 'checkbox', defaultValue: false, admin: { position: 'sidebar' } },
  ],
}
