import { memoize } from 'emotion-utils'
import type { Emotion, Interpolation, Interpolations } from 'create-emotion'

function setTheme(theme) {
  this.setState({ theme })
}

declare var codegen: { require: (path: string) => * }

const reactPropsRegex: RegExp = codegen.require('./props')
const testOmitPropsOnStringTag: (key: string) => boolean = memoize(key =>
  reactPropsRegex.test(key)
)
const testOmitPropsOnComponent = key => key !== 'theme' && key !== 'innerRef'
const testAlwaysTrue = () => true

const omitAssign: (
  testFn: (key: string) => boolean,
  target: {},
  ...sources: Array<{}>
) => Object = function(testFn, target) {
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

export type EmotionStyledOptions = {
  channel: string,
  contextTypes?: *,
  Component: *,
  createElement: Function,
  contextTypes?: *
}

function createEmotionStyled(
  emotion: Emotion,
  instanceOptions: EmotionStyledOptions
) {
  function componentWillMount() {
    if (this.context[instanceOptions.channel] !== undefined) {
      this.unsubscribe = this.context[instanceOptions.channel].subscribe(
        setTheme.bind(this)
      )
    }
  }
  function componentWillUnmount() {
    if (this.unsubscribe !== undefined) {
      this.context[instanceOptions.channel].unsubscribe(this.unsubscribe)
    }
  }
  const createStyled = (tag: *, options: { e: string, label: string }) => {
    if (process.env.NODE_ENV !== 'production') {
      if (tag === undefined) {
        throw new Error(
          'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
        )
      }
    }
    let staticClassName
    let identifierName
    if (options !== undefined) {
      staticClassName = options.e
      identifierName = options.label
    }
    const isReal = tag.__emotion_real === tag
    const baseTag =
      staticClassName === undefined
        ? (isReal && tag.__emotion_base) || tag
        : tag

    const omitFn =
      typeof baseTag === 'string' &&
      baseTag.charAt(0) === baseTag.charAt(0).toLowerCase()
        ? testOmitPropsOnStringTag
        : testOmitPropsOnComponent

    return (strings: Interpolation, ...interpolations: Interpolations) => {
      let styles = (isReal && tag.__emotion_styles) || []
      if (identifierName !== undefined) {
        styles = styles.concat(`label:${identifierName};`)
      }
      if (staticClassName === undefined) {
        if (strings == null || strings.raw === undefined) {
          styles = styles.concat(strings, interpolations)
        } else {
          styles = interpolations.reduce(
            (array, interp, i) => array.concat(interp, strings[i + 1]),
            styles.concat(strings[0])
          )
        }
      }

      class Styled extends instanceOptions.Component {
        render() {
          const { props, state } = this
          this.mergedProps = omitAssign(testAlwaysTrue, {}, props, {
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

          return instanceOptions.createElement(
            baseTag,
            omitAssign(omitFn, {}, props, { className, ref: props.innerRef })
          )
        }
      }
      Styled.prototype.componentWillMount = componentWillMount
      Styled.prototype.componentWillUnmount = componentWillUnmount
      Styled.displayName =
        identifierName !== undefined
          ? identifierName
          : `Styled(${typeof baseTag === 'string'
              ? baseTag
              : baseTag.displayName || baseTag.name || 'Component'})`

      Styled.contextTypes = instanceOptions.contextTypes
      Styled.__emotion_styles = styles
      Styled.__emotion_base = baseTag
      Styled.__emotion_real = Styled

      Styled.withComponent = nextTag => {
        return createStyled(nextTag, options)(styles)
      }

      return Styled
    }
  }
  return createStyled
}

export default createEmotionStyled
