'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-native.cjs.prod.js')
} else {
  module.exports = require('./emotion-native.cjs.dev.js')
}
