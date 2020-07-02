/// <reference types="jest" />

type SnapshotSerializerPlugin = Extract<
  jest.SnapshotSerializerPlugin,
  { serialize: any }
>

export const test: SnapshotSerializerPlugin['test']
export const serialize: SnapshotSerializerPlugin['serialize']
