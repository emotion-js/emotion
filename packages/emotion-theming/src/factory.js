import PropTypes from 'prop-types'
import createWithTheme from './with-theme'
import createThemeProvider from './theme-provider'

export default function createTheming(ReactlikeAPI, channel) {
  channel = channel || '__EMOTION_THEMING__'

  const contextTypes = {
    [channel]: PropTypes.object
  }

  const ThemeProvider = createThemeProvider(ReactlikeAPI, channel, contextTypes)
  const withTheme = createWithTheme(ReactlikeAPI, channel, contextTypes)

  return {
    channel,
    contextTypes,
    ThemeProvider,
    withTheme
  }
}
