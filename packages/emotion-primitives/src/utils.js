import PropTypes from 'prop-types'
import channel from './channel'

export const contextTypes = {
  [channel]: PropTypes.object
}

export function setTheme(theme) {
  this.setState({ theme })
}

export const testAlwaysTrue = () => true

export const pickAssign = function(testFn, target) {
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

export { default as channel } from './channel'
