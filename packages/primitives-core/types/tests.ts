import { StyleSheet } from 'react-primitives';
import { createStyled, createCss } from '../';

createStyled(StyleSheet, {
  shouldForwardProp: () => true
});

const css = createCss(StyleSheet)({
  color: 'blue'
});
