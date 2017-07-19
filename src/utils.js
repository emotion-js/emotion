// @flow
export function omit (obj: { [string]: any }, keys: Array<string>) {
  let target: { [string]: any } = {}
  let i: string
  for (i in obj) {
    if (keys.indexOf(i) !== -1) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}

export function keys (obj: { [string]: any }) {
  let k: string
  let out: Array<string> = []
  for (k in obj) {
    out.push(k)
  }
  return out
}

export function forEach (
  arr: Array<any>,
  fn: (item: any, index: number, arr: Array<any>) => void
) {
  let i = 0
  let len = arr.length

  for (; i < len; i++) {
    fn(arr[i], i, arr)
  }
}

export function map (
  arr: Array<any>,
  fn: (item: any, index: number, arr: Array<any>) => any
) {
  if (arr == null) {
    return []
  }

  let i = 0
  let len = arr.length
  let out = new Array(len)

  for (; i < len; i++) {
    out[i] = fn(arr[i], i, arr)
  }

  return out
}
