// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.2

export interface RegisteredCache {
  [key: string]: string;
}

export interface StyleSheet {
  container: HTMLElement;
  insert(rule: string): void;
  flush(): void;
}

export interface CSSContextType {
  stylis: (key: string, value: string) => Array<string>;
  inserted: {
    [key: string]: string | true;
  };
  registered: RegisteredCache;
  sheet: StyleSheet;
  theme: object;
  key: string;
  compat?: true;
}

export interface ScopedInsertableStyles {
  name: string;
  styles: string;
}

export const isBrowser: boolean;
export const shouldSerializeToReactTree: boolean;

export type Interpolation = any;

export function getRegisteredStyles(registered: RegisteredCache, registeredStyles: Array<Interpolation>, classNames: string): string;
export function insertStyles(context: CSSContextType, insertable: ScopedInsertableStyles): string | true | void;
