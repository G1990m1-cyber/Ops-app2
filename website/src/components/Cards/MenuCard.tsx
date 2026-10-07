import React from 'react'

import { Icon } from '@/components/Icons'
import { Button } from '@/components/ui/Button'
import type { Menu } from '@/payload-types'
import { cn } from '@/utilities/ui'

const TYPE_LABEL: Record<string, string> = {
  food: 'Food',
  drinks: 'Drinks',
  breakfast: 'Breakfast',
  sunday: 'Sunday lunch',
  'afternoon-tea': 'Afternoon tea',
  christmas: 'Christmas',
  specials: 'Specials',
  children: 'Children',
  other: 'Menu',
}

const DIET: [string, string][] = [['v', 'V'], ['vg', 'VG'], ['gf', 'GF'], ['df', 'DF'], ['n', 'N']]
const dietaryTags = (d?: Record<string, boolean | null | undefined> | null) => DIET.filter(([k]) => d?.[k]).map(([, label]) => label)

export const MenuCard: React.FC<{ menu: Menu; index?: number; className?: string }> = ({ menu, index = 0, className }) => {
  const pdf = menu.pdf && typeof menu.pdf === 'object' ? menu.pdf : null
  const structured = menu.format === 'structured' && Array.isArray(menu.sections) && menu.sections.length > 0

  return (
    <article
      className={cn('rounded-2xl p-6 md:p-8 [.tone-cream_&]:bg-sand/70 [.tone-sand_&]:bg-cream [.tone-linen_&]:bg-cream/70 [.tone-charcoal_&]:bg-white/5', className)}
      data-reveal
      style={{ '--reveal-delay': `${Math.min(index, 5) * 80}ms` } as React.CSSProperties}
    >
      <p className="eyebrow mb-2">{TYPE_LABEL[menu.type] || 'Menu'}</p>
      <h3 className="font-display text-[1.6rem] leading-tight">{menu.title}</h3>
      {menu.note && <p className="mt-2 text-[1rem] text-ink-soft [.tone-charcoal_&]:text-cream/70">{menu.note}</p>}

      {pdf?.url && (
        <div className="mt-5">
          <Button href={pdf.url} newTab variant="secondary" size="sm">
            <Icon name="pdf" className="h-5 w-5" /> Open menu (PDF)
          </Button>
        </div>
      )}

      {structured && (
        <div className="mt-6 grid gap-8">
          {menu.sections!.map((section) => (
            <div key={section.id}>
              <h4 className="font-body text-[1.3rem] font-medium">{section.title}</h4>
              {section.description && <p className="text-[1rem] text-ink-soft [.tone-charcoal_&]:text-cream/70">{section.description}</p>}
              <ul className="mt-3 divide-y divide-linen/70 [.tone-charcoal_&]:divide-cream/15">
                {(section.items || []).map((item) => (
                  <li key={item.id} className="flex items-baseline justify-between gap-4 py-2.5">
                    <div className="min-w-0">
                      <p className="leading-snug">
                        {item.name}
                        {dietaryTags(item.dietary).length > 0 && (
                          <span className="ml-2 text-[0.8rem] tracking-wider text-bronze [.tone-charcoal_&]:text-gold">
                            {dietaryTags(item.dietary).join(' ')}
                          </span>
                        )}
                      </p>
                      {item.description && <p className="text-[0.98rem] text-ink-soft [.tone-charcoal_&]:text-cream/70">{item.description}</p>}
                    </div>
                    {item.price && <span className="shrink-0 tabular-nums">{/^\d/.test(item.price) ? `£${item.price}` : item.price}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </article>
  )
}
