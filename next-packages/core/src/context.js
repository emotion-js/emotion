// @flow
import { shouldSerializeToReactTree, type CSSContextType } from '@emotion/utils'
import * as React from 'react'
import createCache from '@emotion/cache'

export const CSSContext = React.createContext(
  shouldSerializeToReactTree ? null : createCache()
)

let withCSSContext = function withCSSContext<Props>(
  func: (props: Props, context: CSSContextType) => React.Node
): React.StatelessFunctionalComponent<Props> {
  return (props: Props) => (
    <CSSContext.Consumer>
      {(
        // $FlowFixMe we know it won't be null
        context: CSSContextType
      ) => {
        return func(props, context)
      }}
    </CSSContext.Consumer>
  )
}

let consume = (func: CSSContextType => React.Node) => {
  return (
    <CSSContext.Consumer>
      {
        // $FlowFixMe we know it won't be null
        func
      }
    </CSSContext.Consumer>
  )
}

if (shouldSerializeToReactTree) {
  class BasicProvider extends React.Component<
    { children: CSSContextType => React.Node },
    { value: CSSContextType }
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

  withCSSContext = function withCSSContext<Props>(
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
  consume = (func: CSSContextType => React.Node) => {
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
}

export { consume, withCSSContext }
