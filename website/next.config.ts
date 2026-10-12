import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'
import { fileURLToPath } from 'url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    localPatterns: [{ pathname: '/api/media/file/**' }, { pathname: '/media/**' }, { pathname: '/images/**' }],
    remotePatterns: [
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.storage.supabase.co' },
    ],
    deviceSizes: [390, 640, 768, 1024, 1280, 1536, 1920, 2400],
    // Uploads get a unique filename, so optimised copies can be cached for a long time.
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  turbopack: { root: path.resolve(dirname) },
  // The seed route reads the migrated images from disk; make sure they ship with that function.
  outputFileTracingIncludes: { '/next/seed': ['./content/images/**/*'] },
  async redirects() {
    return [
      // The homepage lives at '/', not at the 'home' page slug; collapse the duplicates.
      { source: '/home', destination: '/', permanent: true },
      { source: '/index', destination: '/', permanent: true },
      // Browsers still request /favicon.ico; point it at the SVG we ship.
      { source: '/favicon.ico', destination: '/favicon.svg', permanent: false },
    ]
  },
  async headers() {
    // Permissive but real: allows the admin, Google Tag Manager (after consent), map embeds,
    // Supabase storage and the booking engines over https, while blocking plugins/object embeds,
    // locking the page base URL and only allowing same-origin framing.
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "frame-ancestors 'self'",
      "img-src 'self' data: blob: https:",
      "media-src 'self' https:",
      "font-src 'self' data: https://fonts.gstatic.com",
      "style-src 'self' 'unsafe-inline' https:",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https:",
      "worker-src 'self' blob:",
      "connect-src 'self' https:",
      "frame-src 'self' https:",
      "form-action 'self' https:",
    ].join('; ')
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Content-Security-Policy', value: csp },
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
    ]
  },
}

export default withPayload(nextConfig, { devBundleServerPackages: false })
