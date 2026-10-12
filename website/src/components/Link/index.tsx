import Link from 'next/link'
import React from 'react'

import { BookNowButton } from '@/components/BookNow/BookNowButton'
import { Button, type ButtonSize, type ButtonVariant } from '@/components/ui/Button'
import type { Hotel, Page } from '@/payload-types'
import { cn } from '@/utilities/ui'

export type CMSLinkType = {
  type?: 'custom' | 'reference' | 'book' | null
  newTab?: boolean | null
  reference?: { relationTo: 'pages' | 'hotels'; value: Page | Hotel | number | string } | null
  url?: string | null
  bookHotel?: Hotel | number | string | null
  label?: string | null
  appearance?: 'primary' | 'secondary' | 'link' | 'inline' | string | null
  className?: string
  size?: ButtonSize
  children?: React.ReactNode
  /** Hotel the surrounding page is about: lets a bare "Book Now" link pick the right engine. */
  contextHotel?: Hotel | null
  onImage?: boolean
}

export const hrefFromReference = (reference: CMSLinkType['reference']): string | null => {
  if (!reference || typeof reference.value !== 'object' || !reference.value) return null
  const slug = (reference.value as { slug?: string | null }).slug
  if (!slug) return null
  return slug === 'home' ? '/' : `/${slug}`
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const { type, newTab, reference, url, label, appearance = 'inline', className, size, children, bookHotel, contextHotel, onImage } = props

  if (type === 'book') {
    const hotel = bookHotel && typeof bookHotel === 'object' ? bookHotel : contextHotel || null
    return (
      <BookNowButton
        hotel={hotel}
        label={label || 'Book now'}
        variant={onImage ? 'onImage' : appearance === 'secondary' ? 'secondary' : 'primary'}
        size={size}
        className={className}
        placement="block"
      />
    )
  }

  const href = type === 'reference' ? hrefFromReference(reference) : url || null
  if (!href) return null

  if (appearance === 'inline' || !appearance) {
    const tabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    return (
      <Link className={cn(className)} href={href} {...tabProps}>
        {label}
        {children}
      </Link>
    )
  }

  let variant: ButtonVariant = appearance === 'secondary' ? 'secondary' : appearance === 'link' ? 'link' : 'primary'
  if (onImage && variant === 'primary') variant = 'onImage'

  return (
    <Button href={href} newTab={Boolean(newTab)} variant={variant} size={size} className={className}>
      {label}
      {children}
    </Button>
  )
}
