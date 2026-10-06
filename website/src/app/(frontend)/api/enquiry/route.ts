import { NextResponse, type NextRequest } from 'next/server'

import { getPayloadClient } from '@/utilities/data'
import { verifyTurnstile } from '@/utilities/turnstile'

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] || c)

const rateLimit = new Map<string, { n: number; t: number }>()
const limited = (ip: string) => {
  const now = Date.now()
  const r = rateLimit.get(ip)
  if (!r || now - r.t > 10 * 60 * 1000) {
    rateLimit.set(ip, { n: 1, t: now })
    return false
  }
  r.n += 1
  return r.n > 8
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (limited(ip)) return NextResponse.json({ ok: false, message: 'Too many messages. Please try again later.' }, { status: 429 })

  let body: Record<string, string>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 })
  }

  // Honeypot filled in = bot. Pretend success so they stop.
  if (body.website) return NextResponse.json({ ok: true, message: 'Thank you.' })

  const name = (body.name || '').trim().slice(0, 120)
  const email = (body.email || '').trim().slice(0, 200)
  const message = (body.message || '').trim().slice(0, 5000)
  if (!name || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || message.length < 10) {
    return NextResponse.json({ ok: false, message: 'Please add your name, a valid email and a short message.' }, { status: 400 })
  }
  if (!(await verifyTurnstile(body.turnstileToken, ip))) {
    return NextResponse.json({ ok: false, message: 'Spam check failed. Please refresh and try again.' }, { status: 400 })
  }

  const payload = await getPayloadClient()
  const hotelId = body.hotel ? Number(body.hotel) || body.hotel : null
  let hotel: { id: number | string; name: string; email?: string | null } | null = null
  if (hotelId) {
    try {
      const h = await payload.findByID({ collection: 'hotels', id: hotelId, depth: 0, overrideAccess: true })
      hotel = { id: h.id, name: h.name, email: h.email }
    } catch {
      hotel = null
    }
  }

  const to = hotel?.email || process.env.ENQUIRY_FALLBACK_EMAIL || process.env.EMAIL_FROM_ADDRESS
  const subjectLabel = body.subject || 'other'
  const stay = [
    body.arrival && `Arriving: ${escapeHtml(body.arrival)}`,
    body.departure && `Leaving: ${escapeHtml(body.departure)}`,
    body.guests && `Guests: ${escapeHtml(body.guests)}`,
  ].filter(Boolean)

  let emailSent = false
  if (to) {
    try {
      await payload.sendEmail({
        to,
        replyTo: email,
        subject: `Website enquiry${hotel ? ` for ${hotel.name}` : ''}: ${name}`,
        html: `
          <div style="font-family:Georgia,serif;font-size:17px;color:#262626;line-height:1.5">
            <p><strong>${escapeHtml(name)}</strong> sent a message${hotel ? ` about <strong>${escapeHtml(hotel.name)}</strong>` : ''}.</p>
            <p>Email: <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a><br/>
            ${body.phone ? `Phone: ${escapeHtml(body.phone)}<br/>` : ''}
            About: ${escapeHtml(subjectLabel)}${stay.length ? `<br/>${stay.join('<br/>')}` : ''}</p>
            <p style="white-space:pre-wrap;border-left:3px solid #ddcab4;padding-left:12px">${escapeHtml(message)}</p>
            <p style="color:#6f6040;font-size:14px">Sent from ${escapeHtml(body.page || '/')} on the GR Hotels website. Reply to this email to answer the guest.</p>
          </div>`,
      })
      emailSent = true
    } catch (err) {
      payload.logger.error({ err }, 'Enquiry email failed')
    }
  }

  try {
    await payload.create({
      collection: 'enquiries',
      overrideAccess: true,
      data: {
        name,
        email,
        phone: body.phone?.slice(0, 40) || undefined,
        subject: ['stay', 'dining', 'event', 'wedding', 'other'].includes(subjectLabel) ? (subjectLabel as 'stay') : 'other',
        message,
        arrival: body.arrival || undefined,
        departure: body.departure || undefined,
        guests: body.guests ? Number(body.guests) : undefined,
        hotel: hotel ? (hotel.id as number) : undefined,
        sourcePath: body.page?.slice(0, 200),
        emailSent,
        status: 'new',
      },
    })
  } catch (err) {
    payload.logger.error({ err }, 'Enquiry save failed')
    if (!emailSent) return NextResponse.json({ ok: false, message: 'We could not send your message. Please call us instead.' }, { status: 500 })
  }

  return NextResponse.json({
    ok: true,
    message: hotel ? `Thank you. ${hotel.name} has your message and will reply soon.` : 'Thank you. We have your message and will reply soon.',
  })
}
