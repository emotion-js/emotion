function evaluateStyles(styles, props) {
  return styles.map(style => {
    if (typeof style === 'function') {
      return style(props)
    }

    return style
  })
}

export function getStyles(styles, props, styleOverrides) {
  const emotionStyles = evaluateStyles(styles, props)

  if (props.style) {
    emotionStyles.push(props.style)
  }

  if (styleOverrides && Object.keys(styleOverrides).length > 0) {
    emotionStyles.push(styleOverrides)
  }

  return emotionStyles
}
