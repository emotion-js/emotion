// @flow
export type RegisteredCache = { [string]: string }

interface StyleSheet {
  container: HTMLElement;
  nonce: string | void;
  key: string;
  insert(rule: string): void;
  flush(): void;
  tags: Array<HTMLStyleElement>;
}

export type EmotionCache = {
  stylis: (string, string) => Array<string>,
  inserted: { [string]: string | true },
  registered: RegisteredCache,
  sheet: StyleSheet,
  theme: Object,
  key: string,
  compat?: true,
  nonce?: string
}

export type Interpolation = any

export type SerializedStyles = {|
  name: string,
  styles: string,
  map?: string,
  next?: SerializedStyles
|}
