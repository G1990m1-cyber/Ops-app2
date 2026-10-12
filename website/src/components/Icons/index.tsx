import React from 'react'

/* Thin-line, rounded, unfilled icons in brand colours (currentColor). */
type P = React.SVGProps<SVGSVGElement>
const S: React.FC<P & { children: React.ReactNode }> = ({ children, ...p }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    width="24"
    height="24"
    {...p}
  >
    {children}
  </svg>
)

export const Icons = {
  wifi: (p: P) => <S {...p}><path d="M2.5 8.5a14 14 0 0 1 19 0M5.5 12a9.5 9.5 0 0 1 13 0M8.5 15.5a5 5 0 0 1 7 0" /><circle cx="12" cy="19" r=".8" /></S>,
  parking: (p: P) => <S {...p}><rect x="3" y="3" width="18" height="18" rx="3" /><path d="M9 17V7h4a3 3 0 0 1 0 6H9" /></S>,
  restaurant: (p: P) => <S {...p}><path d="M7 3v8M5 3v5a2 2 0 0 0 4 0V3M7 11v10M17 3c-2 1-3 3-3 6v3h3v9M17 3v18" /></S>,
  bar: (p: P) => <S {...p}><path d="M6 3h12l-6 8-6-8zM12 11v8M8 21h8" /></S>,
  breakfast: (p: P) => <S {...p}><path d="M4 10h12v4a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-4zM16 11h2a2 2 0 0 1 0 4h-2M7 6c0-1 1-1 1-2M10 6c0-1 1-1 1-2" /></S>,
  garden: (p: P) => <S {...p}><path d="M12 21v-8M12 13c-4 0-6-3-6-7 4 0 6 3 6 7zM12 13c4 0 6-3 6-7-4 0-6 3-6 7zM5 21h14" /></S>,
  'dog-friendly': (p: P) => <S {...p}><path d="M5 9c0-2 2-3 3-1l2 3h4l2-3c1-2 3-1 3 1v3a7 7 0 0 1-14 0V9zM9 14h.01M15 14h.01M12 16v1" /></S>,
  family: (p: P) => <S {...p}><circle cx="8" cy="6" r="2.5" /><circle cx="16" cy="7" r="2" /><path d="M3 20v-4a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v4M13 20v-3a3 3 0 0 1 3-3h1a3 3 0 0 1 3 3v3" /></S>,
  'ev-charging': (p: P) => <S {...p}><rect x="4" y="6" width="11" height="14" rx="2" /><path d="M8 4v2M11 4v2M15 11h2a2 2 0 0 1 2 2v3a1.5 1.5 0 0 0 3 0V9l-2-2M10.5 9l-2 4h3l-2 4" /></S>,
  accessible: (p: P) => <S {...p}><circle cx="12" cy="4.5" r="1.5" /><path d="M9 9h6l-1 5h4l2 6M10 9l-1 5a4 4 0 1 0 6.5 3" /></S>,
  meetings: (p: P) => <S {...p}><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M8 21h8M12 17v4M7 10h10M7 13h6" /></S>,
  weddings: (p: P) => <S {...p}><circle cx="9" cy="14" r="5" /><circle cx="15" cy="14" r="5" /><path d="M12 5l-1.5 2h3L12 5zM12 7v2.5" /></S>,
  river: (p: P) => <S {...p}><path d="M3 8c3-2 5 2 8 0s5-2 10 0M3 13c3-2 5 2 8 0s5-2 10 0M3 18c3-2 5 2 8 0s5-2 10 0" /></S>,
  'self-checkin': (p: P) => <S {...p}><rect x="4" y="3" width="16" height="18" rx="2" /><circle cx="12" cy="10" r="2.5" /><path d="M12 12.5V16M10 15h4" /></S>,
  fireplace: (p: P) => <S {...p}><path d="M12 3c1 3 4 4 4 8a4 4 0 0 1-8 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 0-7zM4 21h16" /></S>,
  bikes: (p: P) => <S {...p}><circle cx="6" cy="16" r="3.5" /><circle cx="18" cy="16" r="3.5" /><path d="M6 16l4-8h5l3 8M10 8l4 8M13 5h3" /></S>,
  walking: (p: P) => <S {...p}><circle cx="13" cy="4" r="1.5" /><path d="M10 21l2-7 3 3v4M8 13l2-5 4-1 3 4M14 10l-1 3" /></S>,
  fishing: (p: P) => <S {...p}><path d="M4 4l10 10M14 14a3 3 0 1 1-4 3M3 20c3-2 5 2 8 0s5-2 10 0" /></S>,
  'tea-coffee': (p: P) => <S {...p}><path d="M5 9h11v5a5 5 0 0 1-5 5h-1a5 5 0 0 1-5-5V9zM16 10h1.5a2 2 0 0 1 0 4H16M8 5c0 1 1 1 1 2M11 5c0 1 1 1 1 2" /></S>,
  tv: (p: P) => <S {...p}><rect x="3" y="5" width="18" height="12" rx="2" /><path d="M9 21h6M12 17v4" /></S>,
  /* UI */
  phone: (p: P) => <S {...p}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></S>,
  mail: (p: P) => <S {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></S>,
  pin: (p: P) => <S {...p}><path d="M12 21s-7-6.5-7-11.5a7 7 0 0 1 14 0C19 14.5 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></S>,
  calendar: (p: P) => <S {...p}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /></S>,
  clock: (p: P) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></S>,
  arrow: (p: P) => <S {...p}><path d="M5 12h14M13 6l6 6-6 6" /></S>,
  arrowUpRight: (p: P) => <S {...p}><path d="M7 17L17 7M9 7h8v8" /></S>,
  chevron: (p: P) => <S {...p}><path d="M6 9l6 6 6-6" /></S>,
  close: (p: P) => <S {...p}><path d="M6 6l12 12M18 6L6 18" /></S>,
  menu: (p: P) => <S {...p}><path d="M4 7h16M4 12h16M4 17h16" /></S>,
  bed: (p: P) => <S {...p}><path d="M3 18v-7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v7M3 15h18M3 18v2M21 18v2M6 9V7a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" /></S>,
  guests: (p: P) => <S {...p}><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2.5" /><path d="M3 20a6 6 0 0 1 12 0M15 20a5 5 0 0 1 6-4" /></S>,
  pdf: (p: P) => <S {...p}><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5M9 13h6M9 17h4" /></S>,
  quote: (p: P) => <S {...p}><path d="M7 7h4v5c0 3-1 4-4 5M15 7h4v5c0 3-1 4-4 5" /></S>,
  star: (p: P) => <S {...p}><path d="M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z" /></S>,
  facebook: (p: P) => <S {...p}><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></S>,
  instagram: (p: P) => <S {...p}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r=".8" /></S>,
  x: (p: P) => <S {...p}><path d="M4 4l16 16M20 4L4 20" /></S>,
  tripadvisor: (p: P) => <S {...p}><circle cx="7.5" cy="13" r="3.5" /><circle cx="16.5" cy="13" r="3.5" /><path d="M2 10l2.5 3M22 10l-2.5 3M12 9.5L10 13M12 9.5l2 3.5M7 9.5c3-2 7-2 10 0" /></S>,
  linkedin: (p: P) => <S {...p}><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" /></S>,
  check: (p: P) => <S {...p}><path d="M5 12l5 5L20 7" /></S>,
  play: (p: P) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M10 8l6 4-6 4z" /></S>,
} as const

export type IconName = keyof typeof Icons

export const Icon: React.FC<{ name: IconName | string; className?: string; size?: number }> = ({
  name,
  className,
  size,
}) => {
  const C = (Icons as Record<string, React.FC<P>>)[name]
  if (!C) return null
  return <C className={className} width={size} height={size} />
}
