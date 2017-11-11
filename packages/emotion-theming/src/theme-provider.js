// adapted from styled-components' ThemeProvider
// https://github.com/styled-components/styled-components/blob/4503cab5b86aa9ef8314c5baa360a2fbb4812485/src/models/ThemeProvider.js

import React, { Component } from 'react'
import createBroadcast from './create-broadcast'
import { channel, contextTypes } from './utils'
import { contentType } from '../../../../../Library/Caches/typescript/2.6/node_modules/@types/mime-types'

const isPlainObject = test =>
  Object.prototype.toString.call(test) === '[object Object]'

class ThemeProvider extends Component {
  constructor() {
    super()
    this.getTheme = this.getTheme.bind(this)
  }

  componentWillMount() {
    // If there is a ThemeProvider wrapper anywhere around this theme provider, merge this theme
    // with the outer theme
    if (this.context[channel] !== undefined) {
      this.unsubscribeToOuterId = this.context[channel].subscribe(theme => {
        this.outerTheme = theme
      })
    }
    this.broadcast = createBroadcast(this.getTheme(this.props.theme))
  }

  getChildContext() {
    return {
      [channel]: {
        subscribe: this.broadcast.subscribe,
        unsubscribe: this.broadcast.unsubscribe
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.theme !== nextProps.theme) {
      this.broadcast.publish(this.getTheme(nextProps.theme))
    }
  }

  componentWillUnmount() {
    const themeContext = this.context[channel]
    if (themeContext !== undefined) {
      themeContext.unsubscribe(this.unsubscribeToOuterId)
    }
  }

  // Get the theme from the props, supporting both (outerTheme) => {} as well as object notation
  getTheme(theme) {
    if (typeof theme === 'function') {
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

    if (this.outerTheme === undefined) {
      return theme
    }

    return { ...this.outerTheme, ...theme }
  }
  static contextTypes = contextTypes
  static childContextTypes = contextTypes
  render() {
    if (!this.props.children) {
      return null
    }
    return React.Children.only(this.props.children)
  }
}

export default ThemeProvider
