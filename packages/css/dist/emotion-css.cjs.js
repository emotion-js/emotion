'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-css.cjs.prod.js')
} else {
  module.exports = require('./emotion-css.cjs.dev.js')
}
