/* global codegen */
import { createElement } from 'react'
import { memoize } from 'emotion-utils'
import { css, getRegisteredStyles } from 'emotion'

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


const createStyled = (tag, options: { e: string }) => {
  if (process.env.NODE_ENV !== 'production') {
    if (tag === undefined) {
      throw new Error(
        'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
      )
    }
  }
  let staticClassName = false
  if (options !== undefined && options.e !== undefined) {
    staticClassName = options.e
  }
  const baseTag = staticClassName === false ? tag.__emotion_base || tag : tag

  const omitFn =
    typeof baseTag === 'string'
      ? testOmitPropsOnStringTag
      : testOmitPropsOnComponent

  return (strings, ...interpolations) => {
    const stringMode = strings !== undefined && strings.raw !== undefined
    let styles = tag.__emotion_styles || []
    if (staticClassName === false) {
      if (stringMode) {
        styles = interpolations.reduce(
          (array, interp, i) => array.concat(interp, strings[i + 1]),
          styles.concat(strings[0])
        )
      } else {
        styles = styles.concat(strings, interpolations)
      }
    }

    const Styled = (props, context) => {
      const getValue = v => {
        if (typeof v === 'function') {
          return v(props, context)
        }
        return v
      }

      let className = ''
      let classInterpolations = []

      if (props.className) {
        if (staticClassName === false) {
          className += getRegisteredStyles(classInterpolations, props.className)
        } else {
          className += `${props.className} `
        }
      }
      if (staticClassName === false) {
        className += css(...styles.map(getValue), ...classInterpolations)
      } else {
        className += staticClassName
      }

      return createElement(
        baseTag,
        omitAssign(omitFn, {}, props, { className, ref: props.innerRef })
      )
    }

    Styled.__emotion_styles = styles
    Styled.__emotion_base = baseTag

    Styled.withComponent = nextTag => {
      return createStyled({
        __emotion_base: nextTag,
        __emotion_styles: styles
      })()
    }

    return Styled
  }
}

export default createStyled
