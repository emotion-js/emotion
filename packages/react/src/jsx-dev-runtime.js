import * as ReactJSXRuntimeDev from 'react/jsx-dev-runtime'
import Emotion, { createEmotionProps } from './emotion-element'
import { hasOwnProperty } from './utils'

export const Fragment = ReactJSXRuntimeDev.Fragment

export function jsxDEV(type, props, key, isStaticChildren, source, self) {
  if (!hasOwnProperty.call(props, 'css')) {
    return ReactJSXRuntimeDev.jsxDEV(
      type,
      props,
      key,
      isStaticChildren,
      source,
      self
    )
  }

  return ReactJSXRuntimeDev.jsxDEV(
    Emotion,
    createEmotionProps(type, props),
    key,
    isStaticChildren,
    source,
    self
  )
}
