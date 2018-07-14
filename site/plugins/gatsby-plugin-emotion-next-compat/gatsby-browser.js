// @flow
import * as React from 'react'
import * as emotion from 'emotion'
import createCompatCache from '@emotion/compat-cache'
import { CSSContext } from '@emotion/core'

const cache = createCompatCache(emotion)

export const wrapRootComponent = ({
  Root
}: {
  Root: React.ElementType
}) => () => {
  return (
    <CSSContext.Provider value={cache}>
      <Root />
    </CSSContext.Provider>
  )
}
