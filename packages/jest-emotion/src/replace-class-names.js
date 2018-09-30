// @flow
function defaultClassNameReplacer(className, index) {
  return `emotion-${index}`
}

const componentSelectorClassNamePattern = /^e[a-zA-Z0-9]+[0-9]+$/

export const replaceClassNames = (
  classNames: Array<string>,
  styles: string,
  code: string,
  keys: Array<string>,
  classNameReplacer: (
    className: string,
    index: number
  ) => string = defaultClassNameReplacer
) => {
  let index = 0
  let keyPattern = new RegExp(`^(${keys.join('|')})-`)

  return classNames.reduce((acc, className) => {
    if (
      keyPattern.test(className) ||
      componentSelectorClassNamePattern.test(className)
    ) {
      const escapedRegex = new RegExp(
        className.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
        'g'
      )
      return acc.replace(escapedRegex, classNameReplacer(className, index++))
    }
    return acc
  }, `${styles}${styles ? '\n\n' : ''}${code}`)
}
