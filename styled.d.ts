declare module "emotion" {
  export const inserted: Record<string, boolean | undefined>;

  export type InputValue = string | number;

  export function values(cls: string, vars: InputValue[]): string;

  export function flush(): void;

  export function css(
    cls: string,
    content: TemplateStringsArray,
    ...vars: InputValue[],
  ): string;

  export function injectGlobal(src: string[]): void;
  export const fontFace = injectGlobal;

  export function keyframes(kfm: string, src: string[]): string;

  export function hydrate(ids: string[]): void;
}

declare module "emotion/styled" {
  import { ComponentClass, StatelessComponent } from "react";

  type Component<P> = ComponentClass<P> | StatelessComponent<P>;

  export type InterpolationValue = string | number;

  export type Tagged = (
    content: TemplateStringsArray,
    ...vars: InterpolationValue[],
  ) => Component<any>;

  export default function(tag: Component<any>): Tagged;
  export default function(
    tag: keyof HTMLElementTagNameMap,
    cls?: string,
  ): Tagged;
}

declare module "emotion/server" {
  export interface Rule {
    cssText: string;
  }

  export interface Result {
    html: string;
    ids: Record<string, boolean | undefined>;
    css: string;
    rules: Rule[];
  }

  export function renderStatic(fn: () => string | undefined): Result;
  export function renderStaticOptimized(fn: () => string | undefined): Result;
}
