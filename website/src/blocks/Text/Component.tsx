import React from 'react'

import RichText from '@/components/RichText'
import { Section } from '@/components/Section'
import type { TextBlock as TextBlockType } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const TextBlock: React.FC<TextBlockType> = ({ eyebrow, richText, narrow, style }) => (
  <Section style={style}>
    <div className={cn(narrow !== false ? 'measure' : 'measure-wide', style?.align === 'center' && 'mx-auto')} data-reveal>
      {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
      <RichText data={richText} />
    </div>
  </Section>
)
