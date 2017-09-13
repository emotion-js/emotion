/* global codegen */
import { createElement as h } from 'react'
import { css } from 'emotion'
import { map, reduce, assign, omit } from 'emotion-utils'

export * from 'emotion'

const push = (obj, items) => Array.prototype.push.apply(obj, items)

const reactPropsRegex = codegen.require('./props')
const testOmitPropsOnStringTag = key => reactPropsRegex.test(key)
const testOmitPropsOnComponent = key => key !== 'theme' && key !== 'innerRef'

export default function(tag, cls, objs, vars = [], content) {
  if (!tag) {
    throw new Error(
      'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
    )
  }

  const componentTag = tag.displayName || tag.name || 'Component'
  const spec = {
    vars,
    content,
    objs,
    tag,
    cls
  }
  const newSpec =
    tag.__emotion_spec !== undefined ? tag.__emotion_spec.concat(spec) : [spec]
  const localTag = newSpec[0].tag

  const omitFn =
    typeof localTag === 'string'
      ? testOmitPropsOnStringTag
      : testOmitPropsOnComponent
  function Styled(props, context) {
    const getValue = v => {
      if (v && typeof v === 'function') {
        if (v.__emotion_class !== undefined) {
          return `& .${v.__emotion_class}`
        }
        return v(props, context)
      }

      return v
    }

    let finalObjs = []

    push(
      finalObjs,
      reduce(
        newSpec,
        (accum, spec) => {
          push(accum, spec.objs)
          if (spec.content) {
            accum.push(spec.content.apply(null, map(spec.vars, getValue)))
          }
          accum.push(spec.cls)
          return accum
        },
        []
      )
    )

    if (props.className) {
      push(finalObjs, props.className.split(' '))
    }

    const className = css(map(finalObjs, getValue))

    return h(
      localTag,
      omit(
        assign({}, props, {
          ref: props.innerRef,
          className
        }),
        omitFn
      )
    )
  }

  Styled.displayName = `styled(${componentTag})`
  Styled.__emotion_spec = newSpec
  Styled.__emotion_class = cls
  return Styled
}
