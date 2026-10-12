import type { CollectionBeforeValidateHook } from 'payload'
import { ValidationError } from 'payload'

const MB = 1024 * 1024
export const UPLOAD_LIMITS = {
  image: 10 * MB,
  pdf: 20 * MB,
  video: 60 * MB,
}

/** Sensible per-type file size limits with a plain-English error. */
export const validateUpload: CollectionBeforeValidateHook = ({ data, req, collection }) => {
  const file = req.file
  if (!file) return data
  const mime = file.mimetype || ''
  const size = file.size || 0
  let limit = UPLOAD_LIMITS.image
  let label = 'Images'
  if (mime === 'application/pdf') {
    limit = UPLOAD_LIMITS.pdf
    label = 'PDFs'
  } else if (mime.startsWith('video/')) {
    limit = UPLOAD_LIMITS.video
    label = 'Videos'
  }
  if (size > limit) {
    throw new ValidationError({
      collection: collection?.slug,
      errors: [
        {
          path: 'file',
          message: `${label} must be under ${Math.round(limit / MB)} MB. This file is ${(size / MB).toFixed(1)} MB. Please compress it and try again.`,
        },
      ],
    })
  }
  return data
}
