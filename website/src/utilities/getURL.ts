import canUseDOM from './canUseDOM'

export const getServerSideURL = (): string => {
  if (process.env.NEXT_PUBLIC_SERVER_URL) return process.env.NEXT_PUBLIC_SERVER_URL
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL)
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`
  return 'http://localhost:3000'
}

export const getClientSideURL = (): string => {
  if (canUseDOM) {
    const { protocol, hostname, port } = window.location
    return `${protocol}//${hostname}${port ? `:${port}` : ''}`
  }
  return getServerSideURL()
}
