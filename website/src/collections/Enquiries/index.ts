import type { CollectionConfig } from 'payload'

import { adminOrAssignedHotel, isAdmin } from '@/access'

export const ENQUIRY_SUBJECTS = [
  { label: 'A stay', value: 'stay' },
  { label: 'Dining', value: 'dining' },
  { label: 'An event or function', value: 'event' },
  { label: 'A wedding', value: 'wedding' },
  { label: 'Something else', value: 'other' },
]

export const Enquiries: CollectionConfig = {
  slug: 'enquiries',
  labels: { singular: 'Enquiry', plural: 'Enquiries' },
  access: {
    create: () => false, // created server-side by the contact form only
    read: adminOrAssignedHotel(),
    update: adminOrAssignedHotel(),
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'hotel', 'subject', 'status', 'createdAt'],
    group: 'Enquiries',
    description:
      'Every contact form message is kept here as well as being emailed, so nothing is lost if an email goes astray.',
  },
  timestamps: true,
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { readOnly: true, width: '50%' } },
        { name: 'email', type: 'email', required: true, admin: { readOnly: true, width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', admin: { readOnly: true, width: '50%' } },
        {
          name: 'subject',
          type: 'select',
          options: ENQUIRY_SUBJECTS,
          admin: { readOnly: true, width: '50%' },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'arrival', type: 'date', admin: { readOnly: true, width: '33%', date: { pickerAppearance: 'dayOnly' } } },
        { name: 'departure', type: 'date', admin: { readOnly: true, width: '33%', date: { pickerAppearance: 'dayOnly' } } },
        { name: 'guests', type: 'number', admin: { readOnly: true, width: '33%' } },
      ],
    },
    { name: 'message', type: 'textarea', required: true, admin: { readOnly: true } },
    {
      name: 'hotel',
      type: 'relationship',
      relationTo: 'hotels',
      index: true,
      admin: { position: 'sidebar', readOnly: true },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Replied', value: 'replied' },
        { label: 'Closed', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'notes', type: 'textarea', label: 'Internal notes', admin: { position: 'sidebar' } },
    { name: 'sourcePath', type: 'text', label: 'Sent from page', admin: { readOnly: true, position: 'sidebar' } },
    { name: 'emailSent', type: 'checkbox', admin: { readOnly: true, position: 'sidebar' } },
  ],
}
