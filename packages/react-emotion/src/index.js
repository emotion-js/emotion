/* global codegen */
import { createElement, Component } from 'react'
import { memoize } from 'emotion-utils'
import { css, getRegisteredStyles } from 'emotion'
import { channel, contextTypes } from '../../emotion-theming/src/utils'

export * from 'emotion'

const reactPropsRegex = codegen.require('./props')
const testOmitPropsOnStringTag = memoize(key => reactPropsRegex.test(key))
const testOmitPropsOnComponent = key => key !== 'theme' && key !== 'innerRef'
const testAlwaysTrue = () => true

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
  const isReal = tag.__emotion_real === tag
  const baseTag =
    staticClassName === false ? (isReal && tag.__emotion_base) || tag : tag

  const omitFn =
    typeof baseTag === 'string'
      ? testOmitPropsOnStringTag
      : testOmitPropsOnComponent

  return (strings, ...interpolations) => {
    const stringMode = strings !== undefined && strings.raw !== undefined
    let styles = (isReal && tag.__emotion_styles) || []
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

    class Styled extends Component {
      componentWillMount() {
        if (this.context[channel] !== undefined) {
          this.unsubscribe = this.context[channel].subscribe(this.setTheme)
        }
      }

      componentWillUnmount() {
        if (this.unsubscribe !== undefined) {
          this.context[channel].unsubscribe(this.unsubscribe)
        }
      }
      setTheme = theme => this.setState({ theme })

      render() {
        const { props, state, context } = this
        let mergedProps = props
        if (state && state.theme) {
          mergedProps = omitAssign(testAlwaysTrue, {}, props, {
            theme: state.theme || {}
          })
        }

        const getValue = v => {
          if (typeof v === 'function') {
            return v(mergedProps, context)
          }
          return v
        }

        let className = ''
        let classInterpolations = []

        if (props.className) {
          if (staticClassName === false) {
            className += getRegisteredStyles(
              classInterpolations,
              props.className
            )
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
    }

    Styled.contextTypes = contextTypes

    Styled.__emotion_styles = styles
    Styled.__emotion_base = baseTag
    Styled.__emotion_real = Styled

    Styled.displayName = `Styled(${typeof baseTag === 'string'
      ? baseTag
      : baseTag.displayName || baseTag.name || 'Component'})`

    Styled.withComponent = nextTag => {
      return createStyled(nextTag, options)(styles)
    }

    return Styled
  }
}

export default createStyled
