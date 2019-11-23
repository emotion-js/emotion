// Definitions by: Pat Sissons <https://github.com/patsissons>
// TypeScript Version: 3.4

import { ComponentPropsWithoutRef, ComponentType } from 'react'
import * as RN from 'react-native'

type ReactNative = typeof RN

export type ReactNativeStyle = ReturnType<ReactNative['StyleSheet']['flatten']>

export interface ArrayInterpolation<MergedProps>
  extends Array<Interpolation<MergedProps>> {}

export type ObjectInterpolation = RN.ViewStyle | RN.TextStyle | RN.ImageStyle

export interface FunctionInterpolation<MergedProps> {
  (mergedProps: MergedProps): Interpolation<MergedProps>
}

export type Interpolation<MergedProps = unknown> =
  | null
  | undefined
  | boolean
  | number
  | string
  | ReactNativeStyle
  | ObjectInterpolation
  | ArrayInterpolation<MergedProps>
  | FunctionInterpolation<MergedProps>

export type ReactNativeComponentNames =
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

export type ReactNativeComponents = Pick<ReactNative, ReactNativeComponentNames>

export type ReactNativeComponentProps<
  ComponentName extends ReactNativeComponentNames
> = ComponentPropsWithoutRef<ReactNativeComponents[ComponentName]>

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

export interface StyledWithComponent<ComponentProps extends {}> {
  withComponent<
    Component extends ComponentType<ComponentPropsWithoutRef<Component>>
  >(
    component: Component
  ): StyledComponent<ComponentProps & ComponentPropsWithoutRef<Component>>
  withComponent<ComponentName extends ReactNativeComponentNames>(
    component: ReactNativeComponents[ComponentName]
  ): StyledComponent<ComponentProps, ReactNativeComponentProps<ComponentName>>
}

/**
 * @typeparam ComponentProps  Props which will be included when withComponent is called
 * @typeparam SpecificComponentProps  Props which will *not* be included when withComponent is called
 */
export type StyledComponent<
  ComponentProps extends {},
  SpecificComponentProps extends {} = {}
> = ComponentType<ComponentProps & SpecificComponentProps> &
  StyledWithComponent<ComponentProps>

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
    Component extends ComponentType<ComponentPropsWithoutRef<Component>>,
    ForwardedProps extends keyof ComponentPropsWithoutRef<
      Component
    > = keyof ComponentPropsWithoutRef<Component>
  >(
    component: Component,
    options: FilteringStyledOptions<
      ComponentPropsWithoutRef<Component>,
      ForwardedProps
    >
  ): CreateStyledComponent<
    Pick<ComponentPropsWithoutRef<Component>, ForwardedProps> & {
      theme?: Theme
    },
    {},
    { theme: Theme }
  >

  <Component extends ComponentType<ComponentPropsWithoutRef<Component>>>(
    component: Component,
    options?: StyledOptions<ComponentPropsWithoutRef<Component>>
  ): CreateStyledComponent<
    ComponentPropsWithoutRef<Component> & { theme?: Theme },
    {},
    { theme: Theme }
  >

  <
    ComponentName extends ReactNativeComponentNames,
    ForwardedProps extends keyof ReactNativeComponentProps<
      ComponentName
    > = keyof ReactNativeComponentProps<ComponentName>
  >(
    component: ReactNativeComponents[ComponentName],
    options: FilteringStyledOptions<
      ReactNativeComponentProps<ComponentName>,
      ForwardedProps
    >
  ): CreateStyledComponent<
    { theme?: Theme },
    Pick<ReactNativeComponentProps<ComponentName>, ForwardedProps>,
    { theme: Theme }
  >

  <ComponentName extends ReactNativeComponentNames>(
    component: ReactNativeComponents[ComponentName],
    options?: StyledOptions<ReactNativeComponentProps<ComponentName>>
  ): CreateStyledComponent<
    { theme?: Theme },
    ReactNativeComponentProps<ComponentName>,
    { theme: Theme }
  >
}

export const styled: CreateStyled
