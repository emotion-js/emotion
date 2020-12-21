'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.cjs.prod.js')
} else {
  module.exports = require('./emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.cjs.dev.js')
}
