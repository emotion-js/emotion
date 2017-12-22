import React from 'react'
import createTheming from './factory'

export const {
  channel,
  contextTypes,
  ThemeProvider,
  withTheme
} = createTheming(React)
