import {
  compile,
  alloc,
  dealloc,
  next,
  delimit,
  token,
  char,
  from,
  identifier,
  peek,
  position
} from '@emotion/stylis'

const last = arr => (arr.length ? arr[arr.length - 1] : null)

const toRules = (parsed, points) => {
  parsed[0] = peek() === 58 ? '&\f' : ''
  points[0] = parsed[0].length

  let index = 0

  while (next()) {
    const character = char()
    switch (token(character)) {
      case 0:
        parsed[index] += identifier(position - 1)
        break
      case 2:
        parsed[index] += delimit(character)
        break
      case 4:
        // comma
        if (character === 44) {
          // colon
          parsed[++index] = peek() === 58 ? '&\f' : ''
          points[index] = parsed[index].length
          break
        }
      // fallthrough
      default:
        parsed[index] += from(character)
    }
  }

  return parsed
}

const getRules = (value, points) => dealloc(toRules(alloc(value), points))

export let compat = element => {
  if (element.type !== 'rule') return

  // .length indicates if this rule contains pseudo or not
  if (!element.length) {
    return
  }

  const { value } = element

  // short-circuit for the simplest case
  if (element.props.length === 1 && value.charCodeAt(0) !== 58 /* colon */) {
    return
  }

  let parent = element

  do {
    parent = parent.parent
  } while (parent.type !== 'rule')

  const points = []
  const rules = getRules(value, points)
  const parentRules = parent.props

  for (let i = 0, k = 0; i < rules.length; i++) {
    for (let j = 0; j < parentRules.length; j++, k++) {
      if (points[i]) {
        element.props[k] = rules[i].replace(/&\f/g, parentRules[j])
      }
    }
  }
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
