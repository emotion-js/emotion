// @flow
import * as ReactJSXRuntime from 'react/jsx-runtime'
import Emotion, { createEmotionProps } from './emotion-element'
import { hasOwnProperty } from './utils'

export const Fragment = ReactJSXRuntime.Fragment

export function jsx(type: any, props: any, key: any) {
  if (!hasOwnProperty.call(props, 'css')) {
    return ReactJSXRuntime.jsx(type, props, key)
  }

  return ReactJSXRuntime.jsx(Emotion, createEmotionProps(type, props), key)
}

export function jsxs(type: any, props: any, key: any) {
  if (!hasOwnProperty.call(props, 'css')) {
    return ReactJSXRuntime.jsxs(type, props, key)
  }

  return ReactJSXRuntime.jsxs(Emotion, createEmotionProps(type, props), key)
}
