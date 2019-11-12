// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.1

import * as React from 'react'
import { DistributiveOmit, PropsOf } from './helper'

export interface ThemeProviderProps<Theme> {
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme)
  children?: React.ReactNode
}

export interface ThemeProvider<Theme extends {} = any> {
  (props: ThemeProviderProps<Theme>): React.ReactElement
}

export type useTheme<Theme extends {} = any> = <T extends Theme = Theme>() => T

export type withTheme<Theme extends {} = any> = <
  C extends React.ComponentType<React.ComponentProps<C>>
>(
  component: C
) => React.FC<DistributiveOmit<PropsOf<C>, 'theme'> & { theme?: Theme }>

export const ThemeProvider: ThemeProvider

export const useTheme: useTheme

export const withTheme: withTheme

export interface EmotionTheming<Theme> {
  ThemeProvider: ThemeProvider<Theme>
  useTheme: useTheme<Theme>
  withTheme: withTheme<Theme>
}

export type WithTheme<P, T> = P extends { theme: infer Theme }
  ? P & { theme: Exclude<Theme, undefined> }
  : P & { theme: T }
