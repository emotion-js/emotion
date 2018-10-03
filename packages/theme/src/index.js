// @flow
import * as React from 'react'
import { isBrowser } from '@emotion/utils'

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
    theme: Theme,
    children: React.Node,
    supportsCSSVariables?: boolean
  }>,
  Extender: React.ComponentType<{ children: React.Node }>
}

function getCSSVarUsageTheme(theme: ThemeType, currentPath: string) {
  if (typeof theme === 'string') {
    return `var(--theme-${currentPath})`
  }
  if (Array.isArray(theme)) {
    return theme.map((val, i) =>
      getCSSVarUsageTheme(val, currentPath + '-' + i)
    )
  }
  let keys = Object.keys(theme)
  let obj = {}
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    obj[key] = getCSSVarUsageTheme(theme[key], currentPath + '-' + key)
  }

  return obj
}

function getInlineStyles(
  theme: ThemeType,
  currentPath: string,
  stylesObj: { [string]: string }
) {
  if (typeof theme === 'string') {
    stylesObj[`--theme-${currentPath}`] = theme
    return stylesObj
  }
  if (Array.isArray(theme)) {
    for (let i = 0; i < theme.length; i++) {
      getInlineStyles(theme[i], currentPath + '-' + i, stylesObj)
    }
    return stylesObj
  }
  let keys = Object.keys(theme)
  for (let i = 0; i < keys.length; i++) {
    let key = keys[i]
    getInlineStyles(theme[key], currentPath + '-' + key, stylesObj)
  }

  return stylesObj
}

export let createTheme = <Theme: ThemeType>(
  defaultTheme: Theme
): Ret<Theme> => {
  let RawThemeContext = React.createContext(defaultTheme)

  let Context = React.createContext(defaultTheme)
  // $FlowFixMe this isn't just to get flow to be quiet, i actually want to fix this because i think flow might be right
  let cssVarUsageTheme: Theme = getCSSVarUsageTheme(defaultTheme, '')

  type ProviderProps = {
    theme: Theme,
    children: React.Node,
    supportsCSSVariables?: boolean
  }

  let Provider = (props: ProviderProps) => {
    if (canUseCSSVars) {
      return (
        <RawThemeContext.Provider value={props.theme}>
          <Context.Provider value={cssVarUsageTheme}>
            <div style={getInlineStyles(props.theme, '', {})}>
              {props.children}
            </div>
          </Context.Provider>
        </RawThemeContext.Provider>
      )
    }
    return (
      <Context.Provider value={props.theme}>{props.children}</Context.Provider>
    )
  }
  if (!isBrowser) {
    let SupportsCSSVarsContext = React.createContext(false)
    Provider = props => (
      <SupportsCSSVarsContext.Consumer>
        {supportsCSSVarsFromContext => {
          let supportsCSSVars =
            props.supportsCSSVariables === undefined
              ? supportsCSSVarsFromContext
              : props.supportsCSSVariables
          return (
            <SupportsCSSVarsContext.Provider value={supportsCSSVars}>
              {supportsCSSVars ? (
                <Context.Provider value={cssVarUsageTheme}>
                  <div style={getInlineStyles(props.theme, '', {})}>
                    {props.children}
                  </div>
                </Context.Provider>
              ) : (
                <Context.Provider value={props.theme}>
                  {props.children}
                </Context.Provider>
              )}
            </SupportsCSSVarsContext.Provider>
          )
        }}
      </SupportsCSSVarsContext.Consumer>
    )
  }

  let Extender = (props: { children: React.Node }) => {
    if (canUseCSSVars) {
      return (
        <RawThemeContext.Consumer>
          {theme => (
            <div style={getInlineStyles(theme, '', {})}>{props.children}</div>
          )}
        </RawThemeContext.Consumer>
      )
    }
    return props.children
  }

  let consume = <Props>(
    render: (props: Props, theme: Theme, ref: React.Ref<*>) => React.Node
  ): React.ComponentType<Props> => {
    // $FlowFixMe
    return React.forwardRef((props, ref) => {
      return (
        <Context.Consumer>
          {theme => {
            return render(props, theme, ref)
          }}
        </Context.Consumer>
      )
    })
  }

  return {
    Provider,
    Consumer: Context.Consumer,
    consume,
    Extender
  }
}
