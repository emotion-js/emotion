// @flow
function evaluateStyles(styles: Array<any>, props: Object): Array<any> {
  return styles.map(style => {
    if (typeof style === 'function') {
      return style(props)
    }

    return style
  })
}

export function getStyles(styles: Array<*>, props: Object) {
  const emotionStyles = evaluateStyles(styles, props)

  if (props.style) {
    emotionStyles.push(props.style)
  }

  return emotionStyles
}
