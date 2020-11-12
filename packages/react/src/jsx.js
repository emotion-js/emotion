// @flow
import * as React from 'react'
import Emotion, { createEmotionProps } from './emotion-element'
import { hasOwnProperty } from './utils'

// $FlowFixMe
export const jsx: typeof React.createElement = function(
  type: React.ElementType,
  props: Object
) {
  let args = arguments

  if (props == null || !hasOwnProperty.call(props, 'css')) {
    // $FlowFixMe
    return React.createElement.apply(undefined, args)
  }

  let argsLength = args.length
  let createElementArgArray = new Array(argsLength)
  createElementArgArray[0] = Emotion
  createElementArgArray[1] = createEmotionProps(type, props)

  for (let i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i]
  }

  // $FlowFixMe
  return React.createElement.apply(null, createElementArgArray)
}
