// @flow

export function throwIfFalsy(something: *) {
  if (something) {
    return something
  }
  throw new Error('something is falsy')
}
