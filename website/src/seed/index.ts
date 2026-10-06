import type { Payload } from 'payload'

import type { Hotel, Media } from '@/payload-types'

import { seedHotels } from './hotels'
import { placeholderImage } from './images'
import { h2, p, paragraphs, rich, ul } from './lexical'

const log = (msg: string) => console.info(`  · ${msg}`)

const daysFromNow = (d: number, hour = 19) => {
  const x = new Date()
  x.setDate(x.getDate() + d)
  x.setHours(hour, 0, 0, 0)
  return x.toISOString()
}

type Ctx = { payload: Payload; images: Map<string, Media>; seedNo: { n: number } }

const upload = async (ctx: Ctx, key: string, alt: string, w = 2000, h = 1333): Promise<Media> => {
  const cached = ctx.images.get(key)
  if (cached) return cached
  // Re-runs reuse the file already uploaded under this name.
  const existing = await ctx.payload.find({ collection: 'media', where: { filename: { in: [`${key}.jpg`, `${key}.webp`] } }, limit: 1, overrideAccess: true, depth: 0 })
  if (existing.docs[0]) {
    ctx.images.set(key, existing.docs[0])
    return existing.docs[0]
  }
  ctx.seedNo.n += 1
  const buffer = await placeholderImage(alt.replace(/ \(placeholder\)$/i, ''), ctx.seedNo.n, w, h)
  const doc = await ctx.payload.create({
    collection: 'media',
    data: { alt },
    file: { data: buffer, mimetype: 'image/jpeg', name: `${key}.jpg`, size: buffer.length },
    overrideAccess: true,
  })
  ctx.images.set(key, doc)
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
  const adminEmail = process.env.SEED_ADMIN_EMAIL || 'admin@grhotels.co.uk'
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
    const hero = await upload(ctx, `${h.slug}-hero`, `${h.name}, ${h.location} (placeholder)`, 2400, 1500)
    const gallery: Media[] = []
    for (const [i, label] of ['Bedroom', 'Bar', 'Dining room', 'Garden', 'Exterior'].entries()) {
      gallery.push(await upload(ctx, `${h.slug}-gallery-${i + 1}`, `${label} at ${h.name} (placeholder)`, i % 2 ? 1500 : 2000, i % 2 ? 2000 : 1333))
    }

    const existing = await payload.find({ collection: 'hotels', where: { slug: { equals: h.slug } }, limit: 1, overrideAccess: true, depth: 0 })
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
      map: { lat: h.map.lat, lng: h.map.lng },
      directions: h.directions,
      hasWeddings: h.hasWeddings,
      weddingsIntro: h.weddingsIntro,
      priceRange: h.priceRange,
      checkIn: '3:00pm',
      checkOut: '11:00am',
      bookingUrl: null,
      order: h.order,
      layout: [
        { blockType: 'text', eyebrow: 'Welcome', richText: h.story, narrow: true, style: { tone: 'cream', spacing: 'normal', align: 'left' } },
        { blockType: 'facilities', heading: 'Facilities', source: 'hotel', style: { tone: 'sand', spacing: 'compact', align: 'left' } },
        { blockType: 'roomCards', heading: 'Rooms', intro: 'Individually furnished rooms. Book direct for our best rate.', source: 'hotel', style: { tone: 'cream', spacing: 'normal', align: 'left' } },
        { blockType: 'gallery', heading: 'A look around', source: 'hotel', layout: 'masonry', columns: '3', style: { tone: 'cream', spacing: 'compact' } },
        { blockType: 'menusList', heading: 'Eat & drink', intro: 'Seasonal menus, local produce and a proper welcome.', style: { tone: 'sand', spacing: 'normal', align: 'left' } },
        { blockType: 'offers', heading: 'Offers', source: undefined, layout: 'cards', limit: 3, style: { tone: 'cream', spacing: 'normal', align: 'left' } },
        { blockType: 'eventsList', heading: "What's on", limit: 4, style: { tone: 'linen', spacing: 'normal', align: 'left' } },
        { blockType: 'testimonials', heading: 'What our guests say', source: 'auto', limit: 4, style: { tone: 'cream', spacing: 'normal', align: 'center' } },
        { blockType: 'faq', heading: 'Good to know', items: h.faqs.map((f) => ({ question: f.q, answer: paragraphs(f.a) })), style: { tone: 'cream', spacing: 'compact', align: 'left' } },
        { blockType: 'map', heading: 'Find us', showDirections: true, style: { tone: 'sand', spacing: 'normal' } },
        { blockType: 'cta', title: `Stay at ${h.name}`, text: 'Book direct for the best rate, flexible terms and a warmer welcome.', links: [{ link: { type: 'book', label: 'Book now', appearance: 'primary' } }, { link: { type: 'custom', url: `/${h.slug}/contact`, label: 'Ask a question', appearance: 'secondary' } }], style: { tone: 'charcoal', spacing: 'generous', align: 'center' } },
      ],
      _status: 'published' as const,
    }
    const doc = existing.docs[0]
      ? await payload.update({ collection: 'hotels', id: existing.docs[0].id, data: data as never, overrideAccess: true, context, depth: 0 })
      : await payload.create({ collection: 'hotels', data: data as never, overrideAccess: true, context, depth: 0 })
    hotelDocs.push(doc)

    /* Rooms */
    for (const [i, r] of h.rooms.entries()) {
      const img = await upload(ctx, `${h.slug}-room-${r.slug}`, `${r.name} at ${h.name} (placeholder)`)
      const img2 = await upload(ctx, `${h.slug}-room-${r.slug}-2`, `${r.name} bathroom at ${h.name} (placeholder)`, 1500, 2000)
      const found = await payload.find({ collection: 'rooms', where: { and: [{ hotel: { equals: doc.id } }, { slug: { equals: r.slug } }] }, limit: 1, overrideAccess: true, depth: 0 })
      const roomData = {
        name: r.name,
        slug: r.slug,
        hotel: doc.id,
        sleeps: r.sleeps,
        bedType: r.bedType,
        fromPrice: r.fromPrice,
        shortDescription: r.shortDescription,
        description: rich(p(`${r.shortDescription} Placeholder copy: describe the room, its outlook and what makes it special.`), ul(['Freshly ground coffee and a kettle', 'Large fluffy towels and toiletries', 'Free Wi-Fi throughout'])),
        features: r.features,
        gallery: [{ image: img.id }, { image: img2.id }],
        order: (i + 1) * 10,
        _status: 'published' as const,
      }
      if (found.docs[0]) await payload.update({ collection: 'rooms', id: found.docs[0].id, data: roomData as never, overrideAccess: true, context })
      else await payload.create({ collection: 'rooms', data: roomData as never, overrideAccess: true, context })
    }

    /* Menus: one structured sample + a seasonal one that expires (shows date logic) */
    const menusExisting = await payload.find({ collection: 'menus', where: { hotel: { equals: doc.id } }, limit: 0, overrideAccess: true, depth: 0 })
    if (!menusExisting.docs.length) {
      await payload.create({
        collection: 'menus',
        overrideAccess: true,
        context,
        data: {
          title: 'Sample dinner menu',
          hotel: doc.id,
          type: 'food',
          format: 'structured',
          note: 'Placeholder menu. Replace with your current dishes or upload a PDF. Please tell us about allergies.',
          sections: [
            { title: 'Starters', items: [
              { name: 'Soup of the day, warm bread', price: '7.50', dietary: { v: true } },
              { name: 'Smoked mackerel pâté, pickled cucumber, toast', price: '9', dietary: { df: true } },
              { name: 'Heritage tomato salad, basil, aged balsamic', price: '8.50', dietary: { vg: true, gf: true } },
            ] },
            { title: 'Mains', items: [
              { name: 'Beer-battered haddock, triple-cooked chips, crushed peas', price: '17.50' },
              { name: 'Slow-cooked shoulder of lamb, dauphinoise, greens', price: '24', dietary: { gf: true } },
              { name: 'Wild mushroom and chestnut pie, mash, gravy', price: '16.50', dietary: { vg: true } },
            ] },
            { title: 'Puddings', items: [
              { name: 'Sticky toffee pudding, vanilla ice cream', price: '8', dietary: { v: true } },
              { name: 'Local cheeses, chutney, crackers', price: '11', dietary: { v: true, n: true } },
            ] },
          ],
          _status: 'published',
        } as never,
      })
      await payload.create({
        collection: 'menus',
        overrideAccess: true,
        context,
        data: {
          title: 'Sunday lunch',
          hotel: doc.id,
          type: 'sunday',
          format: 'structured',
          note: 'Served 12 noon to 4pm every Sunday. Booking advised.',
          validTo: daysFromNow(120),
          sections: [{ title: 'Roasts', items: [
            { name: 'Roast sirloin of beef, Yorkshire pudding, all the trimmings', price: '19.50' },
            { name: 'Roast chicken, bread sauce, pigs in blankets', price: '17.50' },
            { name: 'Nut roast, vegetarian gravy', price: '15.50', dietary: { vg: true } },
          ] }],
          _status: 'published',
        } as never,
      })
    }

    /* Events */
    const eventsExisting = await payload.find({ collection: 'events', where: { hotel: { equals: doc.id } }, limit: 0, overrideAccess: true, depth: 0 })
    if (!eventsExisting.docs.length) {
      const evImg = await upload(ctx, `${h.slug}-event`, `Live music night at ${h.name} (placeholder)`)
      await payload.create({ collection: 'events', overrideAccess: true, context, data: {
        title: 'Live music in the bar', hotel: doc.id, start: daysFromNow(12, 20), end: daysFromNow(12, 23), image: evImg.id,
        summary: 'Placeholder event. Local musicians, a relaxed crowd and the bar open late.', price: 'Free entry',
        description: paragraphs('Placeholder copy. Replace with the real line-up and any booking details.'), _status: 'published',
      } as never })
      await payload.create({ collection: 'events', overrideAccess: true, context, data: {
        title: 'Seasonal supper club', hotel: doc.id, start: daysFromNow(33, 19), end: daysFromNow(33, 22),
        summary: 'Placeholder event. Five courses from the kitchen with matched drinks.', price: '£55 per person',
        description: paragraphs('Placeholder copy. Replace with the menu and how to book.'), _status: 'published',
      } as never })
      // A past event to prove it hides automatically
      await payload.create({ collection: 'events', overrideAccess: true, context, data: {
        title: 'Past event (hidden on the website)', hotel: doc.id, start: daysFromNow(-20, 19), end: daysFromNow(-20, 22),
        summary: 'This event finished and is hidden automatically. It stays in the admin as a record.', _status: 'published',
      } as never })
    }

    /* Testimonials */
    const tExisting = await payload.find({ collection: 'testimonials', where: { hotel: { equals: doc.id } }, limit: 0, overrideAccess: true, depth: 0 })
    if (!tExisting.docs.length) {
      await payload.create({ collection: 'testimonials', overrideAccess: true, context, data: { quote: 'Placeholder review. Lovely room, excellent breakfast and the friendliest staff. We will be back.', name: 'Sarah M.', source: 'google', hotel: doc.id, rating: 5, featured: true } })
      await payload.create({ collection: 'testimonials', overrideAccess: true, context, data: { quote: 'Placeholder review. Great food in the restaurant and a comfortable bed. Perfect stop-over.', name: 'James & Priya', source: 'tripadvisor', hotel: doc.id, rating: 5 } })
    }
  }

  /* ── Offers (per hotel + one group-wide) ──────────────────────────────── */
  const offersExisting = await payload.find({ collection: 'offers', limit: 1, overrideAccess: true, depth: 0 })
  if (!offersExisting.docs.length) {
    const groupImg = await upload(ctx, 'offer-group', 'Autumn escape offer (placeholder)')
    await payload.create({ collection: 'offers', overrideAccess: true, context, data: {
      title: 'Autumn escapes: 15% off two nights or more', image: groupImg.id,
      summary: 'Placeholder offer. Book direct, stay two nights or more at any GR Hotel and save 15% on our best flexible rate.',
      terms: paragraphs('Placeholder terms. Subject to availability. Not combinable with other offers.'),
      startDate: daysFromNow(-5), endDate: daysFromNow(75), promoCode: 'AUTUMN15', _status: 'published',
    } as never })
    for (const hd of hotelDocs.slice(0, 4)) {
      const img = await upload(ctx, `offer-${hd.slug}`, `Dinner, bed and breakfast at ${hd.name} (placeholder)`)
      await payload.create({ collection: 'offers', overrideAccess: true, context, data: {
        title: 'Dinner, bed & breakfast', hotel: hd.id, image: img.id,
        summary: `Placeholder offer. A three-course dinner, a comfortable night and a full breakfast at ${hd.name}.`,
        terms: paragraphs('Placeholder terms. Dinner allowance applies. Subject to availability.'),
        startDate: daysFromNow(-1), endDate: daysFromNow(60), _status: 'published',
      } as never })
    }
  }

  /* ── Sample manager user ──────────────────────────────────────────────── */
  const managerEmail = 'manager@example.grhotels.co.uk'
  const mgr = await payload.find({ collection: 'users', where: { email: { equals: managerEmail } }, limit: 1, overrideAccess: true })
  if (!mgr.docs.length) {
    const berwick = hotelDocs.filter((h) => h.slug === 'queens-head-berwick' || h.slug === 'castle-berwick').map((h) => h.id)
    await payload.create({ collection: 'users', overrideAccess: true, data: { name: 'Sample Manager (Berwick)', email: managerEmail, password: 'Manager-Demo-2026!', role: 'manager', hotels: berwick } })
    log(`Sample manager ${managerEmail} (both Berwick hotels)`)
  }

  /* ── Globals ──────────────────────────────────────────────────────────── */
  log('Site settings, navigation, announcement bar')
  const ogImg = await upload(ctx, 'default-og', 'GR Hotels (placeholder sharing image)', 1200, 630)
  await payload.updateGlobal({ slug: 'site-settings', overrideAccess: true, context, data: {
    siteName: 'GR Hotels',
    tagline: 'Characterful hotels and pubs with rooms across Britain',
    seo: { titleSuffix: 'GR Hotels', defaultDescription: 'Eight characterful hotels and pubs with rooms, from the Scottish Borders to the Kent Weald. Book direct with GR Hotels for the best rates.', defaultImage: ogImg.id },
    contact: { email: 'info@grhotels.co.uk', companyLine: 'GR Hotels Ltd. Registered in England.' },
    booking: { pickerTitle: 'Where would you like to stay?', pickerIntro: 'Choose a hotel and we will take you to its booking page.', utmSource: 'grhotels.co.uk', utmMedium: 'website' },
    cookies: { title: 'A word about cookies', text: 'We use cookies to understand how the site is used and to measure our advertising. Analytics only run if you accept.' },
  } as never })

  const pageId = async (slug: string) => {
    const r = await payload.find({ collection: 'pages', where: { slug: { equals: slug } }, limit: 1, overrideAccess: true, depth: 0 })
    return r.docs[0]?.id
  }

  /* ── Pages ────────────────────────────────────────────────────────────── */
  const homeHero = await upload(ctx, 'home-hero', 'GR Hotels (placeholder hero)', 2400, 1500)
  const aboutImg = await upload(ctx, 'about-image', 'The GR Hotels team (placeholder)', 1500, 2000)
  const ctaImg = await upload(ctx, 'cta-image', 'Evening light at one of our hotels (placeholder)', 2400, 1200)

  const pages: { title: string; slug: string; layout: unknown[] }[] = [
    {
      title: 'Home',
      slug: 'home',
      layout: [
        { blockType: 'hero', media: homeHero.id, eyebrow: 'Eight hotels. One warm welcome.', title: 'Characterful stays across Britain', subtitle: 'Coaching inns, manor houses and pubs with rooms, from the Scottish Borders to the Kent Weald.', height: 'full', overlay: 'gradient', showBookNow: true, links: [] },
        { blockType: 'hotelGrid', heading: 'Our hotels', intro: 'Each one different. Each one run by people who care about the place and the welcome.', layout: 'grid', style: { tone: 'cream', spacing: 'generous', align: 'left' } },
        { blockType: 'offers', heading: 'Current offers', intro: 'Booking direct always gets you our best rate.', layout: 'cards', limit: 3, style: { tone: 'sand', spacing: 'normal', align: 'left' } },
        { blockType: 'textWithImage', image: aboutImg.id, imagePosition: 'left', eyebrow: 'About us', richText: rich(h2('Small group, big welcome'), p('Placeholder copy. GR Hotels is a family of eight independent-minded hotels and inns. We keep things personal: real fires, proper breakfasts and teams who know the area.')), links: [{ link: { type: 'custom', url: '/about', label: 'Our story', appearance: 'secondary' } }], style: { tone: 'cream', spacing: 'normal' } },
        { blockType: 'eventsList', heading: "What's on", intro: 'Live music, supper clubs and seasonal celebrations across the group.', limit: 4, style: { tone: 'cream', spacing: 'normal', align: 'left' } },
        { blockType: 'testimonials', heading: 'What our guests say', source: 'auto', limit: 4, style: { tone: 'sand', spacing: 'normal', align: 'center' } },
        { blockType: 'newsletter', heading: 'Stay in the loop', text: 'Hotel news, seasonal offers and the occasional exclusive, straight to your inbox.', consentText: 'By signing up you agree to receive emails from GR Hotels. Unsubscribe any time.', style: { tone: 'linen', spacing: 'normal', align: 'left' } },
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
        { blockType: 'text', richText: rich(p('Placeholder copy. GR Hotels is one of the UK’s leading niche hotel groups, with outstanding properties in some of the country’s most idyllic settings. Replace this with the group story from the current site.')), narrow: true, style: { tone: 'cream', spacing: 'normal', align: 'left' } },
        { blockType: 'hotelGrid', heading: 'The hotels', layout: 'grid', style: { tone: 'sand', spacing: 'normal', align: 'left' } },
      ],
    },
    {
      title: 'Contact us',
      slug: 'contact-us',
      layout: [
        { blockType: 'hero', media: homeHero.id, eyebrow: 'Get in touch', title: 'Contact us', subtitle: 'Choose a hotel and your message goes straight to the team there.', height: 'short', overlay: 'gradient', showBookNow: false },
        { blockType: 'enquiryForm', heading: 'Send us a message', intro: 'For bookings, dining, events or anything else.', showStayFields: true, style: { tone: 'cream', spacing: 'normal', align: 'left' } },
        { blockType: 'hotelGrid', heading: 'Call a hotel directly', layout: 'grid', style: { tone: 'sand', spacing: 'normal', align: 'left' } },
      ],
    },
    {
      title: 'Careers',
      slug: 'careers',
      layout: [
        { blockType: 'hero', media: aboutImg.id, eyebrow: 'Join us', title: 'Careers', height: 'short', overlay: 'gradient', showBookNow: false },
        { blockType: 'text', richText: rich(p('Placeholder copy. We are always pleased to hear from warm, capable people who love hospitality. Send your CV and a note about which hotel interests you.')), narrow: true, style: { tone: 'cream', spacing: 'normal', align: 'left' } },
        { blockType: 'enquiryForm', heading: 'Get in touch', showStayFields: false, style: { tone: 'sand', spacing: 'normal', align: 'left' } },
      ],
    },
    { title: 'Privacy policy', slug: 'privacy-policy', layout: [{ blockType: 'text', eyebrow: 'Legal', richText: rich(h2('Privacy policy'), p('Placeholder. Paste your privacy policy here. This page is pre-created so the footer link works from day one.')), narrow: true, style: { tone: 'cream', spacing: 'generous', align: 'left' } }] },
    { title: 'Cookie policy', slug: 'cookie-policy', layout: [{ blockType: 'text', eyebrow: 'Legal', richText: rich(h2('Cookie policy'), p('We use essential cookies to run the site and, only with your permission, Google Tag Manager for analytics and advertising measurement. You can change your choice at any time using “Cookie settings” in the footer.')), narrow: true, style: { tone: 'cream', spacing: 'generous', align: 'left' } }] },
    { title: 'Terms & conditions', slug: 'terms', layout: [{ blockType: 'text', eyebrow: 'Legal', richText: rich(h2('Terms & conditions'), p('Placeholder. Paste your booking terms here.')), narrow: true, style: { tone: 'cream', spacing: 'generous', align: 'left' } }] },
  ]

  // Create in two passes so internal links can reference pages that exist.
  for (const pg of pages) {
    const id = await pageId(pg.slug)
    const data = { title: pg.title, slug: pg.slug, layout: pg.layout, _status: 'published' } as never
    if (id) await payload.update({ collection: 'pages', id, data, overrideAccess: true, context, depth: 0 })
    else await payload.create({ collection: 'pages', data, overrideAccess: true, context, depth: 0 })
    log(`Page: /${pg.slug === 'home' ? '' : pg.slug}`)
  }
  // Second pass for the home hero link to /hotels
  const hotelsId = await pageId('hotels')
  const homeId = await pageId('home')
  if (hotelsId && homeId) {
    const home = pages[0]
    const layout = home.layout as Array<Record<string, unknown>>
    layout[0] = { ...layout[0], links: [{ link: { type: 'reference', reference: { relationTo: 'pages', value: hotelsId }, label: 'Explore the hotels', appearance: 'secondary' } }] }
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
        { link: { ...(await ref('contact-us')), label: 'Contact' } },
      ] },
    ],
    legalLinks: [
      { link: { ...(await ref('privacy-policy')), label: 'Privacy' } },
      { link: { ...(await ref('cookie-policy')), label: 'Cookies' } },
      { link: { ...(await ref('terms')), label: 'Terms' } },
    ],
    footerNote: 'Independent hotels and inns, run with care.',
  } as never })

  await payload.updateGlobal({ slug: 'announcement-bar', overrideAccess: true, context, data: { enabled: false, text: 'Book direct and save 10% this winter.' } as never })

  /* ── Redirects for known old URLs ─────────────────────────────────────── */
  const hotelBySlug = (slug: string) => hotelDocs.find((h) => h.slug === slug)?.id
  const redirects: { from: string; to: { type: 'custom'; url: string } | { type: 'reference'; reference: { relationTo: 'hotels'; value: number } } }[] = [
    { from: '/contact/', to: { type: 'custom', url: '/contact-us' } },
    { from: '/grassington-lodge/facilities/', to: { type: 'reference', reference: { relationTo: 'hotels', value: hotelBySlug('grassington-lodge')! } } },
    { from: '/thevines/facilities/', to: { type: 'reference', reference: { relationTo: 'hotels', value: hotelBySlug('thevines')! } } },
    { from: '/queens-head-berwick/facilities/', to: { type: 'reference', reference: { relationTo: 'hotels', value: hotelBySlug('queens-head-berwick')! } } },
    { from: '/caer-beris/local-attractions/', to: { type: 'reference', reference: { relationTo: 'hotels', value: hotelBySlug('caer-beris')! } } },
    { from: '/castle-berwick/function-and-conference-rooms/', to: { type: 'custom', url: '/castle-berwick/weddings-and-functions' } },
    { from: '/grassington-lodge/rooms/room-seven-premium-room/', to: { type: 'custom', url: '/grassington-lodge/rooms/room-seven-premium-room' } },
  ]
  for (const r of redirects) {
    const found = await payload.find({ collection: 'redirects', where: { from: { equals: r.from } }, limit: 1, overrideAccess: true, depth: 0 })
    if (!found.docs.length) await payload.create({ collection: 'redirects', data: { from: r.from, to: r.to, type: '301' } as never, overrideAccess: true, context })
  }
  log(`${redirects.length} redirects`)

  console.info('\nSeed complete.')
  console.info(`Admin login: ${adminEmail}`)
  console.info(`Sample manager: ${managerEmail} / Manager-Demo-2026!  (sees only the two Berwick hotels)`)
}
