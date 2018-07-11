import React, { Component } from 'react'

class DeepTree extends Component {
  render() {
    const { breadth, components, depth, id, wrap } = this.props
    const { Box } = components

    let result = (
      <Box
        color={id % 3}
        components={components}
        layout={depth % 2 === 0 ? 'column' : 'row'}
        outer
      >
        {depth === 0 && (
          <Box color={id % 3 + 3} components={components} fixed />
        )}
        {depth !== 0 &&
          Array.from({ length: breadth }).map((el, i) => (
            <DeepTree
              breadth={breadth}
              components={components}
              depth={depth - 1}
              id={i}
              key={i}
              wrap={wrap}
            />
          ))}
      </Box>
    )
    for (let i = 0; i < wrap; i++) {
      result = <Box components={components}>{result}</Box>
    }
    return result
  }
}

export default DeepTree
