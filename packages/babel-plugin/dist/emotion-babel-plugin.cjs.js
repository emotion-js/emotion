'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-babel-plugin.cjs.prod.js')
} else {
  module.exports = require('./emotion-babel-plugin.cjs.dev.js')
}
