import { compile } from '@emotion/stylis'

const last = arr => (arr.length ? arr[arr.length - 1] : null)

export let compat = element => {
  if (element.type !== 'rule') return

  // .length indicates if this rule contains pseudo or not
  if (!element.length) {
    return
  }

  var value = element.value

  // short-circuit for the simplest case
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 /* colon */) {
    return
  }

  var parent = element

  do {
    parent = parent.parent
  } while (parent.type !== 'rule')

  var withExplicitLeadingAmpersand = compile(`${value}{}`)[0]
    .props.map(prop => (prop.charCodeAt(0) === 58 ? `&${prop}` : `${prop}`))
    .join(',')

  element.props = compile(
    `${parent.props.join(',')}{${withExplicitLeadingAmpersand}{}}`
  )[1].props
}

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
