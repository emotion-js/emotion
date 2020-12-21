// @flow
import createEmotion from '@emotion/css/create-instance'
import createEmotionServer from '@emotion/server/create-instance'

function stylisPlugin(element) {
  if (element.type === 'decl' && element.value.startsWith('color:')) {
    element.value = `color:hotpink;`
  }
}

export let container

if (typeof document !== 'undefined') {
  container = document.createElement('div')
  // $FlowFixMe
  document.head.appendChild(container)
}

const emotion = createEmotion({
  stylisPlugins: [stylisPlugin],
  nonce: 'some-nonce',
  key: 'some-key',
  container,
})

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
  cache,
} = emotion

export const {
  extractCritical,
  renderStylesToString,
  renderStylesToNodeStream,
} = createEmotionServer(cache)

export { default } from '@emotion/styled'
