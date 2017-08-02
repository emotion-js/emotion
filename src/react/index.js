import { Component, createElement as h } from 'react'
import PropTypes from 'prop-types'
import { css } from '../index'
import { map, omit, reduce, assign } from '../utils'
import { CHANNEL } from './constants'

export {
  flush,
  css,
  injectGlobal,
  fontFace,
  keyframes,
  hydrate,
  objStyle
} from '../index'

const push = (obj, items) => Array.prototype.push.apply(obj, items)

export default function (tag, cls, objs, vars = [], content) {
  if (!tag) {
    throw new Error(
      'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
    )
  }

  const componentTag = tag.displayName || tag.name || 'Component'

  class Styled extends Component {
    state = {
      theme: {}
    }

    componentWillMount () {
      if (this.context[CHANNEL]) {
        this.setState({ theme: this.context[CHANNEL].getState() })
      }
    }

    componentDidMount () {
      if (this.context[CHANNEL]) {
        this.unsubscribe = this.context[CHANNEL].subscribe(this.setTheme)
      }
    }

    componentWillUnmount () {
      if (typeof this.unsubscribe === 'function') {
        this.unsubscribe()
      }
    }

    render () {
      const { props, state, context } = this
      const mergedProps = assign({}, props, {
        theme: state.theme
      })

      const getValue = v => {
        if (v && typeof v === 'function') {
          if (v.__emotion_class) {
            return `& .${v.__emotion_class}`
          }
          return v(mergedProps, context)
        }

        return v
      }
      let localTag = tag

      let finalObjs = []

      if (tag.__emotion_spec) {
        push(
          finalObjs,
          reduce(
            tag.__emotion_spec,
            (accum, spec) => {
              push(accum, spec.objs)
              if (spec.content) {
                push(accum, spec.content.apply(null, map(spec.vars, getValue)))
              }
              return accum
            },
            []
          )
        )
        localTag = tag.__emotion_spec[0].tag
      }

      push(finalObjs, objs)

      push(finalObjs, [cls])

      if (content) {
        push(finalObjs, content.apply(null, map(vars, getValue)))
      }

      if (mergedProps.className) {
        push(finalObjs, mergedProps.className.split(' '))
      }

      // Support Preact "class" prop
      if (mergedProps.class) {
        push(finalObjs, mergedProps.class.split(' '))
      }

      const className = css(map(finalObjs, getValue))

      return h(
        localTag,
        omit(
          assign({}, mergedProps, {
            ref: mergedProps.innerRef,
            className
          }),
          ['innerRef', 'theme']
        )
      )
    }

    setTheme = theme => this.setState({ theme })
  }

  Styled.contextTypes = {
    [CHANNEL]: PropTypes.object
  }

  Styled.displayName = `styled(${componentTag})`
  const spec = {
    vars,
    content,
    objs,
    tag
  }
  Styled.__emotion_spec = tag.__emotion_spec
    ? tag.__emotion_spec.concat(spec)
    : [spec]
  Styled.__emotion_class = cls
  return Styled
}
