/* global codegen */
import { createElement } from 'react'
import { memoize } from 'emotion-utils'
import { css, registered } from 'emotion'

export * from 'emotion'

const reactPropsRegex = codegen.require('./props')
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
  if (process.env.NODE_ENV !== 'production') {
    if (tag === undefined) {
      throw new Error(
        'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
      )
    }
  }
  const baseTag = tag.__emotion_base || tag
  const componentId =
    options !== undefined && options.id !== undefined
      ? options.id
      : 'css-' + (componentIdIndex++).toString(36)

  const componentIdClassName =
    tag.__emotion_classes === undefined
      ? componentId
      : `${tag.__emotion_classes} ${componentId}`

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

    const stringMode =
      initialStrings !== undefined && initialStrings.raw !== undefined

    const Styled = (props, context) => {
      const getValue = v => {
        if (typeof v === 'function') {
          if (v.__emotion_class !== undefined) return `.${v.__emotion_class}`
          return v(props, context)
        }
        return v
      }

      let className = `${componentIdClassName} `
      let classInterpolations = []

      if (props.className) {
        const classes = props.className.split(' ')
        classes.forEach(splitClass => {
          if (registered[splitClass] !== undefined) {
            classInterpolations.push(splitClass)
          } else {
            className += `${splitClass} `
          }
        })
      }

      let newInterpolations = interpolations.concat(classInterpolations)
      let newStrings = strings

      if (stringMode === false) {
        newStrings = getValue(newStrings)
      } else {
        if (newStrings.raw === undefined) {
          newStrings.raw = newStrings
        }
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
    Styled.__emotion_classes = componentIdClassName

    return Styled
  }
}
