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
