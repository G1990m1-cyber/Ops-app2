import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

import { seed } from '@/seed'
import { getPayloadClient } from '@/utilities/data'

export const maxDuration = 300

/** Admin-only: loads the migrated content into an empty database. Safe to call again; it resumes. */
export async function POST(req: NextRequest) {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await headers() })
  if (!user || user.role !== 'admin') return NextResponse.json({ ok: false, message: 'Admins only.' }, { status: 403 })
  // Guard against re-seeding a populated site, which would overwrite hotel pages back to the migrated
  // content. The dashboard button only shows on an empty site; a deliberate re-run needs ?force=1.
  const force = new URL(req.url).searchParams.get('force') === '1'
  if (!force) {
    const existing = await payload.count({ collection: 'hotels', overrideAccess: true })
    if (existing.totalDocs > 0) {
      return NextResponse.json(
        { ok: false, message: 'The site already has content. Re-seeding would overwrite hotel pages. Add ?force=1 if you really mean to.' },
        { status: 409 },
      )
    }
  }
  try {
    await seed(payload)
    // The seed writes with revalidation switched off; clear every cached page once at the end.
    revalidatePath('/', 'layout')
    return NextResponse.json({ ok: true })
  } catch (err) {
    payload.logger.error({ err }, 'Seed failed')
    return NextResponse.json({ ok: false, message: err instanceof Error ? err.message : 'Seed failed' }, { status: 500 })
  }
}
