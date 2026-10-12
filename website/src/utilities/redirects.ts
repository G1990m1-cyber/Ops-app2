import { notFound, permanentRedirect, redirect } from 'next/navigation'

import { getCachedRedirects } from './getRedirects'

const normalise = (p: string) => (p.length > 1 ? p.replace(/\/+$/, '') : p)

/** Looks a path up in the admin-managed redirects. Returns the destination, or null. */
export const resolveRedirect = async (url: string): Promise<{ to: string; permanent: boolean } | null> => {
  const redirects = await getCachedRedirects()()
  const target = normalise(url)
  const match = redirects.find((r) => normalise(r.from) === target)
  if (!match) return null
  let dest: string | null = null
  if (match.to?.type === 'custom' && match.to.url) dest = match.to.url
  else if (match.to?.reference && typeof match.to.reference.value === 'object' && match.to.reference.value) {
    const slug = (match.to.reference.value as { slug?: string | null }).slug
    if (slug) dest = slug === 'home' ? '/' : `/${slug}`
  }
  return dest ? { to: dest, permanent: match.type !== '302' } : null
}

/**
 * Call from the top of a page function when nothing matched the URL:
 * sends the visitor to the admin-managed redirect if one exists, otherwise shows the 404 page.
 */
export const redirectOrNotFound = async (url: string): Promise<never> => {
  const r = await resolveRedirect(url)
  if (r) {
    if (r.permanent) permanentRedirect(r.to)
    redirect(r.to)
  }
  notFound()
}
