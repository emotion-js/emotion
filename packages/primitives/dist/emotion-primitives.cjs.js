'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-primitives.cjs.prod.js')
} else {
  module.exports = require('./emotion-primitives.cjs.dev.js')
}
