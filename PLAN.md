# GR Hotels website replacement — PLAN

**Status (7 Oct 2026): live for review at https://grhotels-website.vercel.app. The old site has been crawled (53 pages, 98 images) and its copy, photography, booking links, menus and contact details are loaded into the production database. The admin is at https://grhotels-website.vercel.app/admin.**

### What was built (summary)

- `website/`: Next.js 16 + Payload 3.90 app, Tailwind 4 brand tokens, self-hosted Cormorant Garamond and a Bodoni Moda stand-in for TAN Pearl.
- Content model, roles and access rules exactly as section 4, with one change: menu dietary flags are tick boxes instead of a multi-select (a multi-select that deep inside nested lists trips a Payload/Postgres bug in version history).
- 17 blocks (section 5 plus an **Enquiry form** block so contact forms can sit on any page). Payload's form-builder plugin was dropped in favour of a purpose-built enquiry form with hotel routing, honeypot and Turnstile; simpler for managers and one fewer moving part.
- Public site, Book Now with UTM tags and GTM events, hotel picker, mobile bar, cookie consent gating GTM-WVZV4DV8, newsletter to HubSpot, SEO fallbacks, sitemap, robots, JSON-LD, admin-managed redirects (applied in the request proxy), page transitions, image fade-in and gentle hero motion that switch off under "reduce motion".
- Manager dashboard with the three big actions, branded admin, seed script and an admin "Load the migrated content" button for an empty production database.
- Real content: 8 hotels, 26 rooms, 93 images with written alt text, 13 guest reviews, 10 group pages, 17 redirects from old URLs, plus one example menu, event and offer per hotel saved as drafts for managers to replace.
- Infrastructure: Supabase project **GR Hotels Website** (London, ref `kamdmgouuidvvhsujzmy`) for the database and the public `media` bucket; Vercel project `grhotels-website` in the Group Retreats team, London region, deploying from branch `ccr-0d76b103-2z12vu`. Migrations run on every deploy.
- Verified on the live site: 27/27 old URLs land on a page, a manager account cannot read or change other hotels (REST and admin), Lighthouse mobile 90+ on home and hotel pages for accessibility, best practice and SEO.
- Docs: `website/README.md`, `website/MANAGER-GUIDE.md`, `website/LAUNCH-CHECKLIST.md`, `website/.env.example`.

### Follow-up session: start here

If this is a new Claude session picking the work up: the build lives in `website/` on branch `ccr-0d76b103-2z12vu`; pushes to that branch deploy to production automatically. Read `website/README.md` first. Remaining work is `website/LAUNCH-CHECKLIST.md`, chiefly:

1. Add the email sending domain (`RESEND_API_KEY` or `SMTP_*` on Vercel) so enquiry emails and password resets send.
2. Add Turnstile and HubSpot keys when George supplies them; swap the Bodoni Moda stand-in for TAN Pearl and the PNG logo for the SVG.
3. Create real manager accounts, delete the sample manager, and set the Riverside House enquiry email.
4. Point `www.grhotels.co.uk` at Vercel and set `NEXT_PUBLIC_SERVER_URL` to the real domain.

### Still needed from you

Logo SVG, TAN Pearl files, HubSpot portal and form IDs, a Turnstile key, an email sending domain (Resend or SMTP), the Riverside House enquiry email, the names and emails for manager accounts, and access to DNS for the cutover.

This plan covers everything in your brief. It is written for you as the owner, not for a developer. Where I have made a decision on your behalf I say so and why. Where I need something from you it is listed in section 8.

---

## 1. Two things to sort before I can build

### 1a. I cannot reach the current website from this environment

This cloud environment has a network policy that blocks the live site, so the content crawl (every hotel page, images, menus, copy) has not happened yet. Everything about the current site in this plan comes from search-engine listings, which is enough to plan but not enough to migrate content.

The hosts the policy denied are:

- `www.grhotels.co.uk` (and `grhotels.co.uk`)
- `www.groupretreats.co.uk` (your visual reference)
- `payloadcms.com`, `nextjs.org`, `vercel.com`, `supabase.com` (the official docs you asked me to check before using each framework)
- `fonts.googleapis.com` / `fonts.gstatic.com` (Cormorant Garamond)
- `web.archive.org` (fallback copies of the site)
- the old agency subdomain that still serves some images (I will know its name once I can read the homepage)

To fix: open the cloud environment menu in this session's title bar, choose **Edit**, and under **Network access** either pick a broader access level or choose **Custom** and add the hosts above to Allowed domains (keep the default package-manager list). The steps are at https://code.claude.com/docs/en/cloud-environments#network-access. Once that is done I will run the full crawl, fill in the content inventory (section 3) and the redirect list (section 2), and update this file before building.

### 1b. This repository already contains a different app

`Ops-app2` currently holds your React Native "Ops App" (Expo front end plus an Express/Prisma backend) and a Supabase project called "Ops App". The website is a separate product with a separate deployment.

**Decision:** I will build the website in its own folder, `website/`, inside this repository, and point Vercel's "Root Directory" at that folder. Your Ops App stays untouched. This keeps "one repo, one deployment" for the website and avoids me needing access to a new repository. If you would rather have a clean separate repository (e.g. `grhotels-web`), say so and create it; nothing else in the plan changes.

**Database (affects cost, so your call):**

- Option A, recommended: a **new Supabase project** called "GR Hotels Website" in your Group Retreats organisation. Clean separation from the Ops App data and backups. Cost: Supabase Pro is about $25/month per project if you want daily backups and no pausing; the free tier pauses after a week of inactivity, which is not acceptable for a live hotel site.
- Option B: reuse the existing "Ops App" project with a separate `website` schema. No extra monthly cost, but the two products share one database, so a problem with one can affect the other and backups are tangled together.

I will go with A unless you say otherwise.

---

## 2. Sitemap

### Public pages

| Page | New URL | Notes |
|---|---|---|
| Home | `/` | Full-bleed hero, hotel grid, offers, newsletter |
| Our Hotels | `/hotels/` | All 8 hotels, map view |
| Offers | `/offers/` | Group-wide and per-hotel offers, auto-expire |
| Events | `/events/` | Upcoming across all hotels, auto-hide past |
| About | `/about/` | Group story |
| Contact | `/contact-us/` | Keeps the existing slug. Picker: which hotel to contact |
| Careers | `/careers/` | Simple block page |
| Privacy policy | `/privacy-policy/` | |
| Cookie policy | `/cookie-policy/` | Linked from the consent banner |
| Terms | `/terms/` | |
| Sitemap, robots, feeds | `/sitemap.xml`, `/robots.txt` | Generated automatically |

### Hotel pages (slugs kept exactly as today)

| Hotel | URL | Sub-pages found on the current site |
|---|---|---|
| The George at Piercebridge | `/the-george-at-piercebridge/` | (crawl pending) |
| Royal Oak, Hawkhurst | `/royal-oak/` | (crawl pending) |
| Queens Head, Berwick-upon-Tweed | `/queens-head-berwick/` | `rooms/`, `dining/` ("Sandgate Cafe"), `facilities/` |
| The Castle, Berwick-upon-Tweed | `/castle-berwick/` | `rooms/`, `dining/`, `function-and-conference-rooms/` |
| Grassington Lodge | `/grassington-lodge/` | `rooms/` plus one page per room (13 rooms found: The Suite, Vendale 1, Vendale 2, Rooms One to Nine, Family Room), `facilities/` |
| The Vines, Black Bourton | `/thevines/` | `facilities/` |
| Caer Beris Manor, Builth Wells | `/caer-beris/` | `local-attractions/` |
| The Riverside House Hotel, Mildenhall | `/the-riverside-house-hotel/` | (crawl pending) |

Each hotel gets these standard sub-pages, all editable as blocks:

- `/<hotel>/` overview
- `/<hotel>/rooms/` and `/<hotel>/rooms/<room>/`
- `/<hotel>/dining/` (menus live here)
- `/<hotel>/events/`
- `/<hotel>/offers/`
- `/<hotel>/weddings-and-functions/` (only shown where the hotel has it switched on)
- `/<hotel>/contact/` (map, directions, enquiry form routed to that hotel)

### Redirects

Every old URL from the crawl will be mapped. Known so far:

- All hotel slugs above: served directly, no redirect needed.
- `/grassington-lodge/rooms/room-six/` and similar room pages: served directly under the new room sub-pages.
- Triple-slash URLs (e.g. `/royal-oak///`): normalised with a 301 to the clean URL.
- Any `/index.php/...`, `?p=` or Elementor preview URLs: 301 to the nearest page.
- Images on the old agency subdomain: downloaded, uploaded to Supabase Storage, and never referenced again.

The full list goes into a `redirects` collection in the admin so you can add more later without a developer. A test script in the repo checks every old URL returns 200 or 301 to the right place (part of the launch checklist).

---

## 3. Content inventory from the current site (partial, from search listings)

To be completed after the crawl. Facts gathered so far:

- **Group strapline:** "the UK's leading niche hotel groups with outstanding properties, situated in some of the UK's most idyllic settings". I will suggest a tidier version for your approval.
- **The George at Piercebridge:** 16th-century coaching inn on the River Tees. Weddings and celebrations with an events team. Phone 01325 374576.
- **Royal Oak:** Rye Road, Hawkhurst, TN18 4EP. Twelve rooms (Double, Twin, Family). Booking sites list it under "Cranbrook" because Hawkhurst is in the Cranbrook postal area. **Recommendation:** call it "Royal Oak, Hawkhurst" and mention "near Cranbrook" in the intro and SEO text so both searches find it. Please confirm.
- **Queens Head, Berwick:** 6-bedroom self check-in hotel overlooking Sandgate. Breakfast hamper. Sandgate Cafe open daily 10am to 6pm with brunch, sharing platters, bistro and Sunday lunch menus; available for private functions.
- **The Castle, Berwick:** rooms refurbished 2021, en suite with power showers. Stone-baked pizza. Function room for 50 dining or 100 standing. One hour by road or 40 minutes by rail from Edinburgh or Newcastle. Phone 01289 307900.
- **Grassington Lodge:** room-only, 13 rooms, some dog friendly, Vendale rooms in a separate building with 6' super-king beds.
- **The Vines, Black Bourton:** 18 bedrooms.
- **Caer Beris Manor:** 21 individually styled en suite bedrooms, self check-in. Listed phone 01473 597897 is an Ipswich number, which looks like a central reservations line rather than the hotel. Please confirm which number should show.
- **The Riverside House Hotel, Mildenhall:** built 1720, on the River Lark, family run.
- **Newsletter copy:** "keep up to date with hotel news, seasonal offers/promotions and exclusive offers".

Still needed from the crawl: all page copy, every image with alt text, menus (PDF or on-page), room lists for the other six hotels, addresses and emails, social links, the current OG/meta text, the GTM snippet placement, and the agency subdomain name.

---

## 4. Content model (what managers and admins will see in the admin)

### Collections

**Hotels** — one entry per property.
Name, slug (locked to the old URL), short location label ("Hawkhurst, Kent"), hero image or video, intro, gallery, facilities (ticked from a shared list), address, phone, email, map pin (lat/long with a picker), booking engine URL, social links, "has weddings and functions" switch, page blocks (section 5), SEO panel, assigned managers.

**Rooms** — belongs to a hotel. Name, sleeps, bed type, short description, gallery, "from" price (optional), features, dog friendly switch, booking URL override (optional).

**Menus** — belongs to a hotel. Title, type (Food, Drinks, Breakfast, Sunday, Christmas, Afternoon Tea, Specials, Other), either a PDF upload or structured sections and items (name, description, price, dietary tags), valid from, valid to. Expired menus disappear from the site automatically but stay in the admin.

**Events** — belongs to a hotel. Title, start date and time, end (optional), image, description, ticket or booking link (optional), price text. Past events hide automatically.

**Offers** — belongs to a hotel or marked group-wide. Title, image, summary, terms, start and end dates, call-to-action link (defaults to the hotel's booking URL). Expired offers hide automatically.

**Pages** — generic block-built pages (home, about, contact, careers, legal). Title, slug, blocks, SEO panel.

**Media** — every upload. Alt text is required. Focal point picker. Automatic resizing to several widths and conversion to WebP/AVIF. Limits: images 10 MB, PDFs 20 MB, video 60 MB (hero videos should be short and muted).

**Testimonials** — quote, name, hotel (optional), source (Google, TripAdvisor, guest book).

**Enquiries** — a log of every contact form submission, so nothing is lost if an email bounces. Managers see only their hotel's enquiries.

**Redirects** — from path, to path or page, type (301 permanent or 302 temporary).

**Users** — email, name, role (Admin or Hotel Manager), assigned hotels.

### Globals (admin only)

- **Site settings:** logo, group contact details, social links, default SEO text and image, Twitter handle, HubSpot form details.
- **Navigation:** header menu, footer columns, legal links.
- **Announcement bar:** on/off, text, link, optional start and end dates.

### Automatic behaviours

- Dates drive visibility: menus, events and offers appear and disappear without anyone remembering to unpublish.
- Every hotel outputs Hotel/LocalBusiness structured data (name, address, phone, geo, image, price range if set) for Google.
- Sitemap and robots regenerate on publish.
- SEO fallbacks: meta title becomes "{Page} | {Hotel} | GR Hotels"; description falls back to the intro; OG image falls back to the hero, then the group default.

---

## 5. Block library

Each block has the same three style controls and nothing else, so pages cannot go off brand:

- **Background tone:** Cream (#faf6f1), Sand (#f1e9e0), Linen (#ddcab4), Charcoal (#262626, white text). No colour picker.
- **Spacing:** Compact, Normal, Generous.
- **Alignment:** Left or Centre (where it applies).

| Block | What it does |
|---|---|
| Hero | Full-bleed image or muted looping video, title in TAN Pearl, optional subtitle and button. Text sits over a #815c46 overlay at 40 to 60 percent or a soft gradient. Heights: Full screen, Tall, Short. |
| Text | Rich text with headings, lists, links. Optional narrow measure for readability. |
| Text with image | Image left or right, rich text alongside, optional button. |
| Gallery | Grid or masonry, lightbox, captions from alt text. |
| Room cards | Pulls rooms from the hotel, or hand-picked rooms. Card shows image, name, sleeps, from price, Book button. |
| Facilities icon grid | Thin-line icons from a fixed brand set (Wi-Fi, parking, dog friendly, garden, restaurant, bar, EV charging, accessible, family, meetings, weddings, river views...). |
| Menus list | Shows the hotel's current menus grouped by type. PDF menus open in a new tab; structured menus render on page. |
| Events list | Upcoming events for the hotel or group, with "load more". |
| Offers | Current offers as cards or a single feature. |
| Testimonials | Rotating quotes with gentle fade. |
| Map and directions | Map with the hotel pin, address, "Get directions" link, optional directions text (by car, by rail). |
| FAQ | Accordion, outputs FAQ structured data. |
| CTA banner | Image or tone background, headline, one or two buttons. Book Now variant uses the hotel's booking URL. |
| Newsletter signup | Email field posting to HubSpot, consent wording, success message. |
| Embed | For a trusted list of providers only (YouTube, Vimeo, Google Maps, booking widgets). Blocked until the visitor accepts cookies. |
| Hotel grid | (group pages) Cards for all hotels with location, one-line intro, Book and Explore buttons. |

Editors add, remove and drag blocks in the admin. Live preview shows the page as it will look before publishing.

---

## 6. Design approach

- **Imagery first.** Big photography, lots of breathing room, cream backgrounds. Group Retreats is the quality bar.
- **Type.** TAN Pearl for page titles and hotel names only, sentence case, large. Until you send the font files I will use a close display serif as a stand-in (Cormorant Garamond at display weight or a similar licensed-free serif) behind a single CSS variable, so swapping in TAN Pearl is a five-minute job. Body and subheadings in Cormorant Garamond, 18px minimum on phones, 20px on desktop.
- **Colour.** Tokens as CSS variables from your palette. Charcoal #262626 for text on light tones for WCAG AA. #88764c as the single accent (buttons, links, icon strokes). I will check every text/background pairing for AA contrast and avoid the lighter secondary tones for small text.
- **Motion.** Fade-and-rise scroll reveals, slow Ken Burns on heroes, soft image crossfades in galleries, underline-grow link hovers. All disabled when the visitor's device asks for reduced motion.
- **Book Now.** Sticky in the header on desktop, fixed bottom bar on phones. On a hotel page it goes straight to that hotel's engine in a new tab with UTM tags (source=website, medium=book_now, campaign=<hotel-slug>, content=<where on page>) and fires a `book_now_click` GTM event. On group pages it opens a clean hotel picker. If a hotel has no booking URL it shows the phone number and the enquiry form instead.
- **Performance.** Images served in modern formats at the right size, fonts self-hosted and preloaded, video lazy-loaded and poster-first, third-party scripts (GTM) loaded after consent. Target Lighthouse 90+ on mobile for Performance, SEO and Accessibility, checked before each phase is handed over.

---

## 7. Build phases

Each phase ends with a commit, a Vercel preview link, and a short "what to click and check" list for you.

**Phase 0 — Crawl and content inventory** (needs network access, section 1a)
Crawl every page, download every image and PDF, record copy, meta and nav. Produce `content/inventory.json` and finish sections 2 and 3 of this plan. You check: the redirect list and the Royal Oak and Caer Beris questions.

**Phase 1 — Foundation**
Next.js 16 + Payload 3.90 app in `website/`, TypeScript, Tailwind 4 with brand tokens, Supabase Postgres and Storage connected, `/admin` live with email login and password reset, Admin and Hotel Manager roles with per-hotel access, admin branded with logo and palette, `.env.example`, first Vercel deployment. You check: log in, see the branded admin, confirm a manager account only sees its hotel.

**Phase 2 — Content model and block builder**
All collections and globals from section 4, every block from section 5, drafts, live preview, version history with restore, image processing and focal point, required alt text, date-based visibility. You check: build a test page from blocks, drag them, preview, publish, restore an older version.

**Phase 3 — Public site and design**
Header with sticky Book Now, mobile bottom bar, hotel picker, footer, home page, hotel templates and sub-pages, rooms, dining and menus, events, offers, contact and enquiry forms with spam protection, newsletter to HubSpot, cookie consent with GTM behind it, motion with reduced-motion support. You check: the site on your phone, Book Now from a hotel page and from home, a test enquiry arriving at a hotel inbox.

**Phase 4 — Migration and seed**
Import the crawled copy, images (with alt text written where the old site had none), menus, rooms, hotel details, redirects and testimonials into the database and storage so the site launches populated. Seed script is repeatable. You check: each hotel page against the old site.

**Phase 5 — SEO, structured data and manager dashboard**
Per-page and per-hotel SEO panel with live search and social preview, fallbacks, sitemap, robots, Hotel/LocalBusiness and FAQ JSON-LD, canonical and noindex. Manager dashboard with the three big actions (Upload a menu, Add an event, Add an offer) and short forms. You check: the manager dashboard as a manager would use it; share a page on WhatsApp or Facebook and see the right preview.

**Phase 6 — Quality and launch pack**
Lighthouse and accessibility pass, redirect test of every old URL, GTM and booking link checks, `README.md`, `MANAGER-GUIDE.md` with screenshots, `LAUNCH-CHECKLIST.md` with DNS cutover steps, backups documented. You check: the launch checklist, then we pick a cutover time.

---

## 8. What I need from you

**Before Phase 0**
1. Network access changed as in section 1a (or tell me and I will plan the crawl another way).
2. Database choice: new Supabase project (recommended, about $25/month) or share the Ops App project.

**Before Phase 1**
3. A Vercel account: either invite me to a team, or create the project yourself and give me a deploy token. Tell me which and I will give the exact steps.
4. Confirm the site should be built in `website/` inside this repository, or give me a new repository.

**Before Phase 3**
5. The GR Hotels logo as an SVG (and a white version for use on dark images, if you have one).
6. TAN Pearl font files (WOFF2 ideally, otherwise OTF/TTF) and confirmation the licence covers web use for grhotels.co.uk.
7. Booking engine URL for each of the 8 hotels (the exact "book now" link each hotel uses today).
8. The email address each hotel's enquiry form should go to, plus a group fallback address.
9. HubSpot portal ID and form ID (or GUID) for the newsletter.
10. Transactional email sender: a domain you control that I can verify for sending form notifications and password resets (I will use Resend, free up to 3,000 emails a month; the alternative is your existing SMTP details).
11. Spam protection: I will use Cloudflare Turnstile (free, no puzzle for real visitors). I need you to create a Turnstile site key at dash.cloudflare.com, or tell me to use Google reCAPTCHA instead.

**Content questions**
12. Royal Oak: "Hawkhurst, near Cranbrook" as described in section 3, yes or no?
13. Caer Beris: which phone number should show on the site?
14. Which hotels offer weddings and functions, so that sub-page appears only where relevant.
15. Any photography you have that is better than what is on the current site (natural, well lit, no filters). Even a Dropbox or Google Drive link is fine.
16. Social media links per hotel and for the group.
17. Google Maps: if you have a Google Cloud account with a Maps API key, send it; otherwise I will use a free map (OpenStreetMap tiles) which looks equally good and costs nothing.

**For launch**
18. Who manages DNS for grhotels.co.uk (registrar or hosting login) so the cutover steps can be written for that provider.
19. Names and emails of the hotel managers who need accounts, and which hotel(s) each one looks after.

---

## 9. Decisions I have made for you (and why)

- **Payload 3 inside the Next.js app, one deployment on Vercel.** Exactly as briefed. Versions checked against the npm registry today: Next.js 16.4, Payload 3.90, Tailwind 4.3, React 19.3. Official docs will be re-checked once the docs sites are reachable.
- **Supabase Storage through Payload's S3 adapter** for all media, with Payload generating resized WebP/AVIF versions on upload.
- **Forms:** built on Payload's form builder plugin so admins can add fields later, with hotel routing and a Turnstile check.
- **Cookie consent:** a small first-party banner (no third-party consent tool to pay for). GTM only loads after "Accept". Consent choice is remembered for 12 months and passed to GTM as a consent event.
- **Maps:** static map image on page load, interactive map on tap, so pages stay fast on phones.
- **Hero video:** uploaded MP4, capped at 60 MB, muted, looping, with a still image poster shown first and on reduced-motion devices.
- **Manager permissions:** enforced in the database layer, not just hidden in the interface, so a manager cannot reach another hotel's content even by guessing a URL.
- **No free-form colour or font controls anywhere in the admin.**

## 10. Risks and assumptions

- Content quality on the old site may be thin in places. Where copy is missing I will write a short placeholder and flag it in a `CONTENT-TODO.md` for you to replace.
- Lighthouse 90+ on mobile depends on image choices and on GTM tags. If a tag inside your GTM container is heavy, I will tell you which one.
- TAN Pearl: until the files arrive, the placeholder serif will look close but not identical.
- The old site's booking links may point to several different engines. Each hotel gets its own URL field, so this is fine, but if any engine needs a hotel code in a query string I will need that code.
