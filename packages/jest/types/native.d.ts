/// <reference types="jest" />

export interface EmotionNativeMatchers extends jest.ExpectExtendMap {
  toHaveStyleRule(
    received: any,
    property: string,
    value: any
  ): { message(): string; pass: boolean }
}

export const matchers: EmotionNativeMatchers

declare global {
  namespace jest {
    interface Matchers<R, T> {
      toHaveStyleRule(property: string, value: any): R
    }
  }
}
