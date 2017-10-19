import { StatelessComponent, ComponentClass, CSSProperties } from 'react'
import { Interpolation as EmotionInterpolation } from 'emotion'

export * from 'emotion'

export type InterpolationFn<Props = {}> =
  (props: Props) =>
    | EmotionInterpolation
    | InterpolationFn<Props>

export type InterpolationTypes<Props = {}> =
  | InterpolationFn<Props>
  | EmotionInterpolation

export type Interpolation<Props = {}> =
  | InterpolationTypes<Props>
  | InterpolationTypes<Props>[]

export interface Options {
  string?: string,
}

type Component<Props> =
  | ComponentClass<Props>
  | StatelessComponent<Props>

export type ThemedProps<Props, Theme> = Props & {
  theme: Theme,
}

export interface StyledComponent<Props, Theme, IntrinsicProps>
  extends
    ComponentClass<Props & IntrinsicProps>,
    StatelessComponent<Props & IntrinsicProps>
{
  withComponent<Tag extends keyof JSX.IntrinsicElements>(tag: Tag):
    StyledComponent<Props, Theme, JSX.IntrinsicElements[Tag]>

  withComponent(component: Component<Props>):
    StyledComponent<Props, Theme, {}>

  displayName: string

  __emotion_styles: string[]
  __emotion_base: string | Component<Props & IntrinsicProps>
  __emotion_real: ThemedReactEmotionInterface<Theme>
}

export type ObjectStyleAttributes =
  | CSSProperties
  | { [key: string]: ObjectStyleAttributes }

export interface CreateStyled<Props, Theme, IntrinsicProps> {
  // overload for template string as styles
  (
    strings: TemplateStringsArray,
    ...vars: Interpolation<ThemedProps<Props & IntrinsicProps, Theme>>[],
  ): StyledComponent<Props, Theme, IntrinsicProps>

  // overload for object as styles
  (
    ...styles: (
      | ObjectStyleAttributes
      | ((props: ThemedProps<Props & IntrinsicProps, Theme>) => ObjectStyleAttributes)
    )[]
  ): StyledComponent<Props, Theme, IntrinsicProps>
}

// TODO: find a way to reuse CreateStyled here
// for now I needed to repeat all fn types/overloads
type ShorthandsFactories<Theme> = {
  [Tag in keyof JSX.IntrinsicElements]: {
    // overload for template string as styles
    <Props = {}>(
      strings: TemplateStringsArray,
      ...vars: Interpolation<ThemedProps<Props & JSX.IntrinsicElements[Tag], Theme>>[],
    ): StyledComponent<Props, Theme, JSX.IntrinsicElements[Tag]>
  
    // overload for object as styles
    <Props = {}>(
      ...styles: (
        | ObjectStyleAttributes
        | ((props: ThemedProps<Props & JSX.IntrinsicElements[Tag], Theme>) => ObjectStyleAttributes)
      )[]
    ): StyledComponent<Props, Theme, JSX.IntrinsicElements[Tag]>
  };
};

export interface ThemedReactEmotionInterface<Theme> extends ShorthandsFactories<Theme> {
  // overload for dom tag
  <Props, Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag,
    options?: Options,
  ): CreateStyled<Props, Theme, JSX.IntrinsicElements[Tag]>

  // overload for component
  <Props>(
    component: Component<Props>,
    options?: Options,
  ): CreateStyled<Props, Theme, {}>
}

export interface ThemedReactEmotionModule<Theme> {
  default: ThemedReactEmotionInterface<Theme>
}

declare const styled: ThemedReactEmotionInterface<any>
export default styled


