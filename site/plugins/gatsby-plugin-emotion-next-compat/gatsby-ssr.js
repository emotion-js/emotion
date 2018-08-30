// @flow
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { renderStylesToString } from 'emotion-server'
import { cache } from 'emotion'
import { Provider } from '@emotion/core'

export const replaceRenderer = ({
  replaceBodyHTMLString,
  bodyComponent
}: *) => {
  return replaceBodyHTMLString(
    renderStylesToString(
      renderToString(<Provider value={cache}>{bodyComponent}</Provider>)
    )
  )
}
