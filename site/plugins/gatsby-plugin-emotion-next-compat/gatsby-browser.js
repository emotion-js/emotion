// @flow
import * as React from 'react'
import * as emotion from 'emotion'
import createCompatCache from '@emotion/compat-cache'
import { Provider } from '@emotion/core'

const cache = createCompatCache(emotion)

export const wrapRootComponent = ({
  Root
}: {
  Root: React.ElementType
}) => () => {
  return (
    <Provider value={cache}>
      <Root />
    </Provider>
  )
}
