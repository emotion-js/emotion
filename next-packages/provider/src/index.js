// @flow
import * as React from 'react'
import { withCSSContext, Provider } from '@emotion/core'
import weakMemoize from '@emotion/weak-memoize'

type Props = {
  theme: Object | (Object => Object),
  children: React.Node
}

let getTheme = (outerTheme: Object, theme: Object | (Object => Object)) => {
  if (typeof theme === 'function') {
    const mergedTheme = theme(outerTheme)
    if (
      process.env.NODE_ENV !== 'production' &&
      Object.prototype.toString.call(mergedTheme) !== '[object Object]'
    ) {
      throw new Error(
        '[@emotion/provider] Please return an object from your theme function, i.e. theme={() => ({})}!'
      )
    }
    return mergedTheme
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    Object.prototype.toString.call(theme) !== '[object Object]'
  ) {
    throw new Error(
      '[@emotion/provider] Please make your theme prop a plain object'
    )
  }

  return { ...outerTheme, ...theme }
}

let createCreateCacheWithTheme = weakMemoize(cache => {
  return weakMemoize(theme => {
    let actualTheme = getTheme(cache.theme, theme)
    return {
      ...cache,
      theme: actualTheme
    }
  })
})

export default withCSSContext((props: Props, context) => {
  if (props.theme !== context.theme) {
    context = createCreateCacheWithTheme(context)(props.theme)
  }
  return <Provider value={context}>{props.children}</Provider>
})
