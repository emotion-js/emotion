// @flow
function defaultClassNameReplacer(className, index) {
  // Change this to emotion before merging
  return `glamor-${index}`
}

export type ClassNameReplacer = (className: string, index: number) => string

export const replaceClassNames = (
  selectors: Array<string>,
  styles: string,
  code: string,
  key: string,
  replacer: ClassNameReplacer = defaultClassNameReplacer
) => {
  let index = 0
  return selectors.reduce((acc, className) => {
    if (className.indexOf(`.${key}-`) === 0) {
      const escapedRegex = new RegExp(
        className.replace('.', '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
        'g'
      )
      return acc.replace(escapedRegex, replacer(className, index++))
    }
    return acc
  }, `${styles}${styles ? '\n\n' : ''}${code}`)
}
