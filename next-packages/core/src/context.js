// @flow
import { isBrowser, type CSSContextType } from '@emotion/utils'
import * as React from 'react'
import createCache from '@emotion/cache'

type BasicProviderProps = {
  children: CSSContextType => React.Node
}

type BasicProviderState = {
  value: CSSContextType
}

class BasicProvider extends React.Component<
  BasicProviderProps,
  BasicProviderState
> {
  state = { value: createCache() }
  render() {
    return (
      <CSSContext.Provider {...this.state}>
        {this.props.children(this.state.value)}
      </CSSContext.Provider>
    )
  }
}

export const CSSContext = React.createContext(
  isBrowser && process.env.NODE_ENV !== 'test' ? createCache() : null
)

export function withCSSContext<Props>(
  func: (props: Props, context: CSSContextType) => React.Node
): React.StatelessFunctionalComponent<Props> {
  return (props: Props) => (
    <CSSContext.Consumer>
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
    </CSSContext.Consumer>
  )
}

export function consume(func: CSSContextType => React.Node) {
  return (
    <CSSContext.Consumer>
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
    </CSSContext.Consumer>
  )
}
