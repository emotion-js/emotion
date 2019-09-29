// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.1

import * as React from 'react'

import {
  StyledComponent,
  StyledOptions,
  CreateStyledComponent,
  StyledTags
} from '@emotion/styled'
import { PropsOf, MakeOptional } from '@emotion/styled-base'

export interface ThemeProviderProps<Theme> {
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme)
  children?: React.ReactNode
}

export type ThemeProvider<Theme = any> = <T extends Theme = Theme>(
  props: ThemeProviderProps<T>
) => React.ReactElement

export type withTheme<Theme = any> = <
  C extends React.ComponentType<React.ComponentPropsWithRef<C>>
>(
  component: C
) => React.FC<MakeOptional<PropsOf<C>, 'theme'>>

export type useTheme<Theme = any> = <T extends Theme = Theme>() => T

export const ThemeProvider: ThemeProvider

export const withTheme: withTheme

export const useTheme: useTheme

export interface EmotionTheming<Theme> {
  ThemeProvider: ThemeProvider<Theme>
  withTheme: withTheme<Theme>
  useTheme: useTheme<Theme>
}
