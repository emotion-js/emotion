const last = arr => (arr.length ? arr[arr.length - 1] : null)

export let removeLabel = element => {
  if (element.type === 'decl') {
    var value = element.value
    if (
      // charcode for l
      value.charCodeAt(0) === 108 &&
      // charcode for b
      value.charCodeAt(2) === 98
    ) {
      // this ignores label
      element.return = ''
      element.value = ''
    }
  }
}

const ignoreFlag =
  'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason'

const isIgnoringComment = element =>
  !!element &&
  element.type === 'comm' &&
  element.children.indexOf(ignoreFlag) > -1

export let createUnsafeSelectorsAlarm = cache => (element, index, children) => {
  if (element.type !== 'rule') return

  const unsafePseudoClasses = element.value.match(
    /(:first|:nth|:nth-last)-child/g
  )

  if (unsafePseudoClasses && cache.compat !== true) {
    const prevElement = index > 0 ? children[index - 1] : null
    if (prevElement && isIgnoringComment(last(prevElement.children))) {
      return
    }
    unsafePseudoClasses.forEach(unsafePseudoClass => {
      console.error(
        `The pseudo class "${unsafePseudoClass}" is potentially unsafe when doing server-side rendering. Try changing it to "${
          unsafePseudoClass.split('-child')[0]
        }-of-type".`
      )
    })
  }
}
