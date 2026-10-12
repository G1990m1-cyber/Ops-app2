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

// Individual pin: cream teardrop, bronze outline, a little bronze building crest — the GR Hotels mark.
const PIN = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="54" viewBox="0 0 40 54">
    <ellipse cx="20" cy="50" rx="6" ry="2" fill="#000" opacity="0.18"/>
    <path d="M20 2C11.2 2 4 9.2 4 18c0 10.5 16 30 16 30s16-19.5 16-30C36 9.2 28.8 2 20 2z" fill="#faf6f1" stroke="#88764c" stroke-width="2.2"/>
    <polygon points="20,8 29,15 11,15" fill="#88764c"/>
    <rect x="12" y="15" width="16" height="11" fill="#88764c"/>
    <rect x="14.3" y="18" width="3" height="3.4" fill="#faf6f1"/>
    <rect x="22.7" y="18" width="3" height="3.4" fill="#faf6f1"/>
    <rect x="18.5" y="21.6" width="3" height="4.4" fill="#faf6f1"/>
  </svg>`.replace(/\s+/g, ' '),
)

// Cluster pin: solid bronze teardrop with a white count in the bulb.
const CLUSTER = encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" width="46" height="60" viewBox="0 0 46 60">
    <ellipse cx="23" cy="56" rx="7" ry="2.5" fill="#000" opacity="0.18"/>
    <path d="M23 2C12.5 2 4 10.5 4 21c0 12 19 34 19 34s19-22 19-34C42 10.5 33.5 2 23 2z" fill="#88764c" stroke="#faf6f1" stroke-width="2"/>
  </svg>`.replace(/\s+/g, ' '),
)

export const markerIcon = (google: any) => ({
  url: `data:image/svg+xml;charset=UTF-8,${PIN}`,
  scaledSize: new google.maps.Size(40, 54),
  anchor: new google.maps.Point(20, 48),
})

/** Renderer for @googlemaps/markerclusterer: a bronze pin with the grouped count in white. */
export const clusterRenderer = (google: any) => ({
  render: ({ count, position }: { count: number; position: any }) =>
    new google.maps.Marker({
      position,
      icon: {
        url: `data:image/svg+xml;charset=UTF-8,${CLUSTER}`,
        scaledSize: new google.maps.Size(46, 60),
        anchor: new google.maps.Point(23, 55),
        labelOrigin: new google.maps.Point(23, 21),
      },
      label: { text: String(count), color: '#faf6f1', fontSize: '14px', fontWeight: '700' },
      zIndex: 1000 + count,
    }),
})
