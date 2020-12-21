'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reactNative = require('react-native');
var primitivesCore = require('@emotion/primitives-core');

function _interopNamespace(e) {
  if (e && e.__esModule) return e;
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      }
    });
  }
  n['default'] = e;
  return Object.freeze(n);
}

var reactNative__namespace = /*#__PURE__*/_interopNamespace(reactNative);

/**
 * a function that returns a styled component which render styles in React Native
 */

var styled = primitivesCore.createStyled(reactNative.StyleSheet);

var css = primitivesCore.createCss(reactNative.StyleSheet);
var components = ['ActivityIndicator', 'Button', 'DatePickerIOS', 'DrawerLayoutAndroid', 'FlatList', 'Image', 'ImageBackground', 'KeyboardAvoidingView', 'ListView', 'Modal', 'NavigatorIOS', 'Picker', 'PickerIOS', 'Pressable', 'ProgressBarAndroid', 'ProgressViewIOS', 'RecyclerViewBackedScrollView', 'RefreshControl', 'SafeAreaView', 'ScrollView', 'SectionList', 'SegmentedControlIOS', 'Slider', 'SnapshotViewIOS', 'StatusBar', 'SwipeableListView', 'Switch', 'SwitchIOS', 'TabBarIOS', 'Text', 'TextInput', 'ToolbarAndroid', 'TouchableHighlight', 'TouchableNativeFeedback', 'TouchableOpacity', 'TouchableWithoutFeedback', 'View', 'ViewPagerAndroid'];
var index = components.reduce(function (acc, comp) {
  return Object.defineProperty(acc, comp, {
    enumerable: true,
    configurable: false,
    get: function get() {
      return styled(reactNative__namespace[comp]);
    }
  });
}, styled);

exports.css = css;
exports.default = index;
