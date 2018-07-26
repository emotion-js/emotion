// @flow

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
