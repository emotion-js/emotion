// @flow
import PropTypes from 'prop-types'

export const channel = '__EMOTION_THEMING__'

export const contextTypes = {
  [channel]: PropTypes.object
}

export function setTheme(theme: Object) {
  this.setState({ theme })
}

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

// export function interleave(vals: Array<*>) {
//   let strings = vals[0]
//   let finalArray = [strings[0]]
//   for (let i = 1, len = vals.length; i < len; i++) {
//     finalArray.push(vals[i])
//     if (strings[i + 1] !== undefined) {
//       finalArray.push(strings[i + 1])
//     }
//   }
//   return finalArray
// }

export function interleave([strings, ...interpolations]: any) {
  return interpolations.reduce(
    function(array, interp, i) {
      return array.concat([interp], strings[i + 1])
    },
    [strings[0]]
  )
}
