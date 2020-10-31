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

  const emotionProps = createEmotionProps(type, props)

  // https://github.com/facebook/react/blob/fd61f7ea53989a59bc427603798bb111c852816a/packages/react/src/ReactElement.js#L386-L400
  const childrenLength = args.length - 2
  if (childrenLength === 1) {
    emotionProps.children = args[2]
  } else if (childrenLength > 1) {
    const childArray = new Array(childrenLength)
    for (let i = 0; i < childrenLength; i++) {
      childArray[i] = args[i + 2]
    }
    emotionProps.children = childArray
  }

  // $FlowFixMe
  return React.createElement(Emotion, emotionProps)
}
