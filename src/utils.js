// @flow
export function omit (
  obj: { [string]: any },
  keys: Array<string>
) {
  let target: { [string]: any } = {}
  let i: string
  for (i in obj) {
    if (keys.indexOf(i) !== -1) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}

export function keys (
  obj: { [string]: any }
) {
  let k: string
  let out: Array<string> = []
  for (k in obj) {
    out.push(k);
  }
  return out
}
