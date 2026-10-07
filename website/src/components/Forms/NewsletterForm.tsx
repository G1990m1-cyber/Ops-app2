'use client'

import React, { useState } from 'react'

import { Button } from '@/components/ui/Button'
import { gtmEvent } from '@/utilities/gtm'
import { cn } from '@/utilities/ui'

type State = 'idle' | 'sending' | 'done' | 'error'

export const NewsletterForm: React.FC<{ compact?: boolean; consentText?: string | null; className?: string }> = ({
  compact,
  consentText,
  className,
}) => {
  const [state, setState] = useState<State>('idle')
  const [message, setMessage] = useState('')

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setState('sending')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: data.get('email'),
          firstName: data.get('firstName') || '',
          website: data.get('website') || '',
          page: window.location.pathname,
        }),
      })
      const json = (await res.json()) as { ok: boolean; message?: string }
      if (!res.ok || !json.ok) throw new Error(json.message || 'Something went wrong')
      setState('done')
      setMessage(json.message || 'Thank you, you are on the list.')
      gtmEvent('newsletter_signup', { page: window.location.pathname })
      form.reset()
    } catch (err) {
      setState('error')
      setMessage(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    }
  }

  if (state === 'done') {
    return (
      <p role="status" className={cn('text-[1.05rem]', className)}>
        {message}
      </p>
    )
  }

  return (
    <form onSubmit={submit} className={cn('grid gap-3', className)} noValidate>
      <div className={cn('grid gap-3', compact ? 'sm:grid-cols-[1fr_auto]' : 'sm:grid-cols-[1fr_1fr_auto]')}>
        {!compact && (
          <input
            type="text"
            name="firstName"
            id="nl-first-name"
            placeholder="First name"
            aria-label="First name"
            autoComplete="given-name"
            className="rounded-full border border-linen bg-white/90 px-5 py-3 text-ink [.tone-charcoal_&]:border-cream/30 [.tone-charcoal_&]:bg-charcoal [.tone-charcoal_&]:text-cream"
          />
        )}
        <input
          type="email"
          name="email"
          id={compact ? 'nl-email-footer' : 'nl-email'}
          required
          placeholder="Email address"
          aria-label="Email address"
          autoComplete="email"
          className="rounded-full border border-linen bg-white/90 px-5 py-3 text-ink [.tone-charcoal_&]:border-cream/30 [.tone-charcoal_&]:bg-charcoal [.tone-charcoal_&]:text-cream"
        />
        {/* Honeypot: real people never see or fill this. */}
        <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
        <Button type="submit" disabled={state === 'sending'} variant={compact ? 'onImage' : 'primary'}>
          {state === 'sending' ? 'Sending…' : 'Sign up'}
        </Button>
      </div>
      <p className={cn('text-[0.9rem]', compact ? 'text-cream/60' : 'text-ink-soft [.tone-charcoal_&]:text-cream/70')}>
        {consentText || 'By signing up you agree to receive emails from GR Hotels. Unsubscribe any time.'}
      </p>
      {state === 'error' && (
        <p role="alert" className="text-[0.95rem] text-cocoa [.tone-charcoal_&]:text-gold">
          {message}
        </p>
      )}
    </form>
  )
}
