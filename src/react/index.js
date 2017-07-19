import { Component, createElement as h } from 'react'
import PropTypes from 'prop-types'
import { css } from '../index'
import { map, omit } from '../utils'
import { CHANNEL } from './constants'

export { flush, css, injectGlobal, fontFace, keyframes, hydrate, objStyle } from '../index'

export default function (tag, cls, vars = [], content) {
  if (!tag) {
    throw new Error(
      'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
    )
  }

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

      const getValue = v =>
        v && typeof v === 'function' ? v.cls || v(mergedProps) : v

      const className = css(map(cls, getValue), map(vars, getValue), content)

      return h(
        tag,
        omit(
          Object.assign({}, mergedProps, {
            ref: mergedProps.innerRef,
            className: mergedProps.className
              ? className + ' ' + mergedProps.className
              : className
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

  const name = typeof cls[0] === 'string' ? cls[0].split('-')[1] : ''
  const componentTag = tag.displayName || tag.name || 'Component'
  Styled.displayName = `styled(${componentTag}${name})`
  Styled.cls = '.' + cls
  return Styled
}
