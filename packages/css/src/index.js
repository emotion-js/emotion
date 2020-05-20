// @flow
import createEmotion from './create-instance'

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
} = createEmotion({ key: 'css' })
