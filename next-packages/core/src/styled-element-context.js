// @flow
import * as React from 'react'

let StyledElementsContext = React.createContext({})

let StyledElementsProvider = ({ components, children }) => (
  <StyledElementsContext.Provider value={components}>
    {children}
  </StyledElementsContext.Provider>
)

let withStyledElementsContext = function withStyledElementsContext<Props>(
  func: (props: Props, context: StyledElementsContextType) => React.Node
): React.StatelessFunctionalComponent<Props> {
  return (props: Props) => (
    <StyledElementsContext.Consumer>
      {(contextComponents: StyledElementsContextType) => {
        return func(props, contextComponents)
      }}
    </StyledElementsContext.Consumer>
  )
}

let consumeStyledElementsContext = (
  func: StyledElementsContextType => React.Node
) => {
  return <StyledElementsContext.Consumer>{func}</StyledElementsContext.Consumer>
}

export {
  StyledElementsProvider,
  consumeStyledElementsContext,
  withStyledElementsContext
}
