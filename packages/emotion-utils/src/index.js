// @flow weak
export function memoize(fn) {
  const cache = {}
  return arg => {
    if (cache[arg] === undefined) cache[arg] = fn(arg)
    return cache[arg]
  }
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

export const unitless = {
  animationIterationCount: 1,
  borderImageOutset: 1,
  borderImageSlice: 1,
  borderImageWidth: 1,
  boxFlex: 1,
  boxFlexGroup: 1,
  boxOrdinalGroup: 1,
  columnCount: 1,
  columns: 1,
  flex: 1,
  flexGrow: 1,
  flexPositive: 1,
  flexShrink: 1,
  flexNegative: 1,
  flexOrder: 1,
  gridRow: 1,
  gridRowEnd: 1,
  gridRowSpan: 1,
  gridRowStart: 1,
  gridColumn: 1,
  gridColumnEnd: 1,
  gridColumnSpan: 1,
  gridColumnStart: 1,
  fontWeight: 1,
  lineClamp: 1,
  lineHeight: 1,
  opacity: 1,
  order: 1,
  orphans: 1,
  tabSize: 1,
  widows: 1,
  zIndex: 1,
  zoom: 1,

  // SVG-related properties
  fillOpacity: 1,
  floodOpacity: 1,
  stopOpacity: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
  strokeMiterlimit: 1,
  strokeOpacity: 1,
  strokeWidth: 1
}

export { hashString } from './hash'
export { default as Stylis } from './stylis'
