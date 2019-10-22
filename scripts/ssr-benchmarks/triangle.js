let React = require('react')
let {
  interpolatePurples,
  interpolateBuPu,
  interpolateRdPu
} = require('d3-scale-chromatic')

const targetSize = 10

exports.createTriangle = Dot => {
  let SierpinskiTriangle = ({
    components,
    x,
    y,
    depth,
    renderCount,
    random,
    s
  }) => {
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

      const color = fn((renderCount * random) / 20)
      return React.createElement(Dot, {
        color,
        size: targetSize,
        x: x - targetSize / 2,
        y: y - targetSize / 2
      })
    }

    s /= 2

    return React.createElement(
      React.Fragment,
      null,
      React.createElement(SierpinskiTriangle, {
        components: components,
        depth: 1,
        renderCount: renderCount,
        s: s,
        x: x,
        y: y - s / 2
      }),
      React.createElement(SierpinskiTriangle, {
        components: components,
        depth: 2,
        renderCount: renderCount,
        s: s,
        x: x - s,
        y: y + s / 2
      }),
      React.createElement(SierpinskiTriangle, {
        components: components,
        depth: 3,
        renderCount: renderCount,
        s: s,
        x: x + s,
        y: y + s / 2
      })
    )
  }
  SierpinskiTriangle.defaultProps = {
    depth: 0,
    renderCount: 0,
    random: 1
  }
  return SierpinskiTriangle
}
