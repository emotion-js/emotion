import React from 'react'
import { css } from 'emotion'
import {
  interpolatePurples,
  interpolateBuPu,
  interpolateRdPu
} from 'd3-scale-chromatic'

// import createRenderBenchmark from '../createRenderBenchmark'

let targetSize = 25

class Dot extends React.Component {
  render() {
    let props = this.props
    let s = props.size
    return (
      <div
        className={css({
          position: 'absolute',
          textAlign: 'center',
          cursor: 'pointer',
          width: 0,
          height: 0,
          left: props.x + 'px',
          top: props.y + 'px',
          borderStyle: 'solid',

          borderTop: 'none',
          borderWidth: `0 ${s / 2}px ${s / 2}px ${s / 2}px`,
          borderColor: `transparent transparent ${props.color} transparent`
        })}
      >
        {props.children}
      </div>
    )
  }
}

export default function SierpinskiTriangle({
  x,
  y,
  s,
  depth = 0,
  renderCount = 0
}) {
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

    return (
      <Dot
        x={x - targetSize / 2}
        y={y - targetSize / 2}
        size={targetSize}
        color={fn(renderCount / 20)}
      />
    )
  }

  s /= 2

  return [
    <SierpinskiTriangle
      key={1}
      x={x}
      y={y - s / 2}
      s={s}
      depth={1}
      renderCount={renderCount}
    />,
    <SierpinskiTriangle
      key={2}
      x={x - s}
      y={y + s / 2}
      s={s}
      depth={2}
      renderCount={renderCount}
    />,
    <SierpinskiTriangle
      key={3}
      x={x + s}
      y={y + s / 2}
      s={s}
      depth={3}
      renderCount={renderCount}
    />
  ]
}
