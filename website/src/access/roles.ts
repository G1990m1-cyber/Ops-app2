import type { Access, FieldAccess, Where } from 'payload'

import type { User } from '@/payload-types'

/** Returns the hotel IDs a user is allowed to manage. Admins manage every hotel. */
export const getUserHotelIds = (user: User | null | undefined): number[] => {
  if (!user || !Array.isArray(user.hotels)) return []
  return user.hotels
    .map((hotel) => (typeof hotel === 'object' && hotel !== null ? hotel.id : hotel))
    .filter((id): id is number => typeof id === 'number')
}

export const isAdminUser = (user: User | null | undefined): boolean => user?.role === 'admin'
export const isManagerUser = (user: User | null | undefined): boolean => user?.role === 'manager'

/** Collection-level: admins only. */
export const isAdmin: Access = ({ req }) => isAdminUser(req.user)

/** Collection-level: anyone logged in. */
export const isLoggedIn: Access = ({ req }) => Boolean(req.user)

/** Field-level: admins only may change this field. */
export const adminOnlyField: FieldAccess = ({ req }) => isAdminUser(req.user)

/** Hides a collection or global from the admin nav for everyone but admins. */
export const hiddenUnlessAdmin = ({ user }: { user?: unknown }): boolean =>
  (user as { role?: string } | null | undefined)?.role !== 'admin'

/**
 * Admins get everything. Managers get rows whose `hotel` relationship is one of their hotels.
 * `field` lets collections that store the hotel under a different name reuse this.
 */
export const adminOrAssignedHotel =
  (field: string = 'hotel'): Access =>
  ({ req }) => {
    const user = req.user as User | null
    if (isAdminUser(user)) return true
    const hotelIds = getUserHotelIds(user)
    if (!hotelIds.length) return false
    const where: Where = { [field]: { in: hotelIds } }
    return where
  }

/** For the Hotels collection itself: the row id must be one of the manager's hotels. */
export const adminOrOwnHotel: Access = ({ req }) => {
  const user = req.user as User | null
  if (isAdminUser(user)) return true
  const hotelIds = getUserHotelIds(user)
  if (!hotelIds.length) return false
  return { id: { in: hotelIds } }
}

/** Public read for published rows; logged-in users (scoped) see drafts too. */
export const publishedOrScoped =
  (field: string = 'hotel'): Access =>
  (args) => {
    const user = args.req.user as User | null
    if (user) return adminOrAssignedHotel(field)(args)
    return { _status: { equals: 'published' } }
  }

export const publishedOrOwnHotel: Access = (args) => {
  const user = args.req.user as User | null
  if (user) return adminOrOwnHotel(args)
  return { _status: { equals: 'published' } }
}

/** Restrict a `hotel` relationship picker to the hotels a manager looks after. */
export const hotelFilterOptions = ({ user }: { user?: unknown }): Where | boolean => {
  const u = user as User | null
  // No user means the Local API (seeding, server routes): no restriction.
  if (!u || isAdminUser(u)) return true
  const hotelIds = getUserHotelIds(u)
  return hotelIds.length ? { id: { in: hotelIds } } : false
}

/** Default a manager's new row to their first hotel so the form is one field shorter. */
export const defaultHotelForUser = ({ user }: { user?: unknown }) => {
  const u = user as User | null
  if (isAdminUser(u)) return undefined
  const hotelIds = getUserHotelIds(u)
  return hotelIds.length === 1 ? hotelIds[0] : undefined
}
