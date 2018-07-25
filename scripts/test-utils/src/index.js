// @flow

import { createSerializer } from '@emotion/snapshot-serializer'

export function throwIfFalsy(something: *) {
  if (something) {
    return something
  }
  throw new Error('something is falsy')
}

export function ignoreConsoleErrors(cb: () => mixed) {
  let oldConsoleError = console.error
  // $FlowFixMe
  console.error = () => {}
  cb()
  // $FlowFixMe
  console.error = oldConsoleError
}

if (!process.env.LEGACY_TEST) {
  expect.addSnapshotSerializer(createSerializer())
}
