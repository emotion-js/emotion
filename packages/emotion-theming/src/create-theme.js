// @flow
import * as React from 'react'
import weakMemoize from '@emotion/weak-memoize'

type Props = {
  theme: Object | (Object => Object),
  children: React.Node
}

let getTheme = (outerTheme: Object, theme: Object | (Object => Object)) => {
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

// second parameter is private, so we can inject ThemeContext from @emotion/core
const createTheme = (
  defaultValue,
  ThemeContext = React.createContext<Object>(defaultValue)
) => {
  let ThemeProvider = (props: Props) => {
    return (
      <ThemeContext.Consumer>
        {theme => {
          if (props.theme !== theme) {
            theme = createCacheWithTheme(theme)(props.theme)
          }
          return (
            <ThemeContext.Provider value={theme}>
              {props.children}
            </ThemeContext.Provider>
          )
        }}
      </ThemeContext.Consumer>
    )
  }

  let useTheme = () => React.useContext(ThemeContext)

  return {
    ThemeProvider,
    useTheme
  }
}

export default createTheme
