// @flow
import * as React from 'react'
import { withCSSContext, CSSContext } from '@emotion/core'
import weakMemoize from '@emotion/weak-memoize'

type Props = {
  theme: Object | (Object => Object),
  children: React.Node
}

let createCreateCacheWithTheme = weakMemoize(cache => {
  return weakMemoize(theme => {
    return {
      ...cache,
      theme
    }
  })
})

let createGetTheme = weakMemoize((outerTheme: Object) => {
  return weakMemoize((theme: Object | (Object => Object)) => {
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
  })
})

export default withCSSContext((props: Props, context) => {
  if (props.theme !== context.theme) {
    let newTheme = createGetTheme(context.theme)(props.theme)
    context = createCreateCacheWithTheme(context)(newTheme)
  }
  return (
    <CSSContext.Provider value={context}>{props.children}</CSSContext.Provider>
  )
})
