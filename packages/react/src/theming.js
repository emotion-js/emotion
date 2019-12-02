// @flow
import * as React from 'react'
import weakMemoize from '@emotion/weak-memoize'
import hoistNonReactStatics from 'hoist-non-react-statics'

export const ThemeContext = React.createContext<Object>({})

export const useTheme = () => React.useContext(ThemeContext)

const getTheme = (outerTheme: Object, theme: Object | (Object => Object)) => {
  if (typeof theme === 'function') {
    const mergedTheme = theme(outerTheme)
    if (
      process.env.NODE_ENV !== 'production' &&
      (mergedTheme == null ||
        typeof mergedTheme !== 'object' ||
        Array.isArray(mergedTheme))
    ) {
      throw new Error(
        '[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!'
      )
    }
    return mergedTheme
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    (theme == null || typeof theme !== 'object' || Array.isArray(theme))
  ) {
    throw new Error(
      '[ThemeProvider] Please make your theme prop a plain object'
    )
  }

  return { ...outerTheme, ...theme }
}

let createCacheWithTheme = weakMemoize(outerTheme => {
  return weakMemoize(theme => {
    return getTheme(outerTheme, theme)
  })
})

type ThemeProviderProps = {
  theme: Object | (Object => Object),
  children: React.Node
}

export const ThemeProvider = (props: ThemeProviderProps) => {
  let theme = React.useContext(ThemeContext)

  if (props.theme !== theme) {
    theme = createCacheWithTheme(theme)(props.theme)
  }
  return (
    <ThemeContext.Provider value={theme}>
      {props.children}
    </ThemeContext.Provider>
  )
}

export function withTheme<Config: {}>(
  Component: React.AbstractComponent<Config>
): React.AbstractComponent<$Diff<Config, { theme: Object }>> {
  const componentName = Component.displayName || Component.name || 'Component'
  let render = (props, ref) => {
    let theme = React.useContext(ThemeContext)

    return <Component theme={theme} ref={ref} {...props} />
  }
  // $FlowFixMe
  let WithTheme = React.forwardRef(render)

  WithTheme.displayName = `WithTheme(${componentName})`

  return hoistNonReactStatics(WithTheme, Component)
}
