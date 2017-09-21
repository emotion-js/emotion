import createRenderBenchmark from '../createRenderBenchmark'
import NestedTree from '../src/components/NestedTree'
import React from 'react'

const renderDeepTree = (label, components) =>
  createRenderBenchmark({
    name: `Deep tree with flush [${label}]`,
    runs: 20,
    flush: true,
    getElement() {
      return (
        <NestedTree
          breadth={2}
          components={components}
          depth={2}
          id={0}
          wrap={1}
        />
      )
    }
  })

export default renderDeepTree
