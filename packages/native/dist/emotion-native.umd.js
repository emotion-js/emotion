!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports, require('react-native'), require('@emotion/primitives-core'))
    : 'function' == typeof define && define.amd
    ? define(['exports', 'react-native', '@emotion/primitives-core'], t)
    : t(((e || self).native = {}), e.reactNative, e.primitivesCore)
})(this, function (e, t, i) {
  function r(e) {
    if (e && e.__esModule) return e
    var t = Object.create(null)
    return (
      e &&
        Object.keys(e).forEach(function (i) {
          if ('default' !== i) {
            var r = Object.getOwnPropertyDescriptor(e, i)
            Object.defineProperty(
              t,
              i,
              r.get
                ? r
                : {
                    enumerable: !0,
                    get: function () {
                      return e[i]
                    },
                  }
            )
          }
        }),
      (t.default = e),
      t
    )
  }
  var o = r(t),
    a = i.createStyled(t.StyleSheet),
    n = i.createCss(t.StyleSheet),
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
    ].reduce(function (e, t) {
      return Object.defineProperty(e, t, {
        enumerable: !0,
        configurable: !1,
        get: function () {
          return a(o[t])
        },
      })
    }, a)
  ;(e.css = n), (e.default = c)
})
//# sourceMappingURL=emotion-native.umd.js.map
