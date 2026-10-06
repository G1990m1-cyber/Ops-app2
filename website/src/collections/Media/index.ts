import type { CollectionConfig } from 'payload'

import { hiddenUnlessAdmin, isAdminUser, isLoggedIn } from '@/access'
import { populateCreatedBy } from '@/hooks/populateCreatedBy'
import { validateUpload } from '@/hooks/validateUpload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Image or file', plural: 'Images & files' },
  access: {
    read: () => true,
    create: isLoggedIn,
    update: ({ req }) =>
      isAdminUser(req.user) ? true : { createdBy: { equals: req.user?.id } },
    delete: ({ req }) =>
      isAdminUser(req.user) ? true : { createdBy: { equals: req.user?.id } },
  },
  admin: {
    group: 'Content',
    defaultColumns: ['filename', 'alt', 'updatedAt'],
    description:
      'Photos, menu PDFs and short hero videos. Images are resized and converted automatically. Drag the dot on the preview to set the focal point.',
  },
  hooks: {
    beforeValidate: [validateUpload],
    beforeChange: [populateCreatedBy],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Describe this image (alt text)',
      admin: {
        description:
          'One short sentence for screen readers and Google, e.g. "Double bedroom with river views at The George". Required.',
      },
    },
    { name: 'caption', type: 'text' },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      admin: { readOnly: true, position: 'sidebar', hidden: true },
      access: { update: () => false },
    },
    {
      name: 'blurhash',
      type: 'text',
      admin: { hidden: true },
    },
  ],
  upload: {
    staticDir: 'public/media',
    adminThumbnail: 'thumbnail',
    focalPoint: true,
    crop: true,
    displayPreview: true,
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/avif',
      'image/gif',
      'image/svg+xml',
      'application/pdf',
      'video/mp4',
      'video/webm',
    ],
    formatOptions: { format: 'webp', options: { quality: 82 } },
    resizeOptions: { width: 2560, height: 2560, fit: 'inside', withoutEnlargement: true },
    imageSizes: [
      { name: 'thumbnail', width: 400, formatOptions: { format: 'webp', options: { quality: 75 } } },
      { name: 'card', width: 800, height: 600, position: 'centre', formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'square', width: 800, height: 800, position: 'centre', formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'large', width: 1600, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'hero', width: 2400, formatOptions: { format: 'webp', options: { quality: 78 } } },
      { name: 'og', width: 1200, height: 630, position: 'centre', formatOptions: { format: 'jpeg', options: { quality: 82 } } },
    ],
  },
}

export const mediaHiddenForManagers = hiddenUnlessAdmin
