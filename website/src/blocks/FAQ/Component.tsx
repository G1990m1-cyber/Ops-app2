import React from 'react'

import RichText from '@/components/RichText'
import { Section, SectionHeading } from '@/components/Section'
import type { FAQBlock as F } from '@/payload-types'
import { lexicalToPlainText } from '@/utilities/lexicalToPlainText'

export const FAQBlockComponent: React.FC<F> = ({ heading, items, style }) => {
  if (!items?.length) return null
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((i) => ({
      '@type': 'Question',
      name: i.question,
      acceptedAnswer: { '@type': 'Answer', text: lexicalToPlainText(i.answer) },
    })),
  }
  return (
    <Section style={style}>
      <SectionHeading heading={heading} align={style?.align} />
      <div className="measure-wide divide-y divide-linen [.tone-charcoal_&]:divide-cream/15" data-reveal>
        {items.map((item) => (
          <details key={item.id} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[1.25rem] font-medium marker:content-none [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="relative h-6 w-6 shrink-0 text-bronze [.tone-charcoal_&]:text-gold" aria-hidden="true">
                <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform group-open:rotate-90 group-open:opacity-0" />
              </span>
            </summary>
            <div className="pt-3 text-[1.05rem]">
              <RichText data={item.answer} />
            </div>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Section>
  )
}
