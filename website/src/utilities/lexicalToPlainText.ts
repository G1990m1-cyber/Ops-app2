type LexicalNode = { type?: string; text?: string; children?: LexicalNode[] }
type LexicalState = { root?: LexicalNode } | null | undefined

/** Flattens a Lexical rich-text value to plain text (for SEO fallbacks and search previews). */
export const lexicalToPlainText = (value: unknown): string => {
  const state = value as LexicalState
  if (!state || typeof state !== 'object' || !state.root) return ''
  const out: string[] = []
  const walk = (node: LexicalNode) => {
    if (typeof node.text === 'string') out.push(node.text)
    if (Array.isArray(node.children)) {
      node.children.forEach(walk)
      if (node.type === 'paragraph' || node.type === 'heading' || node.type === 'listitem') out.push(' ')
    }
  }
  walk(state.root)
  return out.join('').replace(/\s+/g, ' ').trim()
}
