// @flow
import * as React from 'react'
import { withEmotionCache } from './context'
import { getRegisteredStyles, insertStyles, isBrowser } from '@emotion/utils'
import { serializeStyles } from '@emotion/serialize'

let typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__'

let hasOwnProperty = Object.prototype.hasOwnProperty

let Emotion = withEmotionCache((props, cache, ref) => {
  let type = props[typePropName]
  let className = ''
  let registeredStyles = []
  if (props.className !== undefined) {
    className = getRegisteredStyles(
      cache.registered,
      registeredStyles,
      props.className
    )
  }
  registeredStyles.push(props.css)
  const serialized = serializeStyles(cache.registered, registeredStyles)
  const rules = insertStyles(cache, serialized, typeof type === 'string')
  className += `${cache.key}-${serialized.name}`

  const newProps = {}
  for (let key in props) {
    if (
      hasOwnProperty.call(props, key) &&
      key !== 'css' &&
      key !== typePropName
    ) {
      newProps[key] = props[key]
    }
  }
  newProps.ref = ref
  newProps.className = className

  const ele = React.createElement(type, newProps)
  if (!isBrowser && rules !== undefined) {
    let serializedNames = serialized.name
    let next = serialized.next
    while (next !== undefined) {
      serializedNames += ' ' + next.name
      next = next.next
    }
    return (
      <React.Fragment>
        <style
          {...{
            [`data-emotion-${cache.key}`]: serializedNames,
            dangerouslySetInnerHTML: { __html: rules },
            nonce: cache.sheet.nonce
          }}
        />
        {ele}
      </React.Fragment>
    )
  }
  return ele
})

if (process.env.NODE_ENV !== 'production') {
  Emotion.displayName = 'css'
}

// $FlowFixMe
export const jsx: typeof React.createElement = function(
  type: React.ElementType,
  props: Object
) {
  let args = arguments

  if (props == null || props.css == null) {
    // $FlowFixMe
    return React.createElement.apply(undefined, args)
  }

  if (
    typeof props.css === 'string' &&
    process.env.NODE_ENV !== 'production' &&
    // check if there is a css declaration
    props.css.indexOf(':') !== -1
  ) {
    throw new Error(
      `Strings are not allowed as css prop values, please wrap it in a css template literal from '@emotion/css' like this: css\`${
        props.css
      }\``
    )
  }

  let argsLength = args.length

  let createElementArgArray = new Array(argsLength)

  createElementArgArray[0] = Emotion
  let newProps = {}

  for (let key in props) {
    if (hasOwnProperty.call(props, key)) {
      newProps[key] = props[key]
    }
  }
  newProps[typePropName] = type

  createElementArgArray[1] = newProps

  for (let i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i]
  }
  // $FlowFixMe
  return React.createElement.apply(null, createElementArgArray)
}
