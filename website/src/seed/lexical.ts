/** Tiny helpers that build Lexical rich-text JSON so seed copy renders in the editor and on the site. */

type TextNode = { type: 'text'; text: string; version: 1; format: number; detail: 0; mode: 'normal'; style: '' }
const text = (t: string, format = 0): TextNode => ({ type: 'text', text: t, version: 1, format, detail: 0, mode: 'normal', style: '' })

const block = (type: string, children: unknown[], extra: Record<string, unknown> = {}) => ({
  type,
  children,
  direction: 'ltr',
  format: '',
  indent: 0,
  version: 1,
  ...extra,
})

export const p = (t: string) => block('paragraph', [text(t)], { textFormat: 0, textStyle: '' })
export const h2 = (t: string) => block('heading', [text(t)], { tag: 'h2' })
export const h3 = (t: string) => block('heading', [text(t)], { tag: 'h3' })
export const ul = (items: string[]) =>
  block(
    'list',
    items.map((it, i) => block('listitem', [text(it)], { value: i + 1 })),
    { listType: 'bullet', start: 1, tag: 'ul' },
  )

export const rich = (...nodes: unknown[]) => ({
  root: { type: 'root', children: nodes, direction: 'ltr', format: '', indent: 0, version: 1 },
})

/** One or more paragraphs from plain strings. */
export const paragraphs = (...strings: string[]) => rich(...strings.map(p))
