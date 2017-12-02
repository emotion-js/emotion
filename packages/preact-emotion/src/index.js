import { h, Component } from 'preact'
import * as emotion from 'emotion'
import channel from '../../emotion-theming/src/channel'
import createEmotionStyled from 'create-emotion-styled'

export default createEmotionStyled(emotion, {
  channel,
  createElement: h,
  Component
})

export * from 'emotion'
