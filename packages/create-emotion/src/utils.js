// @flow
import { memoize, unitless } from 'emotion-utils'

const hyphenateRegex = /[A-Z]|^ms/g

export const processStyleName: (
  styleName: string
) => string = memoize((styleName: string) =>
  styleName.replace(hyphenateRegex, '-$&').toLowerCase()
)

export const processStyleValue = (key: string, value: string) => {
  if (value === undefined || value === null || typeof value === 'boolean')
    return ''

  if (unitless[key] !== 1 && !isNaN(value) && value !== 0) {
    return value + 'px'
  }
  return value
}

type ClassNameArg = string | boolean | Function | Object | ClassNameArg[]

export function classnames(...args: ClassNameArg[]) {
  let len = arguments.length
  let i = 0
  let cls = ''
  for (; i < len; i++) {
    let arg: ClassNameArg = arguments[i]

    if (arg == null) continue
    let next = (cls && cls + ' ') || cls

    switch (typeof arg) {
      case 'boolean':
        break
      case 'function':
        cls = next + classnames(arg())
        break
      case 'object': {
        if (Array.isArray(arg)) {
          cls = next + classnames.apply(null, arg)
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
