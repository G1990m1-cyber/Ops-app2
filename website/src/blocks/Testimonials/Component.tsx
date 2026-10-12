import React from 'react'

import { Section, SectionHeading } from '@/components/Section'
import type { Hotel, Testimonial, TestimonialsBlock as T } from '@/payload-types'
import { getTestimonials } from '@/utilities/data'

import { TestimonialCarousel } from './Carousel'

export const TestimonialsBlockComponent: React.FC<T & { contextHotel?: Hotel | null }> = async ({ heading, source, items, limit, style, contextHotel }) => {
  let list: Testimonial[] = []
  if (source === 'custom' && Array.isArray(items)) list = items.filter((t): t is Testimonial => typeof t === 'object' && t !== null)
  else list = await getTestimonials(contextHotel, limit || 4)
  if (!list.length) return null
  return (
    <Section style={style}>
      <SectionHeading heading={heading} align="center" />
      <TestimonialCarousel
        items={list.map((t) => ({
          quote: t.quote,
          name: t.name,
          source: t.source || undefined,
          hotel: typeof t.hotel === 'object' && t.hotel ? t.hotel.name : undefined,
          // Only show a star rating for sources that actually give one; an email or guest-book note
          // should not display stars the guest never awarded.
          rating: ['google', 'tripadvisor', 'booking'].includes(t.source || '') ? t.rating || undefined : undefined,
        }))}
      />
    </Section>
  )
}
