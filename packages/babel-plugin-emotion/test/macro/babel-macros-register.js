require('babel-register')
const path = require('path')
require('module-alias').addAliases({
  'emotion-utils': path.join(__dirname, '../../../emotion-utils/src'),
  'react-emotion/macro': path.join(__dirname, '../../src/macro-styled'),
  'emotion/macro': path.join(__dirname, '../../src/macro')
})

module.exports = require('babel-plugin-macros')
