import type { MetadataRoute } from 'next'

import { getServerSideURL } from '@/utilities/getURL'

export default function robots(): MetadataRoute.Robots {
  const base = getServerSideURL()
  const isProd = process.env.VERCEL_ENV === 'production' || process.env.NODE_ENV === 'production'
  return {
    rules: isProd
      ? [{ userAgent: '*', allow: '/', disallow: ['/admin', '/api/', '/next/'] }]
      : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
