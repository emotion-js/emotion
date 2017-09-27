import createThemeProvider from './create-theme-provider'
import createWithTheme from './create-with-theme'
import createThemeListener from './create-theme-listener'
import defaultChannel from './channel'

export const channel = defaultChannel
export const withTheme = createWithTheme()
export const ThemeProvider = createThemeProvider()
export const themeListener = createThemeListener()
export function createTheming(customChannel = defaultChannel) {
  return {
    channel: customChannel,
    withTheme: createWithTheme(customChannel),
    ThemeProvider: createThemeProvider(customChannel),
    themeListener: createThemeListener(customChannel)
  }
}
