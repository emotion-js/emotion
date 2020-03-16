// @flow
import * as React from 'react'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

let cache = createCache({ key: 'emo' })

export default (props: { children: React.Node }) => {
  return <CacheProvider value={cache}>{props.children}</CacheProvider>
}
