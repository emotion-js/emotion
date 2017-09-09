import { createElement } from 'react'
import { css } from 'emotion'
import propsRegexString from /* preval */ './props'

export * from 'emotion'

const reactPropsRegex = new RegExp(propsRegexString)

const testOmitPropsOnStringTag = key => reactPropsRegex.test(key)
const testOmitPropsOnComponent = key => key !== 'theme' && key !== 'innerRef'

const omitAssign = function(testFn, target) {
  let i = 2
  let length = arguments.length
  for (; i < length; i++) {
    let source = arguments[i]
    let key
    for (key in source) {
      if (testFn(key)) {
        target[key] = source[key]
      }
    }
  }
  return target
}

export default function(tag) {
  return (initialStrings, ...initialInterpolations) => {
    const baseTag = tag.__emotion_base || tag

    const omitFn =
      typeof baseTag === 'string'
        ? testOmitPropsOnStringTag
        : testOmitPropsOnComponent
    const strings =
      tag.__emotion_strings !== undefined
        ? tag.__emotion_strings.concat(initialStrings)
        : initialStrings
    const interpolations =
      tag.__emotion_interp !== undefined
        ? tag.__emotion_interp.concat([';'], initialInterpolations)
        : initialInterpolations
    const Styled = (props, context) => {
      let className = ''
      let classInterpolations = ''
      if (props.className) {
        const classes = props.className.split(' ')
        classes.forEach(splitClass => {
          if (splitClass.indexOf('css-') === 0) {
            classInterpolations += `${splitClass};`
          } else {
            className += `${splitClass} `
          }
        })
      }
      let newInterpolations = interpolations
      let newStrings = strings
      if (classInterpolations) {
        newInterpolations = newInterpolations.concat([''])
        newStrings = newStrings.concat([classInterpolations])
      }
      className += css(
        newStrings,
        ...newInterpolations.map(v => {
          if (typeof v === 'function') {
            return v(props, context)
          }
          return v
        })
      )
      return createElement(
        baseTag,
        omitAssign(omitFn, {}, props, { className, ref: props.innerRef })
      )
    }
    Styled.__emotion_strings = strings
    Styled.__emotion_interp = interpolations
    Styled.__emotion_base = baseTag
    return Styled
  }
}
