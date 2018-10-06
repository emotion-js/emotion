// @flow

export const testAlwaysTrue = () => true

export const pickAssign: (
  testFn: (key: string) => boolean,
  target: {},
  ...sources: Array<{}>
) => Object = function(testFn, target) {
  let i = 2
  let length = arguments.length
  for (; i < length; i++) {
    let source = arguments[i]
    let key
    for (key in source) {
      if (testFn(key)) {
        target[key] = source[key]
      }
    }
  }
  return target
}

export function interleave(vals: Array<*>) {
  let strings = vals[0]
  let finalArray = [strings[0]]
  for (let i = 1, len = vals.length; i < len; i++) {
    finalArray.push(vals[i])
    if (strings[i] !== undefined) {
      finalArray.push(strings[i])
    }
  }
  return finalArray
}
