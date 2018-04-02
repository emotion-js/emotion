// TypeScript Version: 2.3
// tslint:disable-next-line:no-implicit-dependencies
import { StatelessComponent, ComponentClass, CSSProperties } from 'react';
import { Interpolation as EmotionInterpolation } from 'emotion';

export * from 'emotion';

export type InterpolationFn<Props = {}> =
  (props: Props) =>
    | EmotionInterpolation
    | InterpolationFn<Props>;

export type InterpolationTypes<Props = {}> =
  | InterpolationFn<Props>
  | EmotionInterpolation;

export type Interpolation<Props = {}> =
  | InterpolationTypes<Props>
  | Array<InterpolationTypes<Props>>;

export interface Options {
  string?: string;
}

type Component<Props> =
  | ComponentClass<Props>
  | StatelessComponent<Props>;

export type ThemedProps<Props, Theme> = Props & {
  theme: Theme,
};

type ElementProps<Tag extends keyof JSX.IntrinsicElements> =
  & JSX.IntrinsicElements[Tag]
  & { innerRef?: JSX.IntrinsicElements[Tag]['ref'] };

export interface StyledComponent<Props, Theme, IntrinsicProps>
  extends
    ComponentClass<Props & IntrinsicProps>,
    StatelessComponent<Props & IntrinsicProps> {
  withComponent<Tag extends keyof JSX.IntrinsicElements>(tag: Tag):
    StyledComponent<Props, Theme, ElementProps<Tag>>;

  withComponent(component: Component<Props>):
    StyledComponent<Props, Theme, {}>;

  displayName: string;

  __emotion_styles: string[];
  __emotion_base: string | Component<Props & IntrinsicProps>;
  __emotion_real: ThemedReactEmotionInterface<Theme>;
}

export type ObjectStyleAttributes =
  | CSSProperties
  | { [key: string]: ObjectStyleAttributes };

export interface CreateStyled<Props, Theme, IntrinsicProps> {
  // overload for template string as styles
  (
    strings: TemplateStringsArray,
    ...vars: Array<Interpolation<ThemedProps<Props & IntrinsicProps, Theme>>>
  ): StyledComponent<Props, Theme, IntrinsicProps>;

  // overload for object as styles
  (
    ...styles: Array<
      | ObjectStyleAttributes
      | ((props: ThemedProps<Props & IntrinsicProps, Theme>) => ObjectStyleAttributes)
    >
  ): StyledComponent<Props, Theme, IntrinsicProps>;
}

// TODO: find a way to reuse CreateStyled here
// for now I needed to repeat all fn types/overloads
type ShorthandsFactories<Theme> = {
  [Tag in keyof JSX.IntrinsicElements]: {
    // overload for template string as styles
    <Props = {}>(
      strings: TemplateStringsArray,
      ...vars: Array<Interpolation<ThemedProps<Props & JSX.IntrinsicElements[Tag], Theme>>>
    ): StyledComponent<Props, Theme, ElementProps<Tag>>

    // overload for object as styles
    <Props = {}>(
      ...styles: Array<
        | ObjectStyleAttributes
        | ((props: ThemedProps<Props & JSX.IntrinsicElements[Tag], Theme>) => ObjectStyleAttributes)
      >
    ): StyledComponent<Props, Theme, ElementProps<Tag>>
  };
};

export interface ThemedReactEmotionInterface<Theme> extends ShorthandsFactories<Theme> {
  // overload for dom tag
  <Props, Tag extends keyof JSX.IntrinsicElements>(
    tag: Tag,
    options?: Options,
    // tslint:disable-next-line:no-unnecessary-generics
  ): CreateStyled<Props, Theme, ElementProps<Tag>>;

  // overload for component
  <Props, CustomProps>(
    component: Component<Props>,
    options?: Options,
    // tslint:disable-next-line:no-unnecessary-generics
  ): CreateStyled<Props & CustomProps, Theme, {}>;
}

export interface ThemedReactEmotionModule<Theme> {
  default: ThemedReactEmotionInterface<Theme>;
}

declare const styled: ThemedReactEmotionInterface<any>;
export default styled;
