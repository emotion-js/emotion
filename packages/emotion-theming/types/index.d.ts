// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.1

import * as React from 'react'

import {
  StyledComponent,
  StyledOptions,
  CreateStyledComponent,
  StyledTags
} from '@emotion/styled'
import { PropsOf, DistributiveOmit } from '@emotion/styled-base'

export interface ThemeProviderProps<Theme> {
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme)
  children?: React.ReactNode
}

export interface ThemeProvider<Theme = any> {
  (props: ThemeProviderProps<Theme>): React.ReactElement
}

export type withTheme<Theme = any> = <
  C extends React.ComponentType<React.ComponentProps<C>>
>(
  component: C
) => React.FC<DistributiveOmit<PropsOf<C>, 'theme'> & { theme?: Theme }>

export type useTheme<Theme = any> = <T extends Theme = Theme>() => T

export const ThemeProvider: ThemeProvider

export const withTheme: withTheme

export const useTheme: useTheme

export interface EmotionTheming<Theme> {
  ThemeProvider: ThemeProvider<Theme>
  withTheme: withTheme<Theme>
  useTheme: useTheme<Theme>
}

export type WithTheme<P, T> = P extends { theme: infer Theme }
  ? P & { theme: Exclude<Theme, undefined> }
  : P & { theme: T }
