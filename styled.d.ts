declare module "emotion/styled" {
  import { Component } from "react";

  export default function(
    tag: keyof HTMLElementTagNameMap | Component,
    cls?: string,
    vars?: any[],
    content?: () => string[],
  ): Component;
}
