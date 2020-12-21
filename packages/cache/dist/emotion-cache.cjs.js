'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-cache.cjs.prod.js')
} else {
  module.exports = require('./emotion-cache.cjs.dev.js')
}
