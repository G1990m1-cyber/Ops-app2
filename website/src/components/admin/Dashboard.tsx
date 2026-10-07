import type { ServerProps } from 'payload'
import React from 'react'

import type { Hotel, User } from '@/payload-types'

import { SeedButton } from './SeedButton'

import './Dashboard.css'

/**
 * The first thing a manager sees after logging in:
 * three big actions, then the hotels they look after.
 */
export const Dashboard: React.FC<ServerProps> = async ({ user, payload }) => {
  const u = user as User | null
  if (!u) return null
  const isAdmin = u.role === 'admin'

  let hotels: Hotel[] = []
  try {
    const ids = Array.isArray(u.hotels)
      ? u.hotels.map((h) => (typeof h === 'object' && h ? h.id : h)).filter(Boolean)
      : []
    const res = await payload.find({
      collection: 'hotels',
      limit: 20,
      sort: 'order',
      depth: 0,
      overrideAccess: true,
      ...(isAdmin ? {} : { where: { id: { in: ids } } }),
    })
    hotels = res.docs
  } catch {
    hotels = []
  }

  const firstName = (u.name || '').split(' ')[0] || 'there'
  const hotelParam = !isAdmin && hotels.length === 1 ? `?hotel=${hotels[0].id}` : ''

  const actions = [
    {
      href: `/admin/collections/menus/create${hotelParam}`,
      title: 'Upload a menu',
      text: 'PDF or typed in. Set an end date and it drops off by itself.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h9l4 4v14H6z" />
          <path d="M14 3v5h5M9 13h6M9 17h6" />
        </svg>
      ),
    },
    {
      href: `/admin/collections/events/create${hotelParam}`,
      title: 'Add an event',
      text: 'Date, photo, a couple of lines. Past events hide automatically.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 10h18M8 3v4M16 3v4" />
        </svg>
      ),
    },
    {
      href: `/admin/collections/offers/create${hotelParam}`,
      title: 'Add an offer',
      text: 'Start and end dates, a photo and the deal in a sentence.',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 12l-8 8-9-9V4h7l10 8z" />
          <circle cx="8" cy="8" r="1.2" />
        </svg>
      ),
    },
  ]

  return (
    <section className="gr-dashboard">
      <header className="gr-dashboard__head">
        <h1 className="gr-dashboard__title">Hello {firstName}</h1>
        <p className="gr-dashboard__sub">
          {isAdmin
            ? 'You have full access. Hotel managers see only their own hotels and the three actions below.'
            : 'Pick an action. Each one is a short form: fill it in, press Publish, done.'}
        </p>
      </header>

      <div className="gr-dashboard__actions">
        {actions.map((a) => (
          <a className="gr-action" href={a.href} key={a.href}>
            <span className="gr-action__icon">{a.icon}</span>
            <span className="gr-action__title">{a.title}</span>
            <span className="gr-action__text">{a.text}</span>
          </a>
        ))}
      </div>

      {isAdmin && hotels.length === 0 && <SeedButton />}

      {hotels.length > 0 && (
        <div className="gr-dashboard__hotels">
          <h2 className="gr-dashboard__h2">{isAdmin ? 'Hotels' : hotels.length === 1 ? 'Your hotel' : 'Your hotels'}</h2>
          <ul className="gr-hotels">
            {hotels.map((h) => (
              <li className="gr-hotel" key={h.id}>
                <div>
                  <strong>{h.name}</strong>
                  <span className="gr-hotel__loc">{h.location}</span>
                </div>
                <div className="gr-hotel__links">
                  <a href={`/admin/collections/hotels/${h.id}`}>Edit page</a>
                  <a href={`/admin/collections/rooms?where[hotel][equals]=${h.id}`}>Rooms</a>
                  <a href={`/admin/collections/menus?where[hotel][equals]=${h.id}`}>Menus</a>
                  <a href={`/admin/collections/events?where[hotel][equals]=${h.id}`}>Events</a>
                  <a href={`/admin/collections/offers?where[hotel][equals]=${h.id}`}>Offers</a>
                  <a href={`/admin/collections/enquiries?where[hotel][equals]=${h.id}`}>Enquiries</a>
                  <a href={`/${h.slug}`} target="_blank" rel="noreferrer">
                    View live ↗
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
