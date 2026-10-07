import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import type { GenerateDescription, GenerateImage, GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { s3Storage } from '@payloadcms/storage-s3'
import type { Plugin } from 'payload'
import { revalidateTag } from 'next/cache'

import { hiddenUnlessAdmin, isAdmin } from '@/access'
import type { Hotel, Page } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { lexicalToPlainText } from '@/utilities/lexicalToPlainText'

type SEODoc = Hotel | Page

const isHotel = (doc: Partial<SEODoc> | null | undefined): doc is Hotel =>
  Boolean(doc && 'location' in doc)

const generateTitle: GenerateTitle<SEODoc> = ({ doc }) => {
  if (isHotel(doc)) return `${doc.name} | ${doc.location} | GR Hotels`
  const title = (doc as Page | undefined)?.title
  return title ? `${title} | GR Hotels` : 'GR Hotels'
}

const generateDescription: GenerateDescription<SEODoc> = ({ doc }) => {
  if (isHotel(doc)) {
    const intro = lexicalToPlainText(doc.intro)
    if (intro) return intro.slice(0, 155)
    return `${doc.name}, ${doc.location}. Rooms, dining and offers. Book direct with GR Hotels.`
  }
  return 'Characterful hotels and pubs with rooms across Britain. Book direct with GR Hotels.'
}

const generateURL: GenerateURL<SEODoc> = ({ doc }) => {
  const base = getServerSideURL()
  if (!doc?.slug) return base
  return doc.slug === 'home' ? base : `${base}/${doc.slug}`
}

const generateImage: GenerateImage<SEODoc> = ({ doc }) => {
  if (isHotel(doc) && doc.heroMedia) {
    const m = doc.heroMedia
    return typeof m === 'object' ? String(m.id) : String(m)
  }
  return ''
}

const s3Enabled = Boolean(
  process.env.S3_BUCKET &&
    process.env.S3_ENDPOINT &&
    process.env.S3_ACCESS_KEY_ID &&
    process.env.S3_SECRET_ACCESS_KEY,
)

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'hotels'],
    redirectTypes: ['301', '302'],
    overrides: {
      admin: { group: 'Settings', hidden: hiddenUnlessAdmin },
      access: { create: isAdmin, update: isAdmin, delete: isAdmin, read: () => true },
      // @ts-expect-error - fields override has a looser type in the plugin
      fields: ({ defaultFields }) =>
        defaultFields.map((field) =>
          'name' in field && field.name === 'from'
            ? {
                ...field,
                admin: {
                  ...(field.admin || {}),
                  description:
                    'The old path, starting with a slash and without the domain, e.g. /grassington-lodge/rooms/room-six/',
                },
              }
            : field,
        ),
      hooks: {
        afterChange: [
          ({ doc }) => {
            try {
              revalidateTag('collection_redirects', 'max')
            } catch {
              /* no-op outside a request */
            }
            return doc
          },
        ],
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateDescription,
    generateURL,
    generateImage,
  }),
  s3Storage({
    enabled: s3Enabled,
    // Keep the media table identical whether or not S3 is configured, so migrations match production.
    alwaysInsertFields: true,
    collections: { media: { prefix: 'media' } },
    bucket: process.env.S3_BUCKET || 'media',
    config: {
      endpoint: process.env.S3_ENDPOINT,
      region: process.env.S3_REGION || 'eu-west-2',
      forcePathStyle: true,
      credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
      },
    },
  }),
]
