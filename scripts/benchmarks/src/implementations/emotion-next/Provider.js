// @flow
import * as React from 'react'
import { CSSContext } from '@emotion/core'
import createCache from '@emotion/cache'

let cache = createCache()

export default (props: { children: React.Node }) => {
  return (
    <CSSContext.Provider value={cache}>{props.children}</CSSContext.Provider>
  )
}
