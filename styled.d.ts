declare module "emotion" {
  export type InputValue = string | number;

  export function flush(): void;
  export function css(
    cls: string,
    content: TemplateStringsArray,
    ...vars: InputValue[],
  ): string;

  export function fragment(
    content: TemplateStringsArray,
    ...vars: InputValue[],
  ): string;

  export function keyframes(
    kfm: string,
    content: TemplateStringsArray,
    ...vars: InputValue[],
  ): string;

  export function fontFace(
    fontRules: string,
    content: TemplateStringsArray,
    ...vars: InputValue[],
  ): string;

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
