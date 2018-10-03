// @flow
import * as React from 'react'
import { isBrowser } from '@emotion/utils'

let canUseCSSVars =
  isBrowser &&
  window.CSS &&
  window.CSS.supports &&
  window.CSS.supports('--test', 0)

// support nested objects and arrays
type ThemeType = {
  [key: string]: string
}

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

export let createTheme = <Theme: ThemeType>(
  defaultTheme: Theme
): Ret<Theme> => {
  let keys = Object.keys(defaultTheme)
  let cssVarTheme = keys.reduce((val, key) => {
    val[key] = `--theme-${key}`
    return val
  }, {})

  let RawThemeContext = React.createContext(defaultTheme)

  let Context = React.createContext(defaultTheme)
  // $FlowFixMe this isn't just to get flow to be quiet, i actually want to fix this because i think flow might be right
  let cssVarUsageTheme: Theme = keys.reduce((val, key) => {
    val[key] = `var(--theme-${key})`
    return val
  }, {})

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
            <div
              style={keys.reduce((val, key) => {
                val[cssVarTheme[key]] = props.theme[key]
                return val
              }, {})}
            >
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
                  <div
                    style={keys.reduce((val, key) => {
                      val[cssVarTheme[key]] = props.theme[key]
                      return val
                    }, {})}
                  >
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
            <div
              style={keys.reduce((val, key) => {
                val[cssVarTheme[key]] = theme[key]
                return val
              }, {})}
            >
              {props.children}
            </div>
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
