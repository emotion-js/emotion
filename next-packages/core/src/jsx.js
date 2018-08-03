// @flow
import * as React from 'react'
import { consume } from './context'
import { getRegisteredStyles, insertStyles, isBrowser } from '@emotion/utils'
import { serializeStyles } from '@emotion/serialize'

// $FlowFixMe
export const jsx: typeof React.createElement = function(
  type: React.ElementType,
  props: Object
) {
  if (props == null || props.css == null) {
    // $FlowFixMe
    return React.createElement.apply(undefined, arguments)
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

  return consume(context => {
    let registeredStyles = []

    let className = ''
    if (props.className !== undefined) {
      className = getRegisteredStyles(
        context.registered,
        registeredStyles,
        props.className
      )
    }
    registeredStyles.push(
      typeof props.css === 'function' ? props.css(context.theme) : props.css
    )
    const serialized = serializeStyles(context.registered, registeredStyles)
    const rules = insertStyles(context, serialized, typeof type === 'string')
    className += `${context.key}-${serialized.name}`

    const newProps = {}
    for (let key in props) {
      if (Object.prototype.hasOwnProperty.call(props, key) && key !== 'css') {
        newProps[key] = props[key]
      }
    }
    newProps.className = className

    let argsLength = arguments.length

    let createElementArgArray = new Array(argsLength)
    createElementArgArray[0] = type
    createElementArgArray[1] = newProps

    for (let i = 2; i < argsLength; i++) {
      createElementArgArray[i] = arguments[i]
    }

    // $FlowFixMe
    const ele = React.createElement.apply(undefined, createElementArgArray)
    if (!isBrowser && rules !== undefined) {
      return (
        <React.Fragment>
          <style
            {...{
              [`data-emotion-${context.key}`]: serialized.name,
              dangerouslySetInnerHTML: { __html: rules },
              nonce: context.sheet.nonce
            }}
          />
          {ele}
        </React.Fragment>
      )
    }
    return ele
  })
}
