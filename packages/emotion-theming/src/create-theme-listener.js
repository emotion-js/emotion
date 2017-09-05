import PropTypes from 'prop-types'

import channel from './channel'

export default function createThemeListener(CHANNEL = channel) {
  const contextTypes = {
    [CHANNEL]: PropTypes.object.isRequired
  }

  function initial(context) {
    if (!context[CHANNEL]) {
      throw new Error(
        `[${this
          .displayName}] Please use ThemeProvider to be able to use WithTheme`
      )
    }

    return context[CHANNEL].getState()
  }

  function subscribe(context, cb) {
    if (context[CHANNEL]) {
      return context[CHANNEL].subscribe(cb)
    }
  }

  return {
    contextTypes,
    initial,
    subscribe
  }
}
