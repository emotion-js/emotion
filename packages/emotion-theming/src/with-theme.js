// @flow
import * as React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { channel, contextTypes } from './utils'

type Props = { theme: Object }

const withTheme = (Component: React.ComponentType<Props>) => {
  const componentName = Component.displayName || Component.name || 'Component'

  class WithTheme extends React.Component<{}, { theme: Object }> {
    unsubscribeId: number
    componentWillMount() {
      const themeContext = this.context[channel]
      if (themeContext === undefined) {
        // eslint-disable-next-line no-console
        console.error(
          '[withTheme] Please use ThemeProvider to be able to use withTheme'
        )
        return
      }
      this.unsubscribeId = themeContext.subscribe(theme => {
        this.setState({ theme })
      })
    }

    componentWillUnmount() {
      if (this.unsubscribeId !== -1) {
        this.context[channel].unsubscribe(this.unsubscribeId)
      }
    }

    render() {
      return <Component theme={this.state.theme} {...this.props} />
    }
  }
  WithTheme.displayName = `WithTheme(${componentName})`
  WithTheme.contextTypes = contextTypes

  return hoistNonReactStatics(WithTheme, Component)
}

export default withTheme
