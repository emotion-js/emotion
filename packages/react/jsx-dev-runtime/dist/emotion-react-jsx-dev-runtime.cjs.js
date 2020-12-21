'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-react-jsx-dev-runtime.cjs.prod.js')
} else {
  module.exports = require('./emotion-react-jsx-dev-runtime.cjs.dev.js')
}
