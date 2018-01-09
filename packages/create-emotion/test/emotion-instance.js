// @flow
import createEmotion from 'create-emotion'
import createEmotionStyled from 'create-emotion-styled'
import createEmotionServer from 'create-emotion-server'
import { transform } from 'cssjanus'
import React from 'react'

function stylisPlugin(context, content) {
  if (context === 2) {
    return transform(content)
  }
}

export const container = document.createElement('div')

// $FlowFixMe
document.head.appendChild(container)

const emotion = createEmotion(
  // don't use a global so the options aren't cached
  {},
  {
    stylisPlugins: stylisPlugin,
    prefix: (key, value) => {
      if (key === 'display' && value === 'flex') {
        return false
      }
      return true
    },
    nonce: 'some-nonce',
    key: 'some-key',
    container,
  }
)

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
  caches,
} = emotion

export const {
  extractCritical,
  renderStylesToString,
  renderStylesToNodeStream,
} = createEmotionServer(emotion)

export default createEmotionStyled(emotion, React)
