// @flow
import createEmotion from 'create-emotion'
import createEmotionStyled from 'create-emotion-styled'
import createEmotionServer from 'create-emotion-server'
import { transform } from 'cssjanus'
import { createElement, Component } from 'react'
import { channel, contextTypes } from 'emotion-theming'

function stylisPlugin(context, content) {
  if (context === 2) {
    return transform(content)
  }
}

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
    nonce: 'some-nonce'
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
  caches
} = emotion

export const {
  extractCritical,
  renderStylesToString,
  renderStylesToNodeStream
} = createEmotionServer(emotion)

export default createEmotionStyled(emotion, {
  createElement,
  Component,
  channel,
  contextTypes
})
