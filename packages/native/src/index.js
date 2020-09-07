import * as reactNative from 'react-native'
import { createCss } from '@emotion/primitives-core'

import { styled } from './base'

import * as classComponent from './classComponent'
import * as functionComponent from './functionComponent'

const css = createCss(reactNative.StyleSheet)

const components = [
  ...Object.keys(classComponent),
  ...Object.keys(functionComponent)
]

export { css }

export default components.reduce(
  (acc, comp) =>
    Object.defineProperty(acc, comp, {
      enumerable: true,
      configurable: false,
      get() {
        return styled(reactNative[comp])
      }
    }),
  styled
)
