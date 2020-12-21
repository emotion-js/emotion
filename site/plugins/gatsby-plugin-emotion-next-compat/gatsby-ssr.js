// @flow
import * as React from 'react'
import { renderToString } from 'react-dom/server'
import { extractCritical } from '@emotion/server'
import { cache } from '@emotion/css'
import { CacheProvider } from '@emotion/react'

export const replaceRenderer = ({
  replaceBodyHTMLString,
  bodyComponent,
  setHeadComponents,
}: *) => {
  let { html, ids, css } = extractCritical(
    renderToString(<CacheProvider value={cache}>{bodyComponent}</CacheProvider>)
  )
  setHeadComponents([
    <style
      key="emotion"
      data-emotion={`css ${ids.join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: css,
      }}
    />,
  ])
  replaceBodyHTMLString(html)
}
