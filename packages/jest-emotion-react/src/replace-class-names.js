// @flow
function defaultClassNameReplacer(className, index) {
  return `glamor-${index}`
}

export type ClassNameReplacer = (className: string, index: number) => string

export const replaceClassNames = (
  selectors: Array<string>,
  styles: string,
  code: string,
  replacer: ClassNameReplacer = defaultClassNameReplacer
) => {
  let index = 0
  return selectors.reduce((acc, className) => {
    if (className.indexOf('.css-') === 0) {
      const escapedRegex = new RegExp(
        className.replace('.', '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
        'g'
      )
      return acc.replace(escapedRegex, replacer(className, index++))
    }
    return acc
  }, `${styles}\n\n${code}`)
}
