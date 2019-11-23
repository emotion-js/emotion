// Definitions by: Pat Sissons <https://github.com/patsissons>
// TypeScript Version: 3.4

import { ComponentPropsWithoutRef, ComponentType } from 'react'
import * as RN from 'react-native'
import { PropsOf } from '@emotion/core'

type ReactNative = typeof RN

export type ReactNativeStyle = ReturnType<ReactNative['StyleSheet']['flatten']>

export interface ArrayInterpolation<MP> extends Array<Interpolation<MP>> {}

// @ts-ignore
export interface ObjectInterpolation
  extends RN.ViewStyle,
    RN.TextStyle,
    RN.ImageStyle {}

export interface FunctionInterpolation<MergedProps> {
  (mergedProps: MergedProps): Interpolation<MergedProps>
}

export type Interpolation<MergedProps = undefined> =
  | null
  | undefined
  | boolean
  | number
  | string
  | ReactNativeStyle
  | ObjectInterpolation
  | ArrayInterpolation<MergedProps>
  | FunctionInterpolation<MergedProps>

type ReactNativeTags =
  | 'ActivityIndicator'
  | 'ActivityIndicatorIOS'
  | 'Button'
  | 'DatePickerIOS'
  | 'DrawerLayoutAndroid'
  | 'FlatList'
  | 'Image'
  | 'ImageBackground'
  | 'KeyboardAvoidingView'
  | 'ListView'
  | 'Modal'
  | 'NavigatorIOS'
  | 'Picker'
  | 'PickerIOS'
  | 'ProgressBarAndroid'
  | 'ProgressViewIOS'
  | 'RecyclerViewBackedScrollView'
  | 'RefreshControl'
  | 'SafeAreaView'
  | 'ScrollView'
  | 'SectionList'
  | 'SegmentedControlIOS'
  | 'Slider'
  | 'SnapshotViewIOS'
  | 'StatusBar'
  | 'SwipeableListView'
  | 'Switch'
  | 'SwitchIOS'
  | 'TabBarIOS'
  | 'Text'
  | 'TextInput'
  | 'ToolbarAndroid'
  | 'TouchableHighlight'
  | 'TouchableNativeFeedback'
  | 'TouchableOpacity'
  | 'TouchableWithoutFeedback'
  | 'View'
  | 'ViewPagerAndroid'
  | 'WebView'

export type ReactNativeElements = {
  [Tag in ReactNativeTags]: PropsOf<ReactNative[Tag]>
}

/** Same as StyledOptions but shouldForwardProp must be a type guard */
export interface FilteringStyledOptions<
  Props,
  ForwardedProps extends keyof Props = keyof Props
> {
  shouldForwardProp?(propName: PropertyKey): propName is ForwardedProps
}

export interface StyledOptions<Props> {
  shouldForwardProp?(propName: PropertyKey): boolean
}

/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
export interface StyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {}
> extends React.FC<ComponentProps & SpecificComponentProps> {
  withComponent<C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C
  ): StyledComponent<ComponentProps & PropsOf<C>>
  withComponent<Tag extends keyof ReactNativeElements>(
    tag: Tag
  ): StyledComponent<ComponentProps, ReactNativeElements[Tag]>
}

/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 * @typeparam StyleProps  Params passed to styles but not exposed as React props. These are normally library provided props
 */
export interface CreateStyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {},
  StyleProps extends {} = {}
> {
  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {} = {}>(
    ...styles: Array<
      Interpolation<
        ComponentProps & SpecificComponentProps & StyleProps & AdditionalProps
      >
    >
  ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps>
  /**
   * @typeparam AdditionalProps  Additional props to add to your styled component
   */
  <AdditionalProps extends {} = {}>(
    template: TemplateStringsArray,
    ...styles: Array<
      Interpolation<
        ComponentProps & SpecificComponentProps & AdditionalProps & StyleProps
      >
    >
  ): StyledComponent<ComponentProps & AdditionalProps, SpecificComponentProps>
}

/**
 * @desc
 * This function accepts a React component.
 *
 * @example styled(MyComponent)({ width: 100 })
 * @example styled(MyComponent)(myComponentProps => ({ width: myComponentProps.width })
 * @example styled(View)({ width: 100 })
 * @example styled(View)<Props>(props => ({ width: props.width })
 */
export interface CreateStyled<Theme extends {} = any> {
  <
    C extends React.ComponentType<React.ComponentProps<C>>,
    ForwardedProps extends keyof React.ComponentProps<
      C
    > = keyof React.ComponentProps<C>
  >(
    component: C,
    options: FilteringStyledOptions<PropsOf<C>, ForwardedProps>
  ): CreateStyledComponent<
    Pick<PropsOf<C>, ForwardedProps> & { theme?: Theme },
    {},
    { theme: Theme }
  >

  <C extends React.ComponentType<React.ComponentProps<C>>>(
    component: C,
    options?: StyledOptions<PropsOf<C>>
  ): CreateStyledComponent<PropsOf<C> & { theme?: Theme }, {}, { theme: Theme }>

  <
    Tag extends keyof ReactNativeElements,
    ForwardedProps extends keyof ReactNativeElements[Tag] = keyof ReactNativeElements[Tag]
  >(
    tag: Tag,
    options: FilteringStyledOptions<ReactNativeElements[Tag], ForwardedProps>
  ): CreateStyledComponent<
    { theme?: Theme },
    Pick<ReactNativeElements[Tag], ForwardedProps>,
    { theme: Theme }
  >

  <Tag extends keyof ReactNativeElements>(
    tag: Tag,
    options?: StyledOptions<ReactNativeElements[Tag]>
  ): CreateStyledComponent<
    { theme?: Theme },
    ReactNativeElements[Tag],
    { theme: Theme }
  >
}

declare const styled: CreateStyled
export default styled
