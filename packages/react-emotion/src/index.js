import { createElement } from 'react'
import { memoize } from 'emotion-utils'
import { css } from 'emotion'
import propsRegexString from /* preval */ './props'

export * from 'emotion'

const reactPropsRegex = new RegExp(propsRegexString)

const testOmitPropsOnStringTag = memoize(key => reactPropsRegex.test(key))
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

let componentIdIndex = 0

export default function(tag, options) {
  const baseTag = tag.__emotion_base || tag
  const componentId =
    options !== undefined && options.id !== undefined
      ? options.id
      : 'css-' + (componentIdIndex++).toString(36)
  const omitFn =
    typeof baseTag === 'string'
      ? testOmitPropsOnStringTag
      : testOmitPropsOnComponent

  return (initialStrings, ...initialInterpolations) => {
    const strings =
      tag.__emotion_strings !== undefined
        ? tag.__emotion_strings.concat(initialStrings)
        : initialStrings

    const interpolations =
      tag.__emotion_interp !== undefined
        ? tag.__emotion_interp.concat([';'], initialInterpolations)
        : initialInterpolations
    const stringMode = typeof initialStrings[0] === 'string'
    const Styled = (props, context) => {
      const getValue = v => {
        if (typeof v === 'function') {
          if (v.__emotion_class !== undefined) return `.${v.__emotion_class}`
          return v(props, context)
        }
        return v
      }
      let className = `${componentId} `
      let classInterpolations = '\n'

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
      if (classInterpolations !== '\n') {
        if (stringMode) {
          newInterpolations = newInterpolations.concat([''])
          newStrings = newStrings.concat([classInterpolations])
        } else {
          newInterpolations = newInterpolations.concat(classInterpolations)
        }
      }
      if (stringMode === false) {
        newStrings = getValue(newStrings)
      }
      className += css(newStrings, ...newInterpolations.map(getValue))

      return createElement(
        baseTag,
        omitAssign(omitFn, {}, props, { className, ref: props.innerRef })
      )
    }
    Styled.__emotion_strings = strings
    Styled.__emotion_interp = interpolations
    Styled.__emotion_base = baseTag
    Styled.__emotion_class = componentId
    return Styled
  }
}
