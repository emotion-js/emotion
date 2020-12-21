'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-sheet.cjs.prod.js')
} else {
  module.exports = require('./emotion-sheet.cjs.dev.js')
}
