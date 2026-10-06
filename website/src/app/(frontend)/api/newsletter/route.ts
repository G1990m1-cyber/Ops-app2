import { NextResponse, type NextRequest } from 'next/server'

/** Posts a sign-up to HubSpot Forms. Without HubSpot IDs configured it logs and succeeds (dev). */
export async function POST(req: NextRequest) {
  let body: { email?: string; firstName?: string; website?: string; page?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, message: 'Invalid request.' }, { status: 400 })
  }
  if (body.website) return NextResponse.json({ ok: true, message: 'Thank you.' })
  const email = (body.email || '').trim()
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ ok: false, message: 'Please enter a valid email address.' }, { status: 400 })
  }

  const portalId = process.env.HUBSPOT_PORTAL_ID
  const formGuid = process.env.HUBSPOT_FORM_GUID
  if (!portalId || !formGuid) {
    console.info('[newsletter] HubSpot not configured; sign-up not forwarded:', email)
    return NextResponse.json({ ok: true, message: 'Thank you, you are on the list.' })
  }

  const fields = [{ objectTypeId: '0-1', name: 'email', value: email }]
  if (body.firstName) fields.push({ objectTypeId: '0-1', name: 'firstname', value: body.firstName.trim().slice(0, 80) })

  try {
    const res = await fetch(`https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fields,
        context: {
          pageUri: `${process.env.NEXT_PUBLIC_SERVER_URL || ''}${body.page || '/'}`,
          pageName: 'GR Hotels newsletter',
          ipAddress: req.headers.get('x-forwarded-for')?.split(',')[0]?.trim(),
        },
        legalConsentOptions: {
          consent: {
            consentToProcess: true,
            text: 'I agree to receive emails from GR Hotels.',
            communications: [{ value: true, subscriptionTypeId: 999, text: 'I agree to receive marketing emails from GR Hotels.' }],
          },
        },
      }),
    })
    if (!res.ok) {
      const text = await res.text()
      console.error('[newsletter] HubSpot error', res.status, text)
      return NextResponse.json({ ok: false, message: 'We could not sign you up just now. Please try again later.' }, { status: 502 })
    }
  } catch (err) {
    console.error('[newsletter] HubSpot request failed', err)
    return NextResponse.json({ ok: false, message: 'We could not sign you up just now. Please try again later.' }, { status: 502 })
  }

  return NextResponse.json({ ok: true, message: 'Thank you, you are on the list.' })
}
