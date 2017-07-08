// @flow
export function omit (
  obj: { [string]: any },
  keys: Array<string>
) {
  let target: { [string]: any } = {}
  for (let i in obj) {
    if (keys.indexOf(i) >= 0) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}
