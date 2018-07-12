// @flow
import * as React from 'react'
import { CSSContext } from '@emotion/core'
import type { CSSContextType } from '@emotion/utils'
import createCache from '@emotion/cache'

type Props = {
  theme?: Object | ((Object | void) => Object),
  children?: React.Node,
  cache?: CSSContextType
}

function getTheme(
  theme: Object | ((Object | void) => Object),
  outerTheme: Object | void
) {
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

  if (outerTheme === undefined) {
    return theme
  }

  return { ...outerTheme, ...theme }
}

export default class Provider extends React.Component<Props> {
  emotionCache: CSSContextType
  consumer = (context: CSSContextType | null) => {
    if (this.props.cache !== undefined) {
      context = this.props.cache
    }
    let newContext = context
    if (context === null) {
      if (this.emotionCache === undefined) {
        newContext = createCache()
        if (this.props.theme) {
          newContext.theme = getTheme(this.props.theme, undefined)
        }
      } else if (
        this.props.theme &&
        this.props.theme !== this.emotionCache.theme
      ) {
        newContext = {
          ...this.emotionCache,
          theme: getTheme(this.props.theme, undefined)
        }
      }
    } else if (this.props.theme && this.props.theme !== context.theme) {
      newContext = {
        ...context,
        theme: getTheme(this.props.theme, context.theme)
      }
    }
    return (
      <CSSContext.Provider value={newContext}>
        {this.props.children}
      </CSSContext.Provider>
    )
  }
  render() {
    return <CSSContext.Consumer children={this.consumer} />
  }
}
