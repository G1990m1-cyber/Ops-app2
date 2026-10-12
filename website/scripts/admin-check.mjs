#!/usr/bin/env node
/**
 * Smoke-tests the admin: logs in as the admin and as the sample manager, and checks
 * the manager sees only their hotels. Usage: node scripts/admin-check.mjs http://localhost:3000 out-dir
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')
const out = process.argv[3] || 'screenshots'
mkdirSync(out, { recursive: true })

const login = async (page, email, password) => {
  await page.goto(`${base}/admin/login`, { waitUntil: 'networkidle' })
  await page.fill('input[name="email"]', email)
  await page.fill('input[name="password"]', password)
  await page.click('button[type="submit"]')
  await page.waitForURL(/\/admin(?!\/login)/, { timeout: 60000 })
  await page.waitForLoadState('networkidle')
}

const browser = await chromium.launch()
const results = []

for (const who of [
  { label: 'admin', email: process.env.SEED_ADMIN_EMAIL || 'admin@grhotels.co.uk', password: process.env.SEED_ADMIN_PASSWORD || 'GRHotels-Admin-2026!' },
  { label: 'manager', email: 'manager@example.grhotels.co.uk', password: 'Manager-Demo-2026!' },
]) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } })
  const page = await ctx.newPage()
  await login(page, who.email, who.password)
  await page.screenshot({ path: `${out}/admin-dashboard-${who.label}.png`, fullPage: true })
  const navText = await page.locator('nav').first().innerText().catch(() => '')
  const body = await page.locator('body').innerText()
  results.push({
    who: who.label,
    seesUsers: /Users/.test(navText),
    seesPages: /\bPages\b/.test(navText),
    seesSiteSettings: /Site settings/.test(navText),
    dashboardActions: /Upload a menu/.test(body) && /Add an event/.test(body) && /Add an offer/.test(body),
    hotelsListed: [...body.matchAll(/(The George at Piercebridge|Royal Oak|Queens Head|The Castle|Grassington Lodge|The Vines|Caer Beris Manor|The Riverside House Hotel)/g)].map((m) => m[1]).filter((v, i, a) => a.indexOf(v) === i),
  })
  // Hotels list view: manager should only see their two
  await page.goto(`${base}/admin/collections/hotels`, { waitUntil: 'networkidle' })
  const rows = await page.locator('table tbody tr').count().catch(() => -1)
  results[results.length - 1].hotelRowsInList = rows
  await page.screenshot({ path: `${out}/admin-hotels-${who.label}.png`, fullPage: true })
  if (who.label === 'manager') {
    await page.goto(`${base}/admin/collections/menus/create`, { waitUntil: 'networkidle' })
    await page.screenshot({ path: `${out}/admin-menu-create-manager.png`, fullPage: true })
    // Try to open a hotel the manager does not own (id 1 = The George): expect not found / forbidden
    const res = await page.goto(`${base}/admin/collections/hotels/1`, { waitUntil: 'networkidle' })
    results[results.length - 1].foreignHotelStatus = res?.status()
    results[results.length - 1].foreignHotelBlocked = /not found|unauthorized|not allowed|forbidden/i.test(await page.locator('body').innerText())
  }
  await ctx.close()
}
await browser.close()
console.log(JSON.stringify(results, null, 2))
