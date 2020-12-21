export type Options = {
  nonce?: string
  key: string
  container: HTMLElement
  speedy?: boolean
  prepend?: boolean
}
export class StyleSheet {
  constructor(options: Options)
  isSpeedy: boolean
  ctr: number
  tags: HTMLStyleElement[]
  container: HTMLElement
  key: string
  nonce: string | void
  prepend: boolean | void
  before: Element | null
  _insertTag: (tag: HTMLStyleElement) => void
  hydrate(nodes: HTMLStyleElement[]): void
  insert(rule: string): void
  flush(): void
}
