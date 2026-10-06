import type { Field } from 'payload'
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from '@payloadcms/plugin-seo/fields'

import { adminOnlyField } from '@/access'

/**
 * SEO tab shared by Pages and Hotels. Everything may be left blank:
 * the site fills in sensible defaults (see utilities/generateMeta.ts).
 */
export const seoTab = ({ adminOnly = false }: { adminOnly?: boolean } = {}) => ({
  name: 'meta',
  label: 'SEO & sharing',
  admin: adminOnly ? { condition: (_: unknown, __: unknown, { user }: { user?: { role?: string } | null }) => user?.role === 'admin' } : undefined,
  fields: [
    OverviewField({
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
      imagePath: 'meta.image',
    }),
    MetaTitleField({ hasGenerateFn: true }),
    MetaDescriptionField({ hasGenerateFn: true }),
    MetaImageField({ relationTo: 'media', hasGenerateFn: true }),
    PreviewField({
      hasGenerateFn: true,
      titlePath: 'meta.title',
      descriptionPath: 'meta.description',
    }),
    {
      type: 'collapsible',
      label: 'Social sharing (Facebook, WhatsApp, LinkedIn, X)',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'ogTitle',
          type: 'text',
          label: 'Social title',
          admin: { description: 'Leave blank to reuse the meta title.' },
        },
        {
          name: 'ogDescription',
          type: 'textarea',
          label: 'Social description',
          admin: { description: 'Leave blank to reuse the meta description.' },
        },
        {
          name: 'twitterCard',
          type: 'select',
          label: 'X / Twitter card style',
          defaultValue: 'summary_large_image',
          options: [
            { label: 'Large image', value: 'summary_large_image' },
            { label: 'Small summary', value: 'summary' },
          ],
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Advanced',
      admin: { initCollapsed: true },
      fields: [
        {
          name: 'canonicalUrl',
          type: 'text',
          label: 'Canonical URL',
          access: { update: adminOnlyField },
          admin: {
            description:
              'Only needed if this page is a copy of a page elsewhere. Leave blank normally.',
          },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          label: 'Hide from search engines',
          access: { update: adminOnlyField },
          defaultValue: false,
        },
      ],
    },
  ] as Field[],
})
