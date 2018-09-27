// @flow
import { isBrowser, type EmotionCache } from '@emotion/utils'
import * as React from 'react'
import createCache from '@emotion/cache'

let EmotionCacheContext = React.createContext(isBrowser ? createCache() : null)

export let ThemeContext = React.createContext<Object>({})
export let CacheProvider: React.ComponentType<{ value: EmotionCache }> =
  // $FlowFixMe
  EmotionCacheContext.Provider

let withEmotionCache = function withEmotionCache<Props, Ref: React.Ref<*>>(
  func: (props: Props, cache: EmotionCache, ref: Ref) => React.Node
): React.StatelessFunctionalComponent<Props> {
  let render = (props: Props, ref: Ref) => {
    return (
      <EmotionCacheContext.Consumer>
        {(
          // $FlowFixMe we know it won't be null
          cache: EmotionCache
        ) => {
          return func(props, cache, ref)
        }}
      </EmotionCacheContext.Consumer>
    )
  }
  return process.env.PREACT
    ? render
    : // $FlowFixMe
      React.forwardRef(render)
}

let consume = (func: EmotionCache => React.Node) => {
  return (
    <EmotionCacheContext.Consumer>
      {
        // $FlowFixMe we know it won't be null
        func
      }
    </EmotionCacheContext.Consumer>
  )
}

if (!isBrowser) {
  class BasicProvider extends React.Component<
    { children: EmotionCache => React.Node },
    { value: EmotionCache }
  > {
    state = { value: createCache() }
    render() {
      return (
        <EmotionCacheContext.Provider {...this.state}>
          {process.env.PREACT
            ? // $FlowFixMe
              this.props.children[0](this.state.value)
            : this.props.children(this.state.value)}
        </EmotionCacheContext.Provider>
      )
    }
  }

  withEmotionCache = function withEmotionCache<Props>(
    func: (props: Props, cache: EmotionCache) => React.Node
  ): React.StatelessFunctionalComponent<Props> {
    return (props: Props) => (
      <EmotionCacheContext.Consumer>
        {context => {
          if (context === null) {
            return (
              <BasicProvider>
                {newContext => {
                  return func(props, newContext)
                }}
              </BasicProvider>
            )
          } else {
            return func(props, context)
          }
        }}
      </EmotionCacheContext.Consumer>
    )
  }
  consume = (func: EmotionCache => React.Node) => {
    return (
      <EmotionCacheContext.Consumer>
        {context => {
          if (context === null) {
            return (
              <BasicProvider>
                {newContext => {
                  return func(newContext)
                }}
              </BasicProvider>
            )
          } else {
            return func(context)
          }
        }}
      </EmotionCacheContext.Consumer>
    )
  }
}

export { consume, withEmotionCache }
