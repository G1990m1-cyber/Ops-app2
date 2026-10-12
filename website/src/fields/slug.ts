import type { Field, FieldHook } from 'payload'

export const formatSlug = (val: string): string =>
  val
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

const formatSlugHook =
  (fallback: string): FieldHook =>
  ({ data, operation, value }) => {
    if (typeof value === 'string' && value.trim()) return formatSlug(value)
    if (operation === 'create' || !data?.slug) {
      const fallbackData = data?.[fallback]
      if (fallbackData && typeof fallbackData === 'string') return formatSlug(fallbackData)
    }
    return value
  }

type Options = {
  fallbackField?: string
  description?: string
  adminOnly?: boolean
  unique?: boolean
}

/** URL slug, filled from the title on first save, editable afterwards (admins only when `adminOnly`). */
export const slugField = ({
  fallbackField = 'title',
  description = 'Part of the web address. Lower-case letters, numbers and dashes only.',
  adminOnly = false,
  unique = true,
}: Options = {}): Field => ({
  name: 'slug',
  type: 'text',
  index: true,
  unique,
  label: 'Web address (slug)',
  admin: {
    position: 'sidebar',
    description,
  },
  hooks: {
    beforeValidate: [formatSlugHook(fallbackField)],
  },
  access: adminOnly ? { update: ({ req }) => req.user?.role === 'admin' } : undefined,
})
