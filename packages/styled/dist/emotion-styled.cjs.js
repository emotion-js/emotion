'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-styled.cjs.prod.js')
} else {
  module.exports = require('./emotion-styled.cjs.dev.js')
}
