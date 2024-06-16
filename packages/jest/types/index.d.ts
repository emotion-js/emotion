// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 4.3

/// <reference types="jest" />

type SnapshotSerializerPlugin = Extract<
  jest.SnapshotSerializerPlugin,
  { serialize: any }
>

export interface StyleRuleOptions {
  target?: string | RegExp
  media?: string
}

export interface EmotionMatchers extends jest.ExpectExtendMap {
  toHaveStyleRule(
    received: any,
    property: string,
    value: any,
    options?: StyleRuleOptions
  ): { message(): string; pass: boolean }
}
export const matchers: EmotionMatchers

export interface CreateSerializerOptions {
  classNameReplacer?: (className: string, index: number) => string
  DOMElements?: boolean
  includeStyles?: boolean
}
export function createSerializer(
  options?: CreateSerializerOptions
): SnapshotSerializerPlugin

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toHaveStyleRule(
        property: string,
        value: any,
        options?: StyleRuleOptions
      ): R
    }
  }
}
