import createCache from '@emotion/cache'
import { css, Global } from '@emotion/core'
import createEmotionServer from 'create-emotion-server'
import React from 'react'
import { renderToString } from 'react-dom/server'

const cache = createCache()
const { extractCritical } = createEmotionServer(cache)
const { css: styles } = extractCritical(
  renderToString(
    <Global
      styles={css`
        color: hotpink;
      `}
    />
  )
)
