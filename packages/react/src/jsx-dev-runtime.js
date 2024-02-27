// @flow
import * as ReactJSXRuntimeDev from 'react/jsx-dev-runtime'
import Emotion, { createEmotionProps } from './emotion-element'
import { hasOwn } from './utils'

export const Fragment = ReactJSXRuntimeDev.Fragment

export function jsxDEV(
  type: any,
  props: any,
  key: any,
  isStaticChildren: any,
  source: any,
  self: any
) {
  if (!hasOwn.call(props, 'css')) {
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
