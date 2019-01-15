// Definitions by: Ben James <https://github.com/benhjames>
// TypeScript Version: 2.8

import {
  CreateStyled as BaseCreateStyled,
  CreateStyledComponentExtrinsic
} from '@emotion/styled-base'
import { Emotion } from 'create-emotion'

import * as RN from 'react-native'

// prettier-ignore
export interface StyledTags<Theme extends object> {
  ActivityIndicator: CreateStyledComponentExtrinsic<typeof RN.ActivityIndicator, {}, Theme>
  Button: CreateStyledComponentExtrinsic<typeof RN.Button, {}, Theme>
  DatePickerIOS: CreateStyledComponentExtrinsic<typeof RN.DatePickerIOS, {}, Theme>
  DrawerLayoutAndroid: CreateStyledComponentExtrinsic<typeof RN.DrawerLayoutAndroid, {}, Theme>
  FlatList: CreateStyledComponentExtrinsic<typeof RN.FlatList, {}, Theme>
  Image: CreateStyledComponentExtrinsic<typeof RN.Image, {}, Theme>
  ImageBackground: CreateStyledComponentExtrinsic<typeof RN.ImageBackground, {}, Theme>
  InputAccessoryView: CreateStyledComponentExtrinsic<typeof RN.InputAccessoryView, {}, Theme>
  KeyboardAvoidingView: CreateStyledComponentExtrinsic<typeof RN.KeyboardAvoidingView, {}, Theme>
  ListView: CreateStyledComponentExtrinsic<typeof RN.ListView, {}, Theme>
  MapView: CreateStyledComponentExtrinsic<typeof RN.MapView, {}, Theme>
  MaskedViewIOS: CreateStyledComponentExtrinsic<typeof RN.MaskedViewIOS, {}, Theme>
  Modal: CreateStyledComponentExtrinsic<typeof RN.Modal, {}, Theme>
  NavigatorIOS: CreateStyledComponentExtrinsic<typeof RN.NavigatorIOS, {}, Theme>
  Picker: CreateStyledComponentExtrinsic<typeof RN.Picker, {}, Theme>
  PickerIOS: CreateStyledComponentExtrinsic<typeof RN.PickerIOS, {}, Theme>
  ProgressBarAndroid: CreateStyledComponentExtrinsic<typeof RN.ProgressBarAndroid, {}, Theme>
  ProgressViewIOS: CreateStyledComponentExtrinsic<typeof RN.ProgressViewIOS, {}, Theme>
  RecyclerViewBackedScrollView: CreateStyledComponentExtrinsic<typeof RN.RecyclerViewBackedScrollView, {}, Theme>
  RefreshControl: CreateStyledComponentExtrinsic<typeof RN.RefreshControl, {}, Theme>
  SafeAreaView: CreateStyledComponentExtrinsic<typeof RN.SafeAreaView, {}, Theme>
  ScrollView: CreateStyledComponentExtrinsic<typeof RN.ScrollView, {}, Theme>
  // Compiles in TypeScript@3.1, but not TypeScript@next
  // SectionList: CreateStyledComponentExtrinsic<typeof RN.SectionList, {}, Theme>
  SegmentedControlIOS: CreateStyledComponentExtrinsic<typeof RN.SegmentedControlIOS, {}, Theme>
  Slider: CreateStyledComponentExtrinsic<typeof RN.Slider, {}, Theme>
  SnapshotViewIOS: CreateStyledComponentExtrinsic<typeof RN.SnapshotViewIOS, {}, Theme>
  StatusBar: CreateStyledComponentExtrinsic<typeof RN.StatusBar, {}, Theme>
  Switch: CreateStyledComponentExtrinsic<typeof RN.Switch, {}, Theme>
  SwipeableListView: CreateStyledComponentExtrinsic<typeof RN.SwipeableListView, {}, Theme>
  SwitchIOS: CreateStyledComponentExtrinsic<typeof RN.SwitchIOS, {}, Theme>
  TabBarIOS: CreateStyledComponentExtrinsic<typeof RN.TabBarIOS, {}, Theme>
  TabBarIOSItem: CreateStyledComponentExtrinsic<typeof RN.TabBarIOSItem, {}, Theme>
  Text: CreateStyledComponentExtrinsic<typeof RN.Text, {}, Theme>
  TextInput: CreateStyledComponentExtrinsic<typeof RN.TextInput, {}, Theme>
  ToolbarAndroid: CreateStyledComponentExtrinsic<typeof RN.ToolbarAndroid, {}, Theme>
  TouchableHighlight: CreateStyledComponentExtrinsic<typeof RN.TouchableHighlight, {}, Theme>
  TouchableNativeFeedback: CreateStyledComponentExtrinsic<typeof RN.TouchableNativeFeedback, {}, Theme>
  TouchableOpacity: CreateStyledComponentExtrinsic<typeof RN.TouchableOpacity, {}, Theme>
  TouchableWithoutFeedback: CreateStyledComponentExtrinsic<typeof RN.TouchableWithoutFeedback, {}, Theme>
  View: CreateStyledComponentExtrinsic<typeof RN.View, {}, Theme>
  ViewPagerAndroid: CreateStyledComponentExtrinsic<typeof RN.ViewPagerAndroid, {}, Theme>
  WebView: CreateStyledComponentExtrinsic<typeof RN.WebView, {}, Theme>
}

export interface CreateStyled<Theme extends object = any>
  extends BaseCreateStyled<Theme>,
    StyledTags<Theme> {}

declare const styled: CreateStyled
export default styled

declare const css: Emotion['css']
export { css }
