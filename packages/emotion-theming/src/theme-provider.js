// adapted from styled-components' ThemeProvider
// https://github.com/styled-components/styled-components/blob/4503cab5b86aa9ef8314c5baa360a2fbb4812485/src/models/ThemeProvider.js

import createBroadcast from './create-broadcast'

const isPlainObject = test =>
  Object.prototype.toString.call(test) === '[object Object]'

export default (ReactlikeAPI, channel, contextTypes) => {
  class ThemeProvider extends ReactlikeAPI.Component {
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

          if (this.broadcast !== undefined) {
            this.publish(this.props.theme)
          }
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
        this.publish(nextProps.theme)
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
        if (
          process.env.NODE_ENV !== 'production' &&
          !isPlainObject(mergedTheme)
        ) {
          throw new Error(
            '[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!'
          )
        }
        return mergedTheme
      }
      if (process.env.NODE_ENV !== 'production' && !isPlainObject(theme)) {
        throw new Error(
          '[ThemeProvider] Please make your theme prop a plain object'
        )
      }

      if (this.outerTheme === undefined) {
        return theme
      }

      return { ...this.outerTheme, ...theme }
    }

    publish(theme) {
      this.broadcast.publish(this.getTheme(theme))
    }

    render() {
      const children = Array.prototype.concat(this.props.children)

      if (children.length > 1) {
        if (process.env.NODE_ENV !== 'production') {
          throw new Error(
            '[ThemeProvider] ThemeProvider only accepts a single child'
          )
        }
      }

      return children[0] || null
    }
  }

  ThemeProvider.childContextTypes = contextTypes
  ThemeProvider.contextTypes = contextTypes

  return ThemeProvider
}
