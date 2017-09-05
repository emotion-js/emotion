import hoist from 'hoist-non-react-statics'
import React from 'react'

import channel from './channel'
import createThemeListener from './create-theme-listener'

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
        if (typeof this.unsubscribe === 'function') {
          this.unsubscribe()
        }
      }
      render() {
        const { theme } = this.state

        return <Component theme={theme} {...this.props} />
      }
    }

    hoist(WithTheme, Component)

    return WithTheme
  }
}
