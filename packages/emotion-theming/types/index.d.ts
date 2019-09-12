// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.1

import * as React from 'react'

import {
  StyledComponent,
  StyledOptions,
  CreateStyledComponent
} from '@emotion/styled'

export interface ThemeProviderProps<Theme> {
  theme: Partial<Theme> | ((outerTheme: Theme) => Theme)
  children?: React.ReactNode
}

export function ThemeProvider<Theme>(
  props: ThemeProviderProps<Theme>
): React.ReactElement

export function useTheme<Theme>(): Theme

export function withTheme<P extends object>(
  component: React.ComponentType<P & { theme: any }>
): // Return type needs to have an optional theme so it is composible
React.FC<Omit<P, 'theme'> & { theme?: any }>

export interface EmotionTheming<Theme> {
  ThemeProvider(props: ThemeProviderProps<Theme>): React.ReactElement
  withTheme<P extends object>(
    component: React.ComponentType<P & { theme: Theme }>
  ): React.FC<Omit<P, 'theme'> & { theme?: any }>
}

/**
 * @desc
 * This function accepts `InnerProps`/`Tag` to infer the type of `tag`,
 * and accepts `ExtraProps` for user who use string style
 * to be able to declare extra props without using
 * `` styled('button')<ExtraProps>`...` ``, which does not supported in
 * styled-component VSCode extension.
 * If your tool support syntax highlighting for `` styled('button')<ExtraProps>`...` ``
 * it could be more efficient.
 */
export interface CreateThemedStyled<Theme extends object> {
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
