import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import type { SerializedLinkNode } from '@payloadcms/richtext-lexical'
import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as ConvertRichText,
} from '@payloadcms/richtext-lexical/react'
import React from 'react'

import { cn } from '@/utilities/ui'

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const doc = linkNode.fields.doc
  if (!doc || typeof doc.value !== 'object' || !doc.value) return '/'
  const slug = (doc.value as { slug?: string }).slug || ''
  return slug === 'home' ? '/' : `/${slug}`
}

const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  ...LinkJSXConverter({ internalDocToHref }),
})

type Props = {
  data?: SerializedEditorState | null
  className?: string
  prose?: boolean
}

export const RichText: React.FC<Props> = ({ data, className, prose = true }) => {
  if (!data) return null
  return (
    <ConvertRichText
      converters={converters}
      data={data}
      className={cn(prose && 'prose-brand', className)}
    />
  )
}

export default RichText
