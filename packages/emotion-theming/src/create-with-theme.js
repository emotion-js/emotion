import hoist from 'hoist-non-react-statics'
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

    hoist(WithTheme, Component)

    /**
     * If __emotion_spec is allowed to propagate up, it causes problems because
     * the injected theme will not be available when emotion tries to generate the
     * dynamic CSS rules. We need to break the CSS aggregation in this case by not
     * lifting this static property.
     *
     * However, it's still important that we hoist other properties like __emotion_class,
     * as that is what is used for component selectors.
     */
    delete WithTheme.__emotion_spec

    return WithTheme
  }
}
