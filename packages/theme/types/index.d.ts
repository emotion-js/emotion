import * as React from 'react'

type ThemeType =
  | {
      [key: string]: ThemeType
    }
  | string
  | ArrayThemeType

interface ArrayThemeType extends Array<ThemeType> {}

interface ThemeReturn<Theme> {
  Consumer: React.ComponentType<{ children: (theme: Theme) => React.ReactNode }>
  Provider: React.ComponentType<{
    theme: Theme
    supportsCSSVars?: boolean
    children: React.ReactNode
  }>
  Extender: React.ComponentType<{ children: React.ReactNode }>
  consume: <Props>(
    props: Props,
    theme: Theme,
    ref: React.Ref<any>
  ) => React.ComponentType<Props>
}

export function createTheme<Theme extends ThemeType>(
  defaultTheme: Theme
): ThemeReturn<Theme>
