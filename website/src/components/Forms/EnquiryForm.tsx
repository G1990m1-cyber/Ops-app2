'use client'

import React, { useCallback, useState } from 'react'

import { Button } from '@/components/ui/Button'
import { gtmEvent } from '@/utilities/gtm'

import { Field, Input, Select, Textarea } from './fields'
import { Turnstile } from './Turnstile'

type HotelOption = { id: number | string; name: string }
type State = 'idle' | 'sending' | 'done' | 'error'

const SUBJECTS = [
  { label: 'A stay', value: 'stay' },
  { label: 'Dining', value: 'dining' },
  { label: 'An event or function', value: 'event' },
  { label: 'A wedding', value: 'wedding' },
  { label: 'Something else', value: 'other' },
]

export const EnquiryForm: React.FC<{
  hotelId?: number | string | null
  hotelName?: string | null
  hotels?: HotelOption[]
  showStayFields?: boolean
  className?: string
}> = ({ hotelId, hotelName, hotels, showStayFields = true, className }) => {
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')
  const [token, setToken] = useState('')
  const onToken = useCallback((t: string) => setToken(t), [])
  const needsPicker = !hotelId && hotels && hotels.length > 0

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    const payload = Object.fromEntries(fd.entries())
    setState('sending')
    try {
      const res = await fetch('/api/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, hotel: hotelId || payload.hotel, turnstileToken: token, page: window.location.pathname }),
      })
      const json = (await res.json()) as { ok: boolean; message?: string }
      if (!res.ok || !json.ok) throw new Error(json.message || 'Something went wrong')
      setState('done')
      setMessage(json.message || 'Thank you. We have your message and will reply soon.')
      gtmEvent('enquiry_submit', { hotel: hotelName || payload.hotel || 'group', subject: payload.subject })
      form.reset()
    } catch (err) {
      setState('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again or call us.')
    }
  }

  if (state === 'done') {
    return (
      <div role="status" className="rounded-2xl bg-sand p-8 text-center [.tone-sand_&]:bg-cream">
        <p className="font-display text-[1.6rem]">Thank you</p>
        <p className="mt-2">{message}</p>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className={className} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        {needsPicker && (
          <Field label="Which hotel?" id="enq-hotel" required className="sm:col-span-2">
            <Select id="enq-hotel" name="hotel" required defaultValue="">
              <option value="" disabled>
                Choose a hotel
              </option>
              {hotels!.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </Select>
          </Field>
        )}
        <Field label="Your name" id="enq-name" required>
          <Input id="enq-name" name="name" required autoComplete="name" />
        </Field>
        <Field label="Email" id="enq-email" required>
          <Input id="enq-email" name="email" type="email" required autoComplete="email" />
        </Field>
        <Field label="Phone" id="enq-phone">
          <Input id="enq-phone" name="phone" type="tel" autoComplete="tel" />
        </Field>
        <Field label="This is about" id="enq-subject" required>
          <Select id="enq-subject" name="subject" defaultValue="stay">
            {SUBJECTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </Select>
        </Field>
        {showStayFields && (
          <>
            <Field label="Arriving" id="enq-arrival">
              <Input id="enq-arrival" name="arrival" type="date" />
            </Field>
            <Field label="Leaving" id="enq-departure">
              <Input id="enq-departure" name="departure" type="date" />
            </Field>
            <Field label="Guests" id="enq-guests">
              <Input id="enq-guests" name="guests" type="number" min={1} max={40} inputMode="numeric" />
            </Field>
          </>
        )}
        <Field label="Your message" id="enq-message" required className="sm:col-span-2">
          <Textarea id="enq-message" name="message" required minLength={10} />
        </Field>
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <div className="sm:col-span-2">
          <Turnstile onToken={onToken} />
        </div>
        <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
          <Button type="submit" size="lg" disabled={state === 'sending'}>
            {state === 'sending' ? 'Sending…' : 'Send message'}
          </Button>
          <p className="text-[0.95rem] text-ink-soft [.tone-charcoal_&]:text-cream/70">We reply within one working day.</p>
        </div>
        {state === 'error' && (
          <p role="alert" className="text-cocoa sm:col-span-2 [.tone-charcoal_&]:text-gold">
            {message}
          </p>
        )}
      </div>
    </form>
  )
}
