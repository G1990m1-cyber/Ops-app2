import Link from 'next/link'
import React from 'react'

import { CookieSettingsLink } from '@/components/Consent/CookieSettingsLink'
import { Icon } from '@/components/Icons'
import { hrefFromReference } from '@/components/Link'
import { NewsletterForm } from '@/components/Forms/NewsletterForm'
import { getHotels } from '@/utilities/data'
import { getCachedGlobal } from '@/utilities/getGlobals'

const linkHref = (l: { type?: string | null; reference?: unknown; url?: string | null }) =>
  l.type === 'reference' ? hrefFromReference(l.reference as never) : l.url || null

export const Footer: React.FC = async () => {
  const [nav, settings, hotels] = await Promise.all([
    getCachedGlobal('navigation', 1)(),
    getCachedGlobal('site-settings', 1)(),
    getHotels(),
  ])
  const year = new Date().getFullYear()
  const social = settings.social || {}
  const socials = [
    { name: 'instagram', url: social.instagram },
    { name: 'facebook', url: social.facebook },
    { name: 'linkedin', url: social.linkedin },
    { name: 'x', url: social.x },
  ].filter((s) => s.url)

  return (
    <footer className="tone-charcoal pb-28 pt-16 md:pb-16 md:pt-24" aria-labelledby="footer-heading">
      <div className="container-site">
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="font-display text-[2rem] leading-none text-cream">{settings.siteName}</p>
            {settings.tagline && <p className="mt-4 max-w-sm text-cream/80">{settings.tagline}</p>}
            {nav.footerNote && <p className="mt-4 max-w-sm text-[1rem] text-cream/70">{nav.footerNote}</p>}
            {socials.length > 0 && (
              <ul className="mt-6 flex gap-4">
                {socials.map((s) => (
                  <li key={s.name}>
                    <a href={s.url!} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="text-gold transition-colors hover:text-cream">
                      <Icon name={s.name} className="h-5 w-5" />
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="lg:col-span-3">
            <p className="eyebrow mb-4">Our hotels</p>
            <ul className="grid gap-2 text-[1.05rem]">
              {hotels.map((h) => (
                <li key={h.id}>
                  <Link href={`/${h.slug}`} prefetch={false} className="link-underline text-cream/90 hover:text-cream">
                    {h.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5">
            {(nav.footerColumns || []).map((col) => (
              <div key={col.id}>
                <p className="eyebrow mb-4">{col.title}</p>
                <ul className="grid gap-2 text-[1.05rem]">
                  {(col.links || []).map((l) => {
                    const href = linkHref(l.link)
                    if (!href) return null
                    return (
                      <li key={l.id}>
                        <Link href={href} prefetch={false} className="link-underline text-cream/90 hover:text-cream">
                          {l.link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
            <div className="sm:col-span-2">
              <p className="eyebrow mb-3">Newsletter</p>
              <NewsletterForm compact />
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-cream/15 pt-6 text-[0.95rem] text-cream/65 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {settings.siteName}. {settings.contact?.companyLine || ''}
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {(nav.legalLinks || []).map((l) => {
              const href = linkHref(l.link)
              return href ? (
                <li key={l.id}>
                  <Link href={href} prefetch={false} className="hover:text-cream">
                    {l.link.label}
                  </Link>
                </li>
              ) : null
            })}
            <li>
              <CookieSettingsLink className="hover:text-cream" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
