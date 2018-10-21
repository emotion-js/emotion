process.env.NODE_ENV = 'production'
let React = require('react')
let { jsx, css } = require('@emotion/core')
let { renderToString } = require('react-dom/server')
let { createTriangle } = require('./triangle')

let i = 500

let CssPropTriangle = createTriangle(({ x, y, size, color, ...props }) => {
  return jsx('div', {
    css: css`
      position: absolute;
      cursor: pointer;
      width: 0;
      height: 0;
      border-color: transparent;
      border-style: solid;
      border-top-width: 0;
      transform: translate(50%, 50%);
      margin-left: ${x + 'px'};
      margin-top: ${y + 'px'};
      border-right-width: ${size / 2 + 'px'};
      border-bottom-width: ${size / 2 + 'px'};
      border-left-width: ${size / 2 + 'px'};
      border-bottom-color: ${color};
    `,
    ...props
  })
})

while (i--) {
  renderToString(React.createElement(CssPropTriangle, { s: 100, x: 0, y: 0 }))
}
