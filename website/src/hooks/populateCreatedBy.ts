import type { CollectionBeforeChangeHook } from 'payload'

export const populateCreatedBy: CollectionBeforeChangeHook = ({ data, operation, req }) => {
  if (operation === 'create' && req.user && !data.createdBy) {
    return { ...data, createdBy: req.user.id }
  }
  return data
}
