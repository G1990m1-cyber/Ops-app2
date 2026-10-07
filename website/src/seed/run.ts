import 'dotenv/config'
import { getPayload } from 'payload'

import config from '../payload.config'
import { seed } from './index'

/**
 * Usage:  pnpm seed            (adds/updates the migrated content, keeps anything else)
 *         pnpm seed -- --reset (clears content collections first)
 */
const run = async () => {
  const reset = process.argv.includes('--reset')
  const payload = await getPayload({ config })
  await seed(payload, { reset })
  process.exit(0)
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
