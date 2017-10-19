export type Interpolation = string | number | boolean | null | undefined | _Interpolation1 | _Interpolation2 | _Interpolation3;

// HACK: See https://github.com/Microsoft/TypeScript/issues/3496#issuecomment-128553540
interface _Interpolation1 extends Record<string, Interpolation> {}
interface _Interpolation2 extends Array<Interpolation> {}
interface _Interpolation3 {
  (): Interpolation;
}

export type CreateStyles<TRet> = ((...values: Interpolation[]) => TRet)
  & ((strings: TemplateStringsArray, ...vars: Interpolation[]) => TRet);

export interface StylisUse {
  // TODO: Make this more precise than just Function
  (plugin: Function | Function[] | null): StylisUse;
}

export interface StyleSheet {
  inject(): void;
  speedy(bool: boolean): void;
  insert(rule: string, sourceMap: string): void;
  flush(): void;
}

export const sheet: StyleSheet;

export const useStylisPlugin: StylisUse;

export const inserted: Record<string, boolean | undefined>;

export const registered: Record<string, string | undefined>;

export function flush(): void;

export const css: CreateStyles<string>;

export const injectGlobal: CreateStyles<void>;

export const keyframes: CreateStyles<string>;

export const fontFace: CreateStyles<void>;

export function getRegisteredStyles(registeredStyles: string[], classNames: string): string;

export function cx(...interpolations: Interpolation[]): string;

export function hydrate(ids: string[]): void;

declare module 'react' {
  interface HTMLAttributes<T> {
    css?: Interpolation;
  }
}
