import createBroadcast from 'brcast'
import PropTypes from 'prop-types'
import isFunction from 'is-function'
import isPlainObject from 'is-plain-object'
import React from 'react'

import channel from './channel'

/**
 * Provide a theme to an entire react component tree via context
 * and event listeners (have to do both context
 * and event emitter as pure components block context updates)
 */

export default function createThemeProvider(CHANNEL = channel) {
  return class ThemeProvider extends React.Component {
    static propTypes = {
      children: PropTypes.element,
      theme: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.func])
        .isRequired
    }

    static childContextTypes = {
      [CHANNEL]: PropTypes.object.isRequired
    }

    static contextTypes = {
      [CHANNEL]: PropTypes.object
    }

    broadcast = createBroadcast(this.getTheme())

    // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation
    getTheme(passedTheme) {
      const theme = passedTheme || this.props.theme
      if (isFunction(theme)) {
        const mergedTheme = theme(this.outerTheme)
        if (!isPlainObject(mergedTheme)) {
          throw new Error(
            '[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!'
          )
        }
        return mergedTheme
      }
      if (!isPlainObject(theme)) {
        throw new Error(
          '[ThemeProvider] Please make your theme prop a plain object'
        )
      }

      if (!this.outerTheme) {
        return theme
      }

      return { ...this.outerTheme, ...theme }
    }

    setOuterTheme = theme => {
      this.outerTheme = theme
    }

    getChildContext() {
      return { [CHANNEL]: this.broadcast }
    }

    componentDidMount() {
      // create a new subscription for keeping track of outer theme, if present
      if (this.context[CHANNEL]) {
        this.unsubscribe = this.context[CHANNEL].subscribe(this.setOuterTheme)
      }
    }

    // set broadcast state by merging outer theme with own
    componentWillMount() {
      if (this.context[CHANNEL]) {
        this.setOuterTheme(this.context[CHANNEL].getState())
        this.broadcast.setState(this.getTheme())
      }
    }

    componentWillReceiveProps(nextProps) {
      if (this.props.theme !== nextProps.theme) {
        this.broadcast.setState(this.getTheme(nextProps.theme))
      }
    }

    componentWillUnmount() {
      if (typeof this.unsubscribe === 'function') {
        this.unsubscribe()
      }
    }

    render() {
      if (!this.props.children) {
        return null
      }
      return React.Children.only(this.props.children)
    }
  }
}
