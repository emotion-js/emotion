import * as React from 'react'
import View from './View'
import { ThemeProvider } from 'emotion-theming'

let theme = {}

export default props => {
  return (
    <ThemeProvider theme={theme}>
      <View>{props.children}</View>
    </ThemeProvider>
  )
}
