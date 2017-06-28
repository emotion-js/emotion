declare module "emotion/styled" {
  import { Component } from "react";

  export type Styler = (
    content: TemplateStringsArray,
    vars?: string[] | number[],
  ) => Component;

  export default function(tag: Component): Styler;
  export default function(
    tag: keyof HTMLElementTagNameMap,
    cls?: string,
  ): Styler;
}
