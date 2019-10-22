// @flow
import * as React from 'react'
import { cache } from 'emotion'
import { CacheProvider } from '@emotion/core'

export const wrapRootElement = ({ element }: { element: React.Node }) => {
  return <CacheProvider value={cache}>{element}</CacheProvider>
}
