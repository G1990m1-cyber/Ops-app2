import { paragraphs, rich, h2, p, ul } from './lexical'

export type SeedRoom = {
  name: string
  slug: string
  sleeps: number
  bedType: string
  fromPrice?: number
  shortDescription: string
  features: string[]
}

export type SeedHotel = {
  name: string
  slug: string
  location: string
  tagline: string
  intro: ReturnType<typeof paragraphs>
  facilities: string[]
  address: { line1: string; line2?: string; town: string; county: string; postcode: string }
  phone: string
  email: string
  map: { lat: number; lng: number }
  directions: ReturnType<typeof rich>
  hasWeddings: boolean
  weddingsIntro?: ReturnType<typeof rich>
  priceRange: '£' | '££' | '£££'
  order: number
  rooms: SeedRoom[]
  story: ReturnType<typeof rich>
  faqs: { q: string; a: string }[]
}

/*
 * Facts below come from public listings of the current site. Anything marked
 * "placeholder" in the copy is written to be replaced once the real content is crawled.
 * Emails are placeholders too: set the real ones in the admin before launch.
 */
export const seedHotels: SeedHotel[] = [
  {
    name: 'The George at Piercebridge',
    slug: 'the-george-at-piercebridge',
    location: 'Piercebridge, County Durham',
    tagline: 'A 16th-century coaching inn on the banks of the River Tees',
    intro: paragraphs(
      'Set where the old Roman road crosses the Tees, The George has welcomed travellers since the sixteenth century. Today it pairs riverside dining and comfortable rooms with the kind of welcome you only find in a proper village inn.',
    ),
    facilities: ['wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'river', 'weddings', 'dog-friendly', 'fireplace'],
    address: { line1: 'The George at Piercebridge', town: 'Piercebridge', county: 'County Durham', postcode: 'DL2 3SW' },
    phone: '01325 374576',
    email: 'george@example.grhotels.co.uk',
    map: { lat: 54.5365, lng: -1.6755 },
    directions: rich(
      h2('By car'),
      p('Piercebridge sits on the B6275 just off the A67 between Darlington and Barnard Castle. Free parking is on site.'),
      h2('By rail'),
      p('Darlington station is 15 minutes by taxi and on the East Coast Main Line.'),
    ),
    hasWeddings: true,
    weddingsIntro: rich(
      p('With the river as your backdrop and an experienced events team beside you from first enquiry to the final dance, The George makes celebrations feel effortless.'),
      ul(['Ceremonies and receptions for intimate gatherings to larger parties', 'Riverside photographs on the doorstep', 'Rooms for your guests upstairs']),
    ),
    priceRange: '££',
    order: 10,
    rooms: [
      { name: 'Riverside Double', slug: 'riverside-double', sleeps: 2, bedType: '5ft king-size', fromPrice: 120, shortDescription: 'Looks straight down to the Tees. Placeholder description.', features: ['en-suite', 'king-bed', 'view', 'tea-coffee', 'smart-tv', 'wifi'] },
      { name: 'Courtyard Twin', slug: 'courtyard-twin', sleeps: 2, bedType: 'Two 3ft singles', fromPrice: 110, shortDescription: 'Quiet, bright and easy for friends travelling together.', features: ['en-suite', 'twin-option', 'tea-coffee', 'wifi'] },
      { name: 'Family Room', slug: 'family-room', sleeps: 4, bedType: '5ft king plus sofa bed', fromPrice: 150, shortDescription: 'Space for four with the river a few steps away.', features: ['en-suite', 'king-bed', 'sofa-bed', 'dog-friendly', 'wifi'] },
    ],
    story: rich(
      h2('An inn with history'),
      p('Placeholder copy. The George has stood beside the Tees since the 1500s, serving drovers, coaching parties and, more recently, walkers and weekenders. The bar still has its low beams and open fire; the dining room looks out across the lawn to the water.'),
    ),
    faqs: [
      { q: 'Can we bring our dog?', a: 'Yes, in selected rooms and in the bar. Please tell us when you book.' },
      { q: 'Is there parking?', a: 'Yes, free parking on site for guests and diners.' },
    ],
  },
  {
    name: 'Royal Oak',
    slug: 'royal-oak',
    location: 'Hawkhurst, Kent',
    tagline: 'A cosy, welcoming Wealden pub with twelve rooms',
    intro: paragraphs(
      'On Rye Road in Hawkhurst, a short drive from Cranbrook and the Sussex coast, the Royal Oak is a natural, inviting space: good food, a well-kept bar and twelve rooms to sleep it all off in.',
    ),
    facilities: ['wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'family', 'dog-friendly', 'walking'],
    address: { line1: 'Royal Oak', line2: 'Rye Road', town: 'Hawkhurst', county: 'Kent', postcode: 'TN18 4EP' },
    phone: '01580 000000',
    email: 'royaloak@example.grhotels.co.uk',
    map: { lat: 51.0455, lng: 0.5205 },
    directions: rich(h2('By car'), p('On the A268 Rye Road in Hawkhurst, 15 minutes from the A21. Free parking.'), h2('By rail'), p('Etchingham and Staplehurst stations are both around 20 minutes away by taxi.')),
    hasWeddings: false,
    priceRange: '££',
    order: 20,
    rooms: [
      { name: 'Double Room', slug: 'double-room', sleeps: 2, bedType: '5ft king-size', fromPrice: 105, shortDescription: 'Calm, natural tones and a comfortable bed. Placeholder description.', features: ['en-suite', 'king-bed', 'tea-coffee', 'smart-tv', 'wifi'] },
      { name: 'Twin Room', slug: 'twin-room', sleeps: 2, bedType: 'Two 3ft singles', fromPrice: 105, shortDescription: 'Ideal for friends or colleagues.', features: ['en-suite', 'twin-option', 'tea-coffee', 'wifi'] },
      { name: 'Family Room', slug: 'family-room', sleeps: 4, bedType: '5ft king plus two singles', fromPrice: 140, shortDescription: 'Room for everyone, close to the garden.', features: ['en-suite', 'king-bed', 'ground-floor', 'wifi'] },
    ],
    story: rich(h2('Welcome to the Weald'), p('Placeholder copy. Hawkhurst sits in the High Weald Area of Outstanding Natural Beauty, with Bodiam Castle, Sissinghurst and the vineyards of Kent and Sussex all within easy reach.')),
    faqs: [
      { q: 'Is it Hawkhurst or Cranbrook?', a: 'Both, in a way. The Royal Oak is in Hawkhurst, which falls within the Cranbrook postal area. Cranbrook town is ten minutes up the road.' },
      { q: 'What time is check-in?', a: 'From 3pm until 10pm. Let us know if you will be later.' },
    ],
  },
  {
    name: 'Queens Head',
    slug: 'queens-head-berwick',
    location: 'Berwick-upon-Tweed, Northumberland',
    tagline: 'Six rooms and a café overlooking Sandgate in the old town',
    intro: paragraphs(
      'A traditional six-bedroom, self check-in hotel on Sandgate in the oldest part of Berwick, a short walk from the Elizabethan walls and the quayside. Downstairs, the Sandgate Café serves brunch, platters and Sunday lunch from 10am to 6pm every day.',
    ),
    facilities: ['wifi', 'self-checkin', 'breakfast', 'restaurant', 'walking', 'family', 'tea-coffee', 'tv'],
    address: { line1: 'Queens Head', line2: 'Sandgate', town: 'Berwick-upon-Tweed', county: 'Northumberland', postcode: 'TD15 1EP' },
    phone: '01289 307852',
    email: 'queenshead@example.grhotels.co.uk',
    map: { lat: 55.7705, lng: -2.0045 },
    directions: rich(h2('By rail'), p('Berwick station is on the East Coast Main Line, about 40 minutes from Edinburgh or Newcastle, and a ten-minute walk from the hotel.'), h2('By car'), p('Public parking is available on the quayside and at Castlegate car park.')),
    hasWeddings: false,
    priceRange: '££',
    order: 30,
    rooms: [
      { name: 'Sandgate Double', slug: 'sandgate-double', sleeps: 2, bedType: '5ft king-size', fromPrice: 95, shortDescription: 'Looks over Sandgate towards the walls. Breakfast hamper included. Placeholder description.', features: ['en-suite', 'king-bed', 'view', 'tea-coffee', 'wifi'] },
      { name: 'Courtyard Double', slug: 'courtyard-double', sleeps: 2, bedType: '5ft king-size', fromPrice: 90, shortDescription: 'Quiet room at the back of the house.', features: ['en-suite', 'king-bed', 'tea-coffee', 'wifi'] },
    ],
    story: rich(h2('In the old town'), p('Placeholder copy. Berwick is England’s northernmost town, ringed by the finest Elizabethan walls in Europe. The Queens Head is right in the middle of it, with a luxury breakfast hamper delivered to your door.')),
    faqs: [
      { q: 'How does self check-in work?', a: 'We email you a code on the day of arrival. Use it at the front door and your room door. Someone is always on the end of the phone if you need us.' },
      { q: 'Is breakfast included?', a: 'Yes. A breakfast hamper is left outside your room each morning.' },
    ],
  },
  {
    name: 'The Castle',
    slug: 'castle-berwick',
    location: 'Berwick-upon-Tweed, Northumberland',
    tagline: 'Refurbished rooms, stone-baked pizza and a function room for 100',
    intro: paragraphs(
      'An hour by road or 40 minutes by rail from Edinburgh or Newcastle, The Castle is a comfortable base for the Northumberland coast. Rooms were refurbished throughout in 2021 with en suite bathrooms and high-powered showers, and the kitchen turns out freshly made stone-baked pizza the traditional Italian way.',
    ),
    facilities: ['wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'meetings', 'family', 'tv', 'tea-coffee'],
    address: { line1: 'The Castle', line2: 'Castlegate', town: 'Berwick-upon-Tweed', county: 'Northumberland', postcode: 'TD15 1LF' },
    phone: '01289 307900',
    email: 'castle@example.grhotels.co.uk',
    map: { lat: 55.7735, lng: -2.0105 },
    directions: rich(h2('By rail'), p('Berwick station is a five-minute walk.'), h2('By car'), p('Leave the A1 at the Berwick turn-off and follow signs for the town centre and railway station.')),
    hasWeddings: true,
    weddingsIntro: rich(p('Our function room seats 50 for dinner or hosts 100 for a disco, party or wake, with the bar and kitchen right next door. Placeholder copy.')),
    priceRange: '££',
    order: 40,
    rooms: [
      { name: 'Classic Double', slug: 'classic-double', sleeps: 2, bedType: '5ft king-size', fromPrice: 89, shortDescription: 'Refurbished in 2021 with a powerful walk-in shower. Placeholder description.', features: ['en-suite', 'walk-in-shower', 'king-bed', 'smart-tv', 'wifi'] },
      { name: 'Superior Double', slug: 'superior-double', sleeps: 2, bedType: '6ft super-king', fromPrice: 109, shortDescription: 'More space and a seating area.', features: ['en-suite', 'super-king-bed', 'seating-area', 'smart-tv', 'wifi'] },
      { name: 'Family Room', slug: 'family-room', sleeps: 4, bedType: '5ft king plus bunk beds', fromPrice: 129, shortDescription: 'Sleeps four comfortably.', features: ['en-suite', 'king-bed', 'wifi'] },
    ],
    story: rich(h2('Your base for the Borders'), p('Placeholder copy. Holy Island, Bamburgh and the Farne Islands are all within half an hour. Come back to pizza from the stone oven and a pint in the bar.')),
    faqs: [
      { q: 'Can you host a private party?', a: 'Yes. The function room takes up to 50 seated or 100 standing. Ask us about menus and bar packages.' },
      { q: 'Is there parking?', a: 'Yes, there is parking at the hotel for guests.' },
    ],
  },
  {
    name: 'Grassington Lodge',
    slug: 'grassington-lodge',
    location: 'Grassington, Yorkshire Dales',
    tagline: 'Thirteen comfortable rooms in the heart of Wharfedale',
    intro: paragraphs(
      'Grassington Lodge offers comfortable room-only accommodation in the Dales village made famous on screen. Every room has a TV, large fluffy towels, toiletries and a well-stocked hospitality tray, with Wi-Fi throughout. Some rooms are dog friendly.',
    ),
    facilities: ['wifi', 'parking', 'dog-friendly', 'walking', 'bikes', 'tea-coffee', 'tv', 'family'],
    address: { line1: 'Grassington Lodge', line2: '8 Wood Lane', town: 'Grassington', county: 'North Yorkshire', postcode: 'BD23 5LU' },
    phone: '01756 752518',
    email: 'grassington@example.grhotels.co.uk',
    map: { lat: 54.0715, lng: -2.0015 },
    directions: rich(h2('By car'), p('From Skipton take the B6265 to Grassington. The Lodge is on Wood Lane, a short walk from the square. Free parking on site.'), h2('By rail'), p('Skipton station is 20 minutes away by taxi or bus 72.')),
    hasWeddings: false,
    priceRange: '££',
    order: 50,
    rooms: [
      { name: 'The Suite', slug: 'the-suite', sleeps: 2, bedType: '6ft super-king', fromPrice: 165, shortDescription: 'The largest room in the house with a separate sitting area. Placeholder description.', features: ['en-suite', 'bath', 'super-king-bed', 'seating-area', 'view', 'wifi'] },
      { name: 'Vendale 1', slug: 'vendale-1', sleeps: 2, bedType: '6ft super-king', fromPrice: 140, shortDescription: 'In a separate building about 20 yards from the main house: spacious, light, with a sitting area.', features: ['en-suite', 'super-king-bed', 'seating-area', 'ground-floor', 'dog-friendly', 'wifi'] },
      { name: 'Vendale 2', slug: 'vendale-2', sleeps: 2, bedType: '6ft super-king', fromPrice: 140, shortDescription: 'The second of the two Vendale rooms, equally spacious and light.', features: ['en-suite', 'super-king-bed', 'seating-area', 'ground-floor', 'dog-friendly', 'wifi'] },
      { name: 'Room Six', slug: 'room-six', sleeps: 2, bedType: '5ft king-size', fromPrice: 110, shortDescription: 'First floor, overlooking the garden, with a private bathroom just outside the bedroom.', features: ['king-bed', 'view', 'wifi'] },
      { name: 'Room Seven (Premium)', slug: 'room-seven-premium-room', sleeps: 2, bedType: '6ft king-size', fromPrice: 130, shortDescription: 'Second floor with views of the hills and Grassington rooftops.', features: ['en-suite', 'king-bed', 'view', 'wifi'] },
      { name: 'Family Room', slug: 'family-room', sleeps: 4, bedType: '5ft king plus two singles', fromPrice: 150, shortDescription: 'Space for the whole family after a day on the fells.', features: ['en-suite', 'king-bed', 'wifi'] },
    ],
    story: rich(h2('Room only, done well'), p('Placeholder copy. Grassington’s cobbled square has cafés, pubs and bakeries for breakfast, all two minutes’ walk away. The Dales Way passes the door.')),
    faqs: [
      { q: 'Is breakfast available?', a: 'Rooms are room-only. The village square, two minutes away, has excellent cafés for breakfast.' },
      { q: 'Which rooms are dog friendly?', a: 'The two Vendale rooms in the garden building welcome dogs.' },
    ],
  },
  {
    name: 'The Vines',
    slug: 'thevines',
    location: 'Black Bourton, Oxfordshire',
    tagline: 'A charming eighteen-bedroom hotel in a Cotswold village',
    intro: paragraphs(
      'The Vines offers comfortable accommodation in the picturesque village of Black Bourton, near Bampton and Burford. Eighteen bedrooms, a restaurant and bar, and the Cotswolds on the doorstep.',
    ),
    facilities: ['wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'meetings', 'family', 'tv'],
    address: { line1: 'The Vines', line2: 'Burford Road', town: 'Black Bourton, Bampton', county: 'Oxfordshire', postcode: 'OX18 2PF' },
    phone: '01993 843559',
    email: 'thevines@example.grhotels.co.uk',
    map: { lat: 51.7245, lng: -1.5825 },
    directions: rich(h2('By car'), p('Black Bourton is between Bampton and Carterton, ten minutes from the A40 at Burford. Free parking.'), h2('By rail'), p('Oxford and Swindon are both around 40 minutes away by road.')),
    hasWeddings: true,
    weddingsIntro: rich(p('Garden ceremonies, candlelit dinners and eighteen rooms for your guests. Placeholder copy.')),
    priceRange: '££',
    order: 60,
    rooms: [
      { name: 'Classic Double', slug: 'classic-double', sleeps: 2, bedType: '5ft king-size', fromPrice: 99, shortDescription: 'Comfortable and quiet. Placeholder description.', features: ['en-suite', 'king-bed', 'tea-coffee', 'wifi'] },
      { name: 'Garden Room', slug: 'garden-room', sleeps: 2, bedType: '6ft super-king', fromPrice: 125, shortDescription: 'Ground floor with doors to the garden.', features: ['en-suite', 'super-king-bed', 'ground-floor', 'accessible', 'wifi'] },
    ],
    story: rich(h2('Gateway to the Cotswolds'), p('Placeholder copy. Burford, Bibury and the Cotswold Wildlife Park are all close by; Oxford is under an hour.')),
    faqs: [{ q: 'Do you have accessible rooms?', a: 'Yes, our garden rooms are on the ground floor with level access.' }],
  },
  {
    name: 'Caer Beris Manor',
    slug: 'caer-beris',
    location: 'Builth Wells, Powys',
    tagline: 'A manor house in 27 acres of Welsh parkland',
    intro: paragraphs(
      'Tucked away in the heart of the Welsh countryside, Caer Beris Manor is a tranquil escape where history, comfort and nature come together. Twenty-one individually styled bedrooms, each with its own en suite bathroom, and self check-in for your convenience.',
    ),
    facilities: ['wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'river', 'fishing', 'walking', 'weddings', 'self-checkin', 'fireplace'],
    address: { line1: 'Caer Beris Manor', town: 'Builth Wells', county: 'Powys', postcode: 'LD2 3NP' },
    phone: '01982 552601',
    email: 'caerberis@example.grhotels.co.uk',
    map: { lat: 52.1455, lng: -3.4195 },
    directions: rich(h2('By car'), p('Half a mile west of Builth Wells on the A483 towards Llandovery. Free parking in the grounds.'), h2('By rail'), p('Builth Road station (Heart of Wales line) is ten minutes by taxi.')),
    hasWeddings: true,
    weddingsIntro: rich(p('Twenty-seven acres of parkland, a timbered hall and the River Irfon running through the grounds. Placeholder copy.')),
    priceRange: '££',
    order: 70,
    rooms: [
      { name: 'Manor Double', slug: 'manor-double', sleeps: 2, bedType: '5ft king-size', fromPrice: 115, shortDescription: 'Individually styled with parkland views. Placeholder description.', features: ['en-suite', 'king-bed', 'view', 'tea-coffee', 'wifi'] },
      { name: 'Four-Poster Room', slug: 'four-poster-room', sleeps: 2, bedType: '6ft four-poster', fromPrice: 165, shortDescription: 'The romantic one.', features: ['en-suite', 'bath', 'super-king-bed', 'view', 'wifi'] },
      { name: 'Family Room', slug: 'family-room', sleeps: 4, bedType: '5ft king plus two singles', fromPrice: 155, shortDescription: 'Space for four with the grounds to explore.', features: ['en-suite', 'king-bed', 'dog-friendly', 'wifi'] },
    ],
    story: rich(h2('History, comfort, nature'), p('Placeholder copy. Fish the Irfon, walk the Elan Valley, or do very little in front of the fire.')),
    faqs: [{ q: 'Can we fish on the river?', a: 'Yes, guests can fish our stretch of the River Irfon. Ask at reception for permits and the best spots.' }],
  },
  {
    name: 'The Riverside House Hotel',
    slug: 'the-riverside-house-hotel',
    location: 'Mildenhall, Suffolk',
    tagline: 'A family-run hotel on the River Lark, built in 1720',
    intro: paragraphs(
      'Nestled on the edge of the River Lark near Mildenhall, The Riverside House Hotel was originally built in 1720 and is now a family-run hotel with comfortable rooms, a restaurant and gardens running down to the water.',
    ),
    facilities: ['wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'river', 'meetings', 'weddings', 'family'],
    address: { line1: 'The Riverside House Hotel', line2: 'Mill Street', town: 'Mildenhall', county: 'Suffolk', postcode: 'IP28 7DP' },
    phone: '01638 717274',
    email: 'riverside@example.grhotels.co.uk',
    map: { lat: 52.3445, lng: 0.5085 },
    directions: rich(h2('By car'), p('Mildenhall is just off the A11 between Newmarket and Thetford. Free parking at the hotel.'), h2('By rail'), p('Ely and Bury St Edmunds stations are both about 25 minutes away.')),
    hasWeddings: true,
    weddingsIntro: rich(p('Riverside lawns for drinks, a Georgian house for the party. Placeholder copy.')),
    priceRange: '££',
    order: 80,
    rooms: [
      { name: 'Riverside Double', slug: 'riverside-double', sleeps: 2, bedType: '5ft king-size', fromPrice: 110, shortDescription: 'Garden and river views. Placeholder description.', features: ['en-suite', 'king-bed', 'view', 'tea-coffee', 'wifi'] },
      { name: 'Classic Twin', slug: 'classic-twin', sleeps: 2, bedType: 'Two 3ft singles', fromPrice: 100, shortDescription: 'Handy for Newmarket race days.', features: ['en-suite', 'twin-option', 'wifi'] },
    ],
    story: rich(h2('Three hundred years on the Lark'), p('Placeholder copy. Newmarket, Bury St Edmunds, Ely and the Brecks are all within easy reach.')),
    faqs: [{ q: 'Do you cater for race days?', a: 'Yes. Newmarket is 20 minutes away and we offer early breakfasts on race days.' }],
  },
]
