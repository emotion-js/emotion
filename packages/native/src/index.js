import reactNative from 'react-native'
import { createCss } from '@emotion/primitives-core'

import { styled } from './styled'

const css = createCss(reactNative.StyleSheet)

const components = `ActivityIndicator ActivityIndicatorIOS ART Button DatePickerIOS DrawerLayoutAndroid
 Image ImageBackground ImageEditor ImageStore KeyboardAvoidingView ListView MapView Modal NavigatorIOS
 Picker PickerIOS ProgressBarAndroid ProgressViewIOS ScrollView SegmentedControlIOS Slider
 SliderIOS SnapshotViewIOS Switch RecyclerViewBackedScrollView RefreshControl SafeAreaView StatusBar
 SwipeableListView SwitchAndroid SwitchIOS TabBarIOS Text TextInput ToastAndroid ToolbarAndroid
 Touchable TouchableHighlight TouchableNativeFeedback TouchableOpacity TouchableWithoutFeedback
 View ViewPagerAndroid WebView FlatList SectionList VirtualizedList`

components.split(/\s+/m).forEach(comp =>
  Object.defineProperty(styled, comp, {
    enumerable: true,
    configurable: false,
    get() {
      return styled(reactNative[comp])
    }
  })
)

export { css }

export default /* #__PURE__ */ styled
