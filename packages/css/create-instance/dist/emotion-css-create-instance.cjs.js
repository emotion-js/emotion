'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-css-create-instance.cjs.prod.js')
} else {
  module.exports = require('./emotion-css-create-instance.cjs.dev.js')
}
