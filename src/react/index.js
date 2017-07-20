import { Component, createElement as h } from 'react'
import PropTypes from 'prop-types'
import { css } from '../index'
import { map, omit, reduce } from '../utils'
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

export default function (tag, objs, vars = [], content) {
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
      const mergedProps = {
        ...props,
        theme: state.theme
      }

      const getValue = v => {
        if (v && typeof v === 'function') {
          if (v.__emotion_spec) {
            return css(
              map(v.__emotion_spec.objs, getValue),
              map(v.__emotion_spec.vars, getValue),
              v.__emotion_spec.content
            )
          }
          return v(mergedProps, context)
        }

        return v
      }

      let finalObjs = []

      if (tag.__emotion_spec) {
        Array.prototype.push.apply(
          finalObjs,
          reduce(
            tag.__emotion_spec,
            (accum, spec) => {
              Array.prototype.push.apply(accum, spec.objs)
              Array.prototype.push.apply(
                accum,
                spec.content(map(spec.vars, getValue))
              )
              return accum
            },
            []
          )
        )
      }

      Array.prototype.push.apply(finalObjs, objs)

      if (content) {
        Array.prototype.push.apply(finalObjs, content(map(vars, getValue)))
      }

      if (mergedProps.className) {
        Array.prototype.push.apply(finalObjs, mergedProps.className.split(' '))
      }

      const className = css(map(finalObjs, getValue))

      return h(
        tag,
        omit(
          Object.assign({}, mergedProps, {
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
    objs
  }
  Styled.__emotion_spec = tag.__emotion_spec
    ? tag.__emotion_spec.concat(spec)
    : [spec]
  return Styled
}
