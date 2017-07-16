import { createTheming } from 'theming'
import { CHANNEL } from './constants'

const theming = createTheming(CHANNEL)
const { withTheme, ThemeProvider } = theming
export { CHANNEL, withTheme, ThemeProvider }
