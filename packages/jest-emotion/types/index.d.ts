// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.4

/// <reference types="jest" />
export interface EmotionMatchers extends jest.ExpectExtendMap {
  toHaveStyleRule(
    received: any,
    property: string,
    value: any
  ): { message(): string; pass: boolean }
}
export const matchers: EmotionMatchers

export interface CreateSerializerOptions {
  classNameReplacer?: (className: string, index: number) => string
  DOMElements?: boolean
}
export function createSerializer(
  options?: CreateSerializerOptions
): jest.SnapshotSerializerPlugin
export const print: jest.SnapshotSerializerPlugin['print']
export const test: jest.SnapshotSerializerPlugin['test']
declare const serializer: jest.SnapshotSerializerPlugin
export default serializer

declare global {
  namespace jest {
    interface Matchers<R> {
      toHaveStyleRule(property: string, value: any): R
    }
  }
}
