'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-utils.cjs.prod.js')
} else {
  module.exports = require('./emotion-utils.cjs.dev.js')
}
