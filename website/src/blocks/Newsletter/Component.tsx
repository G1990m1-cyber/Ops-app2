import React from 'react'

import { NewsletterForm } from '@/components/Forms/NewsletterForm'
import { Section } from '@/components/Section'
import type { NewsletterBlock as N } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const NewsletterBlockComponent: React.FC<N> = ({ heading, text, consentText, style }) => (
  <Section style={{ ...style, tone: style?.tone || 'sand' }}>
    <div className={cn('grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-16', style?.align === 'center' && 'lg:grid-cols-1 lg:text-center')} data-reveal>
      <div className={cn(style?.align === 'center' && 'mx-auto measure-wide')}>
        <h2 className="font-display text-[2rem] leading-[1.08] md:text-[2.5rem]">{heading}</h2>
        {text && <p className="mt-3 text-ink-soft [.tone-charcoal_&]:text-cream/80">{text}</p>}
      </div>
      <NewsletterForm consentText={consentText} className={cn(style?.align === 'center' && 'mx-auto w-full max-w-2xl')} />
    </div>
  </Section>
)
