'use client'

import React from 'react'

import { openConsent } from './CookieConsent'

export const CookieSettingsLink: React.FC<{ className?: string }> = ({ className }) => (
  <button type="button" className={className} onClick={openConsent}>
    Cookie settings
  </button>
)
