import React from 'react'

import { cn } from '@/utilities/ui'

export type BlockStyle = {
  tone?: 'cream' | 'sand' | 'linen' | 'charcoal' | null
  spacing?: 'compact' | 'normal' | 'generous' | null
  align?: 'left' | 'center' | null
} | null

const toneClass: Record<string, string> = {
  cream: 'tone-cream',
  sand: 'tone-sand',
  linen: 'tone-linen',
  charcoal: 'tone-charcoal',
}
const spacingClass: Record<string, string> = {
  compact: 'py-10 md:py-14',
  normal: 'py-16 md:py-24',
  generous: 'py-24 md:py-36',
}

type Props = {
  style?: BlockStyle
  className?: string
  innerClassName?: string
  id?: string
  children: React.ReactNode
  as?: 'section' | 'div' | 'aside'
  flush?: boolean
}

/** Wraps every block: tone, vertical rhythm and horizontal gutters come from the editor's choices. */
export const Section: React.FC<Props> = ({ style, className, innerClassName, id, children, as = 'section', flush }) => {
  const Tag = as
  const tone = style?.tone || 'cream'
  const spacing = style?.spacing || 'normal'
  return (
    <Tag id={id} className={cn(toneClass[tone], spacingClass[spacing], className)} data-tone={tone}>
      <div className={cn(!flush && 'container-site', style?.align === 'center' && 'text-center', innerClassName)}>
        {children}
      </div>
    </Tag>
  )
}

export const SectionHeading: React.FC<{
  eyebrow?: string | null
  heading?: string | null
  intro?: string | null
  align?: 'left' | 'center' | null
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}> = ({ eyebrow, heading, intro, align, className, as = 'h2' }) => {
  if (!eyebrow && !heading && !intro) return null
  const H = as
  return (
    <div className={cn('mb-10 md:mb-14', align === 'center' ? 'mx-auto text-center measure-wide' : 'measure-wide', className)} data-reveal>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      {heading && <H className="font-display text-[2rem] leading-[1.1] md:text-[2.75rem]">{heading}</H>}
      {intro && <p className="mt-4 text-ink-soft md:text-[1.3rem] [.tone-charcoal_&]:text-cream/85">{intro}</p>}
    </div>
  )
}
