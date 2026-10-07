import type { CollectionConfig } from 'payload'

import {
  adminOnlyField,
  adminOrOwnHotel,
  isAdmin,
  publishedOrOwnHotel,
} from '@/access'
import { pageBlocks } from '@/blocks'
import { seoTab } from '@/fields/seo'
import { simpleLexical, richLexical } from '@/fields/lexical'
import { slugField } from '@/fields/slug'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { FACILITIES } from '../facilities'

export const Hotels: CollectionConfig = {
  slug: 'hotels',
  labels: { singular: 'Hotel', plural: 'Hotels' },
  access: {
    create: isAdmin,
    delete: isAdmin,
    read: publishedOrOwnHotel,
    update: adminOrOwnHotel,
  },
  defaultPopulate: {
    name: true,
    slug: true,
    location: true,
    bookingUrl: true,
    phone: true,
    heroMedia: true,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'location', 'updatedAt', '_status'],
    group: 'Content',
    livePreview: {
      url: ({ data }) => generatePreviewPath({ path: data?.slug ? `/${data.slug}` : null }),
    },
    preview: (data) => generatePreviewPath({ path: data?.slug ? `/${data.slug}` : null }),
    description: 'One entry per property. The Overview tab is the hotel page itself.',
  },
  versions: {
    drafts: { autosave: { interval: 300 }, schedulePublish: true },
    maxPerDoc: 50,
  },
  hooks: {
    afterChange: [revalidateCollection('hotels')],
    afterDelete: [revalidateCollectionDelete('hotels')],
  },
  fields: [
    { name: 'name', type: 'text', required: true, access: { update: adminOnlyField } },
    slugField({
      fallbackField: 'name',
      adminOnly: true,
      description: 'Keep this the same as the old website so Google links keep working.',
    }),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Essentials',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'location',
                  type: 'text',
                  required: true,
                  label: 'Location label',
                  admin: { width: '50%', description: 'Short, e.g. "Hawkhurst, Kent"' },
                },
                {
                  name: 'tagline',
                  type: 'text',
                  admin: { width: '50%', description: 'One line under the name, e.g. "Riverside coaching inn since 1545"' },
                },
              ],
            },
            {
              name: 'heroMedia',
              type: 'upload',
              relationTo: 'media',
              required: true,
              label: 'Hero image or video',
              admin: { description: 'Landscape photo (at least 2000px wide) or a short muted MP4.' },
            },
            {
              name: 'heroPoster',
              type: 'upload',
              relationTo: 'media',
              label: 'Still image for the video',
              admin: {
                description: 'Only needed if the hero is a video. Shown while it loads and on devices that prefer less motion.',
              },
            },
            {
              name: 'intro',
              type: 'richText',
              editor: simpleLexical,
              label: 'Introduction',
              admin: { description: 'Two or three sentences. Appears under the hero and in search results if no SEO description is set.' },
            },
            {
              name: 'facilities',
              type: 'select',
              hasMany: true,
              options: FACILITIES.map((f) => ({ label: f.label, value: f.value })),
              admin: { description: 'Shown as icons on the hotel page.' },
            },
            {
              name: 'gallery',
              type: 'array',
              labels: { singular: 'Photo', plural: 'Gallery' },
              admin: { initCollapsed: true },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Page content',
          description: 'Build the hotel page from blocks. Drag to reorder.',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Blocks',
              blocks: pageBlocks,
              admin: { initCollapsed: true },
            },
          ],
        },
        {
          label: 'Contact & location',
          fields: [
            {
              name: 'address',
              type: 'group',
              fields: [
                { name: 'line1', type: 'text', label: 'Address line 1' },
                { name: 'line2', type: 'text', label: 'Address line 2' },
                {
                  type: 'row',
                  fields: [
                    { name: 'town', type: 'text', admin: { width: '40%' } },
                    { name: 'county', type: 'text', admin: { width: '40%' } },
                    { name: 'postcode', type: 'text', admin: { width: '20%' } },
                  ],
                },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'phone', type: 'text', admin: { width: '50%' } },
                {
                  name: 'email',
                  type: 'email',
                  label: 'Enquiry email',
                  admin: { width: '50%', description: 'Contact form messages go here.' },
                  access: { update: adminOnlyField },
                },
              ],
            },
            {
              name: 'map',
              type: 'group',
              label: 'Map pin',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'lat', type: 'number', label: 'Latitude', admin: { width: '50%', step: 0.000001 } },
                    { name: 'lng', type: 'number', label: 'Longitude', admin: { width: '50%', step: 0.000001 } },
                  ],
                },
                {
                  name: 'directionsUrl',
                  type: 'text',
                  label: 'Google Maps link',
                  admin: { description: 'Used by the "Get directions" button. Paste the share link from Google Maps.' },
                },
              ],
            },
            {
              name: 'directions',
              type: 'richText',
              editor: richLexical,
              label: 'How to find us',
              admin: { description: 'By car, by rail, parking notes.' },
            },
            {
              name: 'social',
              type: 'group',
              label: 'Social links',
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'facebook', type: 'text', admin: { width: '50%' } },
                    { name: 'instagram', type: 'text', admin: { width: '50%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'tripadvisor', type: 'text', admin: { width: '50%' } },
                    { name: 'x', type: 'text', label: 'X (Twitter)', admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Booking',
          fields: [
            {
              name: 'bookingUrl',
              type: 'text',
              label: 'Booking engine link',
              access: { update: adminOnlyField },
              admin: {
                description:
                  'The exact link guests use to book this hotel. Book Now buttons open it in a new tab. Leave blank to show the phone number and enquiry form instead.',
              },
            },
            {
              name: 'tableBookingUrl',
              type: 'text',
              label: 'Table booking link (optional)',
              access: { update: adminOnlyField },
              admin: { description: 'For restaurants that take online table bookings (e.g. ResDiary, Dojo). Adds a "Book a table" button to the hotel and dining pages.' },
            },
            {
              type: 'row',
              fields: [
                { name: 'checkIn', type: 'text', label: 'Check-in from', defaultValue: '3:00pm', admin: { width: '33%' } },
                { name: 'checkOut', type: 'text', label: 'Check-out by', defaultValue: '11:00am', admin: { width: '33%' } },
                {
                  name: 'priceRange',
                  type: 'select',
                  admin: { width: '33%', description: 'Shown to Google only.' },
                  options: [
                    { label: '£', value: '£' },
                    { label: '££', value: '££' },
                    { label: '£££', value: '£££' },
                  ],
                },
              ],
            },
            {
              name: 'hasWeddings',
              type: 'checkbox',
              label: 'This hotel hosts weddings and functions',
              access: { update: adminOnlyField },
            },
            {
              name: 'weddingsIntro',
              type: 'richText',
              editor: richLexical,
              label: 'Weddings & functions copy',
              admin: { condition: (_, siblingData) => Boolean(siblingData?.hasWeddings) },
            },
            {
              name: 'weddingsGallery',
              type: 'array',
              label: 'Weddings & functions photos',
              labels: { singular: 'Photo', plural: 'Photos' },
              admin: { condition: (_, siblingData) => Boolean(siblingData?.hasWeddings), initCollapsed: true },
              fields: [
                { name: 'image', type: 'upload', relationTo: 'media', required: true },
                { name: 'caption', type: 'text' },
              ],
            },
          ],
        },
        {
          label: 'Rooms, menus, events, offers',
          fields: [
            { name: 'rooms', type: 'join', collection: 'rooms', on: 'hotel', defaultSort: 'order' },
            { name: 'menus', type: 'join', collection: 'menus', on: 'hotel' },
            { name: 'events', type: 'join', collection: 'events', on: 'hotel', defaultSort: 'start' },
            { name: 'offers', type: 'join', collection: 'offers', on: 'hotel' },
          ],
        },
        seoTab(),
      ],
    },
    {
      name: 'order',
      type: 'number',
      label: 'Display order',
      defaultValue: 50,
      admin: { position: 'sidebar', description: 'Lower numbers show first on the Our Hotels page.' },
      access: { update: adminOnlyField },
    },
  ],
}
