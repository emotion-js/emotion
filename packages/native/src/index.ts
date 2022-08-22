import * as ReactNative from 'react-native'
import { createCss } from '@emotion/primitives-core'

import {
  CreateStyled as BaseCreateStyled,
  CreateStyledComponent,
  CSSInterpolation,
  Interpolation,
  ReactNativeStyle,
  ReactNativeStyleType,
  styled as baseStyled
} from './base'
import React from 'react'
import { Theme } from '@emotion/react'

export type {
  ArrayCSSInterpolation,
  ArrayInterpolation,
  CreateStyledComponent,
  CSSInterpolation,
  FilteringStyledOptions,
  FunctionInterpolation,
  Interpolation,
  InterpolationPrimitive,
  ObjectInterpolation,
  ReactNativeStyle,
  StyledComponent,
  StyledOptions
} from './base'

export interface EmotionNativeCss {
  <StyleType extends ReactNativeStyle = ReactNativeStyle>(
    template: TemplateStringsArray,
    ...args: Array<Interpolation>
  ): StyleType

  <StyleType extends ReactNativeStyle = ReactNativeStyle>(
    ...args: Array<StyleType>
  ): StyleType

  <StyleType extends ReactNativeStyle = ReactNativeStyle>(
    ...args: Array<CSSInterpolation>
  ): StyleType

  <MergedProps, StyleType extends ReactNativeStyle = ReactNativeStyle>(
    this: MergedProps,
    ...args: Array<Interpolation<MergedProps, StyleType>>
  ): StyleType
}

export const css: EmotionNativeCss = createCss(ReactNative.StyleSheet)

// those 2 are just copies of the `BaseCreateStyled` with supplied `C` type argument
type HostClassComponent<C extends React.ComponentClass<any>> =
  CreateStyledComponent<
    React.ComponentProps<C> & { theme?: Theme; as?: React.ElementType },
    {},
    { ref?: React.Ref<InstanceType<C>> },
    ReactNativeStyleType<React.ComponentProps<C>>
  >
type HostFunctionComponent<C extends React.FunctionComponent<any>> =
  CreateStyledComponent<
    React.ComponentProps<C> & { theme?: Theme; as?: React.ElementType },
    {},
    {},
    ReactNativeStyleType<React.ComponentProps<C>>
  >

type RN = typeof ReactNative

const components = [
  'ActivityIndicator',
  'DatePickerIOS',
  'DrawerLayoutAndroid',
  'FlatList',
  'Image',
  'ImageBackground',
  'KeyboardAvoidingView',
  'ListView',
  'Modal',
  'NavigatorIOS',
  'Picker',
  'PickerIOS',
  'ProgressBarAndroid',
  'ProgressViewIOS',
  'RecyclerViewBackedScrollView',
  'RefreshControl',
  'SafeAreaView',
  'ScrollView',
  'SectionList',
  'SegmentedControlIOS',
  'Slider',
  'SnapshotViewIOS',
  'StatusBar',
  'SwipeableListView',
  'Switch',
  'SwitchIOS',
  'TabBarIOS',
  'Text',
  'TextInput',
  'TouchableHighlight',
  'TouchableNativeFeedback',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
  'View',
  'ViewPagerAndroid',
  'Pressable'
]

type RNClassComponent =
  | 'ActivityIndicator'
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
  | 'TouchableHighlight'
  | 'TouchableNativeFeedback'
  | 'TouchableOpacity'
  | 'TouchableWithoutFeedback'
  | 'View'
  | 'ViewPagerAndroid'

type RNFunctionComponent = 'Pressable'

export type StyledComponents = {
  [C in RNClassComponent]: HostClassComponent<RN[C]>
} &
  { [C in RNFunctionComponent]: HostFunctionComponent<RN[C]> }

export type CreateStyled = BaseCreateStyled & StyledComponents

const styled: CreateStyled = components.reduce(
  (acc, comp) =>
    Object.defineProperty(acc, comp, {
      enumerable: true,
      configurable: false,
      get() {
        return baseStyled(
          ReactNative[comp as RNClassComponent | RNFunctionComponent]
        )
      }
    }),
  baseStyled
) as any

export default styled
