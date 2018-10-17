// @flow
import * as React from 'react'
import { CacheProvider } from '@emotion/core'
import createCache from '@emotion/cache'

let cache = createCache()

export default (props: { children: React.Node }) => {
  return <CacheProvider value={cache}>{props.children}</CacheProvider>
}
