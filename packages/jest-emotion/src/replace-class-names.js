// @flow
function defaultClassNameReplacer(className, index) {
  // Change this to emotion before merging
  return `glamor-${index}`
}

export type ClassNameReplacer = (className: string, index: number) => string

const componentSelectorClassNamePattern = /\.e[a-zA-Z0-9-]+[0-9]+/

export const replaceClassNames = (
  selectors: Array<string>,
  styles: string,
  code: string,
  key: string,
  replacer: ClassNameReplacer = defaultClassNameReplacer
) => {
  let index = 0
  const classRegex = new RegExp(`^\\.${key}-([a-zA-Z0-9-]+)`)

  return selectors.reduce((acc, className) => {
    if (
      classRegex.test(className) ||
      componentSelectorClassNamePattern.test(className)
    ) {
      const escapedRegex = new RegExp(
        className.replace('.', '').replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
        'g'
      )
      return acc.replace(escapedRegex, replacer(className, index++))
    }
    return acc
  }, `${styles}${styles ? '\n\n' : ''}${code}`)
}
