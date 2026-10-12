import React from 'react'

import { FACILITIES } from '@/collections/facilities'
import { Icon } from '@/components/Icons'
import { Section, SectionHeading } from '@/components/Section'
import type { FacilitiesBlock as F, Hotel } from '@/payload-types'

export const FacilitiesBlock: React.FC<F & { contextHotel?: Hotel | null }> = ({ heading, source, items, style, contextHotel }) => {
  const list =
    source === 'custom'
      ? (items || []).map((i) => ({ icon: i.icon, label: i.label, description: i.description }))
      : (contextHotel?.facilities || []).map((v) => ({ icon: v, label: FACILITIES.find((f) => f.value === v)?.label || v, description: null }))
  if (!list.length) return null
  return (
    <Section style={style} id="facilities">
      <SectionHeading heading={heading} align={style?.align} />
      <ul className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-5">
        {list.map((f, i) => (
          <li key={`${f.icon}-${i}`} className="flex flex-col items-start gap-3" data-reveal style={{ '--reveal-delay': `${(i % 5) * 60}ms` } as React.CSSProperties}>
            <Icon name={f.icon} className="h-8 w-8 text-bronze [.tone-charcoal_&]:text-gold" />
            <div>
              <p className="leading-snug">{f.label}</p>
              {f.description && <p className="text-[0.95rem] text-ink-soft [.tone-charcoal_&]:text-cream/70">{f.description}</p>}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
