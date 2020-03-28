import { tokenize } from '@emotion/stylis'

const last = arr => (arr.length ? arr[arr.length - 1] : null)

export let compat = element => {
  switch (element.type) {
    case 'rule':
      var i = 0
      var props = element.props
      var value = element.value
      var propsLength = props.length

      // short-circuit for the simplest case
      if (propsLength === 1 && value.charCodeAt(0) !== 58 /* colon */) {
        return
      }

      var valueTokens = tokenize(value)
      // keep delimiting indices between tokens of a particular group
      // include -1 and the length as well to allow for uniform calculations later
      var points = [-1]

      for (; i < valueTokens.length; i++) {
        if (valueTokens[i].charCodeAt(0) === 44 /* , */) {
          points.push(i)
        }
      }

      var groupsCount = points.length
      points.push(valueTokens.length)
      // props hold already computed "exploded" combinations
      // based on their length and groups count it's easy to get back a chunk length
      // over which we need to iterate through when processing a single group on "the current level"
      var parentGroupsCount = propsLength / groupsCount
      var propsCursor = 0

      for (i = 0; i < groupsCount; i++) {
        if (valueTokens[points[i] + 1].charCodeAt(0) !== 58 /* colon */) {
          propsCursor += parentGroupsCount
          continue
        }

        var groupLength = points[i + 1] - points[i] - 1
        var cursorTarget = propsCursor + parentGroupsCount
        for (; propsCursor < cursorTarget; propsCursor++) {
          var prop = props[propsCursor]
          var propTokens = tokenize(prop)
          // adjust preceding token - we know it's a whitespace which we need to remove
          propTokens[propTokens.length - groupLength - 1] = ''
          props[propsCursor] = propTokens.join('')
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
