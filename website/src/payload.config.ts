import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import {
  Enquiries,
  Events,
  Hotels,
  Media,
  Menus,
  Offers,
  Pages,
  Rooms,
  Testimonials,
  Users,
} from './collections'
import { simpleLexical } from './fields/lexical'
import { AnnouncementBar, Navigation, SiteSettings } from './globals'
import { plugins } from './plugins'
import { getServerSideURL } from './utilities/getURL'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const fromAddress = process.env.EMAIL_FROM_ADDRESS || 'website@grhotels.co.uk'
const fromName = process.env.EMAIL_FROM_NAME || 'GR Hotels'

/** Resend if configured, otherwise SMTP, otherwise Payload logs emails to the console (dev). */
const email = process.env.RESEND_API_KEY
  ? resendAdapter({
      apiKey: process.env.RESEND_API_KEY,
      defaultFromAddress: fromAddress,
      defaultFromName: fromName,
    })
  : process.env.SMTP_HOST
    ? nodemailerAdapter({
        defaultFromAddress: fromAddress,
        defaultFromName: fromName,
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: Number(process.env.SMTP_PORT || 587) === 465,
          auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
        },
      })
    : undefined

export default buildConfig({
  serverURL: getServerSideURL(),
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: ' · GR Hotels',
      description: 'GR Hotels website admin',
      icons: [{ rel: 'icon', type: 'image/svg+xml', url: '/favicon.svg' }],
    },
    components: {
      graphics: {
        Logo: '@/components/admin/Logo#Logo',
        Icon: '@/components/admin/Logo#Icon',
      },
      beforeDashboard: ['@/components/admin/Dashboard#Dashboard'],
    },
    importMap: { baseDir: path.resolve(dirname) },
    livePreview: {
      breakpoints: [
        { label: 'Phone', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 820, height: 1180 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
    },
    dateFormat: 'd MMM yyyy, h:mm a',
    timezones: { defaultTimezone: 'Europe/London' },
  },
  editor: simpleLexical,
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
    migrationDir: path.resolve(dirname, 'migrations'),
    push: process.env.NODE_ENV !== 'production' && process.env.PAYLOAD_DB_PUSH !== 'false',
  }),
  collections: [Hotels, Rooms, Menus, Events, Offers, Pages, Media, Testimonials, Enquiries, Users],
  globals: [SiteSettings, Navigation, AnnouncementBar],
  plugins,
  email,
  sharp,
  cors: [getServerSideURL()].filter(Boolean),
  csrf: [getServerSideURL()].filter(Boolean),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  graphQL: { disable: true },
  upload: {
    limits: { fileSize: 60 * 1024 * 1024 },
  },
})
