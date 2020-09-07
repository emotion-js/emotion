// Definitions by: Pat Sissons <https://github.com/patsissons>, L <https://github.com/louisgv>
// TypeScript Version: 3.4

import * as RN from 'react-native'
import { Theme } from '@emotion/react'

import {
  CreateStyled as BaseCreateStyled,
  CreateStyledComponent,
  CSSInterpolation,
  Interpolation,
  ReactNativeStyle,
  ReactNativeStyleType
} from './base'

import * as classComponent from '../src/classComponent'
import * as functionComponent from '../src/functionComponent'

export {
  ArrayCSSInterpolation,
  ArrayInterpolation,
  CreateStyledComponent,
  CSSInterpolation,
  FunctionInterpolation,
  Interpolation,
  InterpolationPrimitive,
  ObjectInterpolation,
  ReactNativeStyle,
  StyledComponent,
  StyledOptions
} from './base'

export function css<StyleType extends ReactNativeStyle = ReactNativeStyle>(
  template: TemplateStringsArray,
  ...args: Array<Interpolation>
): StyleType
export function css<StyleType extends ReactNativeStyle = ReactNativeStyle>(
  ...args: Array<StyleType>
): StyleType
export function css<StyleType extends ReactNativeStyle = ReactNativeStyle>(
  ...args: Array<CSSInterpolation>
): StyleType

type ReactNative = typeof RN
type ClassComponentKeys = keyof typeof classComponent
type FunctionComponentKeys = keyof typeof functionComponent

// those 2 are just copies of the `BaseCreateStyled` with supplied `C` type argument
type HostClassComponent<
  C extends React.ComponentClass<any>
> = CreateStyledComponent<
  React.ComponentProps<C> & { theme?: Theme },
  {},
  { ref?: React.Ref<InstanceType<C>> },
  ReactNativeStyleType<React.ComponentProps<C>>
>

type HostFunctionComponent<
  C extends React.FunctionComponent<any>
> = CreateStyledComponent<
  React.ComponentProps<C> & { theme?: Theme },
  {},
  {},
  ReactNativeStyleType<React.ComponentProps<C>>
>

export type StyledComponents = {
  [cKey in ClassComponentKeys]: HostClassComponent<ReactNative[cKey]>
} &
  { [fKey in FunctionComponentKeys]: HostFunctionComponent<ReactNative[fKey]> }

export interface CreateStyled extends BaseCreateStyled, StyledComponents {}

declare const styled: CreateStyled
export default styled
