import { isValidStyleProp } from './props'

const primitiveProps = `selectable accessible ellipsizeMode nativeID  numberOfLines  onLayout  onLongPress  onPress  pressRetentionOffset  allowFontScaling  testID  disabled  selectionColor  textBreakStrategy  adjustsFontSizeToFit  minimumFontScale  suppressHighlighting  onStartShouldSetResponder  accessibilityLabel  hitSlop  nativeID  onAccessibilityTap  onLayout  onMagicTap  onMoveShouldSetResponder  onMoveShouldSetResponderCapture  onResponderGrant  onResponderMove  onResponderReject  onResponderRelease  onResponderTerminate  onResponderTerminationRequest  accessible  onStartShouldSetResponderCapture  pointerEvents  removeClippedSubviews  testID  accessibilityComponentType  accessibilityLiveRegion  collapsable  importantForAccessibility  needsOffscreenAlphaCompositing  renderToHardwareTextureAndroid  accessibilityTraits  accessibilityViewIsModal  accessibilityElementsHidden  shouldRasterizeIOS  blurRadius  onLayout  onLoad  onLoadEnd  onLoadStart  resizeMode  source  loadingIndicatorSource  onError  testID  resizeMethod  accessibilityLabel  accessible capInsets defaultSource onPartialLoad onProgress fadeDuration Methods getSize prefetch abortPrefetch queryCache resolveAssetSource`

/**
 * Split primitive props, style props and styled component props into an object.
 */
export function splitProps(primitive, { innerRef, ...rest }) {
  // Style overrides are the style props that are directly passed to the styled primitive <Text display='flex' />
  const styleOverrides = {}
  // Forward props are the one which are valid primitive props, hence these props are forwarded to the component.
  const returnValue = { toForward: {}, styleOverrides }

  return Object.keys(rest).reduce((split, propName) => {
    if (isValidStyleProp(primitive, propName)) {
      split.styleOverrides[propName] = rest[propName]
    }

    // If its a valid primitive prop, then forward it to the component. With this, we also delegate the prop checking to the platform so there are no downsides.
    primitiveProps.split(/\s+/m).forEach(prop => {
      if (prop === propName) {
        split.toForward[propName] = rest[propName]
      }
    })

    if (propName === 'children') {
      split.toForward[propName] = rest[propName]
    }

    return split
  }, returnValue)
}
