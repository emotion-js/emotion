import React from 'react'
import { jsx, css } from '@emotion/react'
import ReactDOMServer from 'react-dom/server.js'
import { createTriangle } from './triangle.js'

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
  ReactDOMServer.renderToString(
    React.createElement(CssPropTriangle, { s: 100, x: 0, y: 0 })
  )
}
