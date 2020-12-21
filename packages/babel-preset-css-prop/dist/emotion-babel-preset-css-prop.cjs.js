'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-babel-preset-css-prop.cjs.prod.js')
} else {
  module.exports = require('./emotion-babel-preset-css-prop.cjs.dev.js')
}
