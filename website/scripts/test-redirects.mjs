#!/usr/bin/env node
/**
 * Checks every old grhotels.co.uk URL against the new site.
 * Usage: node scripts/test-redirects.mjs https://preview-url.vercel.app
 * Passes when each URL returns 200, or a 301/308 that lands on a 200.
 */
const base = (process.argv[2] || process.env.SITE_URL || 'http://localhost:3000').replace(/\/$/, '')

const oldUrls = [
  '/',
  '/contact-us/',
  '/contact/',
  '/the-george-at-piercebridge/',
  '/royal-oak/',
  '/queens-head-berwick/',
  '/queens-head-berwick/rooms/',
  '/queens-head-berwick/dining/',
  '/queens-head-berwick/facilities/',
  '/castle-berwick/',
  '/castle-berwick/rooms/',
  '/castle-berwick/dining/',
  '/castle-berwick/function-and-conference-rooms/',
  '/grassington-lodge/',
  '/grassington-lodge/rooms/',
  '/grassington-lodge/rooms/room-six/',
  '/grassington-lodge/rooms/room-seven-premium-room/',
  '/grassington-lodge/rooms/vendale-1/',
  '/grassington-lodge/rooms/family-room/',
  '/grassington-lodge/facilities/',
  '/thevines/',
  '/thevines/facilities/',
  '/caer-beris/',
  '/caer-beris/local-attractions/',
  '/the-riverside-house-hotel/',
  '/royal-oak///',
  '/ROYAL-OAK/',
]

const follow = async (path) => {
  const chain = []
  let url = base + path
  for (let i = 0; i < 6; i++) {
    const res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'grhotels-redirect-test' } })
    chain.push(`${res.status}`)
    if ([301, 302, 307, 308].includes(res.status)) {
      const loc = res.headers.get('location')
      if (!loc) break
      url = loc.startsWith('http') ? loc : base + loc
      continue
    }
    return { ok: res.status === 200, chain, final: url.replace(base, '') }
  }
  return { ok: false, chain, final: url.replace(base, '') }
}

let failed = 0
for (const path of oldUrls) {
  const r = await follow(path)
  if (!r.ok) failed++
  console.log(`${r.ok ? 'PASS' : 'FAIL'}  ${path.padEnd(55)} ${r.chain.join(' → ').padEnd(16)} ${r.final}`)
}
console.log(`\n${oldUrls.length - failed}/${oldUrls.length} passed against ${base}`)
process.exit(failed ? 1 : 0)
