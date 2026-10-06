import type { CollectionConfig } from 'payload'

import { hiddenUnlessAdmin, isAdmin } from '@/access'
import { pageBlocks } from '@/blocks'
import { seoTab } from '@/fields/seo'
import { slugField } from '@/fields/slug'
import { revalidateCollection, revalidateCollectionDelete } from '@/hooks/revalidate'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

const pathFor = (slug?: string | null) => (slug ? (slug === 'home' ? '/' : `/${slug}`) : null)

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  access: {
    create: isAdmin,
    delete: isAdmin,
    update: isAdmin,
    read: ({ req }) => (req.user ? true : { _status: { equals: 'published' } }),
  },
  defaultPopulate: { title: true, slug: true },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt', '_status'],
    group: 'Content',
    hidden: hiddenUnlessAdmin,
    livePreview: { url: ({ data }) => generatePreviewPath({ path: pathFor(data?.slug) }) },
    preview: (data) => generatePreviewPath({ path: pathFor(data?.slug as string) }),
    description: 'Group pages such as Home, About, Contact, Careers and legal pages. Built from blocks.',
  },
  versions: {
    drafts: { autosave: { interval: 300 }, schedulePublish: true },
    maxPerDoc: 50,
  },
  hooks: {
    afterChange: [revalidateCollection('pages')],
    afterDelete: [revalidateCollectionDelete('pages')],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField({ description: 'Use "home" for the home page.' }),
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'layout',
              type: 'blocks',
              label: 'Blocks',
              blocks: pageBlocks,
              required: true,
              admin: { initCollapsed: true },
            },
          ],
        },
        seoTab(),
      ],
    },
    {
      name: 'showInSitemap',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar' },
    },
  ],
}
