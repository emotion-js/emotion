// @flow

import { ThemeContext } from '@emotion/core'
import createTheme from './create-theme'

const { ThemeProvider, useTheme } = /* #__PURE__ */ createTheme(
  undefined,
  ThemeContext
)
export { ThemeProvider, useTheme }
export { default as withTheme } from './with-theme'
