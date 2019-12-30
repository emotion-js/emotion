// Definitions by: Junyoung Clare Jang <https://github.com/Ailrun>
// TypeScript Version: 3.2

import * as React from 'react'
import { ComponentSelector, Interpolation } from '@emotion/serialize'
import { PropsOf, DistributiveOmit, Theme } from '@emotion/core'

export {
  ArrayInterpolation,
  CSSObject,
  FunctionInterpolation
} from '@emotion/serialize'

export { ComponentSelector, Interpolation }

export interface ShouldForwardPropsIncludeOptions<Keys extends PropertyKey> {
  include: Array<Keys>
}
export interface ShouldForwardPropsExcludeOptions<Keys extends PropertyKey> {
  exclude: Array<Keys>
}
/** Same as StyledOptions but shouldForwardProp must be a type guard */
export interface FilteringStyledOptions<
  Props,
  ForwardedProps extends keyof Props = keyof Props
> {
  label?: string
  target?: string
  /**
   * Type guarded version of should forward prop
   *
   * See https://emotion.sh/docs/typescript#filter-props-helper for a helper to make these easier to writes
   *
   * @param propName The name of the prop
   * @returns true if the prop should be forwarded to the underlying component
   * @example (propName): propName is Exclude<keyof ComponentProps, 'color'> => propName !== 'color'
   * @example (propName: string): propName is Exclude<keyof ComponentProps, 'color' | 'other'> => !['color', 'other'].includes(propName)
   */
  shouldForwardProp(propName: PropertyKey): propName is ForwardedProps
}
export interface StyledOptionsIncludeFilter<
  Props,
  IncludeProps extends keyof Props = keyof Props
> {
  label?: string
  target?: string
  shouldForwardProp: ShouldForwardPropsIncludeOptions<IncludeProps>
}

export interface StyledOptionsExcludeFilter<
  Props,
  ExcludeProps extends keyof Props = keyof Props
> {
  label?: string
  target?: string
  shouldForwardProp: ShouldForwardPropsExcludeOptions<ExcludeProps>
}

export interface StyledOptions<Props> {
  label?: string
  target?: string
  shouldForwardProp?:
    | ShouldForwardPropsExcludeOptions<PropertyKey>
    | ShouldForwardPropsIncludeOptions<PropertyKey>
    | ((propName: PropertyKey) => boolean)
}

/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
export interface StyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {}
> extends React.FC<ComponentProps & SpecificComponentProps>, ComponentSelector {
  withComponent<C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C
  ): StyledComponent<ComponentProps & PropsOf<C>>
  withComponent<Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag
  ): StyledComponent<ComponentProps, JSX.IntrinsicElements[Tag]>
}

/**
 * NOTE The reason AdditionalProps is separated from the below is the outer generics
 * are inferred by the styled function, AdditionalProps can then be specified
 * by the user separately.
 * For now you can't mix specified and inferred generics. There is a proposal exploring this at:
 * https://github.com/microsoft/TypeScript/issues/26242
 */

/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
export interface CreateStyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {}
> {
  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {} = {}>(
    ...styles: Array<
      Interpolation<
        ComponentProps &
          SpecificComponentProps &
          AdditionalProps & { theme: Theme }
      >
    >
  ): StyledComponent<
    ComponentProps & AdditionalProps & { theme?: Theme },
    SpecificComponentProps
  >

  (
    template: TemplateStringsArray,
    ...styles: Array<Interpolation<ComponentProps & SpecificComponentProps>>
  ): StyledComponent<ComponentProps, SpecificComponentProps>

  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {}>(
    template: TemplateStringsArray,
    ...styles: Array<
      Interpolation<
        ComponentProps &
          SpecificComponentProps &
          AdditionalProps & { theme: Theme }
      >
    >
  ): StyledComponent<
    ComponentProps & AdditionalProps & { theme?: Theme },
    SpecificComponentProps
  >
}

/**
 * @desc
 * This function accepts a React component or tag ('div', 'a' etc).
 *
 * @example styled(MyComponent)({ width: 100 })
 * @example styled(MyComponent)(myComponentProps => ({ width: myComponentProps.width })
 * @example styled('div')({ width: 100 })
 * @example styled('div')<Props>(props => ({ width: props.width })
 */
export interface CreateStyled {
  // Component + shouldForwardProp: { include: [] }
  <
    C extends React.ComponentType<React.ComponentProps<C>>,
    IncludedProps extends keyof React.ComponentProps<
      C
    > = keyof React.ComponentProps<C>
  >(
    component: C,
    options: StyledOptionsIncludeFilter<PropsOf<C>, IncludedProps>
  ): CreateStyledComponent<Pick<PropsOf<C>, IncludedProps>>

  // Component + shouldForwardProp: { exclude: [] }
  <
    C extends React.ComponentType<React.ComponentProps<C>>,
    ExcludedProps extends keyof React.ComponentProps<
      C
    > = keyof React.ComponentProps<C>
  >(
    component: C,
    options: StyledOptionsExcludeFilter<PropsOf<C>, ExcludedProps>
  ): CreateStyledComponent<Exclude<PropsOf<C>, ExcludedProps>>

  // Component + shouldForwardProp: (prop): prop is 'x' => boolean (type guard)
  <
    C extends React.ComponentType<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<
      C
    > = keyof React.ComponentProps<C>
  >(
    component: C,
    options: FilteringStyledOptions<PropsOf<C>, ForwardedProps>
  ): CreateStyledComponent<Pick<PropsOf<C>, ForwardedProps>>

  // Component + no prop forwarding config
  <C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions<PropsOf<C>>
  ): CreateStyledComponent<PropsOf<C>>

  // JSX + shouldForwardProp: { include: [] }
  <
    Tag extends keyof JSX.IntrinsicElements,
    IncludedProps extends keyof JSX.IntrinsicElements[Tag] = keyof JSX.IntrinsicElements[Tag]
  >(
    tag: Tag,
    options: StyledOptionsIncludeFilter<
      JSX.IntrinsicElements[Tag],
      IncludedProps
    >
  ): CreateStyledComponent<{}, Pick<JSX.IntrinsicElements[Tag], IncludedProps>>

  // JSX + shouldForwardProp: { exclude: [] }
  <
    Tag extends keyof JSX.IntrinsicElements,
    ExcludedProps extends keyof JSX.IntrinsicElements[Tag] = keyof JSX.IntrinsicElements[Tag]
  >(
    tag: Tag,
    options: StyledOptionsExcludeFilter<
      JSX.IntrinsicElements[Tag],
      ExcludedProps
    >
  ): CreateStyledComponent<
    {},
    Exclude<JSX.IntrinsicElements[Tag], ExcludedProps>
  >

  // JSX + shouldForwardProp: (prop): prop is 'x' => boolean (type guard)
  <
    Tag extends keyof JSX.IntrinsicElements,
    ForwardedProps extends keyof JSX.IntrinsicElements[Tag] = keyof JSX.IntrinsicElements[Tag]
  >(
    tag: Tag,
    options: FilteringStyledOptions<JSX.IntrinsicElements[Tag], ForwardedProps>
  ): CreateStyledComponent<{}, Pick<JSX.IntrinsicElements[Tag], ForwardedProps>>

  // JSX + no prop forwarding config
  <Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag,
    options?: StyledOptions<JSX.IntrinsicElements[Tag]>
  ): CreateStyledComponent<{}, JSX.IntrinsicElements[Tag]>
}

declare const styled: CreateStyled
export default styled
