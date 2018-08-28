// @flow
import type { Emotion, Interpolations } from 'create-emotion'
import { channel, contextTypes } from '../../emotion-theming/src/utils'
import type { ElementType } from 'react'
import typeof ReactType from 'react'
import type { CreateStyled, StyledOptions } from './utils'
import {
  testPickPropsOnComponent,
  testAlwaysTrue,
  testPickPropsOnStringTag,
  pickAssign,
  setTheme
} from './utils'

let warnedAboutExtractStatic = false

function createEmotionStyled(emotion: Emotion, view: ReactType) {
  let createStyled: CreateStyled = (tag, options) => {
    if (process.env.NODE_ENV !== 'production') {
      if (tag === undefined) {
        throw new Error(
          'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
        )
      }
    }
    let staticClassName
    let identifierName
    let stableClassName
    let shouldForwardProp
    if (options !== undefined) {
      staticClassName = options.e
      identifierName = options.label
      stableClassName = options.target
      shouldForwardProp =
        tag.__emotion_forwardProp && options.shouldForwardProp
          ? propName =>
              tag.__emotion_forwardProp(propName) &&
              // $FlowFixMe
              options.shouldForwardProp(propName)
          : options.shouldForwardProp
    }
    const isReal = tag.__emotion_real === tag
    const baseTag =
      staticClassName === undefined
        ? (isReal && tag.__emotion_base) || tag
        : tag

    if (typeof shouldForwardProp !== 'function') {
      shouldForwardProp =
        typeof baseTag === 'string' &&
        baseTag.charAt(0) === baseTag.charAt(0).toLowerCase()
          ? testPickPropsOnStringTag
          : testPickPropsOnComponent
    }

    return function() {
      let args = arguments
      let styles =
        isReal && tag.__emotion_styles !== undefined
          ? tag.__emotion_styles.slice(0)
          : []
      if (identifierName !== undefined) {
        styles.push(`label:${identifierName};`)
      }
      if (staticClassName === undefined) {
        if (args[0] == null || args[0].raw === undefined) {
          styles.push.apply(styles, args)
        } else {
          styles.push(args[0][0])
          let len = args.length
          let i = 1
          for (; i < len; i++) {
            styles.push(args[i], args[0][i])
          }
        }
      } else if (
        process.env.NODE_ENV !== 'production' &&
        !warnedAboutExtractStatic
      ) {
        console.warn(
          'extractStatic is deprecated and will be removed in emotion@10. We recommend disabling extractStatic or using other libraries like linaria or css-literal-loader'
        )
        warnedAboutExtractStatic = true
      }

      class Styled extends view.Component<*, { theme: Object }> {
        unsubscribe: number
        mergedProps: Object
        static toString: () => string
        static __emotion_real: any
        static __emotion_styles: Interpolations
        static __emotion_base: Styled
        static __emotion_target: string
        static __emotion_forwardProp: void | (string => boolean)
        static withComponent: (ElementType, options?: StyledOptions) => any

        componentWillMount() {
          if (this.context[channel] !== undefined) {
            this.unsubscribe = this.context[channel].subscribe(
              setTheme.bind(this)
            )
          }
        }
        componentWillUnmount() {
          if (this.unsubscribe !== undefined) {
            this.context[channel].unsubscribe(this.unsubscribe)
          }
        }
        render() {
          const { props, state } = this
          this.mergedProps = pickAssign(testAlwaysTrue, {}, props, {
            theme: (state !== null && state.theme) || props.theme || {}
          })

          let className = ''
          let classInterpolations = []

          if (props.className) {
            if (staticClassName === undefined) {
              className += emotion.getRegisteredStyles(
                classInterpolations,
                props.className
              )
            } else {
              className += `${props.className} `
            }
          }
          if (staticClassName === undefined) {
            className += emotion.css.apply(
              this,
              styles.concat(classInterpolations)
            )
          } else {
            className += staticClassName
          }

          if (stableClassName !== undefined) {
            className += ` ${stableClassName}`
          }

          return view.createElement(
            baseTag,
            // $FlowFixMe
            pickAssign(shouldForwardProp, {}, props, {
              className,
              ref: props.innerRef
            })
          )
        }
      }
      Styled.displayName =
        identifierName !== undefined
          ? identifierName
          : `Styled(${
              typeof baseTag === 'string'
                ? baseTag
                : baseTag.displayName || baseTag.name || 'Component'
            })`

      if (tag.defaultProps !== undefined) {
        // $FlowFixMe
        Styled.defaultProps = tag.defaultProps
      }
      Styled.contextTypes = contextTypes
      Styled.__emotion_styles = styles
      Styled.__emotion_base = baseTag
      Styled.__emotion_real = Styled
      Styled.__emotion_forwardProp = shouldForwardProp
      Object.defineProperty(Styled, 'toString', {
        value() {
          if (
            process.env.NODE_ENV !== 'production' &&
            stableClassName === undefined
          ) {
            return 'NO_COMPONENT_SELECTOR'
          }
          // $FlowFixMe
          return `.${stableClassName}`
        }
      })

      Styled.withComponent = (
        nextTag: ElementType,
        nextOptions?: StyledOptions
      ) => {
        return createStyled(
          nextTag,
          nextOptions !== undefined
            ? // $FlowFixMe
              pickAssign(testAlwaysTrue, {}, options, nextOptions)
            : options
        )(...styles)
      }

      return Styled
    }
  }
  if (process.env.NODE_ENV !== 'production' && typeof Proxy !== 'undefined') {
    createStyled = new Proxy(createStyled, {
      get(target, property) {
        switch (property) {
          // react-hot-loader tries to access this stuff
          case '__proto__':
          case 'name':
          case 'prototype':
          case 'displayName': {
            return target[property]
          }
          default: {
            throw new Error(
              `You're trying to use the styled shorthand without babel-plugin-emotion.` +
                `\nPlease install and setup babel-plugin-emotion or use the function call syntax(\`styled('${property}')\` instead of \`styled.${property}\`)`
            )
          }
        }
      }
    })
  }
  return createStyled
}

export default createEmotionStyled
