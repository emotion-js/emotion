import * as e from 'react-native'
import { StyleSheet as r } from 'react-native'
import { createStyled as i, createCss as t } from '@emotion/primitives-core'
var o = i(r),
  a = t(r),
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
  ].reduce(function (r, i) {
    return Object.defineProperty(r, i, {
      enumerable: !0,
      configurable: !1,
      get: function () {
        return o(e[i])
      },
    })
  }, o)
export default c
export { a as css }
//# sourceMappingURL=emotion-native.esm.js.map
