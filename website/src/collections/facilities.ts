/** Fixed list of facilities with thin-line icon names. Shared by Hotels and the Facilities block. */
export const FACILITIES = [
  { value: 'wifi', label: 'Free Wi-Fi' },
  { value: 'parking', label: 'Free parking' },
  { value: 'restaurant', label: 'Restaurant' },
  { value: 'bar', label: 'Bar' },
  { value: 'breakfast', label: 'Breakfast' },
  { value: 'garden', label: 'Garden' },
  { value: 'dog-friendly', label: 'Dog friendly' },
  { value: 'family', label: 'Family rooms' },
  { value: 'ev-charging', label: 'EV charging' },
  { value: 'accessible', label: 'Accessible rooms' },
  { value: 'meetings', label: 'Meetings & functions' },
  { value: 'weddings', label: 'Weddings' },
  { value: 'river', label: 'Riverside setting' },
  { value: 'self-checkin', label: 'Self check-in' },
  { value: 'fireplace', label: 'Open fires' },
  { value: 'bikes', label: 'Bike storage' },
  { value: 'walking', label: 'Walking trails' },
  { value: 'fishing', label: 'Fishing' },
  { value: 'tea-coffee', label: 'Tea & coffee tray' },
  { value: 'tv', label: 'Smart TV' },
] as const

export type FacilityValue = (typeof FACILITIES)[number]['value']
