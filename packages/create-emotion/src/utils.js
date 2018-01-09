// @flow
import { memoize, unitless } from 'emotion-utils'

const hyphenateRegex = /[A-Z]|^ms/g

export const processStyleName: (
  styleName: string
) => string = memoize((styleName: string) =>
  styleName.replace(hyphenateRegex, '-$&').toLowerCase()
)

export const processStyleValue = (key: string, value: string): string => {
  if (value == null || typeof value === 'boolean') {
    return ''
  }

  if (
    unitless[key] !== 1 &&
    key.charCodeAt(1) !== 45 && // custom properties
    !isNaN(value) &&
    value !== 0
  ) {
    return value + 'px'
  }
  return value
}

export type ClassNameArg =
  | string
  | boolean
  | (() => ClassNameArg)
  | { [key: string]: boolean }
  | Array<ClassNameArg>

export const classnames = (args: Array<ClassNameArg>): string => {
  let len = args.length
  let i = 0
  let cls = ''
  for (; i < len; i++) {
    let arg = args[i]

    if (arg == null) continue
    let next = (cls && cls + ' ') || cls

    switch (typeof arg) {
      case 'boolean':
        break
      case 'function':
        cls = next + classnames([arg()])
        break
      case 'object': {
        if (Array.isArray(arg)) {
          cls = next + classnames(arg)
        } else {
          for (const k in arg) {
            if (arg[k]) {
              cls && (cls += ' ')
              cls += k
            }
          }
        }
        break
      }
      default: {
        cls = next + arg
      }
    }
  }
  return cls
}

export const isBrowser = typeof window !== 'undefined'

export type PrefixOption =
  | boolean
  | ((key: string, value: string, context: 1 | 2 | 3) => boolean)

export type StylisOptions = {
  keyframe?: boolean,
  compress?: boolean,
  global?: boolean,
  cascade?: boolean,
  semicolon?: boolean,
  preserve?: boolean,
  prefix?: PrefixOption,
}
