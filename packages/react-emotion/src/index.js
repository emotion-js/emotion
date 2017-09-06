import { createElement } from 'react'
import { css } from 'emotion'
import { omitAssign } from 'emotion-utils'
import propsRegexString from /* preval */ './props'

export * from 'emotion'

const reactPropsRegex = new RegExp(propsRegexString)
const testOmitPropsOnStringTag = key => reactPropsRegex.test(key)
const testOmitPropsOnComponent = key => key !== 'theme' && key !== 'innerRef'

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
      let className = css(
        strings,
        ...interpolations.map(v => {
          if (typeof v === 'function') {
            return v(props, context)
          }
          return v
        })
      )
      if (props.className) {
        className += ` ${props.className}`
      }

      return createElement(
        baseTag,
        omitAssign(omitFn, {}, props, { className, ref: props.innerRef })
      )
    }
    Styled.__emotion_strings = strings
    Styled.__emotion_interp = interpolations
    Styled.__emotion_base = baseTag
    Styled.displayName = `styled(${baseTag.displayName ||
      baseTag.name ||
      'Component'})`

    return Styled
  }
}
