'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-server.cjs.prod.js')
} else {
  module.exports = require('./emotion-server.cjs.dev.js')
}
