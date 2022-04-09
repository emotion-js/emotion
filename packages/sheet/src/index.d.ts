export declare type Options = {
  nonce?: string
  key: string
  container: HTMLElement
  speedy?: boolean
  prepend?: boolean
  insertionPoint?: HTMLElement
}
export declare class StyleSheet {
  isSpeedy: boolean
  ctr: number
  tags: HTMLStyleElement[]
  container: HTMLElement
  key: string
  nonce: string | undefined
  prepend: boolean | undefined
  before: Element | null
  insertionPoint: HTMLElement | undefined
  private _alreadyInsertedOrderInsensitiveRule
  constructor(options: Options)
  private _insertTag
  hydrate(nodes: HTMLStyleElement[]): void
  insert(rule: string): void
  flush(): void
}
