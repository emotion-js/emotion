'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var reactPrimitives = require('react-primitives'),
  primitivesCore = require('@emotion/primitives-core')

require('react')

var isPropValid = require('@emotion/is-prop-valid')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var isPropValid__default = _interopDefault(isPropValid),
  forwardableProps = {
    abortPrefetch: !0,
    accessibilityComponentType: !0,
    accessibilityElementsHidden: !0,
    accessibilityLabel: !0,
    accessibilityLiveRegion: !0,
    accessibilityRole: !0,
    accessibilityStates: !0,
    accessibilityTraits: !0,
    accessibilityViewIsModal: !0,
    accessible: !0,
    adjustsFontSizeToFit: !0,
    allowFontScaling: !0,
    blurRadius: !0,
    capInsets: !0,
    collapsable: !0,
    defaultSource: !0,
    disabled: !0,
    ellipsizeMode: !0,
    fadeDuration: !0,
    getSize: !0,
    hitSlop: !0,
    importantForAccessibility: !0,
    loadingIndicatorSource: !0,
    Methods: !0,
    minimumFontScale: !0,
    nativeID: !0,
    needsOffscreenAlphaCompositing: !0,
    numberOfLines: !0,
    pointerEvents: !0,
    prefetch: !0,
    pressRetentionOffset: !0,
    queryCache: !0,
    removeClippedSubviews: !0,
    renderToHardwareTextureAndroid: !0,
    resizeMethod: !0,
    resizeMode: !0,
    resolveAssetSource: !0,
    selectable: !0,
    selectionColor: !0,
    shouldRasterizeIOS: !0,
    source: !0,
    suppressHighlighting: !0,
    testID: !0,
    textBreakStrategy: !0
  }

function testPickPropsOnPrimitiveComponent(prop) {
  return !0 === forwardableProps[prop] || isPropValid__default.default(prop)
}

function testPickPropsOnOtherComponent(prop) {
  return 'theme' !== prop
}

function getShouldForwardProp(component) {
  switch (component) {
    case reactPrimitives.View:
    case reactPrimitives.Text:
    case reactPrimitives.Image:
      return testPickPropsOnPrimitiveComponent
  }
  return testPickPropsOnOtherComponent
}

var styled = primitivesCore.createStyled(reactPrimitives.StyleSheet, {
    getShouldForwardProp: getShouldForwardProp
  }),
  css = primitivesCore.createCss(reactPrimitives.StyleSheet),
  assignPrimitives = function(styled$1) {
    return (
      (styled.Text = styled(reactPrimitives.Text)),
      (styled.View = styled(reactPrimitives.View)),
      (styled.Image = styled(reactPrimitives.Image)),
      styled$1
    )
  },
  index = assignPrimitives(styled)

;(exports.css = css), (exports.default = index)
