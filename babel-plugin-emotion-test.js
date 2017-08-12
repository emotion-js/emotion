require('babel-register')
require('module-alias').addAliases({
  'emotion-utils': require.resolve('./packages/emotion-utils/src')
})

module.exports = require('./packages/babel-plugin-emotion/src')
