// @flow
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { renderStylesToString } from 'emotion-server'
import { cache } from 'emotion'
import { CacheProvider } from '@emotion/core'

export const replaceRenderer = ({
  replaceBodyHTMLString,
  bodyComponent
}: *) => {
  return replaceBodyHTMLString(
    renderStylesToString(
      renderToString(
        <CacheProvider value={cache}>{bodyComponent}</CacheProvider>
      )
    )
  )
}
