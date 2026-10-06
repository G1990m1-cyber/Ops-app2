import { NextResponse, type NextRequest } from 'next/server'

/**
 * Runs before routing:
 *  - collapses repeated slashes (the old site produced /royal-oak/// links) and lower-cases paths
 *  - applies the admin-managed redirects (Redirects collection) with a single clean 301/302
 * Trailing slashes are handled by Next.js itself (permanent redirect to the clean URL).
 */

type Entry = { from: string; to: string; permanent: boolean }
let cache: { at: number; items: Entry[] } | null = null
const TTL = 60_000

const normalise = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p)

async function loadRedirects(origin: string): Promise<Entry[]> {
  if (cache && Date.now() - cache.at < TTL) return cache.items
  let items: Entry[] = cache?.items || []
  try {
    const res = await fetch(`${origin}/api/redirects?limit=0&depth=1`, { headers: { accept: 'application/json' }, cache: 'no-store' })
    if (res.ok) {
      const json = (await res.json()) as { docs?: Array<{ from: string; type?: string | null; to?: { type?: string | null; url?: string | null; reference?: { value?: { slug?: string | null } | number | string | null } | null } | null }> }
      items = (json.docs || [])
        .map((r) => {
          let to: string | null = null
          if (r.to?.type === 'custom' && r.to.url) to = r.to.url
          else if (r.to?.reference && typeof r.to.reference.value === 'object' && r.to.reference.value?.slug) {
            const slug = r.to.reference.value.slug
            to = slug === 'home' ? '/' : `/${slug}`
          }
          return to ? { from: normalise(r.from), to, permanent: r.type !== '302' } : null
        })
        .filter((x): x is Entry => Boolean(x))
    }
  } catch {
    /* keep the previous list */
  }
  cache = { at: Date.now(), items }
  return items
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  if (pathname.startsWith('/_next') || pathname.startsWith('/api') || pathname.startsWith('/admin') || pathname.startsWith('/next/')) {
    return NextResponse.next()
  }

  const collapsed = pathname.replace(/\/{2,}/g, '/')
  const lowered = /[A-Z]/.test(collapsed) ? collapsed.toLowerCase() : collapsed
  if (lowered !== pathname) {
    const url = request.nextUrl.clone()
    url.pathname = lowered
    return NextResponse.redirect(url, 301)
  }

  const redirects = await loadRedirects(request.nextUrl.origin)
  if (redirects.length) {
    const target = normalise(pathname)
    const match = redirects.find((r) => r.from === target)
    if (match && normalise(match.to) !== target) {
      const dest = match.to.startsWith('http') ? match.to : new URL(match.to, request.nextUrl.origin)
      return NextResponse.redirect(dest, match.permanent ? 301 : 302)
    }
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon|fonts|images|media).*)'],
}
