require('babel-register')
require('module-alias').addAliases({
  'emotion-utils': require.resolve('./packages/emotion-utils/src')
})

module.exports = require('babel-macros')
