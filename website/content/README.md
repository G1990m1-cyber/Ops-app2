# Migrated content

- `crawl/`: everything captured from the old www.grhotels.co.uk on 7 Oct 2026 (Yoast sitemap URLs, page copy, testimonials, map addresses, booking links, image references).
- `images/`: every image the old site used, re-encoded at up to 2400px wide (originals were up to 19 MB). `index.json` records where each one came from. The seed script uploads these into the Media library.

The seed (`pnpm seed`) builds the eight hotels, their rooms, testimonials and pages from this folder.
