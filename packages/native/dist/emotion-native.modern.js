import * as e from 'react-native'
import { StyleSheet as i } from 'react-native'
import { createStyled as r, createCss as t } from '@emotion/primitives-core'
let o = r(i)
const a = t(i)
var c = [
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
].reduce(
  (i, r) =>
    Object.defineProperty(i, r, {
      enumerable: !0,
      configurable: !1,
      get: () => o(e[r]),
    }),
  o
)
export default c
export { a as css }
//# sourceMappingURL=emotion-native.modern.js.map
