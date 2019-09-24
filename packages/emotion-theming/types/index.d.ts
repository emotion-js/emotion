// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.1

import * as React from 'react'

import {
  StyledComponent,
  StyledOptions,
  CreateStyledComponent,
  StyledTags
} from '@emotion/styled'
import { PropsOf } from '@emotion/styled-base'

export interface ThemeProviderProps<Theme> {
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme)
  children?: React.ReactNode
}

export function ThemeProvider<Theme>(
  props: ThemeProviderProps<Theme>
): React.ReactElement

export function useTheme<Theme>(): Theme

export interface withTheme<Theme> {
  <C extends React.ReactType<any>>(component: C): React.FC<
    Omit<PropsOf<C>, 'theme'> & { theme?: Theme }
  >
}

export const withTheme: withTheme<any>

/**
 * @desc
 * Themed version of CreateStyled
 */
export interface CreateThemedStyled<Theme extends object>
  extends StyledTags<{ theme: Theme }> {
  <Props extends object, ExtraProps = {}>(
    tag: React.ComponentType<Props>,
    options?: StyledOptions
  ): CreateStyledComponent<Props, ExtraProps & { theme: Theme }>

  <Tag extends keyof JSX.IntrinsicElements, ExtraProps = {}>(
    tag: Tag,
    options?: StyledOptions
  ): CreateStyledComponent<
    JSX.IntrinsicElements[Tag],
    ExtraProps & { theme: Theme }
  >
}

export type WithTheme<P, T> = P extends { theme: infer Theme }
  ? P & { theme: Exclude<Theme, undefined> }
  : P & { theme: T }
