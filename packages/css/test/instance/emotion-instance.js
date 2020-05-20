// @flow
import createEmotion from '@emotion/css/create-instance'
import createEmotionServer from '@emotion/server/create-instance'
import { transform } from 'cssjanus'

function stylisPlugin(context, content) {
  if (context === 2) {
    return transform(content)
  }
}

export let container

if (typeof document !== 'undefined') {
  container = document.createElement('div')
  // $FlowFixMe
  document.head.appendChild(container)
}

const emotion = createEmotion({
  stylisPlugins: stylisPlugin,
  prefix: (key, value) => {
    if (key === 'display' && value === 'flex') {
      return false
    }
    return true
  },
  nonce: 'some-nonce',
  key: 'some-key',
  container
})

export const {
  flush,
  cx,
  merge,
  getRegisteredStyles,
  injectGlobal,
  keyframes,
  css,
  sheet,
  cache
} = emotion

export const {
  extractCritical,
  renderStylesToString,
  renderStylesToNodeStream
} = createEmotionServer(cache)

export { default } from '@emotion/styled'
