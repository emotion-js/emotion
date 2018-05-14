import viewStylePropTypes from 'react-primitives/lib/web/View/ViewStylePropTypes'
import textStylePropTypes from 'react-primitives/lib/web/Text/TextStylePropTypes'
import imageStylePropTypes from 'react-primitives/lib/web/Image/ImageStylePropTypes'

export const viewStyleProps = Object.keys(viewStylePropTypes)

export const textStyleProps = Object.keys(textStylePropTypes)

export const imageStyleProps = Object.keys(imageStylePropTypes)

export const textProps = [
  'selectable',
  'accessible',
  'ellipsizeMode',
  'nativeID',
  'numberOfLines',
  'onLayout',
  'onLongPress',
  'onPress',
  'pressRetentionOffset',
  'allowFontScaling',
  'testID',
  'disabled',
  'selectionColor',
  'textBreakStrategy',
  'adjustsFontSizeToFit',
  'minimumFontScale',
  'suppressHighlighting'
]

export const viewProps = [
  'onStartShouldSetResponder',
  'accessibilityLabel',
  'hitSlop',
  'nativeID',
  'onAccessibilityTap',
  'onLayout',
  'onMagicTap',
  'onMoveShouldSetResponder',
  'onMoveShouldSetResponderCapture',
  'onResponderGrant',
  'onResponderMove',
  'onResponderReject',
  'onResponderRelease',
  'onResponderTerminate',
  'onResponderTerminationRequest',
  'accessible',
  'onStartShouldSetResponderCapture',
  'pointerEvents',
  'removeClippedSubviews',
  'testID',
  'accessibilityComponentType',
  'accessibilityLiveRegion',
  'collapsable',
  'importantForAccessibility',
  'needsOffscreenAlphaCompositing',
  'renderToHardwareTextureAndroid',
  'accessibilityTraits',
  'accessibilityViewIsModal',
  'accessibilityElementsHidden',
  'shouldRasterizeIOS'
]

export const imageProps = [
  'blurRadius',
  'onLayout',
  'onLoad',
  'onLoadEnd',
  'onLoadStart',
  'resizeMode',
  'source',
  'loadingIndicatorSource',
  'onError',
  'testID',
  'resizeMethod',
  'accessibilityLabel',
  'accessible',
  'capInsets',
  'defaultSource',
  'onPartialLoad',
  'onProgress',
  'fadeDuration',
  'Methods',
  'getSize',
  'prefetch',
  'abortPrefetch',
  'queryCache',
  'resolveAssetSource'
]
