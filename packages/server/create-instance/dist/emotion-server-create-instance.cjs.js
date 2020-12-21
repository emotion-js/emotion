'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-server-create-instance.cjs.prod.js')
} else {
  module.exports = require('./emotion-server-create-instance.cjs.dev.js')
}
