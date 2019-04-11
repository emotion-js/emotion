// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 2.8

import * as React from 'react'

import { AddOptionalTo, PropsOf } from './helper'

export interface ThemeProviderProps<Theme> {
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme)
  children?: React.ReactNode
}

export function ThemeProvider<Theme>(
  props: ThemeProviderProps<Theme>
): React.ReactElement<any>

/**
 * @todo Add more constraint to C so that
 * this function only accepts components with theme props.
 */
export function withTheme<C extends React.ComponentType<any>>(
  component: C
): React.SFC<AddOptionalTo<PropsOf<C>, 'theme'>>

export interface EmotionTheming<Theme> {
  ThemeProvider(props: ThemeProviderProps<Theme>): React.ReactElement<any>
  withTheme<C extends React.ComponentType<any>>(
    component: C
  ): React.SFC<AddOptionalTo<PropsOf<C>, 'theme'>>
}
