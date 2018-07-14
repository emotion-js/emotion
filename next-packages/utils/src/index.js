// @flow
import type {
  RegisteredCache,
  CSSContextType,
  ScopedInsertableStyles
} from './types'

export const isBrowser = typeof document !== 'undefined'
export const shouldSerializeToReactTree =
  !isBrowser || process.env.NODE_ENV === 'test'

export function getRegisteredStyles(
  registered: RegisteredCache,
  registeredStyles: string[],
  classNames: string
) {
  let rawClassName = ''

  classNames.split(' ').forEach(className => {
    if (registered[className] !== undefined) {
      registeredStyles.push(registered[className])
    } else {
      rawClassName += `${className} `
    }
  })
  return rawClassName
}

export const insertStyles = (
  context: CSSContextType,
  insertable: ScopedInsertableStyles
) => {
  if (context.registered[`${context.key}-${insertable.name}`] === undefined) {
    context.registered[`${context.key}-${insertable.name}`] = insertable.styles
  }
  if (context.inserted[insertable.name] === undefined) {
    let rules = context.stylis(
      `.${context.key}-${insertable.name}`,
      insertable.styles
    )

    if (shouldSerializeToReactTree) {
      context.inserted[insertable.name] = rules.join('')
      if (context.compat === undefined) {
        return context.inserted[insertable.name]
      }
    } else {
      rules.forEach(rule => {
        context.sheet.insert(rule)
      })
      context.inserted[insertable.name] = true
    }
  }
}

export * from './types'
