import React from 'react'

import channel from './channel'
import createThemeListener from './create-theme-listener'
import { isFunction } from './utils'

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component'

export default function createWithTheme(CHANNEL = channel) {
  const themeListener = createThemeListener(CHANNEL)
  return Component => {
    class WithTheme extends React.Component {
      static displayName = `WithTheme(${getDisplayName(Component)})`
      static contextTypes = themeListener.contextTypes

      constructor(props, context) {
        super(props, context)
        this.state = { theme: themeListener.initial(context) }
        this.setTheme = theme => this.setState({ theme })
      }

      componentDidMount() {
        this.unsubscribe = themeListener.subscribe(this.context, this.setTheme)
      }

      componentWillUnmount() {
        if (isFunction(this.unsubscribe)) {
          this.unsubscribe()
        }
      }

      render() {
        return <Component theme={this.state.theme} {...this.props} />
      }
    }

    return WithTheme
  }
}
