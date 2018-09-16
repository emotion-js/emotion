// @flow
import * as React from 'react'
import { cache } from 'emotion'
import { Provider } from '@emotion/core'

export const wrapRootElement = ({ element }: { element: React.Node }) => {
  return <Provider value={cache}>{element}</Provider>
}
