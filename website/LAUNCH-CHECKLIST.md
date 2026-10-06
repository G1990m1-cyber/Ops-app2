# Launch checklist: grhotels.co.uk

Work through this top to bottom. Each line is a yes/no.

## A. Content (owner and hotel managers)

- [ ] Every hotel page reviewed on a phone. Placeholder photos replaced with real, well-lit, unfiltered photography (landscape, at least 2000px wide for heroes).
- [ ] Every image has a short, honest alt description (the admin will not save without one).
- [ ] Hotel intros, directions and "Welcome" text rewritten from placeholder copy.
- [ ] Rooms: names, sleeps, bed type, from-price and two or more photos each.
- [ ] Menus: current menus uploaded (PDF or typed in), with a "show until" date on anything seasonal.
- [ ] Events: at least the next month in. Past events hide themselves.
- [ ] Offers: current offers with end dates. Expired ones hide themselves.
- [ ] Guest reviews: four or more per hotel, at least one marked "featured".
- [ ] Home, About, Contact, Careers, Privacy, Cookie and Terms pages reviewed. Legal text pasted in.
- [ ] Royal Oak location confirmed (Hawkhurst, near Cranbrook). Caer Beris phone number confirmed.

## B. Settings (admin)

- [ ] **Site settings → Brand:** GR Hotels SVG logo uploaded (dark and white versions).
- [ ] **Site settings → Default SEO:** default description and a 1200×630 sharing image.
- [ ] **Site settings → Contact & social:** group phone, email, company line, social links.
- [ ] **Each hotel → Booking tab:** the exact booking engine link. Test it opens the right hotel.
- [ ] **Each hotel → Contact & location:** enquiry email, phone, address, map pin, Google Maps link, social links.
- [ ] **Users:** one login per manager, role Hotel Manager, correct hotels ticked. Remove the sample manager account.
- [ ] **Navigation & footer** reviewed.

## C. Technical (developer)

- [ ] Vercel environment variables set for Production: `DATABASE_URL` (pooler, port 6543), `PAYLOAD_SECRET`, `PREVIEW_SECRET`, `NEXT_PUBLIC_SERVER_URL=https://www.grhotels.co.uk`, `S3_*`, email (`RESEND_API_KEY` or SMTP), `EMAIL_FROM_ADDRESS` on a verified sending domain, `ENQUIRY_FALLBACK_EMAIL`, `TURNSTILE_*`, `HUBSPOT_*`, `NEXT_PUBLIC_GTM_ID=GTM-WVZV4DV8`.
- [ ] Supabase Storage bucket `media` exists, is public, and the S3 keys work (upload an image in the admin and view it on the site).
- [ ] TAN Pearl font files added to `src/fonts` and wired in `src/app/(frontend)/fonts.ts` (licence covers web use).
- [ ] Production build green on Vercel. Migrations applied.
- [ ] Lighthouse on a phone: Performance, SEO and Accessibility all 90+ on the home page and one hotel page.
- [ ] `node scripts/test-redirects.mjs https://<preview-url>` passes 27/27.
- [ ] Open `https://<preview-url>/sitemap.xml` and `/robots.txt`. Robots should block previews and allow production.
- [ ] Share a hotel page in WhatsApp or Facebook debugger: title, description and image look right.
- [ ] Password reset email arrives (use "Forgot password" on `/admin/login`).

## D. Forms and tracking

- [ ] Send a test enquiry from each hotel's contact page. It arrives at that hotel's inbox and appears under **Enquiries** in the admin.
- [ ] Send a test enquiry from `/contact-us` choosing a hotel. Same checks.
- [ ] Newsletter sign-up appears in HubSpot.
- [ ] Cookie banner: before "Accept" there is no `googletagmanager.com` request (check the browser Network tab). After "Accept" GTM loads and `dataLayer` contains `consent_update`.
- [ ] GTM Preview mode: click Book Now on a hotel page and on the home page picker. The `book_now_click` event fires with `hotel`, `placement` and `destination`.
- [ ] Booking links open in a new tab and carry `utm_source=grhotels.co.uk&utm_medium=website&utm_campaign=<hotel-slug>`.

## E. DNS cutover

Do this on a quiet weekday morning. Keep the old site running until step 6.

1. In Vercel → Project → **Domains**, add `grhotels.co.uk` and `www.grhotels.co.uk`. Set `www` as the primary so the bare domain redirects to it. Vercel shows the records it needs.
2. Lower the TTL on the existing DNS records to 300 seconds at least 24 hours before switching (at the registrar or wherever DNS is managed).
3. Switch records: `www` → CNAME `cname.vercel-dns.com`; apex `grhotels.co.uk` → A `76.76.21.21` (confirm the current values in the Vercel Domains screen, they are authoritative).
4. Wait for Vercel to show both domains as valid with a certificate (usually under 10 minutes).
5. Check `https://www.grhotels.co.uk` on a phone and desktop, log in to `/admin`, run the redirect test against the live domain, and send one enquiry.
6. Leave the old WordPress host untouched for 30 days as a fallback, then cancel it. Also remove any leftover DNS records pointing at the old agency subdomain.
7. Google Search Console: add the property if not already there, submit `https://www.grhotels.co.uk/sitemap.xml`, and watch Coverage for a week.
8. Update the Google Business Profile for each hotel with its new page URL if any differ.

## F. After launch

- [ ] Remove `SEED_ADMIN_*` variables from Vercel and change the admin password.
- [ ] Set up a monthly reminder: download a database backup, check managers' menus have end dates, review expired offers.
- [ ] Hand managers `MANAGER-GUIDE.md`.
