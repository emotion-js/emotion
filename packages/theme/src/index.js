// @flow
import * as React from 'react'
import { isBrowser } from '@emotion/utils'
import weakMemoize from '@emotion/weak-memoize'
import { createConsume } from 'react-context-consume'

let canUseCSSVars =
  isBrowser &&
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports('--test', 0)

type ThemeType =
  | $ReadOnly<{
      [key: string]: ThemeType
    }>
  | string
  | $ReadOnlyArray<ThemeType>

type Ret<Theme> = {
  Consumer: React.ComponentType<{
    children: Theme => React.Node
  }>,
  consume: <Props>(
    render: (props: Props, theme: Theme, ref: React.Ref<*>) => React.Node
  ) => React.ComponentType<Props>,
  Provider: React.ComponentType<{
    theme: Theme | (Theme => Theme),
    children: React.Node,
    supportsCSSVariables?: boolean
  }>,
  Extender: React.ComponentType<{ children: React.Node }>
}

function getCSSVarUsageTheme(
  theme: ThemeType,
  currentPath: string,
  prefix: string
) {
  if (typeof theme === 'string') {
    return `var(--${prefix}${currentPath === '' ? '' : '-' + currentPath})`
  }
  if (Array.isArray(theme)) {
    return theme.map((val, i) =>
      getCSSVarUsageTheme(val, currentPath + '-' + i, prefix)
    )
  }
  let keys = Object.keys(theme)
  let obj = {}
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    obj[key] = getCSSVarUsageTheme(theme[key], currentPath + '-' + key, prefix)
  }

  return obj
}

function getInlineStyles(
  theme: ThemeType,
  currentPath: string,
  stylesObj: { [string]: string },
  prefix: string
) {
  if (typeof theme === 'string') {
    stylesObj[
      `--${prefix}${currentPath === '' ? '' : '-'}${currentPath}`
    ] = theme
    return stylesObj
  }
  if (Array.isArray(theme)) {
    for (let i = 0; i < theme.length; i++) {
      getInlineStyles(theme[i], currentPath + '-' + i, stylesObj, prefix)
    }
    return stylesObj
  }
  let keys = Object.keys(theme)
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    getInlineStyles(theme[key], currentPath + '-' + key, stylesObj, prefix)
  }

  return stylesObj
}

export let createTheme = <Theme: ThemeType>(
  defaultTheme: Theme,
  options?: { prefix?: string } = {}
): $ReadOnly<Ret<Theme>> => {
  let RawThemeContext = React.createContext(defaultTheme)

  let prefix = options.prefix || 'theme'
  let shouldUseCSSVars =
    canUseCSSVars &&
    document.querySelector(`[data-theme-emotion-no-var]`) === null

  let Context = React.createContext(defaultTheme)
  // $FlowFixMe this isn't just to get flow to be quiet, i actually want to fix this because i think flow might be right
  let cssVarUsageTheme: Theme = getCSSVarUsageTheme(defaultTheme, '', prefix)

  type ProviderProps = {
    theme: Theme | (Theme => Theme),
    children: React.Node,
    supportsCSSVariables?: boolean
  }
  function renderInnerCSSVarsProvider(theme: Theme, children: React.Node) {
    return (
      <RawThemeContext.Provider value={theme}>
        <Context.Provider value={cssVarUsageTheme}>
          <div
            data-theme-emotion={prefix}
            style={getInlineStyles(theme, '', {}, prefix)}
          >
            {children}
          </div>
        </Context.Provider>
      </RawThemeContext.Provider>
    )
  }
  let isStringTheme = typeof defaultTheme === 'string'
  let merge = weakMemoize(theme => {
    return weakMemoize(theme)
  })

  let Provider = (props: ProviderProps) => {
    let { theme, children } = props
    if (shouldUseCSSVars) {
      if (typeof theme === 'function') {
        return (
          <RawThemeContext.Consumer>
            {outerTheme => {
              return renderInnerCSSVarsProvider(
                (isStringTheme ? theme : merge(theme))(outerTheme),
                children
              )
            }}
          </RawThemeContext.Consumer>
        )
      }
      return renderInnerCSSVarsProvider(theme, children)
    }
    if (typeof theme === 'function') {
      return (
        <Context.Consumer>
          {outerTheme => (
            <Context.Provider
              value={(isStringTheme ? theme : merge(theme))(outerTheme)}
            >
              {children}
            </Context.Provider>
          )}
        </Context.Consumer>
      )
    }
    return <Context.Provider value={theme}>{children}</Context.Provider>
  }
  if (!isBrowser) {
    let SupportsCSSVarsContext = React.createContext(false)
    let renderInnerSSRProvider = (
      theme: Theme,
      supportsCSSVars: boolean,
      children: React.Node
    ) => {
      return (
        <SupportsCSSVarsContext.Provider value={supportsCSSVars}>
          {supportsCSSVars ? (
            <RawThemeContext.Provider value={theme}>
              <Context.Provider value={cssVarUsageTheme}>
                <div
                  data-theme-emotion={prefix}
                  style={getInlineStyles(theme, '', {}, prefix)}
                >
                  {children}
                </div>
              </Context.Provider>
            </RawThemeContext.Provider>
          ) : (
            <Context.Provider value={theme}>
              <div data-theme-emotion-no-var="">{children}</div>
            </Context.Provider>
          )}
        </SupportsCSSVarsContext.Provider>
      )
    }
    Provider = (props: ProviderProps) => (
      <SupportsCSSVarsContext.Consumer>
        {supportsCSSVarsFromContext => {
          let supportsCSSVars =
            props.supportsCSSVariables === undefined
              ? supportsCSSVarsFromContext
              : props.supportsCSSVariables
          let theme = props.theme
          if (typeof theme === 'function') {
            return (
              <RawThemeContext.Consumer>
                {outerTheme =>
                  renderInnerSSRProvider(
                    theme(outerTheme),
                    supportsCSSVars,
                    props.children
                  )
                }
              </RawThemeContext.Consumer>
            )
          }
          return renderInnerSSRProvider(theme, supportsCSSVars, props.children)
        }}
      </SupportsCSSVarsContext.Consumer>
    )
  }

  let Extender = (props: { children: React.Node }) => {
    if (shouldUseCSSVars) {
      return (
        <RawThemeContext.Consumer>
          {theme => (
            <div style={getInlineStyles(theme, '', {}, prefix)}>
              {props.children}
            </div>
          )}
        </RawThemeContext.Consumer>
      )
    }
    return props.children
  }

  let consume = createConsume<Theme>(Context)

  return {
    Provider,
    Consumer: Context.Consumer,
    consume,
    Extender
  }
}
