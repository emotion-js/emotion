import * as React from 'react'
import styled from '@emotion/styled/base'

// Needs to be inlined to test older versions of TypeScript
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

/**
 *
 * Everything below is types extracted from MaterialUI to verify a v9 -> v10 regression (#1167)
 *
 */
export type ThemeStyle =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline'

export type ClassNameMap<ClassKey extends string = string> = Record<
  ClassKey,
  string
>
export interface StyledComponentProps<ClassKey extends string = string> {
  /**
   * Override or extend the styles applied to the component.
   */
  classes?: Partial<ClassNameMap<ClassKey>>
  innerRef?: React.Ref<any>
}
export type StandardProps<
  C,
  ClassKey extends string,
  Removals extends keyof C = never
> = Omit<C, 'classes' | Removals> &
  StyledComponentProps<ClassKey> & {
    className?: string
    ref?: C extends { ref?: infer RefType } ? RefType : React.Ref<unknown>
    style?: React.CSSProperties
  }

type Alignment = 'inherit' | 'left' | 'center' | 'right' | 'justify'

type Style = ThemeStyle | 'srOnly'
export interface TypographyProps
  extends StandardProps<React.HTMLAttributes<HTMLElement>, TypographyClassKey> {
  align?: Alignment
  color?:
    | 'initial'
    | 'inherit'
    | 'primary'
    | 'secondary'
    | 'textPrimary'
    | 'textSecondary'
    | 'error'
  component?: React.ElementType<React.HTMLAttributes<HTMLElement>>
  display?: 'initial' | 'block' | 'inline'
  gutterBottom?: boolean
  noWrap?: boolean
  paragraph?: boolean
  variant?: Style | 'inherit'
  variantMapping?: Partial<Record<Style, string>>
}

export type TypographyClassKey =
  | 'root'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'subtitle1'
  | 'subtitle2'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'button'
  | 'overline'
  | 'srOnly'
  | 'alignLeft'
  | 'alignCenter'
  | 'alignRight'
  | 'alignJustify'
  | 'noWrap'
  | 'gutterBottom'
  | 'paragraph'
  | 'colorInherit'
  | 'colorSecondary'
  | 'colorTextSecondary'
  | 'colorError'
  | 'displayInline'
  | 'displayBlock'

declare const Typography: React.ComponentType<TypographyProps>

const StyledTypography = styled(Typography)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.main
}))
;<StyledTypography variant="h6" />
