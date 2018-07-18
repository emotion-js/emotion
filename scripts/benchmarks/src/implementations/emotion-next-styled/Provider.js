// @flow
import * as React from 'react'
import { CSSContext } from '@emotion/core'
import createCache from '@emotion/cache'
import View from './View'

let cache = createCache()

export default (props: { children: React.Node }) => {
  return (
    <CSSContext.Provider value={cache}>
      <View>{props.children}</View>
    </CSSContext.Provider>
  )
}
