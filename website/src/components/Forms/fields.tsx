import React from 'react'

import { cn } from '@/utilities/ui'

const inputBase =
  'w-full rounded-full border border-linen bg-white/90 px-5 py-3 text-ink placeholder:text-ink-soft/60 focus:border-bronze focus:outline-none focus:ring-2 focus:ring-bronze/30 [.tone-charcoal_&]:bg-charcoal [.tone-charcoal_&]:text-cream [.tone-charcoal_&]:border-cream/30'

export const Field: React.FC<{
  label: string
  id: string
  required?: boolean
  hint?: string
  children: React.ReactNode
  className?: string
}> = ({ label, id, required, hint, children, className }) => (
  <div className={cn('grid gap-1.5', className)}>
    <label htmlFor={id} className="text-[1rem] font-medium">
      {label}
      {required && <span aria-hidden="true" className="text-cocoa"> *</span>}
    </label>
    {children}
    {hint && <p className="text-[0.9rem] text-ink-soft">{hint}</p>}
  </div>
)

export const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = ({ className, ...p }) => (
  <input className={cn(inputBase, className)} {...p} />
)
export const Textarea: React.FC<React.TextareaHTMLAttributes<HTMLTextAreaElement>> = ({ className, ...p }) => (
  <textarea className={cn(inputBase, 'min-h-[8rem] rounded-2xl', className)} {...p} />
)
export const Select: React.FC<React.SelectHTMLAttributes<HTMLSelectElement>> = ({ className, children, ...p }) => (
  <select className={cn(inputBase, 'appearance-none', className)} {...p}>
    {children}
  </select>
)
