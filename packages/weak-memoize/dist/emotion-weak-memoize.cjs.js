'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-weak-memoize.cjs.prod.js')
} else {
  module.exports = require('./emotion-weak-memoize.cjs.dev.js')
}
