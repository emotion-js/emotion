import hoistNonReactStatics from 'hoist-non-react-statics'

export default (ReactlikeAPI, channel, contextTypes) => WrappedComponent => {
  const componentName =
    WrappedComponent.displayName || WrappedComponent.name || 'Component'

  class WithTheme extends ReactlikeAPI.Component {
    componentWillMount() {
      const themeContext = this.context[channel]
      if (process.env.NODE_ENV !== 'production' && themeContext === undefined) {
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
      return ReactlikeAPI.createElement(WrappedComponent, {
        theme: this.state.theme,
        ...this.props
      })
    }
  }

  WithTheme.displayName = `WithTheme(${componentName})`
  WithTheme.contextTypes = contextTypes

  return hoistNonReactStatics(WithTheme, WrappedComponent)
}
