#!/usr/bin/env node
/**
 * Takes phone + desktop screenshots of key pages for review and the manager guide.
 * Usage: node scripts/screenshots.mjs http://localhost:3000 out-dir
 */
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const base = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '')
const out = process.argv[3] || 'screenshots'
mkdirSync(out, { recursive: true })

const pages = ['/', '/hotels', '/the-george-at-piercebridge', '/grassington-lodge/rooms', '/castle-berwick/dining', '/queens-head-berwick/contact', '/offers', '/contact-us']
const viewports = { phone: { width: 390, height: 844 }, desktop: { width: 1440, height: 900 } }

const browser = await chromium.launch()
for (const [name, viewport] of Object.entries(viewports)) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  for (const path of pages) {
    const file = `${out}/${name}${path === '/' ? '-home' : path.replace(/\//g, '-')}.png`
    const res = await page.goto(base + path, { waitUntil: 'networkidle', timeout: 60000 })
    await page.evaluate(() => { try { localStorage.setItem('gr-consent', JSON.stringify({ choice: 'denied', at: Date.now() })) } catch {} })
    await page.reload({ waitUntil: 'networkidle' })
    await page.screenshot({ path: file, fullPage: path !== '/' })
    console.log(`${res?.status()}  ${name.padEnd(8)} ${path.padEnd(36)} → ${file}`)
  }
  await ctx.close()
}
await browser.close()
