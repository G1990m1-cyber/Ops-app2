import sharp from 'sharp'

/**
 * Generates soft, brand-toned placeholder photos (no network needed) so the site
 * launches looking composed. Replace through the admin once real photography arrives.
 */
const palettes = [
  ['#ddcab4', '#88764c'],
  ['#d9b282', '#815c46'],
  ['#8f8a45', '#4e4a2b'],
  ['#f1e9e0', '#a8906d'],
  ['#815c46', '#262626'],
  ['#c4ad90', '#6f6040'],
]

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

export const placeholderImage = async (label: string, seed: number, width = 2000, height = 1333): Promise<Buffer> => {
  const [a, b] = palettes[seed % palettes.length]
  const angle = (seed * 37) % 180
  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      <linearGradient id="g" gradientTransform="rotate(${angle})">
        <stop offset="0%" stop-color="${a}"/>
        <stop offset="100%" stop-color="${b}"/>
      </linearGradient>
      <radialGradient id="r" cx="${30 + (seed * 13) % 40}%" cy="${25 + (seed * 29) % 50}%" r="70%">
        <stop offset="0%" stop-color="#ffffff" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.12"/>
      </radialGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#g)"/>
    <rect width="100%" height="100%" fill="url(#r)"/>
    <circle cx="${width * (0.15 + ((seed * 7) % 10) / 14)}" cy="${height * 0.72}" r="${height * 0.42}" fill="#ffffff" fill-opacity="0.07"/>
    <circle cx="${width * 0.8}" cy="${height * 0.25}" r="${height * 0.28}" fill="#262626" fill-opacity="0.06"/>
    <text x="50%" y="52%" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(width / 26)}" fill="#faf6f1" fill-opacity="0.85">${esc(label)}</text>
    <text x="50%" y="58%" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(width / 70)}" letter-spacing="6" fill="#faf6f1" fill-opacity="0.7">PLACEHOLDER PHOTO</text>
  </svg>`
  return sharp(Buffer.from(svg)).jpeg({ quality: 82, mozjpeg: true }).toBuffer()
}
