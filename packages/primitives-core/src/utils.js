// @flow

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
