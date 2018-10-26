// @flow
import * as React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { ThemeContext } from '@emotion/core'

let useContext: <Value>(context: React$Context<Value>) => Value = (React: any)
  .useContext

type Props = { theme: Object }

// should we change this to be forwardRef/withCSSContext style so it doesn't merge with props?
// should we remove this altogether and tell people to useContext

const withTheme = (Component: React.ComponentType<Props>) => {
  const componentName = Component.displayName || Component.name || 'Component'
  let render = (props, ref) => {
    let theme = useContext(ThemeContext)

    return <Component theme={theme} ref={ref} {...props} />
  }
  // $FlowFixMe
  let WithTheme = React.forwardRef(render)

  WithTheme.displayName = `WithTheme(${componentName})`

  return hoistNonReactStatics(WithTheme, Component)
}

export default withTheme
