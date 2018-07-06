// @flow

const forwardableProps = {
  // primitive props
  abortPrefetch: true,
  accessibilityComponentType: true,
  accessibilityElementsHidden: true,
  accessibilityLabel: true,
  accessibilityLiveRegion: true,
  accessibilityTraits: true,
  accessibilityViewIsModal: true,
  accessible: true,
  adjustsFontSizeToFit: true,
  allowFontScaling: true,
  blurRadius: true,
  capInsets: true,
  collapsable: true,
  defaultSource: true,
  disabled: true,
  ellipsizeMode: true,
  fadeDuration: true,
  getSize: true,
  hitSlop: true,
  importantForAccessibility: true,
  loadingIndicatorSource: true,
  Methods: true,
  minimumFontScale: true,
  nativeID: true,
  needsOffscreenAlphaCompositing: true,
  numberOfLines: true,
  onAccessibilityTap: true,
  onError: true,
  onLayout: true,
  onLoad: true,
  onLoadEnd: true,
  onLoadStart: true,
  onLongPress: true,
  onMagicTap: true,
  onMoveShouldSetResponder: true,
  onMoveShouldSetResponderCapture: true,
  onPartialLoad: true,
  onPress: true,
  onProgress: true,
  onResponderGrant: true,
  onResponderMove: true,
  onResponderReject: true,
  onResponderRelease: true,
  onResponderTerminate: true,
  onResponderTerminationRequest: true,
  onStartShouldSetResponder: true,
  onStartShouldSetResponderCapture: true,
  pointerEvents: true,
  prefetch: true,
  pressRetentionOffset: true,
  queryCache: true,
  removeClippedSubviews: true,
  renderToHardwareTextureAndroid: true,
  resizeMethod: true,
  resizeMode: true,
  resolveAssetSource: true,
  selectable: true,
  selectionColor: true,
  shouldRasterizeIOS: true,
  source: true,
  suppressHighlighting: true,
  testID: true,
  textBreakStrategy: true,

  // react props
  children: true,
  style: true
}

export function testPickPropsOnPrimitiveComponent(prop: string) {
  return forwardableProps[prop] === true
}

export function testPickPropsOnOtherComponent(prop: string) {
  return prop !== 'theme' && prop !== 'innerRef'
}
