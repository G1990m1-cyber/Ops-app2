import type { GlobalConfig } from 'payload'

import { hiddenUnlessAdmin, isAdmin } from '@/access'
import { revalidateGlobal } from '@/hooks/revalidate'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: { read: () => true, update: isAdmin },
  admin: { group: 'Settings', hidden: hiddenUnlessAdmin },
  hooks: { afterChange: [revalidateGlobal('site-settings')] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            { name: 'siteName', type: 'text', required: true, defaultValue: 'GR Hotels' },
            { name: 'tagline', type: 'text', defaultValue: 'Characterful hotels and pubs with rooms across Britain' },
            {
              type: 'row',
              fields: [
                { name: 'logo', type: 'upload', relationTo: 'media', label: 'Logo (dark, on light backgrounds)', admin: { width: '50%' } },
                { name: 'logoLight', type: 'upload', relationTo: 'media', label: 'Logo (white, on photos)', admin: { width: '50%' } },
              ],
            },
          ],
        },
        {
          label: 'Default SEO',
          fields: [
            {
              name: 'seo',
              type: 'group',
              label: false,
              fields: [
                { name: 'titleSuffix', type: 'text', defaultValue: 'GR Hotels', admin: { description: 'Added after every page title, e.g. "Rooms | The Castle | GR Hotels".' } },
                { name: 'defaultDescription', type: 'textarea', maxLength: 160 },
                { name: 'defaultImage', type: 'upload', relationTo: 'media', label: 'Default sharing image (1200×630)' },
                { name: 'twitterHandle', type: 'text', admin: { description: 'Without the @' } },
              ],
            },
          ],
        },
        {
          label: 'Contact & social',
          fields: [
            {
              name: 'contact',
              type: 'group',
              label: false,
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'phone', type: 'text', admin: { width: '50%' } },
                    { name: 'email', type: 'email', admin: { width: '50%' } },
                  ],
                },
                { name: 'address', type: 'textarea', label: 'Registered address' },
                { name: 'companyLine', type: 'text', label: 'Company details line', admin: { description: 'e.g. "GR Hotels Ltd, registered in England No. 00000000"' } },
              ],
            },
            {
              name: 'social',
              type: 'group',
              label: 'Group social links',
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
                    { name: 'linkedin', type: 'text', admin: { width: '50%' } },
                    { name: 'x', type: 'text', label: 'X (Twitter)', admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Enquiries',
          fields: [
            {
              name: 'enquiries',
              type: 'group',
              label: false,
              fields: [
                {
                  type: 'row',
                  fields: [
                    {
                      name: 'fallbackEmail',
                      type: 'email',
                      label: 'Group enquiry email',
                      admin: { width: '50%', description: 'Receives messages from group pages, and from any hotel that has no enquiry email of its own.' },
                    },
                    {
                      name: 'copyTo',
                      type: 'email',
                      label: 'Always copy to',
                      admin: { width: '50%', description: 'Optional. Every enquiry from every hotel is also sent here.' },
                    },
                  ],
                },
                {
                  name: 'autoReply',
                  type: 'checkbox',
                  label: 'Send guests an automatic thank-you email',
                  defaultValue: true,
                },
                {
                  name: 'autoReplySubject',
                  type: 'text',
                  label: 'Thank-you subject',
                  defaultValue: 'Thank you for your message',
                  admin: { condition: (data) => data?.enquiries?.autoReply !== false },
                },
                {
                  name: 'autoReplyMessage',
                  type: 'textarea',
                  label: 'Thank-you message',
                  defaultValue:
                    'Dear {name},\n\nThank you for getting in touch with {hotel}. We have your message and will reply as soon as we can, usually within one working day.\n\nIf your enquiry is urgent, please call us on {phone}.\n\nWarm regards,\nThe team at {hotel}',
                  admin: {
                    description: 'Plain text. {name}, {hotel} and {phone} are filled in automatically. {hotel} becomes the site name for group enquiries.',
                    condition: (data) => data?.enquiries?.autoReply !== false,
                  },
                },
              ],
            },
          ],
        },
        {
          label: 'Booking & tracking',
          fields: [
            {
              name: 'booking',
              type: 'group',
              label: false,
              fields: [
                { name: 'pickerTitle', type: 'text', defaultValue: 'Where would you like to stay?' },
                { name: 'pickerIntro', type: 'text', defaultValue: 'Choose a hotel and we will take you to its booking page.' },
                {
                  type: 'row',
                  fields: [
                    { name: 'utmSource', type: 'text', defaultValue: 'grhotels.co.uk', admin: { width: '50%' } },
                    { name: 'utmMedium', type: 'text', defaultValue: 'website', admin: { width: '50%' } },
                  ],
                },
              ],
            },
            {
              name: 'cookies',
              type: 'group',
              label: 'Cookie banner',
              fields: [
                { name: 'title', type: 'text', defaultValue: 'A word about cookies' },
                {
                  name: 'text',
                  type: 'textarea',
                  defaultValue:
                    'We use cookies to understand how the site is used and to measure our advertising. Analytics only run if you accept.',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
