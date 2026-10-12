import type { CollectionBeforeValidateHook } from 'payload'
import { ValidationError } from 'payload'

/**
 * Stops the seeded example content ("… (draft, replace me)") from ever going live.
 * The seed creates one example menu, event and offer as drafts so managers can see how each looks;
 * publishing one would put obviously-fake copy on the public site. Rename it first and the guard clears.
 */
export const blockPlaceholderPublish =
  (field: string = 'title'): CollectionBeforeValidateHook =>
  ({ data, collection }) => {
    if (!data) return data
    const title = typeof data[field] === 'string' ? (data[field] as string) : ''
    if (data._status === 'published' && /\(draft, replace me\)/i.test(title)) {
      throw new ValidationError({
        collection: collection?.slug,
        errors: [
          {
            path: field,
            message: 'This is an example. Rename it (remove "(draft, replace me)") before publishing, or delete it.',
          },
        ],
      })
    }
    return data
  }
