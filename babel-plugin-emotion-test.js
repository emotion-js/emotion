require('babel-register')
const path = require('path')
require('module-alias').addAliases({
  'emotion-utils': path.resolve(__dirname, './packages/emotion-utils/src'),
})

module.exports = require('./packages/babel-plugin-emotion/src')
