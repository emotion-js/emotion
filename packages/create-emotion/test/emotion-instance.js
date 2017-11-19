// @flow
import createEmotion from 'create-emotion'
import { transform } from 'cssjanus'

const context =
  typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined' ? window : {}

function stylisPlugin(context, content) {
  if (context === 2) {
    return transform(content)
  }
}

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  caches
} = createEmotion(context, { stylisPlugins: stylisPlugin })
