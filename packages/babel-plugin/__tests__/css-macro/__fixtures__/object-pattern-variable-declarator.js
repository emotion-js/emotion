import { css } from '@emotion/react'
import { extractCritical } from '@emotion/server'
import React from 'react'
import { renderToString } from 'react-dom/server'

const { css: styles } = extractCritical(
  renderToString(
    <div
      css={css`
        color: hotpink;
      `}
    />
  )
)
