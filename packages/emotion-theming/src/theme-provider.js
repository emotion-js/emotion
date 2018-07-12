// @flow
// adapted from styled-components' ThemeProvider
// https://github.com/styled-components/styled-components/blob/4503cab5b86aa9ef8314c5baa360a2fbb4812485/src/models/ThemeProvider.js

import { Component, Children, type Node as ReactNode } from 'react'
import createBroadcast from './create-broadcast'
import { channel, contextTypes, type Theme } from './utils'

const isPlainObject = test =>
  Object.prototype.toString.call(test) === '[object Object]'

type Props = {
  theme: Theme,
  children: ReactNode
}

// Get the theme from the props, supporting both (outerTheme) => {} as well as object notation
function getTheme(theme: Theme, outerTheme?: Object) {
  if (typeof theme === 'function') {
    const mergedTheme = theme(outerTheme)
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

  if (outerTheme === undefined) {
    return theme
  }

  return { ...outerTheme, ...theme }
}

class ThemeProvider extends Component<Props> {
  outerTheme: Object
  broadcast: *
  unsubscribeToOuterId: number
  componentWillMount() {
    // If there is a ThemeProvider wrapper anywhere around this theme provider, merge this theme
    // with the outer theme
    if (this.context[channel] !== undefined) {
      this.unsubscribeToOuterId = this.context[channel].subscribe(theme => {
        this.outerTheme = theme

        if (this.broadcast !== undefined) {
          this.publish(this.props.theme)
        }
      })
    }

    this.broadcast = createBroadcast(
      getTheme(this.props.theme, this.outerTheme)
    )
  }

  getChildContext() {
    return {
      [channel]: {
        subscribe: this.broadcast.subscribe,
        unsubscribe: this.broadcast.unsubscribe
      }
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.theme !== nextProps.theme) {
      this.publish(nextProps.theme)
    }
  }

  componentWillUnmount() {
    const themeContext = this.context[channel]
    if (themeContext !== undefined) {
      themeContext.unsubscribe(this.unsubscribeToOuterId)
    }
  }

  publish(theme: Theme) {
    this.broadcast.publish(getTheme(theme, this.outerTheme))
  }

  render() {
    if (!this.props.children) {
      return null
    }
    return Children.only(this.props.children)
  }
}

ThemeProvider.childContextTypes = contextTypes
ThemeProvider.contextTypes = contextTypes

export default ThemeProvider
