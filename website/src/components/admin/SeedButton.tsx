'use client'

import React, { useState } from 'react'

/** Shown to admins only while the site has no hotels. One click loads the content migrated from the old site. */
export const SeedButton: React.FC = () => {
  const [state, setState] = useState<'idle' | 'running' | 'done' | 'error'>('idle')
  const [message, setMessage] = useState('')
  const run = async () => {
    setState('running')
    try {
      const res = await fetch('/next/seed', { method: 'POST', credentials: 'include' })
      const json = (await res.json()) as { ok: boolean; message?: string }
      if (!json.ok) throw new Error(json.message || 'Seed failed')
      setState('done')
      setMessage('Done. Refresh this page to see the hotels.')
    } catch (err) {
      setState('error')
      setMessage(`${err instanceof Error ? err.message : 'Seed failed'}. Click again to resume; the seed carries on where it stopped.`)
    }
  }
  return (
    <div className="gr-seed">
      <p>The site is empty. Load the content migrated from the old site (8 hotels, rooms, photos, reviews and pages, plus an example menu, event and offer per hotel saved as drafts).</p>
      <button type="button" className="btn btn--style-primary btn--size-medium" onClick={run} disabled={state === 'running'}>
        {state === 'running' ? 'Loading… this takes two to three minutes' : 'Load the migrated content'}
      </button>
      {message && <p>{message}</p>}
    </div>
  )
}
