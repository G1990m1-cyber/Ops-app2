import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

export async function getRedirects(depth = 1) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'redirects',
    depth,
    limit: 0,
    pagination: false,
    overrideAccess: true,
  })
  return docs
}

export const getCachedRedirects = () =>
  unstable_cache(async () => getRedirects(), ['redirects'], { tags: ['collection_redirects'] })
