import * as reactNative from 'react-native'
import { createCss } from '@emotion/primitives-core'

import { styled } from './base'

const css = createCss(reactNative.StyleSheet)

const components = [
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
]

export { css }

export default components.reduce(
  (acc, comp) =>
    Object.defineProperty(acc, comp, {
      enumerable: true,
      configurable: false,
      get() {
        return styled(reactNative[comp])
      }
    }),
  styled
)
