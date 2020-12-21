import { StyleSheet, Image, Text, View } from 'react-primitives';
import { createStyled, createCss } from '@emotion/primitives-core';
import 'react';
import isPropValid from '@emotion/is-prop-valid';

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
  isPropValid(prop);
}
function testPickPropsOnOtherComponent(prop) {
  return prop !== 'theme';
}

function getShouldForwardProp(component) {
  switch (component) {
    case View:
    case Text:
    case Image:
      {
        return testPickPropsOnPrimitiveComponent;
      }
  }

  return testPickPropsOnOtherComponent;
}
/**
 * a function that returns a styled component which render styles on multiple targets with same code
 */


var styled = createStyled(StyleSheet, {
  getShouldForwardProp: getShouldForwardProp
});

var css = createCss(StyleSheet);

var assignPrimitives = function assignPrimitives(styled$1) {
  styled.Text = styled(Text);
  styled.View = styled(View);
  styled.Image = styled(Image);
  return styled$1;
};
var index = /* #__PURE__ */assignPrimitives(styled);

export default index;
export { css };
