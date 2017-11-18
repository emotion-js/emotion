import { createElement, Component } from 'preact'
import * as emotion from 'emotion'
import { channel, contextTypes } from '../../emotion-theming/src/utils'
import createEmotionStyled from 'create-emotion-styled'

export default createEmotionStyled(emotion, {
  channel,
  contextTypes,
  createElement,
  Component
})

export * from 'emotion'
