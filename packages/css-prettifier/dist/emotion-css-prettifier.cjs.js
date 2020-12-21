'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-css-prettifier.cjs.prod.js')
} else {
  module.exports = require('./emotion-css-prettifier.cjs.dev.js')
}
