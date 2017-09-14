// @flow weak
export function omit(
  obj: { [string]: any },
  testFn: (key: string, obj: any) => boolean
) {
  let target: { [string]: any } = {}
  let i: string
  for (i in obj) {
    if (!testFn(i, obj)) continue
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue
    target[i] = obj[i]
  }
  return target
}

export function keys(obj: { [string]: any }) {
  let k: string
  let out: Array<string> = []
  for (k in obj) {
    out.push(k)
  }
  return out
}

export function forEach(
  arr: Array<any>,
  fn: (item: any, index: number, arr: Array<any>) => void
) {
  let i = 0
  let len = arr.length

  for (; i < len; i++) {
    fn(arr[i], i, arr)
  }
}

export function map(
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

export function reduce(
  arr: Array<any>,
  fn: (out: Array<any>, item: any, index: number, arr: Array<any>) => any,
  val: any
) {
  if (arr == null) {
    return []
  }

  let i = 0
  let len = arr.length
  let out = val

  if (out === void 0) {
    out = arr[0]
    i = 1
  }

  for (; i < len; i++) {
    out = fn(out, arr[i], i, arr)
  }

  return out
}

export const assign: any =
  Object.assign ||
  function(target) {
    let i = 1
    let length = arguments.length
    for (; i < length; i++) {
      var source = arguments[i]
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key]
        }
      }
    }
    return target
  }

export * from './hash'
export { default as clean } from './glamor/clean'
export * from './glamor/CSSPropertyOperations'
