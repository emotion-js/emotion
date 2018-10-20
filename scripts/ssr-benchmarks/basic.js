process.env.NODE_ENV = 'production'
let { jsx } = require('@emotion/core')
let { renderToString } = require('react-dom/server')

let i = 50000

while (i--) renderToString(jsx('div', { css: { color: 'hotpink' } }))
