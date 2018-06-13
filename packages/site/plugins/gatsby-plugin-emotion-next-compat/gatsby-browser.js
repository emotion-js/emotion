import React from 'react'
import * as emotion from 'emotion'
import createCompatCache from '@emotion/compat-cache'
import Provider from '@emotion/provider'

const cache = createCompatCache(emotion)

export const wrapRootComponent = ({ Root }) => () => {
  return (
    <Provider cache={cache}>
      <Root />
    </Provider>
  )
}
