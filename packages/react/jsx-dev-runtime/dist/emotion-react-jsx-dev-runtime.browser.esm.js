import 'react'
import '@emotion/cache'
import {
  h as hasOwnProperty,
  E as Emotion,
  c as createEmotionProps
} from '../../dist/emotion-element-a8309070.browser.esm.js'
import '@babel/runtime/helpers/extends'
import '@emotion/weak-memoize'
import 'hoist-non-react-statics'
import '../../isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.browser.esm.js'
import '@emotion/utils'
import '@emotion/serialize'
import {
  Fragment as Fragment$1,
  jsxDEV as jsxDEV$1
} from 'react/jsx-dev-runtime'

var Fragment = Fragment$1
function jsxDEV(type, props, key, isStaticChildren, source, self) {
  if (!hasOwnProperty.call(props, 'css')) {
    return jsxDEV$1(type, props, key, isStaticChildren, source, self)
  }

  return jsxDEV$1(
    Emotion,
    createEmotionProps(type, props),
    key,
    isStaticChildren,
    source,
    self
  )
}

export { Fragment, jsxDEV }
