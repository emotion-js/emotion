'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-jest-enzyme.cjs.prod.js')
} else {
  module.exports = require('./emotion-jest-enzyme.cjs.dev.js')
}
