'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-react.cjs.prod.js')
} else {
  module.exports = require('./emotion-react.cjs.dev.js')
}
