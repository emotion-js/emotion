'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-babel-plugin-jsx-pragmatic.cjs.prod.js')
} else {
  module.exports = require('./emotion-babel-plugin-jsx-pragmatic.cjs.dev.js')
}
