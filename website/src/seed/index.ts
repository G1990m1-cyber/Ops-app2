import fs from 'fs'
import path from 'path'
import type { Payload } from 'payload'

import type { Hotel, Media } from '@/payload-types'

import { groupCopy, hotels as seedHotels, siteLogo, type Img } from './content'
import { h1, h2, p, paragraphs, rich, ul } from './lexical'

/** Migrated images live in content/images at the project root (process.cwd() locally and on Vercel). */
const IMAGE_DIR = path.join(process.cwd(), 'content', 'images')
const findImage = (file: string): string | null => {
  const p = path.join(process.cwd(), 'content', 'images', file)
  return fs.existsSync(p) ? p : null
}
/** Last resort: fetch the original from the URL recorded at crawl time. */
const fetchOriginal = async (file: string): Promise<Buffer | null> => {
  const idx = path.join(IMAGE_DIR, 'index.json')
  if (!fs.existsSync(idx)) return null
  const info = JSON.parse(fs.readFileSync(idx, 'utf8')) as Record<string, { url?: string }>
  const url = info[file]?.url
  if (!url) return null
  const res = await fetch(url)
  if (!res.ok) return null
  return Buffer.from(await res.arrayBuffer())
}

const log = (msg: string) => console.info(`  · ${msg}`)

const daysFromNow = (d: number, hour = 19) => {
  const x = new Date()
  x.setDate(x.getDate() + d)
  x.setHours(hour, 0, 0, 0)
  return x.toISOString()
}

type Ctx = { payload: Payload; images: Map<string, Media>; seedNo: { n: number } }

const mimeFor = (file: string) => (file.endsWith('.png') ? 'image/png' : file.endsWith('.gif') ? 'image/gif' : 'image/jpeg')

/** Uploads a real image from content/images (once). Re-runs reuse the existing Media row. */
const uploadImg = async (ctx: Ctx, img: Img): Promise<Media> => {
  const cached = ctx.images.get(img.file)
  if (cached) return cached
  const base = img.file.replace(/\.[^.]+$/, '')
  const existing = await ctx.payload.find({
    collection: 'media',
    where: { filename: { in: [`${base}.jpg`, `${base}.webp`, `${base}.png`, img.file] } },
    limit: 1,
    overrideAccess: true,
    depth: 0,
  })
  if (existing.docs[0]) {
    const doc = existing.docs[0]
    if (doc.alt !== img.alt) await ctx.payload.update({ collection: 'media', id: doc.id, data: { alt: img.alt }, overrideAccess: true })
    ctx.images.set(img.file, doc)
    return doc
  }
  const filePath = findImage(img.file)
  const buffer = filePath ? fs.readFileSync(filePath) : await fetchOriginal(img.file)
  if (!buffer) throw new Error(`Missing image ${img.file} in content/images (cwd ${process.cwd()})`)
  const doc = await ctx.payload.create({
    collection: 'media',
    data: { alt: img.alt },
    file: { data: buffer, mimetype: mimeFor(img.file), name: img.file, size: buffer.length },
    overrideAccess: true,
  })
  ctx.images.set(img.file, doc)
  return doc
}


const resetCollections = async (payload: Payload) => {
  const order = ['enquiries', 'testimonials', 'offers', 'events', 'menus', 'rooms', 'redirects', 'pages', 'hotels', 'media'] as const
  for (const c of order) {
    const res = await payload.find({ collection: c, limit: 0, pagination: false, depth: 0, overrideAccess: true, select: {} })
    for (const d of res.docs) {
      await payload.delete({ collection: c, id: d.id, overrideAccess: true, context: { disableRevalidate: true } })
    }
  }
}

export const seed = async (payload: Payload, opts: { reset?: boolean } = {}) => {
  const ctx: Ctx = { payload, images: new Map(), seedNo: { n: 0 } }
  const context = { disableRevalidate: true }

  if (opts.reset) {
    log('Clearing existing content')
    await resetCollections(payload)
  }

  /* ── Users ────────────────────────────────────────────────────────────── */
  const isProd = process.env.NODE_ENV === 'production'
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@grhotels.co.uk'
  // Never create an admin with a guessable default password in production: require an explicit one.
  if (isProd && !process.env.SEED_ADMIN_PASSWORD) {
    throw new Error('Set SEED_ADMIN_PASSWORD to a strong value before seeding in production.')
  }
  const adminPassword = process.env.SEED_ADMIN_PASSWORD || 'change-me-now'
  const existingAdmin = await payload.find({ collection: 'users', where: { email: { equals: adminEmail } }, limit: 1, overrideAccess: true })
  if (!existingAdmin.docs.length) {
    await payload.create({ collection: 'users', data: { name: 'GR Hotels Admin', email: adminEmail, password: adminPassword, role: 'admin' }, overrideAccess: true })
    log(`Admin user ${adminEmail}`)
  }

  /* ── Hotels ───────────────────────────────────────────────────────────── */
  const hotelDocs: Hotel[] = []
  for (const h of seedHotels) {
    log(`Hotel: ${h.name}`)
    const hero = await uploadImg(ctx, h.hero)
    const gallery: Media[] = []
    for (const g of h.gallery) gallery.push(await uploadImg(ctx, g))

    const existing = await payload.find({ collection: 'hotels', where: { slug: { equals: h.slug } }, limit: 1, overrideAccess: true, depth: 0 })

    const layout: Array<Record<string, unknown>> = [
      { blockType: 'text', eyebrow: 'Welcome', richText: h.story, narrow: true, style: { tone: 'cream', spacing: 'normal', align: 'left' } },
      { blockType: 'facilities', heading: 'Facilities', source: 'hotel', style: { tone: 'sand', spacing: 'compact', align: 'left' } },
      ...(h.rooms.length
        ? [{ blockType: 'roomCards', heading: 'Rooms', intro: 'Individually furnished rooms. Book direct for our best rate.', source: 'hotel', style: { tone: 'cream', spacing: 'normal', align: 'left' } }]
        : [
            {
              blockType: 'cta',
              title: 'Rooms and rates',
              text: 'Our rooms, rates and live availability are on our booking page. Book direct for the best price.',
              links: [{ link: { type: 'book', label: 'See rooms and book', appearance: 'primary' } }],
              style: { tone: 'sand', spacing: 'normal', align: 'left' },
            },
          ]),
      { blockType: 'gallery', heading: 'A look around', source: 'hotel', layout: 'masonry', columns: '3', style: { tone: 'cream', spacing: 'compact' } },
      { blockType: 'menusList', heading: 'Eat and drink', intro: null, style: { tone: 'sand', spacing: 'normal', align: 'left' } },
      { blockType: 'offers', heading: 'Offers', layout: 'cards', limit: 3, style: { tone: 'cream', spacing: 'normal', align: 'left' } },
      { blockType: 'eventsList', heading: "What's on", limit: 4, style: { tone: 'linen', spacing: 'normal', align: 'left' } },
      ...(h.testimonials.length ? [{ blockType: 'testimonials', heading: 'What our guests say', source: 'auto', limit: 4, style: { tone: 'cream', spacing: 'normal', align: 'center' } }] : []),
      { blockType: 'faq', heading: 'Good to know', items: h.faqs.map((f) => ({ question: f.q, answer: paragraphs(f.a) })), style: { tone: 'cream', spacing: 'compact', align: 'left' } },
      { blockType: 'map', heading: 'Find us', showDirections: true, style: { tone: 'sand', spacing: 'normal' } },
      {
        blockType: 'cta',
        title: `Stay at ${h.name}`,
        text: 'Book direct for the best rate, flexible terms and a warmer welcome.',
        links: [
          { link: { type: 'book', label: 'Book now', appearance: 'primary' } },
          { link: { type: 'custom', url: `/${h.slug}/contact`, label: 'Ask a question', appearance: 'secondary' } },
        ],
        style: { tone: 'charcoal', spacing: 'generous', align: 'center' },
      },
    ]

    const weddingsGallery: Media[] = []
    if (h.slug === 'thevines') {
      for (const g of [
        { file: 'Vines-Wedding-Packages.jpg', alt: 'The Vines wedding packages: Silver, Gold, Platinum, Vineyard and Orchard' },
        { file: 'Vines-Wedding-Guide-Prices.jpg', alt: 'The Vines wedding guide prices by package' },
        { file: 'Vines-Wedding-Drinks-Packages.jpg', alt: 'The Vines wedding drinks packages, standard and premium' },
        { file: 'Suppliers-list-pdf.jpg', alt: 'The Vines wedding supplier directory: caterers, photographers, florists and decorations' },
      ]) weddingsGallery.push(await uploadImg(ctx, g))
    }
    if (h.slug === 'the-george-at-piercebridge') weddingsGallery.push(gallery[8])

    const data = {
      name: h.name,
      slug: h.slug,
      location: h.location,
      tagline: h.tagline,
      heroMedia: hero.id,
      intro: h.intro,
      facilities: h.facilities,
      gallery: gallery.map((g) => ({ image: g.id })),
      address: h.address,
      phone: h.phone,
      email: h.email,
      map: { lat: h.map.lat, lng: h.map.lng, directionsUrl: h.map.directionsUrl },
      directions: h.directions,
      hasWeddings: h.hasWeddings,
      weddingsIntro: h.weddingsIntro,
      weddingsGallery: weddingsGallery.map((g) => ({ image: g.id })),
      priceRange: h.priceRange,
      checkIn: '3:00pm',
      checkOut: '11:00am',
      bookingUrl: h.bookingUrl,
      tableBookingUrl: h.tableBookingUrl,
      order: h.order,
      layout,
      _status: 'published' as const,
    }
    const doc = existing.docs[0]
      ? await payload.update({ collection: 'hotels', id: existing.docs[0].id, data: data as never, overrideAccess: true, context, depth: 0 })
      : await payload.create({ collection: 'hotels', data: data as never, overrideAccess: true, context, depth: 0 })
    hotelDocs.push(doc)

    /* Rooms */
    for (const r of h.rooms) {
      const imgs: Media[] = []
      for (const i of r.images) imgs.push(await uploadImg(ctx, i))
      const found = await payload.find({ collection: 'rooms', where: { and: [{ hotel: { equals: doc.id } }, { slug: { equals: r.slug } }] }, limit: 1, overrideAccess: true, depth: 0 })
      const roomData = {
        name: r.name,
        slug: r.slug,
        hotel: doc.id,
        sleeps: r.sleeps,
        bedType: r.bedType,
        shortDescription: r.shortDescription,
        description: r.description,
        features: r.features,
        gallery: imgs.map((i) => ({ image: i.id })),
        order: r.order,
        _status: 'published' as const,
      }
      if (found.docs[0]) await payload.update({ collection: 'rooms', id: found.docs[0].id, data: roomData as never, overrideAccess: true, context })
      else await payload.create({ collection: 'rooms', data: roomData as never, overrideAccess: true, context })
    }

    /* Testimonials (real, from the old site) */
    const tExisting = await payload.find({ collection: 'testimonials', where: { hotel: { equals: doc.id } }, limit: 0, overrideAccess: true, depth: 0 })
    if (!tExisting.docs.length) {
      for (const [i, t] of h.testimonials.entries()) {
        await payload.create({ collection: 'testimonials', overrideAccess: true, context, data: { quote: t.quote, name: t.name, source: t.source, hotel: doc.id, rating: 5, featured: i === 0 } })
      }
    }

    /* Example menu and events: saved as DRAFTS so managers see how they work without anything fake going live. */
    const menusExisting = await payload.find({ collection: 'menus', where: { hotel: { equals: doc.id } }, limit: 1, overrideAccess: true, depth: 0 })
    if (!menusExisting.docs.length) {
      await payload.create({
        collection: 'menus',
        overrideAccess: true,
        context,
        draft: true,
        data: {
          title: 'Example menu (draft, replace me)',
          hotel: doc.id,
          type: 'food',
          format: 'structured',
          note: 'This is an example so you can see how a typed-in menu looks. Edit the dishes or switch to "Upload a PDF", then press Publish.',
          sections: [
            { title: 'Starters', items: [
              { name: 'Soup of the day, warm bread', price: '7.50', dietary: { v: true } },
              { name: 'Smoked mackerel pâté, pickled cucumber, toast', price: '9', dietary: { df: true } },
            ] },
            { title: 'Mains', items: [
              { name: 'Beer-battered haddock, triple-cooked chips, crushed peas', price: '17.50' },
              { name: 'Wild mushroom and chestnut pie, mash, gravy', price: '16.50', dietary: { vg: true } },
            ] },
          ],
          _status: 'draft',
        } as never,
      })
      await payload.create({ collection: 'events', overrideAccess: true, context, draft: true, data: {
        title: 'Example event (draft, replace me)', hotel: doc.id, start: daysFromNow(21, 20), end: daysFromNow(21, 23),
        summary: 'An example so you can see how an event looks. Edit it and press Publish, or delete it.', price: 'Free entry',
        description: paragraphs('Add the details here: line-up, menu, how to book.'), _status: 'draft',
      } as never })
    }
  }

  /* ── Example group-wide offer (draft) ─────────────────────────────────── */
  const offersExisting = await payload.find({ collection: 'offers', limit: 1, overrideAccess: true, depth: 0 })
  if (!offersExisting.docs.length) {
    const img = await uploadImg(ctx, seedHotels[6].gallery[0])
    await payload.create({ collection: 'offers', overrideAccess: true, context, draft: true, data: {
      title: 'Example offer (draft, replace me)', image: img.id,
      summary: 'An example so you can see how an offer looks across the site. Edit it and press Publish, or delete it.',
      terms: paragraphs('Add any terms here.'),
      startDate: daysFromNow(-1), endDate: daysFromNow(60), _status: 'draft',
    } as never })
  }

  /* ── Sample manager user ──────────────────────────────────────────────── */
  // Only for local/demo use. Never create a known-credential account in production;
  // opt in elsewhere with SEED_SAMPLE_MANAGER=true.
  const managerEmail = 'manager@example.grhotels.co.uk'
  const wantSampleManager = !isProd || process.env.SEED_SAMPLE_MANAGER === 'true'
  if (wantSampleManager) {
    const mgr = await payload.find({ collection: 'users', where: { email: { equals: managerEmail } }, limit: 1, overrideAccess: true })
    if (!mgr.docs.length) {
      const berwick = hotelDocs.filter((h) => h.slug === 'queens-head-berwick' || h.slug === 'castle-berwick').map((h) => h.id)
      await payload.create({ collection: 'users', overrideAccess: true, data: { name: 'Sample Manager (Berwick)', email: managerEmail, password: 'Manager-Demo-2026!', role: 'manager', hotels: berwick } })
      log(`Sample manager ${managerEmail} (both Berwick hotels)`)
    }
  }

  /* ── Globals ──────────────────────────────────────────────────────────── */
  log('Site settings, navigation, announcement bar')
  const logo = await uploadImg(ctx, siteLogo)
  const ogImg = await uploadImg(ctx, seedHotels[6].hero)
  await payload.updateGlobal({ slug: 'site-settings', overrideAccess: true, context, data: {
    siteName: 'GR Hotels',
    tagline: groupCopy.tagline,
    logo: logo.id,
    logoLight: logo.id,
    seo: { titleSuffix: 'GR Hotels', defaultDescription: 'Eight characterful hotels and inns across Britain, from the Scottish Borders to the Kent Weald. Book direct with GR Hotels for the best rates.', defaultImage: ogImg.id },
    contact: { email: 'info@grhotels.co.uk', companyLine: 'All rights reserved.' },
    enquiries: { fallbackEmail: 'enquiries@groupretreats.co.uk', autoReply: true },
    booking: { pickerTitle: 'Where would you like to stay?', pickerIntro: 'Choose a hotel and we will take you to its booking page.', utmSource: 'grhotels.co.uk', utmMedium: 'website' },
    cookies: { title: 'A word about cookies', text: 'We use cookies to understand how the site is used and to measure our advertising. Analytics only run if you accept.' },
  } as never })

  const pageId = async (slug: string) => {
    const r = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true, depth: 0 })
    return r.docs[0]?.id
  }

  /* ── Pages ────────────────────────────────────────────────────────────── */
  const homeHero = await uploadImg(ctx, seedHotels[6].hero) // Caer Beris manor
  const aboutImg = await uploadImg(ctx, seedHotels[0].gallery[0]) // The George exterior
  const ctaImg = await uploadImg(ctx, seedHotels[6].gallery[0]) // Caer Beris terrace
  const contactImg = await uploadImg(ctx, seedHotels[3].hero) // The Castle

  const pages: { title: string; slug: string; layout: unknown[] }[] = [
    {
      title: 'Home',
      slug: 'home',
      layout: [
        { blockType: 'hero', media: homeHero.id, eyebrow: 'Welcome to GR Hotels', title: 'Characterful stays across Britain', subtitle: groupCopy.strapline, height: 'full', overlay: 'gradient', showBookNow: true, links: [] },
        { blockType: 'hotelGrid', heading: 'Our hotels', intro: 'Eight places to stay, eat and celebrate, each with its own character and a team who know the area.', layout: 'grid', style: { tone: 'cream', spacing: 'generous', align: 'left' } },
        { blockType: 'offers', heading: 'Current offers', intro: 'Booking direct always gets you our best rate.', layout: 'cards', limit: 3, style: { tone: 'sand', spacing: 'normal', align: 'left' } },
        { blockType: 'textWithImage', image: aboutImg.id, imagePosition: 'left', eyebrow: 'About us', richText: rich(h2('Small group, warm welcome'), p(groupCopy.strapline), p('From a 16th-century coaching inn on the Tees to a timbered manor in the Welsh hills, every GR Hotel is run by people who care about the place and the welcome.')), links: [{ link: { type: 'custom', url: '/about', label: 'Our story', appearance: 'secondary' } }], style: { tone: 'cream', spacing: 'normal' } },
        { blockType: 'eventsList', heading: "What's on", intro: 'Live music, supper clubs and seasonal celebrations across the group.', limit: 4, style: { tone: 'cream', spacing: 'normal', align: 'left' } },
        { blockType: 'testimonials', heading: 'What our guests say', source: 'auto', limit: 4, style: { tone: 'sand', spacing: 'normal', align: 'center' } },
        { blockType: 'hotelsMap', heading: 'Where to find us', style: { tone: 'cream', spacing: 'normal' } },
        { blockType: 'newsletter', heading: 'News and offers', text: groupCopy.newsletter, consentText: 'By signing up you agree to receive emails from GR Hotels. Unsubscribe any time.', style: { tone: 'linen', spacing: 'normal', align: 'left' } },
        { blockType: 'cta', title: 'Ready for a few nights away?', text: 'Pick a hotel and book direct in under a minute.', backgroundImage: ctaImg.id, links: [{ link: { type: 'book', label: 'Book now', appearance: 'primary' } }], style: { tone: 'charcoal', spacing: 'generous', align: 'center' } },
      ],
    },
    {
      title: 'Our hotels',
      slug: 'hotels',
      layout: [
        { blockType: 'hero', media: homeHero.id, eyebrow: 'GR Hotels', title: 'Our hotels', subtitle: 'Eight places to stay, eat and celebrate.', height: 'short', overlay: 'gradient', showBookNow: true },
        { blockType: 'hotelGrid', heading: null, layout: 'rows', style: { tone: 'cream', spacing: 'generous', align: 'left' } },
        { blockType: 'cta', title: 'Not sure which one?', text: 'Tell us what you are after and we will point you to the right hotel.', links: [{ link: { type: 'custom', url: '/contact-us', label: 'Contact us', appearance: 'primary' } }], style: { tone: 'sand', spacing: 'normal', align: 'center' } },
      ],
    },
    {
      title: 'Offers',
      slug: 'offers',
      layout: [
        { blockType: 'hero', media: ctaImg.id, eyebrow: 'Book direct', title: 'Offers', subtitle: 'Seasonal breaks and exclusive direct-booking deals.', height: 'short', overlay: 'tint50', showBookNow: true },
        { blockType: 'offers', heading: null, layout: 'cards', limit: 12, style: { tone: 'cream', spacing: 'generous', align: 'left' } },
        { blockType: 'newsletter', heading: 'Hear about offers first', text: groupCopy.newsletter, style: { tone: 'sand', spacing: 'normal', align: 'left' } },
      ],
    },
    {
      title: "What's on",
      slug: 'events',
      layout: [
        { blockType: 'hero', media: homeHero.id, eyebrow: 'Across the group', title: "What's on", subtitle: 'Live music, supper clubs, seasonal celebrations.', height: 'short', overlay: 'gradient', showBookNow: false },
        { blockType: 'eventsList', heading: null, limit: 24, style: { tone: 'cream', spacing: 'generous', align: 'left' } },
      ],
    },
    {
      title: 'About',
      slug: 'about',
      layout: [
        { blockType: 'hero', media: aboutImg.id, eyebrow: 'GR Hotels', title: 'Our story', height: 'short', overlay: 'gradient', showBookNow: false },
        { blockType: 'text', richText: rich(p(groupCopy.strapline), p('GR Hotels is a family of eight independent-minded hotels and inns: coaching inns, a manor house, a Georgian riverside hotel and pubs with rooms, from Berwick-upon-Tweed in the north to Hawkhurst in Kent.'), p('Each one is different. Each one is run by people who care about the place, the food and the welcome.')), narrow: true, style: { tone: 'cream', spacing: 'normal', align: 'left' } },
        { blockType: 'hotelGrid', heading: 'The hotels', layout: 'grid', style: { tone: 'sand', spacing: 'normal', align: 'left' } },
      ],
    },
    {
      title: 'Contact us',
      slug: 'contact-us',
      layout: [
        { blockType: 'hero', media: contactImg.id, eyebrow: 'Get in touch', title: 'Contact us', subtitle: 'Choose a hotel and your message goes straight to the team there.', height: 'short', overlay: 'gradient', showBookNow: false },
        { blockType: 'enquiryForm', heading: 'Send us a message', intro: 'For bookings, dining, events or anything else.', showStayFields: true, style: { tone: 'cream', spacing: 'normal', align: 'left' } },
        { blockType: 'hotelGrid', heading: 'Call a hotel directly', layout: 'grid', style: { tone: 'sand', spacing: 'normal', align: 'left' } },
      ],
    },
    {
      title: 'Careers',
      slug: 'careers',
      layout: [
        { blockType: 'hero', media: aboutImg.id, eyebrow: 'Join us', title: 'Careers', height: 'short', overlay: 'gradient', showBookNow: false },
        { blockType: 'text', richText: rich(p('We are always pleased to hear from warm, capable people who love hospitality. Send a note about which hotel interests you and what you do, and we will come back to you.')), narrow: true, style: { tone: 'cream', spacing: 'normal', align: 'left' } },
        { blockType: 'enquiryForm', heading: 'Get in touch', showStayFields: false, style: { tone: 'sand', spacing: 'normal', align: 'left' } },
      ],
    },
    {
      title: 'Privacy policy',
      slug: 'privacy-policy',
      layout: [
        {
          blockType: 'text',
          eyebrow: 'Legal',
          richText: rich(
            h1('Privacy policy'),
            p('This is a plain-English starting draft. Please have it reviewed before launch and replace it with the wording your data-protection adviser approves. Last updated: replace with the go-live date.'),
            h2('Who we are'),
            p('GR Hotels ("we", "us") operates this website and the hotels listed on it. We are the data controller for the personal information collected here. For any question about your information, contact us using the details on our Contact page.'),
            h2('The information we collect'),
            ul([
              'Details you give us: your name, email address, phone number and the content of any enquiry or booking request you send through our forms.',
              'Newsletter sign-ups: your email address and first name, if you choose to subscribe.',
              'Usage information: with your consent, anonymous analytics about how the site is used, collected through Google Tag Manager. See our Cookie policy.',
            ]),
            h2('How we use it'),
            ul([
              'To answer your enquiry and manage your booking or event.',
              'To send you our newsletter, where you have asked us to, until you unsubscribe.',
              'To understand how the website is used and improve it, where you have accepted analytics cookies.',
            ]),
            p('We rely on your consent for marketing and analytics, and on our legitimate interest in responding to enquiries and running our hotels. We do not sell your information.'),
            h2('Who we share it with'),
            p('We share information only with the service providers who help us run the site and our hotels (for example our email, hosting and booking providers), and where the law requires it. Enquiries are sent to the relevant hotel so its team can reply.'),
            h2('How long we keep it'),
            p('We keep enquiry and booking records for as long as needed to serve you and to meet our legal and accounting duties, then delete them. Newsletter details are kept until you unsubscribe.'),
            h2('Your rights'),
            p('You can ask to see, correct or delete the information we hold about you, or object to how we use it. To do so, or to complain, contact us using the details on our Contact page. You also have the right to complain to the Information Commissioner’s Office (ico.org.uk).'),
          ),
          narrow: true,
          style: { tone: 'cream', spacing: 'generous', align: 'left' },
        },
      ],
    },
    {
      title: 'Cookie policy',
      slug: 'cookie-policy',
      layout: [
        {
          blockType: 'text',
          eyebrow: 'Legal',
          richText: rich(
            h1('Cookie policy'),
            p('Cookies are small files a website saves on your device. We keep ours to a minimum.'),
            h2('Essential cookies'),
            p('A small number of cookies are needed to run the site and remember your cookie choice. These are always on and carry no personal information for marketing.'),
            h2('Analytics and advertising'),
            p('Only if you press “Accept” do we load Google Tag Manager, which we use to measure how the site is used and the effect of our advertising. Nothing in this group loads until you accept.'),
            h2('Changing your mind'),
            p('You can change your choice at any time using “Cookie settings” in the footer, or by clearing this site’s cookies in your browser.'),
          ),
          narrow: true,
          style: { tone: 'cream', spacing: 'generous', align: 'left' },
        },
      ],
    },
    {
      title: 'Terms and conditions',
      slug: 'terms',
      layout: [
        {
          blockType: 'text',
          eyebrow: 'Legal',
          richText: rich(
            h1('Terms and conditions'),
            p('This is a plain-English starting draft. Please replace it with your own booking terms, checked by your adviser, before launch. Last updated: replace with the go-live date.'),
            h2('Bookings'),
            p('Room and table bookings are made through each hotel’s own booking system and are subject to that hotel’s rates, availability and confirmation. A booking is confirmed only once you receive confirmation from the hotel.'),
            h2('Payment and cancellation'),
            p('Payment terms, deposits and cancellation or no-show charges vary by hotel and rate. The terms that apply to your stay are the ones shown at the time you book and in your confirmation. Please read them before you book.'),
            h2('Changes and cancellations by us'),
            p('We will always try to honour every booking. In the rare event we must change or cancel, we will contact you as soon as we can and offer an alternative or a refund of any sum paid to us for that booking.'),
            h2('Using this website'),
            p('The content on this site is for general information. We keep it as accurate and up to date as we can, but details such as prices, menus and events can change. The images and text on this site remain our property and may not be reused without permission.'),
            h2('Contact'),
            p('For any question about a booking or these terms, contact the hotel directly or use the details on our Contact page.'),
          ),
          narrow: true,
          style: { tone: 'cream', spacing: 'generous', align: 'left' },
        },
      ],
    },
  ]

  for (const pg of pages) {
    const id = await pageId(pg.slug)
    const data = { title: pg.title, slug: pg.slug, layout: pg.layout, _status: 'published' } as never
    if (id) await payload.update({ collection: 'pages', id, data, overrideAccess: true, context, depth: 0 })
    else await payload.create({ collection: 'pages', data, overrideAccess: true, context, depth: 0 })
    log(`Page: /${pg.slug === 'home' ? '' : pg.slug}`)
  }
  const hotelsId = await pageId('hotels')
  const homeId = await pageId('home')
  if (hotelsId && homeId) {
    const layout = pages[0].layout as Array<Record<string, unknown>>
    layout[0] = { ...layout[0], links: [{ link: { type: 'reference', reference: { relationTo: 'pages', value: hotelsId }, label: 'View our hotels', appearance: 'secondary' } }] }
    await payload.update({ collection: 'pages', id: homeId, data: { layout } as never, overrideAccess: true, context, depth: 0 })
  }

  const ref = async (slug: string) => ({ type: 'reference', reference: { relationTo: 'pages', value: await pageId(slug) } })
  await payload.updateGlobal({ slug: 'navigation', overrideAccess: true, context, data: {
    header: [
      { link: { ...(await ref('offers')), label: 'Offers' } },
      { link: { ...(await ref('events')), label: "What's on" } },
      { link: { ...(await ref('about')), label: 'About' } },
      { link: { ...(await ref('contact-us')), label: 'Contact' } },
    ],
    footerColumns: [
      { title: 'Explore', links: [
        { link: { ...(await ref('hotels')), label: 'Our hotels' } },
        { link: { ...(await ref('offers')), label: 'Offers' } },
        { link: { ...(await ref('events')), label: "What's on" } },
      ] },
      { title: 'Company', links: [
        { link: { ...(await ref('about')), label: 'About us' } },
        { link: { ...(await ref('careers')), label: 'Careers' } },
        { link: { ...(await ref('contact-us')), label: 'Contact us' } },
      ] },
    ],
    legalLinks: [
      { link: { ...(await ref('privacy-policy')), label: 'Privacy' } },
      { link: { ...(await ref('cookie-policy')), label: 'Cookies' } },
      { link: { ...(await ref('terms')), label: 'Terms' } },
    ],
    footerNote: 'Independent hotels and inns, run with care.',
  } as never })

  await payload.updateGlobal({ slug: 'announcement-bar', overrideAccess: true, context, data: { enabled: false, text: 'Book direct and save this winter.' } as never })

  /* ── Redirects for every old URL that no longer exists ─────────────────── */
  const hotelId = (slug: string) => hotelDocs.find((h) => h.slug === slug)!.id
  const toHotel = (slug: string) => ({ type: 'reference' as const, reference: { relationTo: 'hotels' as const, value: hotelId(slug) } })
  const toUrl = (url: string) => ({ type: 'custom' as const, url })
  const redirects = [
    { from: '/contact/', to: toUrl('/contact-us') },
    { from: '/queens-head-berwick/facilities/', to: toHotel('queens-head-berwick') },
    { from: '/castle-berwick/facilities/', to: toHotel('castle-berwick') },
    { from: '/castle-berwick/function-and-conference-rooms/', to: toUrl('/castle-berwick/weddings-and-functions') },
    { from: '/grassington-lodge/facilities/', to: toHotel('grassington-lodge') },
    { from: '/grassington-lodge/activities/', to: toHotel('grassington-lodge') },
    { from: '/thevines/facilities/', to: toHotel('thevines') },
    { from: '/thevines/activities/', to: toHotel('thevines') },
    { from: '/thevines/weddings/', to: toUrl('/thevines/weddings-and-functions') },
    { from: '/thevines/weddings/price-list/', to: toUrl('/thevines/weddings-and-functions') },
    { from: '/caer-beris/local-attractions/', to: toHotel('caer-beris') },
    { from: '/category/hotel/', to: toUrl('/hotels') },
    { from: '/category/caer-beris/', to: toHotel('caer-beris') },
    { from: '/category/grassington/', to: toHotel('grassington-lodge') },
    { from: '/category/queensheadberwick/', to: toHotel('queens-head-berwick') },
    { from: '/category/the-castle-hotel/', to: toHotel('castle-berwick') },
    { from: '/category/the-vines/', to: toHotel('thevines') },
  ]
  for (const r of redirects) {
    const found = await payload.find({ collection: 'redirects', where: { from: { equals: r.from } }, limit: 1, overrideAccess: true, depth: 0 })
    if (!found.docs.length) await payload.create({ collection: 'redirects', data: { from: r.from, to: r.to, type: '301' } as never, overrideAccess: true, context })
  }
  log(`${redirects.length} redirects`)

  console.info('\nSeed complete.')
  console.info(`Admin login: ${adminEmail}`)
  if (wantSampleManager) {
    console.info(`Sample manager: ${managerEmail} / Manager-Demo-2026!  (sees only the two Berwick hotels)`)
  }
}

