// @flow
import * as React from 'react'
import Emotion, { createEmotionProps } from './emotion-element'
import { hasOwnProperty } from './utils'

export const Fragment = React.Fragment

export function jsx(type, props, key) {
  if (!hasOwnProperty.call(props, 'css')) {
    return React.jsx(type, props, key)
  }

  return React.jsx(Emotion, createEmotionProps(type, props), key)
}

export function jsxs(type, props, key) {
  if (!hasOwnProperty.call(props, 'css')) {
    return React.jsxs(type, props, key)
  }

  return React.jsxs(Emotion, createEmotionProps(type, props), key)
}
