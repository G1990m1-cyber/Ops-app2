import Link from 'next/link'
import React from 'react'

import { cn } from '@/utilities/ui'

export type ButtonVariant = 'primary' | 'secondary' | 'link' | 'ghost' | 'onImage'
export type ButtonSize = 'md' | 'lg' | 'sm'

const base =
  'inline-flex items-center justify-center gap-2 font-body font-semibold tracking-[0.04em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-bronze disabled:opacity-60 disabled:pointer-events-none select-none'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-cocoa text-white hover:bg-[#6a4a38] border border-cocoa hover:border-[#6a4a38]',
  secondary: 'bg-transparent text-cocoa border border-bronze hover:bg-bronze hover:text-white',
  onImage: 'bg-cream/95 text-ink border border-cream hover:bg-white',
  ghost: 'bg-transparent text-ink border border-transparent hover:text-cocoa',
  link: 'link-underline text-cocoa px-0 py-0 border-0',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'text-[1rem] px-4 py-2',
  md: 'text-[1.05rem] px-6 py-3',
  lg: 'text-[1.125rem] px-8 py-3.5',
}

type Common = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  children: React.ReactNode
}

type AnchorProps = Common & { href: string; newTab?: boolean; onClick?: React.MouseEventHandler<HTMLAnchorElement> } & Omit<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    'href' | 'onClick'
  >
type NativeProps = Common & { href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = AnchorProps | NativeProps

export const buttonClasses = ({ variant = 'primary', size = 'md', className }: Partial<Common>) =>
  cn(base, variants[variant], variant !== 'link' && sizes[size], className)

export const Button: React.FC<ButtonProps> = (props) => {
  const { variant = 'primary', size = 'md', className, children } = props
  const classes = buttonClasses({ variant, size, className })

  if ('href' in props && typeof props.href === 'string') {
    const { href, newTab, variant: _v, size: _s, className: _c, children: _ch, ...rest } = props
    const external = /^https?:\/\//.test(href) || href.startsWith('mailto:') || href.startsWith('tel:')
    const tabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}
    if (external) {
      return (
        <a className={classes} href={href} {...tabProps} {...rest}>
          {children}
        </a>
      )
    }
    return (
      <Link className={classes} href={href} {...tabProps} {...rest}>
        {children}
      </Link>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as NativeProps
  return (
    <button className={classes} type={rest.type || 'button'} {...rest}>
      {children}
    </button>
  )
}
