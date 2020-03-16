// @flow
import * as React from 'react'
import { getRegisteredStyles, insertStyles } from '@emotion/utils'
import { serializeStyles } from '@emotion/serialize'
import { withEmotionCache } from './context'
import { ThemeContext } from './theming'
import { isBrowser } from './utils'

type ClassNameArg =
  | string
  | boolean
  | { [key: string]: boolean }
  | Array<ClassNameArg>
  | null
  | void

let classnames = (args: Array<ClassNameArg>): string => {
  let len = args.length
  let i = 0
  let cls = ''
  for (; i < len; i++) {
    let arg = args[i]
    if (arg == null) continue

    let toAdd
    switch (typeof arg) {
      case 'boolean':
        break
      case 'object': {
        if (Array.isArray(arg)) {
          toAdd = classnames(arg)
        } else {
          if (
            process.env.NODE_ENV !== 'production' &&
            arg.styles !== undefined &&
            arg.name !== undefined
          ) {
            console.error(
              'You have passed styles created with `css` from `@emotion/react` package to the `cx`.\n' +
                '`cx` is meant to compose class names (strings) so you should convert those styles to a class name by passing them to the `css` received from <ClassNames/> component.'
            )
          }
          toAdd = ''
          for (const k in arg) {
            if (arg[k] && k) {
              toAdd && (toAdd += ' ')
              toAdd += k
            }
          }
        }
        break
      }
      default: {
        toAdd = arg
      }
    }
    if (toAdd) {
      cls && (cls += ' ')
      cls += toAdd
    }
  }
  return cls
}
function merge(
  registered: Object,
  css: (...args: Array<any>) => string,
  className: string
) {
  const registeredStyles = []

  const rawClassName = getRegisteredStyles(
    registered,
    registeredStyles,
    className
  )

  if (registeredStyles.length < 2) {
    return className
  }
  return rawClassName + css(registeredStyles)
}

type Props = {
  children: ({
    css: (...args: any) => string,
    cx: (...args: Array<ClassNameArg>) => string,
    theme: Object
  }) => React.Node
}

export const ClassNames: React.AbstractComponent<
  Props
> = /* #__PURE__ */ withEmotionCache((props, cache) => {
  let rules = ''
  let serializedHashes = ''
  let hasRendered = false

  let css = (...args: Array<any>) => {
    if (hasRendered && process.env.NODE_ENV !== 'production') {
      throw new Error('css can only be used during render')
    }
    let serialized = serializeStyles(args, cache.registered)
    if (isBrowser) {
      insertStyles(cache, serialized, false)
    } else {
      let res = insertStyles(cache, serialized, false)
      if (res !== undefined) {
        rules += res
      }
    }
    if (!isBrowser) {
      serializedHashes += ` ${serialized.name}`
    }
    return `${cache.key}-${serialized.name}`
  }
  let cx = (...args: Array<ClassNameArg>) => {
    if (hasRendered && process.env.NODE_ENV !== 'production') {
      throw new Error('cx can only be used during render')
    }
    return merge(cache.registered, css, classnames(args))
  }
  let content = {
    css,
    cx,
    theme: React.useContext(ThemeContext)
  }
  let ele = props.children(content)
  hasRendered = true
  if (!isBrowser && rules.length !== 0) {
    return (
      <>
        <style
          {...{
            [`data-emotion`]: `${cache.key} ${serializedHashes.substring(1)}`,
            dangerouslySetInnerHTML: { __html: rules },
            nonce: cache.sheet.nonce
          }}
        />
        {ele}
      </>
    )
  }
  return ele
})
