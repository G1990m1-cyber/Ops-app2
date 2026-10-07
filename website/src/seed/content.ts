/**
 * Real content migrated from www.grhotels.co.uk (crawled 7 Oct 2026).
 * Copy is the old site's own wording, lightly tidied for typos. Images live in content/images.
 * Where the old site had nothing (e.g. rooms for four of the hotels), fields are left empty
 * rather than invented, and the site falls back gracefully.
 */
import { h2, h3, p, paragraphs, rich, ul } from './lexical'

export type Img = { file: string; alt: string }

export type RoomSeed = {
  name: string
  slug: string
  sleeps: number
  bedType?: string
  shortDescription: string
  description: ReturnType<typeof rich>
  features: string[]
  images: Img[]
  order: number
}

export type HotelSeed = {
  name: string
  slug: string
  location: string
  tagline: string
  intro: ReturnType<typeof rich>
  story: ReturnType<typeof rich>
  extraBlocks?: Array<Record<string, unknown>>
  facilities: string[]
  address: { line1: string; line2?: string; town: string; county: string; postcode: string }
  phone: string
  email?: string
  map: { lat: number; lng: number; directionsUrl: string }
  directions?: ReturnType<typeof rich>
  bookingUrl: string
  tableBookingUrl?: string
  hasWeddings: boolean
  weddingsIntro?: ReturnType<typeof rich>
  priceRange: '£' | '££' | '£££'
  order: number
  hero: Img
  gallery: Img[]
  rooms: RoomSeed[]
  testimonials: { quote: string; name: string; source: 'google' | 'tripadvisor' | 'booking' | 'guestbook' | 'email' }[]
  faqs: { q: string; a: string }[]
}

const gmaps = (q: string) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`

export const siteLogo: Img = { file: 'GRHOTELS-logo.png', alt: 'GR Hotels' }

export const hotels: HotelSeed[] = [
  /* ── The George at Piercebridge ────────────────────────────────────────── */
  {
    name: 'The George at Piercebridge',
    slug: 'the-george-at-piercebridge',
    location: 'Piercebridge, County Durham',
    tagline: 'Historic riverside stays in the heart of County Durham',
    intro: paragraphs(
      'Set on the banks of the River Tees in the historic village of Piercebridge, The George is a characterful coaching inn where heritage, hospitality and countryside charm come together. Dating back to the 16th century, the hotel offers comfortable accommodation, riverside dining and a welcoming atmosphere, making it the perfect base for exploring County Durham, North Yorkshire and the Durham Dales.',
    ),
    story: rich(
      h2('A historic coaching inn on the River Tees'),
      p('The George has welcomed travellers for centuries. Situated beside the historic bridge crossing the River Tees, the inn sits in one of the region’s most fascinating villages, with roots stretching back to Roman Britain.'),
      p('Piercebridge was once an important crossing point on Dere Street, one of the Roman Empire’s major roads through Britain. Today, visitors can explore the remains of the Roman fort and bridge just a short walk from the hotel, before returning to enjoy the comfort and character of this much loved countryside inn.'),
      h3('Stay at The George'),
      p('Whether you’re visiting for a romantic escape, a family getaway, a business trip or a countryside weekend with the dog, The George offers a relaxing stay in one of the North East’s most historic settings.'),
      p('Each room has been designed to offer a comfortable and relaxing retreat after a day of exploring. Combining traditional character with modern comforts, guests can enjoy comfortable beds, en suite facilities, complimentary WiFi and everything needed for a restful stay.'),
      h3('Food, drink and riverside views'),
      p('Housed within one of the most picturesque spaces in the hotel, our restaurant overlooks the historic bridge and River Tees, providing a memorable setting for breakfast, lunch and dinner. Guests and locals alike gather here to enjoy seasonal dishes, traditional favourites and a warm welcome throughout the year.'),
      h3('Discover County Durham and North Yorkshire'),
      p('Perfectly positioned between Darlington, Barnard Castle and Richmond, The George provides easy access to some of the North East’s most loved attractions.'),
      ul(['Piercebridge Roman Fort', 'Raby Castle', 'Richmond Castle', 'The Bowes Museum', 'The Durham Dales', 'Riverside walks along the Tees', 'Historic market towns and villages']),
      p('Book direct for the best available rates, free parking and direct support from our team.'),
    ),
    facilities: ['wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'river', 'weddings', 'dog-friendly', 'walking'],
    address: { line1: 'The George at Piercebridge', town: 'Piercebridge, Darlington', county: 'County Durham', postcode: 'DL2 3SW' },
    phone: '01325 374576',
    email: 'thegeorge@grhotels.co.uk',
    map: { lat: 54.5344, lng: -1.6739, directionsUrl: gmaps('The George at Piercebridge, Piercebridge, Darlington DL2 3SW') },
    bookingUrl: 'https://bookingengine.mylighthouse.com/v2/george-of-piercebridge-piercebridge?language=en-GB',
    hasWeddings: true,
    weddingsIntro: rich(
      p('Celebrate your special day in one of County Durham’s most picturesque riverside settings. From intimate ceremonies to larger celebrations, The George combines historic character, elegant reception spaces, beautiful gardens and comfortable accommodation.'),
      p('Our experienced events team will support you from your first enquiry through to the final dance. Licensed for civil ceremonies, with accommodation available for you and your guests.'),
    ),
    priceRange: '££',
    order: 10,
    hero: { file: 'DSC01955-HDR-scaled.jpg', alt: 'The bar at The George at Piercebridge, with beams, an open fire and a chalkboard menu' },
    gallery: [
      { file: 'External.jpg', alt: 'The George at Piercebridge, a long whitewashed coaching inn beside the road' },
      { file: 'DSC01915-HDR-scaled.jpg', alt: 'The restaurant at The George, with tables set beneath tall windows' },
      { file: 'DSC02205-HDR-scaled.jpg', alt: 'A double bedroom at The George with a padded headboard and desk' },
      { file: 'DSC02045-HDR-scaled.jpg', alt: 'A bright bedroom with beams, two tall windows and a super-king bed' },
      { file: 'DSC02385-HDR-scaled.jpg', alt: 'A bedroom with patterned wallpaper, armchair and antique writing desk' },
      { file: 'DSC02030-HDR-scaled.jpg', alt: 'A bathroom with a freestanding bath beneath an arched window' },
      { file: 'DSC02020-HDR-scaled.jpg', alt: 'The hot tub on the terrace overlooking the River Tees' },
      { file: 'DSC02380-HDR-scaled.jpg', alt: 'A private dining room with a long table and floral wallpaper' },
      { file: 'The-George-Weddings-Events.jpg', alt: 'The function room at The George laid for a wedding breakfast' },
    ],
    rooms: [],
    testimonials: [
      { quote: 'The hotel is in a stunning location by the River Tees and is full of charm and character.', name: 'Guest review', source: 'google' },
      { quote: 'A beautiful riverside setting with plenty of character.', name: 'Guest review', source: 'google' },
      { quote: 'Friendly staff, comfortable rooms and excellent breakfast.', name: 'Guest review', source: 'google' },
    ],
    faqs: [
      { q: 'Can we bring our dog?', a: 'Yes, The George welcomes dogs for countryside weekends. Please tell us when you book so we can allocate a suitable room.' },
      { q: 'Is there parking?', a: 'Yes, free parking on site for guests and diners.' },
      { q: 'Do you host weddings?', a: 'Yes. The George is licensed for civil ceremonies and has reception spaces, gardens and rooms for your guests. Email thegeorge@grhotels.co.uk to start planning.' },
    ],
  },

  /* ── Royal Oak, Hawkhurst ──────────────────────────────────────────────── */
  {
    name: 'Royal Oak',
    slug: 'royal-oak',
    location: 'Hawkhurst, Kent',
    tagline: 'A cosy and inviting space with a natural, welcoming feel',
    intro: paragraphs(
      'The Royal Oak in Hawkhurst is a cosy and inviting space with a natural and welcoming aesthetic. We are located in a peaceful and scenic area, perfect for those who want to escape the hustle and bustle of city life.',
    ),
    story: rich(
      h2('Warm, rustic and relaxed'),
      p('The decor is warm and rustic, with wooden tables and chairs, exposed brick walls, and soft lighting that creates a welcoming ambiance.'),
      p('Whether you’re visiting for business or pleasure, our hotel is the perfect choice for those who want to experience the beauty and charm of the countryside while enjoying all the comforts of home.'),
      p('Hawkhurst sits in the High Weald, near Cranbrook, with Bodiam Castle, Sissinghurst and the Sussex coast all within easy reach.'),
    ),
    facilities: ['wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'family', 'walking'],
    address: { line1: 'Royal Oak', line2: 'Rye Road, High Street', town: 'Hawkhurst, Cranbrook', county: 'Kent', postcode: 'TN18 4EP' },
    phone: '01580 755782',
    email: 'royaloak@grhotels.co.uk',
    map: { lat: 51.0471, lng: 0.51, directionsUrl: gmaps('Royal Oak, Rye Road, Hawkhurst, Cranbrook TN18 4EP') },
    bookingUrl: 'https://direct-book.com/properties/TheRoyalOakdirect1',
    tableBookingUrl: 'https://web.dojo.app/create_booking/vendor/EU7rQ_y5pnYeZkmzh80enykQcAGbsaTTDNKJrUq7mMc_restaurant',
    hasWeddings: false,
    priceRange: '££',
    order: 20,
    hero: { file: 'RoyalOak_Feb24_73-scaled.jpg', alt: 'A bedroom at the Royal Oak with a black iron bed, pink throw and a window over the village' },
    gallery: [
      { file: 'the-royal-oak-hawkhurst.jpg', alt: 'The white-painted Royal Oak Hotel in Hawkhurst with bunting on the front' },
      { file: 'RoyalOak_Feb24_70-scaled.jpg', alt: 'A double bed with a pink throw, folded towels and framed prints' },
      { file: 'RoyalOak_Feb24_76-scaled.jpg', alt: 'A double bed with a buttoned headboard, black lamps and a lime cushion' },
      { file: 'RoyalOak_Feb24_67-scaled.jpg', alt: 'A bedroom with a black iron bedstead, gilt mirror and teal cushion' },
      { file: 'RoyalOak_Feb24_81-scaled.jpg', alt: 'A double room with a soft buttoned headboard and bedside lamps' },
      { file: 'RoyalOak_Feb24_64-scaled.jpg', alt: 'Toiletries on a shelf beneath an ornate bathroom mirror' },
    ],
    rooms: [],
    testimonials: [],
    faqs: [
      { q: 'Is it Hawkhurst or Cranbrook?', a: 'The Royal Oak is on Rye Road in Hawkhurst, which falls within the Cranbrook postal district. Cranbrook town is ten minutes up the road.' },
      { q: 'Can I book a table?', a: 'Yes. Use the “Book a table” button or call 01580 755782.' },
    ],
  },

  /* ── Queens Head, Berwick ──────────────────────────────────────────────── */
  {
    name: 'Queens Head',
    slug: 'queens-head-berwick',
    location: 'Berwick-upon-Tweed, Northumberland',
    tagline: 'Comfort with a difference, in the old part of Berwick',
    intro: paragraphs(
      'The Queens Head is a traditional six-bedroom self check-in hotel. It overlooks Sandgate in the old part of Berwick upon Tweed, only walking distance from the walls and quayside.',
    ),
    story: rich(
      h2('Comfort with a difference'),
      p('The hotel is very welcoming. It has six comfortable bedrooms with ensuite bathrooms, a luxury breakfast hamper, comfy beds and internet throughout.'),
      p('Guests are very welcome to make use of the safe and secure outdoor bike storage area at the hotel. The Queen’s Head has everything you need for a restful stay in Berwick.'),
      h3('Bedrooms and bathrooms'),
      p('Our rooms have been recently refurbished to meet our guests’ high standards, while being sympathetic to the building’s Grade II listed status; we have created a contemporary feel while maintaining the characteristics of a period building.'),
      p('The beds have pocket-sprung mattresses and are dressed in quality matching bedding, and the pillows are hypo-allergenic. Your room has a thermostat so you can feel as comfortable as if you were at home, and a housekeeper maintains the high standards of your room with daily care and attention to detail.'),
      p('Bathrooms are modern and include a powerful shower, heated towel rails, luxury large bath sheets and complimentary toiletries. Rooms have tea and coffee facilities, Freeview TV, DVDs on request and free WiFi.'),
      p('Please note the hotel is a self check-in hotel. If you have any issues please contact the hotel on 01289 307852.'),
    ),
    facilities: ['wifi', 'self-checkin', 'breakfast', 'bikes', 'walking', 'family', 'tea-coffee', 'tv'],
    address: { line1: 'Queens Head', line2: '6 Sandgate', town: 'Berwick-upon-Tweed', county: 'Northumberland', postcode: 'TD15 1EP' },
    phone: '01289 307852',
    email: 'queenshead@grhotels.co.uk',
    map: { lat: 55.7676, lng: -2.0037, directionsUrl: gmaps('6 Sandgate, Berwick-upon-Tweed, Northumberland, TD15 1EP') },
    bookingUrl: 'https://direct-book.com/properties/queensheadberwickhoteldirect',
    hasWeddings: false,
    priceRange: '££',
    order: 30,
    hero: { file: 'Pictorial-Photography-commercial-rooms-property-hotel-interior-exterior-4.jpg', alt: 'The Queens Head Hotel on Sandgate, Berwick-upon-Tweed, a cream-painted terrace with hanging baskets' },
    gallery: [
      { file: 'IMG_20220716_134657.jpg', alt: 'The superior double room with a wooden headboard and tall window' },
      { file: 'DADFF227-B789-4015-9E0A-3DAA382BA9D8.jpg', alt: 'A double bedroom with a red throw and deep pink feature wall' },
      { file: 'AD048D34-4851-4741-8682-8D73F27541FC.jpg', alt: 'A double bedroom with a green feature wall and lime throw' },
      { file: 'FFDE7D32-39B9-486F-A056-221876020B54.jpg', alt: 'A twin room with navy throws and a tartan curtain' },
      { file: '5CBF53D6-5275-47C4-81C0-B8D7BDAEC387.jpg', alt: 'The family room with a double bed and a single bed' },
      { file: 'B27562AD-D03A-4E2F-A621-0F4BF8D2104D.jpg', alt: 'A modern shower room with glass screen and fresh towels' },
    ],
    rooms: [
      { name: 'Double Room', slug: 'double-room-def', sleeps: 2, bedType: 'Double', shortDescription: 'Our cosy double bedroom with bright en-suite shower-room, overlooking the period buildings of Berwick.', description: rich(p('Our cosy double bedroom with bright en-suite shower-room, overlooking the stunning period buildings of Berwick. Perfect for a one night stay or for single occupancy. Non smoking.')), features: ['en-suite', 'tea-coffee', 'wifi', 'smart-tv'], images: [{ file: 'FC536D73-A26F-4FD1-983E-C0A4564AD271.jpg', alt: 'The double room at the Queens Head with a green feature wall' }], order: 10 },
      { name: 'Superior Double Room', slug: 'superior-double-room', sleeps: 2, bedType: 'Double', shortDescription: 'Spacious and comfortable. Perfect for a couple to base themselves during their stay.', description: rich(p('Our superior double is spacious and comfortable. Perfect for a couple to base themselves during their stay. Non smoking.')), features: ['en-suite', 'tea-coffee', 'wifi', 'smart-tv'], images: [{ file: 'IMG_20220716_134657.jpg', alt: 'The superior double room with a wooden headboard and tall window' }], order: 20 },
      { name: 'Twin Room', slug: 'twin-room', sleeps: 2, bedType: 'Two singles', shortDescription: 'Our twin rooms are spacious and comfortable with ensuite bathrooms.', description: rich(p('Our twin rooms are spacious and comfortable with ensuite bathrooms. Non smoking.')), features: ['en-suite', 'twin-option', 'tea-coffee', 'wifi', 'smart-tv'], images: [{ file: 'FFDE7D32-39B9-486F-A056-221876020B54.jpg', alt: 'A twin room at the Queens Head with navy throws' }], order: 30 },
      { name: 'Family Room', slug: 'family-room', sleeps: 3, bedType: 'Double plus single', shortDescription: 'Generously spacious with plenty of storage, overlooking Berwick’s beautiful architecture.', description: rich(p('This generously spacious family bedroom has plenty of storage space and overlooks Berwick’s beautiful architecture. Features a double and single bed. There is also space for a cot or an extra single bed. Non smoking.')), features: ['en-suite', 'tea-coffee', 'wifi', 'smart-tv'], images: [{ file: '5CBF53D6-5275-47C4-81C0-B8D7BDAEC387.jpg', alt: 'The family room at the Queens Head with a double and a single bed' }], order: 40 },
    ],
    testimonials: [
      { quote: 'Hotel is spotless. Staff very welcoming and nothing is any trouble to them. Breakfast freshly cooked to order. Early dinner menu excellent value for money. Would definitely come back.', name: 'Margaret Kerr', source: 'google' },
      { quote: 'We popped in for an after-dinner coffee and peppermint tea. The waitress was very cheerful, friendly and efficient. The bar area looked as though it had recently been refurbished and was very attractive with a lovely atmosphere.', name: 'Dani Drought', source: 'google' },
    ],
    faqs: [
      { q: 'How does self check-in work?', a: 'We send you a code before you arrive. Use it at the front door and your room door. If you have any issues, call 01289 307852.' },
      { q: 'Is breakfast included?', a: 'Yes. A luxury breakfast hamper is provided for your room.' },
      { q: 'Can I store a bike?', a: 'Yes, there is a safe and secure outdoor bike storage area at the hotel.' },
    ],
  },

  /* ── The Castle, Berwick ───────────────────────────────────────────────── */
  {
    name: 'The Castle',
    slug: 'castle-berwick',
    location: 'Berwick-upon-Tweed, Northumberland',
    tagline: 'Modern rooms, stone-baked pizza and a function room in England’s most northerly town',
    intro: paragraphs(
      'Berwick upon Tweed is England’s most northerly town, sitting midway between Edinburgh and Newcastle at the mouth of the River Tweed. This spectacular Elizabethan walled town with its thrilling military history guards the river estuary and, with its stunning seascapes and golden beaches, provides the perfect mix for a rewarding visit.',
    ),
    story: rich(
      h2('Easy to reach, easy to love'),
      p('The hotel is one hour by road and 40 minutes by rail from either Edinburgh or Newcastle-upon-Tyne, so it’s very easy to get to for tourists and business people alike. Call The Castle Hotel on 01289 307900 to reserve a room, or for more information about hosting your function.'),
      h3('The Castle Lounge'),
      p('The Castle Lounge Bar has long been a popular bar for both locals and visitors alike. Be it lunch with friends, a casual dinner, a private party or business function, or whether you’re visiting for a quiet drink, The Castle Hotel has something for everyone. There’s always a warm, comfortable welcome.'),
      h3('Bar and restaurant'),
      p('The Castle is proud to serve freshly made stone baked pizza, prepared in the traditional Italian way, available in our bar, restaurant, for takeaway or for room service. We also offer a wide range of soft drinks, from fruit juices to tea and coffee. Children and dogs are welcome.'),
    ),
    facilities: ['wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'meetings', 'family', 'dog-friendly', 'tv', 'tea-coffee'],
    address: { line1: 'The Castle Hotel', line2: '103 Castlegate', town: 'Berwick-upon-Tweed', county: 'Northumberland', postcode: 'TD15 1LF' },
    phone: '01289 307900',
    email: 'castlehotel@grhotels.co.uk',
    map: { lat: 55.7728, lng: -2.0086, directionsUrl: gmaps('The Castle Hotel, 103 Castlegate, Berwick-upon-Tweed TD15 1LF') },
    bookingUrl: 'https://direct-book.com/properties/castlehotel103%20direct',
    hasWeddings: true,
    weddingsIntro: rich(
      p('Our function room is available for up to 50 people for dining or 100 people for discos and other events. Ideal for small weddings, christenings, wakes, birthday parties and more.'),
      p('Please call to enquire about food and drink packages, or arrange for your caterer to use our fully equipped kitchen. A conference room is also available.'),
    ),
    priceRange: '££',
    order: 40,
    hero: { file: 'b683c8208ad51ebf51cf8770119cb54c.jpg', alt: 'The Castle Hotel on Castlegate, Berwick-upon-Tweed, a stone corner building with a turret under a blue sky' },
    gallery: [
      { file: '227cf56da6fbd74869caa216d31476f6.jpg', alt: 'The Castle Lounge bar with mint-green chairs and round tables' },
      { file: '06386f2c7bd07fd7ac9a533ebe5086b9.jpg', alt: 'The restaurant at The Castle with a polished wooden floor' },
      { file: '7684cf76293c69cb4ac269075e5b8c2f.jpg', alt: 'A dining table with rattan chairs beneath pendant lights' },
      { file: '4062ba4d9a5bb103c6d1a6b850df1e76.jpg', alt: 'A bright double room with a plywood headboard and bay window' },
      { file: 'd62a48931fb5f5006c083c74f7866df4-1.jpg', alt: 'A refurbished double room with a wall-mounted TV' },
      { file: 'b1e0911f36ba300757605626fbb221b6.jpg', alt: 'A modern shower room with a pink glass shower enclosure' },
    ],
    rooms: [
      { name: 'Deluxe Family Room', slug: 'cozy-double-room', sleeps: 4, shortDescription: 'Refurbished in 2021 with an ensuite bathroom and high-powered shower.', description: rich(p('Refurbished throughout in 2021, our rooms are decorated and furnished to a very high standard. With an ensuite bathroom and high-powered shower, you will have a very comfortable and enjoyable stay in our modern rooms.'), ul(['En-suite bathroom', 'In room tea and coffee', 'Mineral water', 'Free Wi-Fi', 'Complimentary toiletries', 'Hair dryer', 'Iron and ironing board'])), features: ['en-suite', 'walk-in-shower', 'tea-coffee', 'wifi'], images: [{ file: 'd62a48931fb5f5006c083c74f7866df4-1.jpg', alt: 'The deluxe family room at The Castle' }], order: 10 },
      { name: 'Family Room', slug: 'family-room', sleeps: 4, shortDescription: 'A modern family room with ensuite bathroom and high-powered shower.', description: rich(p('With an ensuite bathroom and high-powered shower, you will have a very comfortable and enjoyable stay in our modern rooms.'), ul(['En-suite bathroom', 'In room tea and coffee', 'Mineral water', 'Free Wi-Fi', 'Complimentary toiletries', 'Hair dryer', 'Iron and ironing board'])), features: ['en-suite', 'walk-in-shower', 'tea-coffee', 'wifi'], images: [{ file: '85561a5804b7540847f7590efe44a65d.jpg', alt: 'The family room at The Castle with a double and single bed' }], order: 20 },
      { name: 'Single Room', slug: 'single-room-2', sleeps: 1, bedType: 'Single', shortDescription: 'A neat single room with ensuite shower, ideal for business stays.', description: rich(p('With an ensuite bathroom and high-powered shower, you will have a very comfortable and enjoyable stay in our modern rooms.'), ul(['En-suite bathroom', 'In room tea and coffee', 'Mineral water', 'Free Wi-Fi', 'Complimentary toiletries', 'Hair dryer', 'Iron and ironing board'])), features: ['en-suite', 'walk-in-shower', 'tea-coffee', 'wifi'], images: [{ file: '4b3ab6b34268892729c25d5763690031.jpg', alt: 'The single room at The Castle' }], order: 30 },
      { name: 'Superior Family Room', slug: 'superior-family-room', sleeps: 4, shortDescription: 'Our largest family room, refurbished in 2021.', description: rich(p('With an ensuite bathroom and high-powered shower, you will have a very comfortable and enjoyable stay in our modern rooms.'), ul(['En-suite bathroom', 'In room tea and coffee', 'Mineral water', 'Free Wi-Fi', 'Complimentary toiletries', 'Hair dryer', 'Iron and ironing board'])), features: ['en-suite', 'walk-in-shower', 'tea-coffee', 'wifi'], images: [{ file: 'e716b7a03816bcb99ad612457b6918a6.jpg', alt: 'The superior family room at The Castle with a double bed and single beds' }], order: 40 },
      { name: 'Studio Flat', slug: 'studio-flat', sleeps: 2, shortDescription: 'A self-contained studio in the eaves with its own bathroom.', description: rich(p('With an ensuite bathroom and high-powered shower, you will have a very comfortable and enjoyable stay in our modern rooms.'), ul(['En-suite bathroom', 'In room tea and coffee', 'Mineral water', 'Free Wi-Fi', 'Complimentary toiletries', 'Hair dryer', 'Iron and ironing board'])), features: ['en-suite', 'tea-coffee', 'wifi', 'seating-area'], images: [
        { file: 'cd1f164eb1117edba26c9c74daa06c42.jpg', alt: 'The studio flat at The Castle, a bedroom in the eaves with twin beds' },
        { file: 'eb70c91a516ca7fc3d57f3690f772176.jpg', alt: 'The studio flat bathroom with red tiled walls' },
        { file: '9befb108c102c76eb7b18c7d3a1eacd3.jpg', alt: 'Sloping ceilings and a skylight in the studio flat' },
        { file: '82b67c3ea6b18baac6c7c069eb4432d7.jpg', alt: 'The studio flat bedroom with a full-length mirror' },
        { file: '32de639ddd541bd38c4b38e5b6be87e3.jpg', alt: 'The studio flat bathroom with a bath' },
      ], order: 50 },
    ],
    testimonials: [
      { quote: 'On arrival Lesley and Catherine were so nice. The room was absolutely beautiful, stunning food was first class, did not want to leave. Was so relaxing, just what I needed.', name: 'John M', source: 'google' },
      { quote: 'Absolutely fabulous place to stay. Handy for everything. Dining room is beautifully decorated and is used as breakfast room and evening restaurant. Staff can’t do enough for you. It’s definitely a hotel I would recommend to my friends.', name: 'Shirley M', source: 'google' },
    ],
    faqs: [
      { q: 'Can you host a private party?', a: 'Yes. The function room takes up to 50 seated or 100 standing. Call 01289 307900 about food and drink packages.' },
      { q: 'How do I get there by train?', a: 'Berwick station is on the East Coast Main Line, about 40 minutes from Edinburgh or Newcastle, and a short walk from the hotel.' },
    ],
  },

  /* ── Grassington Lodge ─────────────────────────────────────────────────── */
  {
    name: 'Grassington Lodge',
    slug: 'grassington-lodge',
    location: 'Grassington, Yorkshire Dales',
    tagline: 'Comfortable room-only accommodation in the heart of Wharfedale',
    intro: paragraphs(
      'Grassington Lodge offers facilities and services to help make your stay more enjoyable and comfortable. All our rooms have TVs, large fluffy towels and toiletries as standard, along with a well stocked hospitality tray. Wireless broadband is available throughout the property.',
    ),
    story: rich(
      h2('Room only, done well'),
      p('Some of our rooms are dog friendly, please enquire which ones will be suitable. We have safe storage for cycles and private parking.'),
      p('Grassington’s cobbled square, with its cafés, pubs and shops, is two minutes’ walk away, and the Dales Way passes close to the door.'),
      h3('Things to do nearby'),
      ul(['Walking on the Dales Way and across Wharfedale', 'Cycling, climbing and horse riding at Kilnsey', 'Golf at Skipton and the leisure club at Long Ashes', 'Fishing with Kilnsey Angling Club', 'Bolton Abbey, Fountains Abbey and Skipton Castle', 'Brimham Rocks, Malham Cove and Stump Cross Caverns', 'The Embsay and Bolton Abbey steam railway']),
    ),
    facilities: ['wifi', 'parking', 'dog-friendly', 'bikes', 'walking', 'tea-coffee', 'tv', 'family'],
    address: { line1: 'Grassington Lodge', line2: '8 Wood Lane', town: 'Grassington, Skipton', county: 'North Yorkshire', postcode: 'BD23 5LU' },
    phone: '01756 752518',
    email: 'grassingtonlodge@grhotels.co.uk',
    map: { lat: 54.0717, lng: -1.999, directionsUrl: gmaps('8 Wood Lane, Grassington, North Yorkshire, BD23 5LU') },
    bookingUrl: 'https://direct-book.com/properties/grassingtonlodgedirect',
    hasWeddings: false,
    priceRange: '££',
    order: 50,
    hero: { file: 'IMG-20220714-WA0023-1.jpg', alt: 'Grassington Lodge, a stone Dales house with flower boxes behind iron railings' },
    gallery: [
      { file: 'Screenshot-2022-05-10-at-10-06-10.jpg', alt: 'The garden terrace at Grassington Lodge with a bench and parasol' },
      { file: 'GL-Suite-6.jpg', alt: 'The mezzanine sitting room of The Suite with leather sofa and skylight' },
      { file: 'GL_Room-9.jpg', alt: 'Room Nine, a ground-floor double with oak flooring and striped wallpaper' },
      { file: 'GL_Vendale-1.jpg', alt: 'Vendale 1, a spacious room with sitting area and orange striped bedding' },
      { file: 'GL_Room-7-1.jpg', alt: 'Room Seven under the eaves with a blue floral print above the bed' },
      { file: 'Image-2.jpg', alt: 'A double room with grey walls, a framed landscape and spotted cushions' },
      { file: 'hayden-scott-lyTgIeUBOUE-unsplash-scaled.jpg', alt: 'An open fire in a stone fireplace' },
      { file: 'yevhenii-dubrovskyi-4hfPfuYB14k-unsplash-scaled.jpg', alt: 'Walkers on a woodland path' },
    ],
    rooms: [
      { name: 'The Suite', slug: 'the-suite', sleeps: 2, bedType: 'King-size sleigh bed', shortDescription: 'A luxurious suite on two levels with a mezzanine sitting room and a large bathroom with bath and shower.', description: rich(p('A very luxurious and well appointed suite of rooms on two levels with oak flooring in the bedroom and luxurious carpet in the sitting room.'), p('Bedroom: first floor. King size sleigh bed with flat screen digital TV. Stylish and comfortable chairs.'), p('Sitting room: a mezzanine room with Velux windows giving a light and airy feeling. Features a leather sofa, chair and dressing table, another flat screen digital TV and a drinks chiller.'), p('Bathroom: a large luxurious room with a very large shower and separate bath. Please note the bathroom is on the same level as the sitting room, so there are stairs between the bedroom and the bathroom.')), features: ['en-suite', 'bath', 'king-bed', 'seating-area', 'smart-tv', 'wifi'], images: [{ file: 'GL-Suite-6.jpg', alt: 'The mezzanine sitting room of The Suite at Grassington Lodge' }], order: 10 },
      { name: 'Vendale 1', slug: 'vendale-1', sleeps: 2, bedType: '6ft super-king (or twin)', shortDescription: 'In a separate building 20 yards from the main house: spacious, light and airy, with a bath and separate shower.', description: rich(p('The Vendale rooms are located in a separate building about 20 yards from the main house and are spacious, light and airy.'), p('Spacious with a 6ft super-king size bed (which can be split into twin beds upon request), sitting area, large TV and DVD player. The bathroom has a bath and separate shower. The room has a fridge in which fresh milk and complimentary mineral water are provided each day.'), p('This is a lovely room in which Daniel Radcliffe stayed (it is far from a cupboard under the stairs) when he and the cast and crew stayed with us in November 2010 whilst filming The Woman in Black.')), features: ['en-suite', 'bath', 'super-king-bed', 'twin-option', 'seating-area', 'ground-floor', 'dog-friendly', 'smart-tv', 'wifi'], images: [{ file: 'GL_Vendale-1.jpg', alt: 'Vendale 1 at Grassington Lodge with a sitting area and TV' }], order: 20 },
      { name: 'Vendale 2', slug: 'vendale-2', sleeps: 2, bedType: '6ft super-king (or twin)', shortDescription: 'The second Vendale room: spacious, light and airy, with a large shower room.', description: rich(p('The Vendale rooms are located in a separate building about 20 yards from the main house and are spacious, light and airy.'), p('Spacious with a 6ft super-king size bed, flat screen TV and DVD player. Spacious shower room (no bath). The room has a fridge in which fresh milk and complimentary mineral water are provided each day.'), p('Can be made up as a twin bedded room on request.')), features: ['en-suite', 'walk-in-shower', 'super-king-bed', 'twin-option', 'ground-floor', 'dog-friendly', 'smart-tv', 'wifi'], images: [{ file: 'GL_Vendale-2.jpg', alt: 'Vendale 2 at Grassington Lodge with orange striped bedding' }], order: 30 },
      { name: 'Room One (Premium)', slug: 'room-one-premium-room', sleeps: 2, bedType: '6ft king-size (or twin)', shortDescription: 'A large first-floor double with a 6ft king-size bed and ensuite shower room.', description: rich(p('Located on the first floor, Room 1 is a large double room with a 6ft king size bed and ensuite shower room (no bath). Features a large flat screen digital TV and fridge. Can also be made up as a twin room upon request.')), features: ['en-suite', 'walk-in-shower', 'king-bed', 'twin-option', 'smart-tv', 'wifi'], images: [{ file: 'GL_Room-1-2.jpg', alt: 'Room One at Grassington Lodge with a red throw and pink artwork' }], order: 40 },
      { name: 'Room Two', slug: 'room-two', sleeps: 2, bedType: '4ft 6in double', shortDescription: 'One of our smaller doubles on the first floor, with ensuite shower room.', description: rich(p('Located on the first floor overlooking the car park, Room 2 is one of our smaller double rooms (standard 4ft 6in bed) with ensuite shower room.')), features: ['en-suite', 'walk-in-shower', 'tea-coffee', 'wifi'], images: [{ file: 'GL_Room-2.jpg', alt: 'Room Two at Grassington Lodge with pink bedding and a window seat' }], order: 50 },
      { name: 'Room Three', slug: 'room-three', sleeps: 2, bedType: '5ft king-size', shortDescription: 'First floor, with views to the hills at the front of the house.', description: rich(p('Located on the first floor with views to the hills at the front of the house, Room 3 is a double room with a 5ft king size bed and en-suite shower.')), features: ['en-suite', 'walk-in-shower', 'king-bed', 'view', 'wifi'], images: [{ file: 'GL_Room-3.jpg', alt: 'Room Three at Grassington Lodge with a tall red headboard' }], order: 60 },
      { name: 'Room Four', slug: 'room-four', sleeps: 2, bedType: '5ft king-size', shortDescription: 'First floor with views across the hills at the front of the house.', description: rich(p('Located on the first floor with views across the hills at the front of the house, Room 4 is a double room with a 5ft king size bed and ensuite shower.')), features: ['en-suite', 'walk-in-shower', 'king-bed', 'view', 'wifi'], images: [{ file: 'Room_4.jpg', alt: 'Room Four at Grassington Lodge with pine furniture and a red wall' }], order: 70 },
      { name: 'Room Five', slug: 'room-five', sleeps: 2, bedType: '4ft 6in double', shortDescription: 'One of our smaller doubles, at the side of the house, with ensuite shower.', description: rich(p('Located on the first floor at the side of the house, overlooking a neighbour’s garden, Room 5 is one of our smaller double rooms (standard 4ft 6in bed) with ensuite shower.')), features: ['en-suite', 'walk-in-shower', 'wifi'], images: [{ file: 'GL_Room-5.jpg', alt: 'Room Five at Grassington Lodge with a red buttoned headboard' }], order: 80 },
      { name: 'Room Six', slug: 'room-six', sleeps: 2, bedType: '5ft king-size', shortDescription: 'First floor, overlooking a garden, with a private bathroom just outside the bedroom.', description: rich(p('Located on the first floor overlooking a garden, Room 6 is a double room with a 5ft king size bed. Please note the private bathroom is outside of the bedroom (not en-suite); it is not shared with other rooms.'), p('The bathroom features a full size bath with shower over. Bathrobes are provided.')), features: ['bath', 'king-bed', 'view', 'wifi'], images: [{ file: 'GL_Room-6-2-1.jpg', alt: 'Room Six at Grassington Lodge with a sage headboard' }], order: 90 },
      { name: 'Room Seven (Premium)', slug: 'room-seven-premium-room', sleeps: 2, bedType: '6ft king-size (or twin)', shortDescription: 'Second floor, with hills to the front and Grassington rooftops behind. Bath only.', description: rich(p('Located on the second floor, overlooking the hills to the front and the rooftops of Grassington at the back, Room 7 is a double room with a 6ft king size bed. The ensuite has a bath only; it does not have a stand-up shower.'), p('Can also be made up as a twin-bedded room upon request. Bathrobes are provided.')), features: ['en-suite', 'bath', 'king-bed', 'twin-option', 'view', 'wifi'], images: [{ file: 'GL_Room-7-1.jpg', alt: 'Room Seven at Grassington Lodge under the eaves' }], order: 100 },
      { name: 'Room Eight (Premium)', slug: 'room-eight-premium-room', sleeps: 2, bedType: '6ft super-king (or twin)', shortDescription: 'Spacious second-floor double with sofa, two chairs and views over the village rooftops.', description: rich(p('Located on the second floor at the front of the house, Room 8 is a spacious double room with 6ft super-king size bed, sofa, two comfortable chairs and ensuite shower (no bath). Views over the village rooftops and the dales to the west.'), p('As well as the standard facilities this room also includes a large flat screen digital TV and a fridge. Can be made as a twin upon request.')), features: ['en-suite', 'walk-in-shower', 'super-king-bed', 'twin-option', 'seating-area', 'view', 'smart-tv', 'wifi'], images: [{ file: 'GL_Room-8-1-1.jpg', alt: 'Room Eight at Grassington Lodge with a red headboard and sloping ceiling' }], order: 110 },
      { name: 'Room Nine (Premium)', slug: 'room-nine-premium-room', sleeps: 2, bedType: '5ft king-size', shortDescription: 'A contemporary ground-floor double with oak flooring.', description: rich(p('With contemporary styling, this ground floor double room features a 5ft king size bed and oak flooring. Sleeps 2.'), p('Ensuite shower room (a good size shower cubicle, though the room itself is not large), flat screen digital TV and a fridge complete this stylish and popular room.')), features: ['en-suite', 'walk-in-shower', 'king-bed', 'ground-floor', 'smart-tv', 'wifi'], images: [{ file: 'GL_Room-9.jpg', alt: 'Room Nine at Grassington Lodge with striped wallpaper and oak floor' }], order: 120 },
      { name: 'Family Room', slug: 'family-room', sleeps: 4, shortDescription: 'Space for the family, with a double and single beds.', description: rich(p('Our family room sleeps up to four, with a double bed and single beds, ensuite shower room, TV and a hospitality tray.')), features: ['en-suite', 'wifi', 'smart-tv'], images: [{ file: 'Image.jpg', alt: 'The family room at Grassington Lodge with grey walls and a single bed' }, { file: 'Image-3.jpg', alt: 'A single bed in the family room at Grassington Lodge' }], order: 130 },
    ],
    testimonials: [
      { quote: 'Phil and I really enjoyed our stay… thank you!', name: 'Phil Spencer and Kirstie Allsopp, Channel 4’s Location, Location, Location', source: 'guestbook' },
      { quote: 'Probably the best B&B we’ve ever stayed in. Love the attention to detail.', name: 'W and L Mayer', source: 'guestbook' },
    ],
    faqs: [
      { q: 'Is breakfast available?', a: 'Rooms are room-only, with a well stocked hospitality tray. Grassington’s cafés are two minutes’ walk away.' },
      { q: 'Which rooms are dog friendly?', a: 'Some rooms are dog friendly, including the Vendale rooms in the garden building. Please ask when booking.' },
      { q: 'Is there parking and bike storage?', a: 'Yes, private parking and safe storage for cycles.' },
    ],
  },

  /* ── The Vines, Black Bourton ──────────────────────────────────────────── */
  {
    name: 'The Vines',
    slug: 'thevines',
    location: 'Black Bourton, Oxfordshire',
    tagline: 'Restaurant, bar and rooms in the Oxfordshire Cotswolds',
    intro: paragraphs(
      'Great care has been taken to design and furnish the spacious rooms at The Vines to allow guests every modern convenience and comfort. Most rooms have king size beds and we also have twin and family rooms, all with en suite shower rooms.',
    ),
    story: rich(
      h2('Maintaining the highest of standards'),
      p('All rooms have en suite shower rooms and the new wing features superb wet rooms with powerful shower, basin, WC and toiletries. Flat screen televisions, refrigerators, desks, internet access and direct dial telephones make a stay at The Vines a time of pleasure.'),
      h3('Whatever the occasion'),
      p('Let us look after you and your guests and help organise the day for you. Contact The Vines and we can create a menu to suit your style and budget.'),
      h3('Explore the Oxfordshire Cotswolds'),
      p('Explore the countryside, Cotswold villages, Blenheim Palace and the Thames Path. Deemed an Area of Outstanding Natural Beauty, the Oxfordshire Cotswolds are picture book England, a quintessential cluster of time defying, honey stone villages and towns.'),
      p('Many yearly events take place in the vicinity such as the Charlbury Music Festival as well as arts weeks and antique sales in Burford. We are also close to the City of Oxford with its elegant buildings, fantastic shopping, covered market and open top bus tour.'),
      p('The Thames Path follows the greatest river in England for 184 miles from its source in the Cotswolds almost to the sea. The Vines is an ideal location for those embarking on all or some of the many miles of wonderful waterway.'),
    ),
    facilities: ['wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'meetings', 'weddings', 'family', 'accessible', 'tv'],
    address: { line1: 'The Vines', line2: 'Burford Road', town: 'Black Bourton, Bampton', county: 'Oxfordshire', postcode: 'OX18 2PF' },
    phone: '01993 843559',
    email: 'vineshotel@grhotels.co.uk',
    map: { lat: 51.7362, lng: -1.5861, directionsUrl: gmaps('The Vines, Burford Road, Black Bourton OX18 2PF') },
    bookingUrl: 'https://direct-book.com/properties/thevinesdirect',
    hasWeddings: true,
    weddingsIntro: rich(
      h2('Idyllic Cotswold location'),
      p('The Vines not only offers an idyllic Cotswold setting but the hotel is situated next to the charming St Mary’s Church of Black Bourton, a beautiful location for your wedding ceremony. The church can accommodate up to 150 guests and you have the opportunity to hire their professional organist and fantastic team of bell ringers.'),
      p('The Vines is also a 5-minute drive from St Mary’s Church of Bampton, which features in the popular TV series Downton Abbey and can accommodate a congregation of up to 250 guests.'),
      h3('Reception, wedding breakfast and The Meadow'),
      p('Our restaurant and function room host the wedding breakfast, with The Meadow available for outdoor ceremonies and drinks. Rooms and the Annex House are available for you and your guests. Packages and a wedding directory of local suppliers are shown below; contact us to arrange a viewing.'),
    ),
    priceRange: '££',
    order: 60,
    hero: { file: 'Screenshot-2022-08-04-at-23-20-03.jpg', alt: 'The Vines at Black Bourton, a stone Cotswold house seen through the trees' },
    gallery: [
      { file: 'Screenshot-2022-08-04-at-23-17-37.jpg', alt: 'The bar lounge at The Vines with leather Chesterfield sofas' },
      { file: 'Screenshot-2022-08-04-at-22-59-30.jpg', alt: 'The restaurant at The Vines laid for a long celebration dinner' },
      { file: 'Screenshot-2022-08-04-at-23-08-27.jpg', alt: 'The function room at The Vines with dark panelling and round tables' },
      { file: 'Screenshot-2022-08-04-at-23-15-23.jpg', alt: 'A double bedroom at The Vines with a burgundy throw' },
      { file: 'Screenshot-2022-08-04-at-23-03-07.jpg', alt: 'St Mary’s Church, Black Bourton, next door to The Vines' },
      { file: 'Screenshot-2022-08-04-at-23-13-25.jpg', alt: 'Rows of chairs set out on The Meadow for an outdoor ceremony' },
      { file: 'Screenshot-2022-08-04-at-23-10-11.jpg', alt: 'Champagne flutes and an ice bucket under red parasols' },
      { file: 'accomm-grp-1.jpg', alt: 'The new wing of bedrooms at The Vines' },
    ],
    rooms: [
      { name: 'Double Room', slug: 'double-room', sleeps: 2, bedType: 'King-size', shortDescription: 'Spacious doubles with en suite shower rooms, flat screen TV, fridge and desk.', description: rich(p('All rooms have en suite shower rooms and the new wing features superb wet rooms with powerful shower, basin, WC and toiletries. Flat screen televisions, refrigerators, shaver sockets, desks, internet access and direct dial telephones make a stay at The Vines a time of pleasure.')), features: ['en-suite', 'walk-in-shower', 'king-bed', 'tea-coffee', 'smart-tv', 'wifi'], images: [{ file: 'vines_21845.jpg', alt: 'A double room at The Vines with cream furniture' }], order: 10 },
      { name: 'Twin Room', slug: 'twin-room', sleeps: 2, bedType: 'Two singles', shortDescription: 'Twin rooms with en suite bathroom, desk and flat screen TV.', description: rich(p('All rooms have en suite shower rooms. Twin rooms include two single beds, desk, flat screen TV, hairdryer, iron and ironing board, tea and coffee making and internet access.')), features: ['en-suite', 'twin-option', 'tea-coffee', 'smart-tv', 'wifi'], images: [{ file: 'vines_21896.jpg', alt: 'Entrance to a twin room at The Vines' }], order: 20 },
      { name: 'Family Room', slug: 'family-room', sleeps: 3, bedType: 'Double plus single', shortDescription: 'A double and a single bed, en suite bathroom, with cots available.', description: rich(p('Family rooms have a double bed and a single bed, en suite bathroom, hairdryer, tea and coffee making, internet access and WiFi. Cots are available on request.')), features: ['en-suite', 'tea-coffee', 'smart-tv', 'wifi'], images: [{ file: 'vines_21867.jpg', alt: 'The family room at The Vines with doors to the garden' }], order: 30 },
      { name: 'Interconnecting Family Room', slug: 'interconnecting-family-room', sleeps: 5, bedType: 'King plus three singles', shortDescription: 'Two interconnecting rooms with a king bed and three singles, garden view and wheelchair accessible doors.', description: rich(p('Interconnecting rooms with a king bed and three single beds, en suite bathroom, fridge, desk, iron and ironing board, tea and coffee making, internet access, garden view and wheelchair accessible doors.')), features: ['en-suite', 'king-bed', 'accessible', 'ground-floor', 'view', 'tea-coffee', 'smart-tv', 'wifi'], images: [{ file: 'accomm-grp-1.jpg', alt: 'The new wing at The Vines where the interconnecting rooms are' }], order: 40 },
    ],
    testimonials: [
      { quote: 'Just a quick note to say how much we enjoyed our four days at The Vines. It was very relaxing and the food was excellent. We are looking forward to staying there again in the future.', name: 'Mr Cuddy', source: 'email' },
      { quote: 'We all had such an enjoyable weekend with you for my parents’ Diamond Wedding Anniversary and I wanted to pass on some of the complimentary comments we have received about the food (delicious!), the atmosphere (warm, relaxed yet efficient), the location (interesting and unusual) and you and your staff (amazing!).', name: 'Mrs Walton', source: 'email' },
    ],
    faqs: [
      { q: 'Do you have accessible rooms?', a: 'Yes. Our interconnecting family room has wheelchair accessible doors and ground-floor access.' },
      { q: 'Can we hold our wedding at The Vines?', a: 'Yes. See our Weddings and functions page for packages, or call 01993 843559 to arrange a viewing.' },
    ],
  },

  /* ── Caer Beris Manor ──────────────────────────────────────────────────── */
  {
    name: 'Caer Beris Manor',
    slug: 'caer-beris',
    location: 'Builth Wells, Powys',
    tagline: 'A haven of calm and character in the heart of the Welsh countryside',
    intro: paragraphs(
      'Tucked away in the heart of the Welsh countryside, Caer Beris Manor Hotel offers a tranquil escape where history, comfort, and nature come together. With self check-in available for your convenience, you can enjoy a flexible and seamless arrival at your own pace.',
    ),
    story: rich(
      h2('Welcome to Caer Beris Manor'),
      p('Caer Beris Manor Hotel features 21 individually styled bedrooms, each with its own en suite bathroom for your comfort and privacy. Whether you’re visiting solo, as a couple, or with family and friends, there’s a room to suit every guest. For a touch of luxury, our spacious Suite offers the ideal setting for a romantic getaway or special occasion.'),
      p('During your stay, unwind in our elegant communal lounge, the perfect place to relax with a book by the fire, enjoy a quiet drink, or challenge your companions to a board game. The atmosphere is calm and inviting, making it ideal for peaceful moments or socialising with fellow guests.'),
      p('Step outside and explore the expansive gardens that surround the hotel. With stunning views of the rolling countryside, the grounds offer plenty of spots to sit back and enjoy the scenery. Birdwatchers and nature lovers will appreciate the variety of wildlife attracted by the nearby river and woodland habitats.'),
      p('Located at the foot of the drive is access to the Wye Valley Walk, a picturesque trail ideal for walking or cycling without the need to take the car. The hotel is also accessible for wheelchair users, with ground floor bedrooms available.'),
      h3('Local attractions and suppliers'),
      ul(['Welsh Overland Safari', 'Builth Wells Golf Club', 'Pen y Fan and the Brecon Beacons', 'Dragonfly Cruises and Dayboats', 'The Royal Welsh Regimental Museum', 'Private dining and catering: Dine Indulge, Fresh Food Events, Bwyd Bethan Catering', 'Massage therapy: Lilly Kosek']),
    ),
    facilities: ['wifi', 'parking', 'garden', 'river', 'walking', 'bikes', 'fireplace', 'self-checkin', 'accessible', 'weddings', 'ev-charging'],
    address: { line1: 'Caer Beris Manor Hotel', town: 'Builth Wells', county: 'Powys', postcode: 'LD2 3NP' },
    phone: '01473 597897',
    email: 'enquiries@groupretreats.co.uk',
    map: { lat: 52.1479, lng: -3.4187, directionsUrl: gmaps('Caer Beris Manor Hotel, Builth Wells LD2 3NP') },
    bookingUrl: 'https://direct-book.com/properties/CaerBerisHotelDirect',
    hasWeddings: true,
    weddingsIntro: rich(p('A timbered manor in its own parkland beside the River Irfon, with 21 bedrooms for your guests, a lounge with an open fire and gardens for photographs. Contact us to talk about your celebration, private dining or group booking.')),
    priceRange: '££',
    order: 70,
    hero: { file: 'DSC00146-HDR.jpg', alt: 'Caer Beris Manor, a black-and-white timbered manor house at the end of its drive' },
    gallery: [
      { file: '191742948-scaled.jpg', alt: 'The terrace at Caer Beris Manor looking over the parkland' },
      { file: '191742758-scaled.jpg', alt: 'The oak-panelled lounge with leather Chesterfields and an oriental rug' },
      { file: '191742906-scaled.jpg', alt: 'The garden room with teal velvet sofas and views of the grounds' },
      { file: '191743216-scaled.jpg', alt: 'A four-poster bedroom with blue armchairs by leaded windows' },
      { file: '191743215-scaled.jpg', alt: 'A bedroom with a four-poster bed and window seat' },
      { file: '192638227.jpg', alt: 'A dark-panelled bedroom with a four-poster and tan leather armchairs' },
      { file: '192638223.jpg', alt: 'A sitting room with a navy velvet sofa by the fireplace' },
      { file: '191743227-scaled.jpg', alt: 'A bathroom with a roll-top bath and walk-in shower' },
    ],
    rooms: [],
    testimonials: [
      { quote: 'Exceptional manor and beautiful landscape in the heart of Wales. Plenty of rooms with all facilities, clean, tidy and well arranged. Beautiful and extended garden with a lovely stream, all the best of nature has to offer. We had a lovely time with friends and family.', name: 'Guest review', source: 'google' },
      { quote: 'Wow, what a wonderful place. Huge, in gorgeous grounds. Fantastic rooms, lots of outdoor seating, electric car charger. It has everything for a great stay.', name: 'PJ', source: 'google' },
    ],
    faqs: [
      { q: 'How does self check-in work?', a: 'You receive arrival instructions and an access code before your stay, so you can arrive at your own pace.' },
      { q: 'Is the hotel accessible?', a: 'Yes. Ground floor bedrooms are available and the hotel is accessible for wheelchair users.' },
      { q: 'Can we walk from the hotel?', a: 'The Wye Valley Walk starts at the foot of the drive, ideal for walking or cycling without the car.' },
    ],
  },

  /* ── The Riverside House Hotel ─────────────────────────────────────────── */
  {
    name: 'The Riverside House Hotel',
    slug: 'the-riverside-house-hotel',
    location: 'Mildenhall, Suffolk',
    tagline: 'A family-run Georgian hotel on the River Lark',
    intro: paragraphs(
      'The Riverside House Hotel is nestled on the edge of the River Lark on the outskirts of the town of Mildenhall, not far from Newmarket and Bury St Edmunds.',
    ),
    story: rich(
      h2('On the banks of the Lark'),
      p('Originally built in 1720, The Riverside House is now a family-run hotel with comfortable rooms, a restaurant and gardens that run down to the water.'),
      p('Newmarket, Bury St Edmunds, Ely and the Brecks are all within easy reach, and the garden is a lovely spot for afternoon tea or a drink on a summer evening.'),
    ),
    facilities: ['wifi', 'parking', 'restaurant', 'bar', 'breakfast', 'garden', 'river', 'family', 'weddings'],
    address: { line1: 'The Riverside House Hotel', line2: '17 Mill Street', town: 'Mildenhall, Bury St Edmunds', county: 'Suffolk', postcode: 'IP28 7DP' },
    phone: '01638 717274',
    map: { lat: 52.3418, lng: 0.509, directionsUrl: gmaps('The Riverside House Hotel, 17 Mill Street, Mildenhall IP28 7DP') },
    bookingUrl: 'https://booking.eu.guestline.app/GRRHRSIDE/availability?hotel=GRRHRSIDE',
    tableBookingUrl: 'https://booking.resdiary.com/widget/Standard/TheRiversideHouseHotel/33772',
    hasWeddings: true,
    weddingsIntro: rich(p('Riverside lawns for drinks, a Georgian house for the party and rooms for your guests. Call 01638 717274 to talk about your celebration.')),
    priceRange: '££',
    order: 80,
    hero: { file: 'b4fc7b_6eada3dae73c4a62957b88b305627e27mv2.jpg', alt: 'The Riverside House Hotel, a red-brick Georgian house with a conservatory, seen across the lawn' },
    gallery: [
      { file: '036fc9_61d0582e5dc14e8a92d2457ff4c8e292mv2.jpg', alt: 'A bedroom with an ornate white headboard and blue toile wallpaper' },
      { file: '036fc9_70fcfbe8a2254bf8afee09c0156bada3mv2.jpg', alt: 'A double bedroom with striped wallpaper and a wooden headboard' },
      { file: '036fc9_4eef53e1533d45b8acba2d5831d62cc3mv2.jpg', alt: 'A bedroom under the eaves with a double and a single bed' },
      { file: '036fc9_950e8f49c485492cb0400aa65c07ba11mv2.jpg', alt: 'A bathroom and bedroom with a red velvet headboard' },
      { file: '036fc9_24f8fb7b2efb4ee9b1ec7ab790688509mv2.jpg', alt: 'A roast dinner with a jug of gravy' },
      { file: '036fc9_8623a8217aec4eaaaff63e23d0581296mv2.jpg', alt: 'A chef plating a starter in the kitchen' },
      { file: 'b4fc7b_f7d30141f480498dbadb132ad96e0d28mv2.jpg', alt: 'Afternoon tea on a tiered stand with scones and cakes' },
    ],
    rooms: [],
    testimonials: [],
    faqs: [
      { q: 'Do you cater for race days?', a: 'Yes. Newmarket is about 20 minutes away and we are happy to arrange early breakfasts.' },
      { q: 'Can I book a table?', a: 'Yes, use the “Book a table” button to reserve online, or call 01638 717274.' },
    ],
  },
]

export const groupCopy = {
  tagline: 'Characterful hotels and inns across Britain',
  strapline: 'UK’s leading niche hotel group, with outstanding properties situated in some of the UK’s most idyllic settings.',
  newsletter: 'Subscribe to the GR Hotels newsletter to keep up to date with hotel news, seasonal offers and promotions, and exclusive offers.',
}
