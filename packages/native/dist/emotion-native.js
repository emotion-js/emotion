var e = require('react-native'),
  r = require('@emotion/primitives-core')
function t(e) {
  if (e && e.__esModule) return e
  var r = Object.create(null)
  return (
    e &&
      Object.keys(e).forEach(function (t) {
        if ('default' !== t) {
          var i = Object.getOwnPropertyDescriptor(e, t)
          Object.defineProperty(
            r,
            t,
            i.get
              ? i
              : {
                  enumerable: !0,
                  get: function () {
                    return e[t]
                  },
                }
          )
        }
      }),
    (r.default = e),
    r
  )
}
var i = t(e),
  a = r.createStyled(e.StyleSheet),
  o = r.createCss(e.StyleSheet),
  c = [
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
    'ViewPagerAndroid',
  ].reduce(function (e, r) {
    return Object.defineProperty(e, r, {
      enumerable: !0,
      configurable: !1,
      get: function () {
        return a(i[r])
      },
    })
  }, a)
;(exports.css = o), (exports.default = c)
//# sourceMappingURL=emotion-native.js.map
