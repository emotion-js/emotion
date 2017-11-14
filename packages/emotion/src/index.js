import createEmotion from 'create-emotion'

const context =
  typeof global !== 'undefined'
    ? global
    : typeof window !== 'undefined' ? window : {}

export const {
  flush,
  hydrate,
  cx,
  merge,
  getRegisteredStyles,
  fontFace,
  injectGlobal,
  keyframes,
  css,
  sheet,
  registered,
  inserted,
  useStylisPlugin
} = createEmotion(context)
