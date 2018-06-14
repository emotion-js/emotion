import { isValidStyleProp } from './props'

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
  children: true
}

/**
 * Split primitive props, style props and styled component props into an object.
 */
export function splitProps(primitive, { innerRef, ...rest }) {
  // Style overrides are the style props that are directly passed to the styled primitive <Text display='flex' />
  const styleOverrides = {}
  // Forward props are the one which are valid primitive props, hence these props are forwarded to the component.
  const split = { toForward: {}, styleOverrides }

  for (const propName of Object.keys(rest)) {
    if (isValidStyleProp(primitive, propName)) {
      split.styleOverrides[propName] = rest[propName]
    }

    // If its a valid primitive prop, then forward it to the component. With this, we also delegate the prop checking to the platform so there are no downsides.
    if (forwardableProps[propName]) {
      split.toForward[propName] = rest[propName]
    }
  }

  return split
}
