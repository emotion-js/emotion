import { Component, createElement as h } from 'react'
import { createTheming } from 'theming'
import PropTypes from 'prop-types'
import map from '@arr/map'
import { css } from './index'
import { omit } from './utils'

const theming = createTheming('__emotion__')
const { channel: CHANNEL, withTheme, ThemeProvider } = theming
export { CHANNEL, withTheme, ThemeProvider }

export default function (tag, cls, vars, content) {
  vars = vars || []

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
        v && typeof v === 'function'
          ? v.cls || v(mergedProps)
          : v

      const className = css(map(cls, getValue), map(vars, getValue), content)
      console.log(className)
      mergedProps.ref = props.innerRef
      mergedProps.className = props.className
        ? className + ' ' + props.className
        : className

      return h(tag, omit(mergedProps, ['innerRef', 'theme']))
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
  Styled.spec = {
    cls,
    vars,
    content
  }
  return Styled
}
