// @flow
import * as React from 'react'
import { getRegisteredStyles, insertStyles } from '@emotion/utils'
import { serializeStyles } from '@emotion/serialize'
import { withEmotionCache } from './context'
import { ThemeContext } from './theming'
import { isBrowser } from './utils'
import type { SerializedStyles } from '@emotion/utils'

type ClassNameArg =
  | string
  | SerializedStyles
  | boolean
  | { [key: string]: boolean }
  | Array<ClassNameArg>
  | null
  | void

let classnames = (
  registered: Object,
  mergeableStyles: Array<any>,
  args: Array<ClassNameArg>
): string => {
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
          toAdd = classnames(registered, mergeableStyles, arg)
        } else if (arg.styles !== undefined) {
          mergeableStyles.push(arg)
        } else {
          toAdd = ''
          for (let k in (arg: any)) {
            if (arg[k] && k) {
              k = getRegisteredStyles(registered, mergeableStyles, k, false)
              if (!k) {
                continue
              }
              toAdd && (toAdd += ' ')
              toAdd += k
            }
          }
        }
        break
      }
      case 'string':
        arg = getRegisteredStyles(registered, mergeableStyles, arg, false)
      // eslint-disable-next-line no-fallthrough
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
  mergeableStyles: Array<any>,
  css: (...args: Array<any>) => string,
  className: string
) {
  switch (mergeableStyles.length) {
    case 0:
      return className
    case 1:
      if (typeof mergeableStyles[0] === 'string') {
        return className + mergeableStyles[0]
      }
    // eslint-disable-next-line no-fallthrough
    default:
      return (
        className +
        css(
          mergeableStyles.map(s => (typeof s === 'string' ? registered[s] : s))
        )
      )
  }
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
    const mergeableStyles = []
    const rawClassName = classnames(cache.registered, mergeableStyles, args)
    return merge(cache.registered, mergeableStyles, css, rawClassName)
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
            [`data-emotion-${cache.key}`]: serializedHashes.substring(1),
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
