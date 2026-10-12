const dateFormatter = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  timeZone: 'Europe/London',
})
const timeFormatter = new Intl.DateTimeFormat('en-GB', {
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
  timeZone: 'Europe/London',
})
const shortDate = new Intl.DateTimeFormat('en-GB', {
  day: 'numeric',
  month: 'short',
  timeZone: 'Europe/London',
})

export const formatDate = (value?: string | null): string =>
  value ? dateFormatter.format(new Date(value)) : ''
export const formatTime = (value?: string | null): string =>
  value ? timeFormatter.format(new Date(value)).replace(' ', '').toLowerCase() : ''
export const formatShortDate = (value?: string | null): string =>
  value ? shortDate.format(new Date(value)) : ''
