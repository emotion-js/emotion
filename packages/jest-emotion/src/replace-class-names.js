// @flow
import type { Emotion } from 'create-emotion'
function defaultClassNameReplacer(className, index) {
  return `emotion-${index}`
}

export type ClassNameReplacer = (className: string, index: number) => string

const componentSelectorClassNamePattern = /e[a-zA-Z0-9-]+[0-9]+/

export const replaceClassNames = (
  classNames: Array<string>,
  styles: string,
  code: string,
  key: string,
  replacer: ClassNameReplacer = defaultClassNameReplacer
) => {
  let index = 0

  return classNames.reduce((acc, className) => {
    if (
      // using the registered cache since its keys are
      // key-hash
      // instead of the inserted cache which is
      // hash
      className.indexOf(`${key}-`) === 0 ||
      componentSelectorClassNamePattern.test(className)
    ) {
      const escapedRegex = new RegExp(
        className.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
        'g'
      )
      return acc.replace(escapedRegex, replacer(className, index++))
    }
    return acc
  }, `${styles}${styles ? '\n\n' : ''}${code}`)
}
