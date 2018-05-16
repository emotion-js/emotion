import viewStylePropTypes from 'react-primitives/lib/web/View/ViewStylePropTypes'
import textStylePropTypes from 'react-primitives/lib/web/Text/TextStylePropTypes'
import imageStylePropTypes from 'react-primitives/lib/web/Image/ImageStylePropTypes'

// <View /> Style props
const viewStyleProps = Object.keys(viewStylePropTypes)
// <Text /> Style props
const textStyleProps = Object.keys(textStylePropTypes)
// <Image /> Style props
const imageStyleProps = Object.keys(imageStylePropTypes)

// <Text /> primitive props
const textProps = [
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

// <View /> primitive props
const viewProps = [
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

// <Image /> primitive props
const imageProps = [
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

export const isPrimitiveProp = (element, propName) => {
  if (element === 'Text') return textProps.indexOf(propName) > -1

  if (element === 'View') return viewProps.indexOf(propName) > -1

  if (element === 'Image') return imageProps.indexOf(propName) > -1

  if (typeof element === 'function' && element.name === 'Text') return textProps.indexOf(propName) > -1

  if (typeof element === 'function' && element.name === 'View') return viewProps.indexOf(propName) > -1

  if (typeof element === 'function' && element.name === 'Image') return imageProps.indexOf(propName) > -1

  return false
}

export const isValidStyleProp = (element, propName) => {
  if (element === 'Text') return textStyleProps.indexOf(propName) > -1

  if (element === 'View') return viewStyleProps.indexOf(propName) > -1

  if (element === 'Image') return imageStyleProps.indexOf(propName) > -1

  if (typeof element === 'function' && element.name === 'Text') return textStyleProps.indexOf(propName) > -1

  if (typeof element === 'function' && element.name === 'View') return viewStyleProps.indexOf(propName) > -1

  if (typeof element === 'function' && element.name === 'Image') return imageStyleProps.indexOf(propName) > -1

  return false
}
