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

// Individual pin: cream teardrop, bronze outline and a simplified GR Hotels Georgian house, with a
// soft drop shadow. Recreated as vector from the logo artwork so it stays crisp at pin size.
const PIN = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="44" height="58" viewBox="0 0 44 58">
    <defs><filter id="s" x="-50%" y="-20%" width="200%" height="160%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.7" flood-color="#000" flood-opacity="0.35"/></filter></defs>
    <g filter="url(#s)"><path d="M22 2C12.6 2 5 9.6 5 19c0 11.2 17 30 17 30s17-18.8 17-30C39 9.6 31.4 2 22 2z" fill="#faf6f1" stroke="#88764c" stroke-width="2"/></g>
    <g fill="#88764c"><rect x="11.5" y="9" width="1.8" height="2.6"/><rect x="30.7" y="9" width="1.8" height="2.6"/><rect x="20.8" y="8.4" width="2.4" height="2.2"/><rect x="11" y="11.2" width="22" height="1.6"/><rect x="12.5" y="12.6" width="19" height="16.2"/></g>
    <g fill="#faf6f1"><rect x="14.2" y="14.4" width="2.4" height="3"/><rect x="20.8" y="14.4" width="2.4" height="3"/><rect x="27.4" y="14.4" width="2.4" height="3"/><rect x="14.2" y="18.8" width="2.4" height="3"/><rect x="20.8" y="18.8" width="2.4" height="3"/><rect x="27.4" y="18.8" width="2.4" height="3"/><rect x="14.2" y="23.2" width="2.4" height="3"/><rect x="27.4" y="23.2" width="2.4" height="3"/><rect x="20.2" y="22.6" width="3.6" height="6.2"/></g>
  </svg>`.replace(/\s+/g, ' '),
)

// Cluster pin: solid bronze teardrop with a soft shadow; the grouped count is a white label.
const CLUSTER = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="48" height="62" viewBox="0 0 48 62">
    <defs><filter id="c" x="-50%" y="-20%" width="200%" height="160%"><feDropShadow dx="0" dy="1.6" stdDeviation="1.8" flood-color="#000" flood-opacity="0.35"/></filter></defs>
    <g filter="url(#c)"><path d="M24 2C13 2 4 11 4 22c0 12.5 20 36 20 36s20-23.5 20-36C44 11 35 2 24 2z" fill="#88764c" stroke="#faf6f1" stroke-width="2"/></g>
  </svg>`.replace(/\s+/g, ' '),
)

export const markerIcon = (google: any) => ({
  url: `data:image/svg+xml;charset=UTF-8,${PIN}`,
  scaledSize: new google.maps.Size(44, 58),
  anchor: new google.maps.Point(22, 49),
})

/** Renderer for @googlemaps/markerclusterer: a bronze pin with the grouped count in white. */
export const clusterRenderer = (google: any) => ({
  render: ({ count, position }: { count: number; position: any }) =>
    new google.maps.Marker({
      position,
      icon: {
        url: `data:image/svg+xml;charset=UTF-8,${CLUSTER}`,
        scaledSize: new google.maps.Size(48, 62),
        anchor: new google.maps.Point(24, 52),
        labelOrigin: new google.maps.Point(24, 22),
      },
      label: { text: String(count), color: '#faf6f1', fontSize: '14px', fontWeight: '700' },
      zIndex: 1000 + count,
    }),
})
