/* global codegen */
import { createElement } from 'react'
import { memoize, map } from 'emotion-utils'
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

  return (strings, ...interpolations) => {
    const stringMode = strings !== undefined && strings.raw !== undefined
    let styles = tag.__emotion_styles || []
    if (stringMode) {
      styles = interpolations.reduce(
        (array, interp, i) => array.concat(interp, strings[i + 1]),
        styles.concat(strings[0])
      )
    } else {
      styles = styles.concat(strings, interpolations)
    }

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

      className += css(...map(styles, getValue), ...classInterpolations)

      return createElement(
        baseTag,
        omitAssign(omitFn, {}, props, { className, ref: props.innerRef })
      )
    }

    Styled.__emotion_styles = styles
    Styled.__emotion_base = baseTag
    Styled.__emotion_class = componentId
    Styled.__emotion_classes = componentIdClassName

    return Styled
  }
}
