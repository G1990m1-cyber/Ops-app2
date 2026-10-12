/* eslint-disable @typescript-eslint/no-explicit-any */

// Google Maps browser key. Exposed in the page by design (NEXT_PUBLIC); its protection is the
// HTTP-referrer restriction on the key in Google Cloud. Overridable via env to rotate it.
export const KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''
// A cloud-styled Map ID (Maps Studio). When set, the cloud style controls the look.
export const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID || 'e8cff4cdf600b8aec8c25a72'

/** Loads the Google Maps JS API once for the whole page. No `loading=async`: the Map constructor
 * must be available synchronously when onload fires, otherwise it throws. */
let loaderPromise: Promise<any> | null = null
export const loadGoogleMaps = (): Promise<any> => {
  if (typeof window === 'undefined') return Promise.reject(new Error('no window'))
  if ((window as any).google?.maps) return Promise.resolve((window as any).google)
  if (loaderPromise) return loaderPromise
  loaderPromise = new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(KEY)}&v=quarterly`
    s.async = true
    s.defer = true
    s.onload = () => resolve((window as any).google)
    s.onerror = () => reject(new Error('Google Maps failed to load'))
    document.head.appendChild(s)
  })
  return loaderPromise
}

// A clean, classic location pin: a bronze teardrop with a cream centre, a thin cream outline that
// lifts it off the map, and a soft drop shadow. Minimal and legible rather than a busy illustration.
const PIN = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="46" viewBox="0 0 34 46">
    <defs><filter id="s" x="-60%" y="-30%" width="220%" height="170%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.7" flood-color="#000" flood-opacity="0.38"/></filter></defs>
    <g filter="url(#s)">
      <path d="M17 2C9.8 2 4 7.8 4 15c0 9 13 27 13 27s13-18 13-27C30 7.8 24.2 2 17 2z" fill="#88764c" stroke="#faf6f1" stroke-width="1.5"/>
      <circle cx="17" cy="15" r="4.6" fill="#faf6f1"/>
    </g>
  </svg>`.replace(/\s+/g, ' '),
)

export const markerIcon = (google: any) => ({
  url: `data:image/svg+xml;charset=UTF-8,${PIN}`,
  scaledSize: new google.maps.Size(34, 46),
  anchor: new google.maps.Point(17, 43),
})
