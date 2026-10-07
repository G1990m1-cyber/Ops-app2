import { revalidatePath } from 'next/cache'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

import { seed } from '@/seed'
import { getPayloadClient } from '@/utilities/data'

export const maxDuration = 300

/** Admin-only: loads the migrated content into an empty database. Safe to call again; it resumes. */
export async function POST() {
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: await headers() })
  if (!user || user.role !== 'admin') return NextResponse.json({ ok: false, message: 'Admins only.' }, { status: 403 })
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
