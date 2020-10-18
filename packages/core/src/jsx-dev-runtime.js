// @flow
import * as React from 'react'
import Emotion, { createEmotionProps } from './emotion-element'
import { hasOwnProperty } from './utils'

export const Fragment = React.Fragment

export function jsxDEV(type, props, key, isStaticChildren, source, self) {
  if (!hasOwnProperty.call(props, 'css')) {
    return React.jsxDEV(type, props, key, isStaticChildren, source, self)
  }

  return React.jsxDEV(
    Emotion,
    createEmotionProps(type, props),
    key,
    isStaticChildren,
    source,
    self
  )
}
