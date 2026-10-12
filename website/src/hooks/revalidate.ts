import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
} from 'payload'
import { revalidatePath, revalidateTag } from 'next/cache'

type Doc = { slug?: string | null; _status?: string | null; hotel?: unknown }

const hotelSlugOf = (doc: Doc): string | null => {
  const h = doc.hotel
  if (h && typeof h === 'object' && 'slug' in h && typeof h.slug === 'string') return h.slug
  return null
}

/**
 * Clears Next.js caches when content changes so the public site updates straight away.
 * Collections tagged `collection_<slug>` and per-hotel pages are refreshed.
 */
export const revalidateCollection =
  (collection: string): CollectionAfterChangeHook =>
  ({ doc, previousDoc, req: { context, payload } }) => {
    if (context.disableRevalidate) return doc
    try {
      revalidateTag(`collection_${collection}`, 'max')
      revalidateTag('sitemap', 'max')
      const d = doc as Doc
      const prev = previousDoc as Doc | undefined
      if (collection === 'pages' || collection === 'hotels') {
        for (const slug of [d.slug, prev?.slug]) {
          if (slug) revalidatePath(slug === 'home' ? '/' : `/${slug}`, 'layout')
        }
        // The hotel picker's fallback feed is a cached route; refresh it too so (un)published hotels appear at once.
        if (collection === 'hotels') revalidatePath('/api/book-targets')
      } else {
        const slug = hotelSlugOf(d) ?? (prev ? hotelSlugOf(prev) : null)
        if (slug) revalidatePath(`/${slug}`, 'layout')
        revalidatePath('/', 'page')
      }
    } catch (err) {
      payload.logger.warn({ err }, 'Revalidation skipped')
    }
    return doc
  }

export const revalidateCollectionDelete =
  (collection: string): CollectionAfterDeleteHook =>
  ({ doc, req: { context } }) => {
    if (context.disableRevalidate) return doc
    try {
      revalidateTag(`collection_${collection}`, 'max')
      revalidateTag('sitemap', 'max')
      const d = doc as Doc
      if (d.slug) revalidatePath(d.slug === 'home' ? '/' : `/${d.slug}`, 'layout')
      if (collection === 'hotels') revalidatePath('/api/book-targets')
      const hotelSlug = hotelSlugOf(d)
      if (hotelSlug) revalidatePath(`/${hotelSlug}`, 'layout')
    } catch {
      /* no server context (e.g. seeding) */
    }
    return doc
  }

export const revalidateGlobal =
  (slug: string): GlobalAfterChangeHook =>
  ({ doc, req: { context } }) => {
    if (context.disableRevalidate) return doc
    try {
      revalidateTag(`global_${slug}`, 'max')
      revalidatePath('/', 'layout')
    } catch {
      /* ignore */
    }
    return doc
  }
