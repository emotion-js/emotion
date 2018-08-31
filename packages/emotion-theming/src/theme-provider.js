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
      (mergedTheme == null ||
        typeof mergedTheme !== 'object' ||
        Array.isArray(mergedTheme))
    ) {
      throw new Error(
        '[ThemeProvider] Please return an object from your theme function, i.e. theme={() => ({})}!'
      )
    }
    return mergedTheme
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    (theme == null || typeof theme !== 'object' || Array.isArray(theme))
  ) {
    throw new Error(
      '[ThemeProvider] Please make your theme prop a plain object'
    )
  }

  return { ...outerTheme, ...theme }
}

let createCacheWithTheme = weakMemoize(cache => {
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
    context = createCacheWithTheme(context)(props.theme)
  }
  return <Provider value={context}>{props.children}</Provider>
})
