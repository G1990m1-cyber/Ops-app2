'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

/** Re-keys the page on navigation so new content eases in instead of snapping. */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname()
  return (
    <div key={pathname} className="page-in">
      {children}
    </div>
  )
}
