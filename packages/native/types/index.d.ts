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
  ActivityIndicatorIOS: CreateStyledComponentExtrinsic<typeof RN.ActivityIndicatorIOS, {}, Theme>
  // ART: CreateStyledComponentExtrinsic<typeof RN.ART, {}, Theme>
  Button: CreateStyledComponentExtrinsic<typeof RN.Button, {}, Theme>
  DatePickerIOS: CreateStyledComponentExtrinsic<typeof RN.DatePickerIOS, {}, Theme>
  DrawerLayoutAndroid: CreateStyledComponentExtrinsic<typeof RN.DrawerLayoutAndroid, {}, Theme>
  Image: CreateStyledComponentExtrinsic<typeof RN.Image, {}, Theme>
  ImageBackground: CreateStyledComponentExtrinsic<typeof RN.ImageBackground, {}, Theme>
  // ImageEditor: CreateStyledComponentExtrinsic<typeof RN.ImageEditor, {}, Theme>
  // ImageStore: CreateStyledComponentExtrinsic<typeof RN.ImageStore, {}, Theme>
  KeyboardAvoidingView: CreateStyledComponentExtrinsic<typeof RN.KeyboardAvoidingView, {}, Theme>
  ListView: CreateStyledComponentExtrinsic<typeof RN.ListView, {}, Theme>
  MapView: CreateStyledComponentExtrinsic<typeof RN.MapView, {}, Theme>
  Modal: CreateStyledComponentExtrinsic<typeof RN.Modal, {}, Theme>
  NavigatorIOS: CreateStyledComponentExtrinsic<typeof RN.NavigatorIOS, {}, Theme>
  Picker: CreateStyledComponentExtrinsic<typeof RN.Picker, {}, Theme>
  PickerIOS: CreateStyledComponentExtrinsic<typeof RN.PickerIOS, {}, Theme>
  ProgressBarAndroid: CreateStyledComponentExtrinsic<typeof RN.ProgressBarAndroid, {}, Theme>
  ProgressViewIOS: CreateStyledComponentExtrinsic<typeof RN.ProgressViewIOS, {}, Theme>
  ScrollView: CreateStyledComponentExtrinsic<typeof RN.ScrollView, {}, Theme>
  SegmentedControlIOS: CreateStyledComponentExtrinsic<typeof RN.SegmentedControlIOS, {}, Theme>
  Slider: CreateStyledComponentExtrinsic<typeof RN.Slider, {}, Theme>
  // SliderIOS: CreateStyledComponentExtrinsic<typeof RN.SliderIOS, {}, Theme>
  SnapshotViewIOS: CreateStyledComponentExtrinsic<typeof RN.SnapshotViewIOS, {}, Theme>
  Switch: CreateStyledComponentExtrinsic<typeof RN.Switch, {}, Theme>
  RecyclerViewBackedScrollView: CreateStyledComponentExtrinsic<typeof RN.RecyclerViewBackedScrollView, {}, Theme>
  RefreshControl: CreateStyledComponentExtrinsic<typeof RN.RefreshControl, {}, Theme>
  SafeAreaView: CreateStyledComponentExtrinsic<typeof RN.SafeAreaView, {}, Theme>
  StatusBar: CreateStyledComponentExtrinsic<typeof RN.StatusBar, {}, Theme>
  SwipeableListView: CreateStyledComponentExtrinsic<typeof RN.SwipeableListView, {}, Theme>
  // SwitchAndroid: CreateStyledComponentExtrinsic<typeof RN.SwitchAndroid, {}, Theme>
  SwitchIOS: CreateStyledComponentExtrinsic<typeof RN.SwitchIOS, {}, Theme>
  TabBarIOS: CreateStyledComponentExtrinsic<typeof RN.TabBarIOS, {}, Theme>
  Text: CreateStyledComponentExtrinsic<typeof RN.Text, {}, Theme>
  TextInput: CreateStyledComponentExtrinsic<typeof RN.TextInput, {}, Theme>
  // ToastAndroid: CreateStyledComponentExtrinsic<typeof RN.ToastAndroid, {}, Theme>
  ToolbarAndroid: CreateStyledComponentExtrinsic<typeof RN.ToolbarAndroid, {}, Theme>
  // Touchable: CreateStyledComponentExtrinsic<typeof RN.Touchable, {}, Theme>
  TouchableHighlight: CreateStyledComponentExtrinsic<typeof RN.TouchableHighlight, {}, Theme>
  TouchableNativeFeedback: CreateStyledComponentExtrinsic<typeof RN.TouchableNativeFeedback, {}, Theme>
  TouchableOpacity: CreateStyledComponentExtrinsic<typeof RN.TouchableOpacity, {}, Theme>
  TouchableWithoutFeedback: CreateStyledComponentExtrinsic<typeof RN.TouchableWithoutFeedback, {}, Theme>
  View: CreateStyledComponentExtrinsic<typeof RN.View, {}, Theme>
  ViewPagerAndroid: CreateStyledComponentExtrinsic<typeof RN.ViewPagerAndroid, {}, Theme>
  WebView: CreateStyledComponentExtrinsic<typeof RN.WebView, {}, Theme>
  FlatList: CreateStyledComponentExtrinsic<typeof RN.FlatList, {}, Theme>
  // SectionList: CreateStyledComponentExtrinsic<typeof RN.SectionList, {}, Theme>
  // VirtualizedList: CreateStyledComponentExtrinsic<typeof RN.VirtualizedList, {}, Theme>
}

export interface CreateStyled<Theme extends object = any>
  extends BaseCreateStyled<Theme>,
    StyledTags<Theme> {}

declare const styled: CreateStyled
export default styled

declare const css: Emotion['css']
export { css }
