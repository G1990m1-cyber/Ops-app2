import localFont from 'next/font/local'

/**
 * Body + subheadings: Cormorant Garamond (variable, self-hosted).
 * Display: Bodoni Moda stands in for TAN Pearl until the licensed files arrive.
 * To swap: drop TANPearl.woff2 into src/fonts and point `display` at it. Nothing else changes.
 */
export const bodyFont = localFont({
  src: [
    { path: '../../fonts/CormorantGaramond-variable.woff2', style: 'normal', weight: '300 700' },
    { path: '../../fonts/CormorantGaramond-italic-variable.woff2', style: 'italic', weight: '300 700' },
  ],
  variable: '--font-body',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
})

export const displayFont = localFont({
  src: [{ path: '../../fonts/BodoniModa-variable.woff2', style: 'normal', weight: '400 900' }],
  variable: '--font-display',
  display: 'swap',
  fallback: ['Georgia', 'Times New Roman', 'serif'],
  adjustFontFallback: 'Times New Roman',
})
