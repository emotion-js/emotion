// @flow
import { type EmotionCache } from '@emotion/utils'
import * as React from 'react'
import createCache from '@emotion/cache'
import { isBrowser } from './utils'

let EmotionCacheContext: React.Context<EmotionCache | null> = React.createContext(
  isBrowser ? createCache() : null
)

export let ThemeContext = React.createContext<Object>({})
export let CacheProvider = EmotionCacheContext.Provider

let withEmotionCache = function withEmotionCache<Props>(
  func: (props: Props, cache: EmotionCache, ref: React.Ref<*>) => React.Node
): React.StatelessFunctionalComponent<Props> {
  let render = (props: Props, ref: React.Ref<*>) => {
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
  // $FlowFixMe
  return React.forwardRef(render)
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
          {this.props.children(this.state.value)}
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
}

export { withEmotionCache }
