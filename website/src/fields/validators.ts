import type { TextFieldValidation, DateFieldValidation } from 'payload'

/** Optional field that, if filled, must be a full http(s) link. Catches mistyped booking/social URLs. */
export const validateOptionalUrl: TextFieldValidation = (value) => {
  if (!value) return true
  return /^https?:\/\/\S+$/i.test(String(value)) || 'Enter a full link starting with https://'
}

/**
 * A date that must fall on or after another date field on the same document
 * (e.g. an end date after its start). Empty values pass; required-ness is set separately.
 */
export const endOnOrAfter =
  (startField: string, label = 'end date'): DateFieldValidation =>
  (value, { siblingData }) => {
    const start = (siblingData as Record<string, unknown> | undefined)?.[startField]
    if (!value || !start) return true
    return new Date(String(value)) >= new Date(String(start)) || `The ${label} must be on or after the start.`
  }
