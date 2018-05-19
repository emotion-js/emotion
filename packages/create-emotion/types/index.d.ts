// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.3

import * as CSS from 'csstype';

export interface MultiDimensionalArray<T> extends Array<T | MultiDimensionalArray<T>> {}

export type CSSBaseObject = CSS.PropertiesFallback<number | string>;
export type CSSPseudoObject<C> = { [K in CSS.Pseudos]?: CSSObject<C> };
export interface CSSOthersObject<C> {
  [propertiesName: string]: Interpolation<C>;
}
export interface CSSObject<C> extends CSSBaseObject, CSSPseudoObject<C>, CSSOthersObject<C> {}

export type FunctionInterpolation<C> = (mergedProps: any, context: C) => Interpolation<C> | void;

export interface ArrayInterpolation<C> extends Array<Interpolation<C>> {}

export type Interpolation<C> =
  | undefined | null | boolean | string | number
  | CSSObject<C>
  | ArrayInterpolation<C>
  | FunctionInterpolation<C>
  ;

export type FunctionClassNameArg = () => ClassNameArg | void;
export interface ArrayClassNameArg extends Array<ClassNameArg> {}

export type ClassNameArg =
  | undefined | null | boolean | string
  | { [key: string]: boolean }
  | FunctionClassNameArg
  | ArrayClassNameArg
  ;

export interface StyleSheet {
  inject(): void;
  speedy(bool: boolean): void;
  insert(rule: string, sourceMap?: string): void;
  flush(): void;
}

export interface EmotionCache {
  registered: {
    [key: string]: string;
  };
  inserted: {
    [key: string]: string;
  };
  nonce?: string;
  key: string;
}

export interface Emotion<C> {
  flush(): void;
  hydrate(ids: Array<string>): void;
  cx(...classNames: Array<ClassNameArg>): string;
  merge(className: string, sourceMap?: string): string;
  getRegisteredStyles(registeredStyles: Array<string>, classNames: string): string;
  css(...args: Array<Interpolation<C>>): string;
  injectGlobal(...args: Array<Interpolation<C>>): void;
  keyframes(...args: Array<Interpolation<C>>): string;
  sheet: StyleSheet;
  caches: EmotionCache;
}

export interface EmotionBaseContext<C> {
  __SECRET_EMOTION__?: Emotion<C>;
}

export type StylisPlugins =
  | null
  | ((...args: Array<any>) => any)
  | Array<(...args: Array<any>) => any>
  ;

export interface EmotionOption {
  nonce?: string;
  stylisPlugins?: StylisPlugins;
  prefix?: boolean | ((key: string, value: string, context: 1 | 2 | 3) => boolean);
  key?: string;
  container?: HTMLElement;
}

export default function createEmotion<C extends EmotionBaseContext<C>>(context: C, options?: EmotionOption): Emotion<C>;
