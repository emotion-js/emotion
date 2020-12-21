'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-eslint-plugin.cjs.prod.js')
} else {
  module.exports = require('./emotion-eslint-plugin.cjs.dev.js')
}
