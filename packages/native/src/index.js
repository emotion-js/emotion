import * as reactNative from 'react-native'
import { createCss } from '@emotion/primitives-core'

import { styled } from './base'

const css = createCss(reactNative.StyleSheet)

const components = Object.keys(reactNative)

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
