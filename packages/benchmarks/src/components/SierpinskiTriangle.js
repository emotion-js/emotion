import React from 'react'
import {
  interpolatePurples,
  interpolateBuPu,
  interpolateRdPu,
} from 'd3-scale-chromatic'

let targetSize = 25

export default function SierpinskiTriangle({
  x,
  y,
  s,
  depth = 0,
  renderCount = 0,
  Dot,
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
      Dot={Dot}
      renderCount={renderCount}
    />,
    <SierpinskiTriangle
      key={2}
      x={x - s}
      y={y + s / 2}
      s={s}
      depth={2}
      Dot={Dot}
      renderCount={renderCount}
    />,
    <SierpinskiTriangle
      key={3}
      x={x + s}
      y={y + s / 2}
      s={s}
      depth={3}
      Dot={Dot}
      renderCount={renderCount}
    />,
  ]
}
