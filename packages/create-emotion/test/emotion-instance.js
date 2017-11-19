// @flow
import createEmotion from 'create-emotion'
import { transform } from 'cssjanus'

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
} = createEmotion(
  // don't use a global so the options aren't cached
  {},
  {
    stylisPlugins: stylisPlugin,
    prefix: (key, value) => {
      if (key === 'display' && value === 'flex') {
        return false
      }
      return true
    }
  }
)
