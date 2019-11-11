// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.1

import * as React from 'react'
import '@emotion/core'
import { DistributiveOmit, PropsOf } from './helper'
import {
  StyledComponent,
  StyledOptions,
  CreateStyledComponent,
  StyledTags
} from '@emotion/styled'

export interface ThemeProviderProps {
  theme: Partial<Emotion.Theme> | ((outerTheme: Emotion.Theme) => Emotion.Theme)
  children?: React.ReactNode
}

export interface ThemeProvider {
  (props: ThemeProviderProps): React.ReactElement
}

export type withTheme = <
  C extends React.ComponentType<React.ComponentProps<C>>
>(
  component: C
) => React.FC<DistributiveOmit<PropsOf<C>, 'theme'> & { theme?: Emotion.Theme }>

export function useTheme(): Emotion.Theme

export const ThemeProvider: ThemeProvider

export const withTheme: withTheme

export type WithTheme<P, T> = P extends { theme: infer Theme }
  ? P & { theme: Exclude<Theme, undefined> }
  : P & { theme: T }
