// @flow
import pkg from '../package.json'
export type { SerializedStyles } from '@emotion/utils'
export {
  withEmotionCache,
  CacheProvider,
  __unsafe_useEmotionCache
} from './context'
export { jsx } from './jsx'
export { jsx as createElement } from './jsx'
export { Global } from './global'
export { keyframes } from './keyframes'
export { ClassNames } from './class-names'
export { ThemeContext, useTheme, ThemeProvider, withTheme } from './theming'
export { default as css } from './css'

if (process.env.NODE_ENV !== 'production') {
  const isBrowser = typeof document !== 'undefined'
  // #1727 for some reason Jest evaluates modules twice if some consuming module gets mocked with jest.mock
  const isJest = typeof jest !== 'undefined'

  if (isBrowser && !isJest) {
    // globalThis has wide browser support - https://caniuse.com/?search=globalThis, Node.js 12 and later
    const globalContext =
      // $FlowIgnore
      typeof globalThis !== 'undefined'
        ? globalThis // eslint-disable-line no-undef
        : isBrowser
        ? window
        : global
    const globalKey = `__EMOTION_REACT_${pkg.version.split('.')[0]}__`
    if (globalContext[globalKey]) {
      console.warn(
        'You are loading @emotion/react when it is already loaded. Running ' +
          'multiple instances may cause problems. This can happen if multiple ' +
          'versions are used, or if multiple builds of the same version are ' +
          'used.'
      )
    }
    globalContext[globalKey] = true
  }
}
