// Definitions by: Pat Sissons <https://github.com/patsissons>
// TypeScript Version: 3.4

import { ComponentPropsWithoutRef, ComponentType } from 'react'
import * as ReactNative from 'react-native'
import '@emotion/core'
import { Interpolation } from '@emotion/serialize'
import {
  CreateStyled,
  CreateStyledComponent,
  StyledComponent
} from '@emotion/styled'

type StyledReactNativeComponents = Pick<
  typeof ReactNative,
  | 'ActivityIndicator'
  | 'ActivityIndicatorIOS'
  | 'ART'
  | 'Button'
  | 'DatePickerIOS'
  | 'DrawerLayoutAndroid'
  | 'Image'
  | 'ImageBackground'
  | 'ImageEditor'
  | 'ImageStore'
  | 'KeyboardAvoidingView'
  | 'ListView'
  // does not exist?
  // | 'MapView'
  | 'Modal'
  | 'NavigatorIOS'
  | 'Picker'
  | 'PickerIOS'
  | 'ProgressBarAndroid'
  | 'ProgressViewIOS'
  | 'ScrollView'
  | 'SegmentedControlIOS'
  | 'Slider'
  // type alias to Slider
  // | 'SliderIOS'
  | 'SnapshotViewIOS'
  | 'Switch'
  | 'RecyclerViewBackedScrollView'
  | 'RefreshControl'
  | 'SafeAreaView'
  | 'StatusBar'
  | 'SwipeableListView'
  // does not exist?
  // | 'SwitchAndroid'
  | 'SwitchIOS'
  | 'TabBarIOS'
  | 'Text'
  | 'TextInput'
  | 'ToastAndroid'
  | 'ToolbarAndroid'
  // just an interface
  // | 'Touchable'
  | 'TouchableHighlight'
  | 'TouchableNativeFeedback'
  | 'TouchableOpacity'
  | 'TouchableWithoutFeedback'
  | 'View'
  | 'ViewPagerAndroid'
  | 'WebView'
  | 'FlatList'
  | 'SectionList'
  // migrated to FlatList?
  // | 'VirtualizedList'
>

export type ReactNativeStyle = ReturnType<typeof ReactNative.StyleSheet.flatten>

interface ThemedReactNativeStyledComponent<ComponentProps, Theme, ExtraProps> {
  <AdditionalProps extends {} = {}>(
    ...styles: Array<
      | Interpolation<
          ComponentProps & ExtraProps & AdditionalProps & { theme: Theme }
        >
      | ReactNativeStyle
    >
  ): StyledComponent<
    ComponentProps & AdditionalProps & { theme?: Theme },
    ExtraProps
  >
  <AdditionalProps extends {} = {}>(
    template: TemplateStringsArray,
    ...styles: Array<
      | Interpolation<
          ComponentProps & ExtraProps & AdditionalProps & { theme: Theme }
        >
      | ReactNativeStyle
    >
  ): StyledComponent<
    ComponentProps & AdditionalProps & { theme?: Theme },
    ExtraProps
  >
}

interface ThemelessReactNativeStyledComponent<ComponentProps, ExtraProps> {
  <AdditionalProps extends {} = {}, Theme extends object = {}>(
    ...styles: Array<
      | Interpolation<ComponentProps & ExtraProps & AdditionalProps>
      | ReactNativeStyle
    >
  ): StyledComponent<
    ComponentProps & AdditionalProps & { theme?: Theme },
    ExtraProps
  >
  <AdditionalProps extends {} = {}, Theme extends object = {}>(
    template: TemplateStringsArray,
    ...styles: Array<
      | Interpolation<ComponentProps & ExtraProps & AdditionalProps>
      | ReactNativeStyle
    >
  ): StyledComponent<
    ComponentProps & AdditionalProps & { theme?: Theme },
    ExtraProps
  >
}

type ReactNativeStyledComponent<
  ComponentProps,
  Theme,
  ExtraProps
> = {} extends Theme
  ? ThemelessReactNativeStyledComponent<ComponentProps, ExtraProps>
  : ThemedReactNativeStyledComponent<ComponentProps, Theme, ExtraProps>

export type Styled<Theme extends object = {}, ExtraProps = {}> = {
  [K in keyof StyledReactNativeComponents]: typeof ReactNative[K] extends ComponentType
    ? ReactNativeStyledComponent<
        ComponentPropsWithoutRef<typeof ReactNative[K]>,
        Theme,
        ExtraProps
      >
    : never
}

export function css(
  template: TemplateStringsArray,
  ...args: Array<Interpolation | ReactNativeStyle>
): ReactNativeStyle
export function css(
  ...args: Array<Interpolation | ReactNativeStyle>
): ReactNativeStyle

declare const styled: Styled
export default styled
