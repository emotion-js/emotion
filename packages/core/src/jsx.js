// @flow
import * as React from 'react'
import { withEmotionCache, ThemeContext } from './context'
import { getRegisteredStyles, insertStyles, isBrowser } from '@emotion/utils'
import { serializeStyles } from '@emotion/serialize'

let typePropName = '__EMOTION_TYPE_PLEASE_DO_NOT_USE__'

let labelPropName = '__EMOTION_LABEL_PLEASE_DO_NOT_USE__'

let hasOwnProperty = Object.prototype.hasOwnProperty

let render = (cache, props, theme: null | Object, ref) => {
  let type = props[typePropName]
  let registeredStyles = []

  let className = ''
  if (props.className !== undefined) {
    className = getRegisteredStyles(
      cache.registered,
      registeredStyles,
      props.className
    )
  }
  registeredStyles.push(theme === null ? props.css : props.css(theme))
  let serialized = serializeStyles(cache.registered, registeredStyles)

  if (
    process.env.NODE_ENV !== 'production' &&
    serialized.name.indexOf('-') === -1
  ) {
    let labelFromStack = props[labelPropName]
    if (labelFromStack) {
      serialized = serializeStyles(cache.registered, [
        serialized,
        'label:' + labelFromStack + ';'
      ])
    }
  }
  const rules = insertStyles(cache, serialized, typeof type === 'string')
  className += `${cache.key}-${serialized.name}`

  const newProps = {}
  for (let key in props) {
    if (
      hasOwnProperty.call(props, key) &&
      key !== 'css' &&
      key !== typePropName &&
      (process.env.NODE_ENV !== 'production' && key !== labelPropName)
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
}

let Emotion = withEmotionCache((props, cache, ref) => {
  // use Context.read for the theme when it's stable
  if (typeof props.css === 'function') {
    return (
      <ThemeContext.Consumer>
        {theme => render(cache, props, theme, ref)}
      </ThemeContext.Consumer>
    )
  }
  return render(cache, props, null, ref)
})

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
    process.env.NODE_ENV !== 'production' &&
    typeof props.css === 'string' &&
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
  if (process.env.NODE_ENV !== 'production') {
    try {
      throw new Error()
    } catch (e) {
      if (e.stack) {
        // chrome
        let match = e.stack.match(/at jsx.*\n\s+at ([A-Z][A-Za-z]+) /)
        if (!match) {
          // safari and firefox
          match = e.stack.match(/^.*\n([A-Z][A-Za-z]+)@/)
        }
        if (match) {
          newProps[labelPropName] = match[1]
        }
      }
    }
  }

  createElementArgArray[1] = newProps

  for (let i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i]
  }
  // $FlowFixMe
  return React.createElement.apply(null, createElementArgArray)
}
