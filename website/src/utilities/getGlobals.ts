import type { Config } from '@/payload-types'

import configPromise from '@payload-config'
import { type DataFromGlobalSlug, getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Global = keyof Config['globals']

async function getGlobal<T extends Global>(slug: T, depth = 1): Promise<DataFromGlobalSlug<T>> {
  const payload = await getPayload({ config: configPromise })
  return payload.findGlobal({ slug, depth, overrideAccess: true })
}

export const getCachedGlobal = <T extends Global>(slug: T, depth = 1) =>
  unstable_cache(async () => getGlobal<T>(slug, depth), [slug, String(depth)], {
    tags: [`global_${slug}`],
  })
