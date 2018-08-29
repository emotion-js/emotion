// @flow
import * as React from 'react'
import { consume } from './context'
import { consumeStyledElementsContext } from './styled-element-context'
import { getRegisteredStyles, insertStyles, isBrowser } from '@emotion/utils'
import { serializeStyles } from '@emotion/serialize'
import { testAlwaysTrue, pickAssign } from '@emotion/styled-base/src/utils'

// $FlowFixMe
export const jsx: typeof React.createElement = function(
  type: React.ElementType,
  props: Object
) {
  // if (props == null || props.css == null) {
  //   // $FlowFixMe
  //   return React.createElement.apply(undefined, arguments)
  // }

  if (
    props &&
    props.css &&
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

  return consume(themeContext =>
    consumeStyledElementsContext(styledElementsContext => {
      const newProps = {}
      let registeredStyles = []
      let className = ''

      if (styledElementsContext[type]) {
        registeredStyles.push(
          typeof styledElementsContext[type] === 'function'
            ? styledElementsContext[type](
                pickAssign(testAlwaysTrue, {}, props, {
                  theme: themeContext.theme
                })
              )
            : styledElementsContext[type]
        )
      }

      if (props && props.className !== undefined) {
        className = getRegisteredStyles(
          themeContext.registered,
          registeredStyles,
          props.className
        )
      }

      if (props && props.css) {
        registeredStyles.push(
          typeof props.css === 'function'
            ? props.css(themeContext.theme)
            : props.css
        )
      }

      const serialized = serializeStyles(
        themeContext.registered,
        registeredStyles
      )

      const rules = insertStyles(
        themeContext,
        serialized,
        typeof type === 'string'
      )

      className += `${themeContext.key}-${serialized.name}`

      if (props) {
        for (let key in props) {
          if (
            Object.prototype.hasOwnProperty.call(props, key) &&
            key !== 'css'
          ) {
            newProps[key] = props[key]
          }
        }
      }

      newProps.className = className

      let argsLength = arguments.length
      let createElementArgArray = new Array(argsLength)

      createElementArgArray[1] = newProps
      createElementArgArray[0] = type

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
                [`data-emotion-${themeContext.key}`]: serialized.name,
                dangerouslySetInnerHTML: { __html: rules },
                nonce: themeContext.sheet.nonce
              }}
            />
            {ele}
          </React.Fragment>
        )
      }
      return ele
    })
  )
}
