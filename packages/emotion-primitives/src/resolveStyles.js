import { StyleSheet } from 'react-primitives';

export function resolveStyles(styles) {
  return styles.map((style) => {
    if (typeof style === 'object') {
      return StyleSheet.create({ style }).style;
    }
    return style;
  });
}

function evaluateEmotionStyles(styles, props, context) {
  return styles.map((style) => {
    if (typeof style === 'function') {
      return style(props, context);
    }
    return style;
  });
}

export function getStyles(styles, props, toForward, context) {
  const emotionStyles = evaluateEmotionStyles(styles, props, context);

  if (props.style) {
    emotionStyles.push(props.style);
  }

  if (toForward) {
    emotionStyles.push(toForward);
  }

  return emotionStyles;
}
