import * as reactNative from 'react-native';
import { StyleSheet } from 'react-native';
import { createStyled, createCss } from '@emotion/primitives-core';

/**
 * a function that returns a styled component which render styles in React Native
 */

var styled = createStyled(StyleSheet);

var css = createCss(StyleSheet);
var components = ['ActivityIndicator', 'Button', 'DatePickerIOS', 'DrawerLayoutAndroid', 'FlatList', 'Image', 'ImageBackground', 'KeyboardAvoidingView', 'ListView', 'Modal', 'NavigatorIOS', 'Picker', 'PickerIOS', 'Pressable', 'ProgressBarAndroid', 'ProgressViewIOS', 'RecyclerViewBackedScrollView', 'RefreshControl', 'SafeAreaView', 'ScrollView', 'SectionList', 'SegmentedControlIOS', 'Slider', 'SnapshotViewIOS', 'StatusBar', 'SwipeableListView', 'Switch', 'SwitchIOS', 'TabBarIOS', 'Text', 'TextInput', 'ToolbarAndroid', 'TouchableHighlight', 'TouchableNativeFeedback', 'TouchableOpacity', 'TouchableWithoutFeedback', 'View', 'ViewPagerAndroid'];
var index = components.reduce(function (acc, comp) {
  return Object.defineProperty(acc, comp, {
    enumerable: true,
    configurable: false,
    get: function get() {
      return styled(reactNative[comp]);
    }
  });
}, styled);

export default index;
export { css };
