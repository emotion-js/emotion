/// <reference types="jest" />

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
