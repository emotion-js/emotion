import React from 'react'
import {
  interpolatePurples,
  interpolateBuPu,
  interpolateRdPu
} from 'd3-scale-chromatic'

const targetSize = 10

export let createTriangle = Dot => {
  class SierpinskiTriangle extends React.Component {
    render() {
      const { components, x, y, depth, renderCount } = this.props
      let { s } = this.props

      if (s <= targetSize) {
        let fn
        switch (depth) {
          case 1:
            fn = interpolatePurples
            break
          case 2:
            fn = interpolateBuPu
            break
          case 3:
          default:
            fn = interpolateRdPu
        }

        const color = fn(renderCount / 20)
        return (
          <Dot
            color={color}
            size={targetSize}
            x={x - targetSize / 2}
            y={y - targetSize / 2}
          />
        )
      }

      s /= 2

      return (
        <React.Fragment>
          <SierpinskiTriangle
            components={components}
            depth={1}
            renderCount={renderCount}
            s={s}
            x={x}
            y={y - s / 2}
          />
          <SierpinskiTriangle
            components={components}
            depth={2}
            renderCount={renderCount}
            s={s}
            x={x - s}
            y={y + s / 2}
          />
          <SierpinskiTriangle
            components={components}
            depth={3}
            renderCount={renderCount}
            s={s}
            x={x + s}
            y={y + s / 2}
          />
        </React.Fragment>
      )
    }
  }
  SierpinskiTriangle.defaultProps = {
    depth: 0,
    renderCount: 0
  }
  return SierpinskiTriangle
}
