// @flow
export type RegisteredCache = { [string]: string }

interface StyleSheet {
  container: HTMLElement;
  insert(rule: string): void;
  flush(): void;
}

export type CSSContextType = {
  stylis: (string, string) => Array<string>,
  inserted: { [string]: string | true },
  registered: RegisteredCache,
  sheet: StyleSheet,
  theme: Object,
  key: string,
  compat?: true
}

export type Interpolation = any

export type ScopedInsertableStyles = {|
  name: string,
  styles: string
|}
