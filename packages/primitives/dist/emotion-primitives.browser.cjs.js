'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var reactPrimitives = require('react-primitives');
var primitivesCore = require('@emotion/primitives-core');
require('react');
var isPropValid = require('@emotion/is-prop-valid');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var isPropValid__default = /*#__PURE__*/_interopDefault(isPropValid);

var forwardableProps = {
  // primitive props
  abortPrefetch: true,
  accessibilityComponentType: true,
  accessibilityElementsHidden: true,
  accessibilityLabel: true,
  accessibilityLiveRegion: true,
  accessibilityRole: true,
  accessibilityStates: true,
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
  textBreakStrategy: true
};
function testPickPropsOnPrimitiveComponent(prop) {
  return forwardableProps[prop] === true || // This will allow the standard react props
  // and dom props since people could
  // be using it on the web
  isPropValid__default['default'](prop);
}
function testPickPropsOnOtherComponent(prop) {
  return prop !== 'theme';
}

function getShouldForwardProp(component) {
  switch (component) {
    case reactPrimitives.View:
    case reactPrimitives.Text:
    case reactPrimitives.Image:
      {
        return testPickPropsOnPrimitiveComponent;
      }
  }

  return testPickPropsOnOtherComponent;
}
/**
 * a function that returns a styled component which render styles on multiple targets with same code
 */


var styled = primitivesCore.createStyled(reactPrimitives.StyleSheet, {
  getShouldForwardProp: getShouldForwardProp
});

var css = primitivesCore.createCss(reactPrimitives.StyleSheet);

var assignPrimitives = function assignPrimitives(styled$1) {
  styled.Text = styled(reactPrimitives.Text);
  styled.View = styled(reactPrimitives.View);
  styled.Image = styled(reactPrimitives.Image);
  return styled$1;
};
var index = /* #__PURE__ */assignPrimitives(styled);

exports.css = css;
exports.default = index;
