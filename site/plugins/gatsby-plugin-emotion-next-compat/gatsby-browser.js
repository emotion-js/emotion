// @flow
import * as React from 'react'
import { cache } from 'emotion'
import { Provider } from '@emotion/core'

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
