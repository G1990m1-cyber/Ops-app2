import type { CollectionBeforeValidateHook } from 'payload'
import { ValidationError } from 'payload'

import { getUserHotelIds, isAdminUser } from '@/access'
import type { User } from '@/payload-types'

/**
 * Belt and braces for Hotel Managers: even if the picker is bypassed, a manager
 * can only save rows against a hotel they are assigned to.
 */
export const enforceHotelScope =
  (field: string = 'hotel'): CollectionBeforeValidateHook =>
  ({ data, req, collection }) => {
    const user = req.user as User | null
    if (!user || isAdminUser(user)) return data
    const allowed = getUserHotelIds(user).map(String)
    const raw = data?.[field]
    const value = raw && typeof raw === 'object' ? raw.id : raw
    if (!value || !allowed.includes(String(value))) {
      throw new ValidationError({
        collection: collection?.slug,
        errors: [{ path: field, message: 'Please choose one of your own hotels.' }],
      })
    }
    return data
  }
