'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-primitives-core.cjs.prod.js')
} else {
  module.exports = require('./emotion-primitives-core.cjs.dev.js')
}
