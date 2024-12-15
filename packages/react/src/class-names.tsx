import isDevelopment from '#is-development'
import { CSSInterpolation, serializeStyles } from '@emotion/serialize'
import {
  EmotionCache,
  getRegisteredStyles,
  registerStyles,
  SerializedStyles
} from '@emotion/utils'
import React from 'react'
import { withEmotionCache } from './context'
import { renderWithStyles } from './render-with-styles'
import { Theme, ThemeContext } from './theming'

export interface ArrayClassNamesArg extends Array<ClassNamesArg> {}

export type ClassNamesArg =
  | undefined
  | null
  | string
  | boolean
  | { [className: string]: boolean | null | undefined }
  | ArrayClassNamesArg

let classnames = (args: ArrayClassNamesArg): string => {
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
            isDevelopment &&
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
  registered: EmotionCache['registered'],
  css: ClassNamesContent['css'],
  className: string
) {
  const registeredStyles: string[] = []

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

export interface ClassNamesContent {
  css(template: TemplateStringsArray, ...args: Array<CSSInterpolation>): string
  css(...args: Array<CSSInterpolation>): string
  cx(...args: Array<ClassNamesArg>): string
  theme: Theme
}

export interface ClassNamesProps {
  children(content: ClassNamesContent): React.ReactNode
}

export const ClassNames = /* #__PURE__ */ withEmotionCache<ClassNamesProps>(
  (props, cache) => {
    let hasRendered = false
    let serializedArr: SerializedStyles[] = []

    let css: ClassNamesContent['css'] = (...args) => {
      if (hasRendered && isDevelopment) {
        throw new Error('css can only be used during render')
      }

      let serialized = serializeStyles(args, cache.registered)
      serializedArr.push(serialized)
      // registration has to happen here as the result of this might get consumed by `cx`
      registerStyles(cache, serialized, false)
      return `${cache.key}-${serialized.name}`
    }
    let cx = (...args: Array<ClassNamesArg>) => {
      if (hasRendered && isDevelopment) {
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

    return renderWithStyles(ele, cache, serializedArr, false)
  }
)

if (isDevelopment) {
  ClassNames.displayName = 'EmotionClassNames'
}
