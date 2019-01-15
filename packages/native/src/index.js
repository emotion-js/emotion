import reactNative from 'react-native'
import { createCss } from '@emotion/primitives-core'

import { styled } from './styled'

const css = createCss(reactNative.StyleSheet)

const components = [
  'ActivityIndicator',
  'Button',
  'DatePickerIOS',
  'DrawerLayoutAndroid',
  'FlatList',
  'Image',
  'ImageBackground',
  'InputAccessoryView',
  'KeyboardAvoidingView',
  'ListView',
  'MapView',
  'MaskedViewIOS',
  'Modal',
  'NavigatorIOS',
  'Picker',
  'PickerIOS',
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
  'Switch',
  'SwipeableListView',
  'SwitchIOS',
  'TabBarIOS',
  'TabBarIOSItem',
  'Text',
  'TextInput',
  'ToolbarAndroid',
  'TouchableHighlight',
  'TouchableNativeFeedback',
  'TouchableOpacity',
  'TouchableWithoutFeedback',
  'View',
  'ViewPagerAndroid',
  'WebView'
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
