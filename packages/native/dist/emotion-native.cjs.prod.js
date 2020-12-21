'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var reactNative = require('react-native'),
  primitivesCore = require('@emotion/primitives-core')

function _interopNamespace(e) {
  if (e && e.__esModule) return e
  var n = Object.create(null)
  return (
    e &&
      Object.keys(e).forEach(function(k) {
        if ('default' !== k) {
          var d = Object.getOwnPropertyDescriptor(e, k)
          Object.defineProperty(
            n,
            k,
            d.get
              ? d
              : {
                  enumerable: !0,
                  get: function() {
                    return e[k]
                  }
                }
          )
        }
      }),
    (n.default = e),
    Object.freeze(n)
  )
}

var reactNative__namespace = _interopNamespace(reactNative),
  styled = primitivesCore.createStyled(reactNative.StyleSheet),
  css = primitivesCore.createCss(reactNative.StyleSheet),
  components = [
    'ActivityIndicator',
    'Button',
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
    'Pressable',
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
    'ToolbarAndroid',
    'TouchableHighlight',
    'TouchableNativeFeedback',
    'TouchableOpacity',
    'TouchableWithoutFeedback',
    'View',
    'ViewPagerAndroid'
  ],
  index = components.reduce(function(acc, comp) {
    return Object.defineProperty(acc, comp, {
      enumerable: !0,
      configurable: !1,
      get: function() {
        return styled(reactNative__namespace[comp])
      }
    })
  }, styled)

;(exports.css = css), (exports.default = index)
