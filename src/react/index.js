import { Component, createElement as h } from 'react'
import PropTypes from 'prop-types'
import map from '@arr/map'
import { css } from '../index'
import { omit } from '../utils'
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

export default function (tag, objs, vars, content) {
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
      const { props, state } = this
      const mergedProps = {
        ...props,
        theme: state.theme
      }

      const getValue = v => {
        return v && typeof v === 'function'
          ? (v.__emotion_spec &&
              css(
                map(v.__emotion_spec.objs, getValue),
                map(v.__emotion_spec.vars, getValue),
                v.__emotion_spec.content
              )) ||
              v(mergedProps)
          : v
      }

      const className = `${css(
        map(objs.concat(mergedProps.className.split(' ')), getValue),
        map(vars, getValue),
        content
      )}`

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
  Styled.__emotion_spec = {
    vars,
    content,
    objs
  }
  return Styled
}
