// @flow
import * as React from 'react'
import { consume, ThemeContext } from './context'
import { getRegisteredStyles, insertStyles, isBrowser } from '@emotion/utils'
import { serializeStyles } from '@emotion/serialize'

let render = (context, props, type, args, theme: null | Object) => {
  let registeredStyles = []

  let className = ''
  if (props.className !== undefined) {
    className = getRegisteredStyles(
      context.registered,
      registeredStyles,
      props.className
    )
  }
  registeredStyles.push(theme === null ? props.css : props.css(theme))
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

  let argsLength = args.length

  let createElementArgArray = new Array(argsLength)
  createElementArgArray[0] = type
  createElementArgArray[1] = newProps

  for (let i = 2; i < argsLength; i++) {
    createElementArgArray[i] = args[i]
  }

  // $FlowFixMe
  const ele = React.createElement.apply(undefined, createElementArgArray)
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
            [`data-emotion-${context.key}`]: serializedNames,
            dangerouslySetInnerHTML: { __html: rules },
            nonce: context.sheet.nonce
          }}
        />
        {ele}
      </React.Fragment>
    )
  }
  return ele
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
  return consume(context => {
    // use Context.read for the theme when it's stable
    if (typeof props.css === 'function') {
      return (
        <ThemeContext.Consumer>
          {theme => render(context, props, type, args, theme)}
        </ThemeContext.Consumer>
      )
    }
    return render(context, props, type, args, null)
  })
}
