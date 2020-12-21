'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-serialize.cjs.prod.js')
} else {
  module.exports = require('./emotion-serialize.cjs.dev.js')
}
