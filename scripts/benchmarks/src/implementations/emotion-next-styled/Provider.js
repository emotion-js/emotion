// @flow
import * as React from 'react'
import { Provider } from '@emotion/core'
import createCache from '@emotion/cache'

let cache = createCache()

export default (props: { children: React.Node }) => {
  return <Provider value={cache}>{props.children}</Provider>
}
