import React from 'react'

/**
 * Placeholder wordmark until the GR Hotels SVG logo arrives.
 * Swap the contents of both components for the real logo; keep the dimensions similar.
 */
export const Logo: React.FC = () => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
    <span
      style={{
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: 40,
        letterSpacing: '0.06em',
        color: '#88764c',
        lineHeight: 1,
      }}
    >
      GR Hotels
    </span>
    <span style={{ fontSize: 13, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#815c46' }}>
      Website admin
    </span>
  </div>
)

export const Icon: React.FC = () => (
  <span
    aria-label="GR Hotels"
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      borderRadius: 6,
      background: '#88764c',
      color: '#faf6f1',
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontSize: 13,
      letterSpacing: '0.04em',
    }}
  >
    GR
  </span>
)
