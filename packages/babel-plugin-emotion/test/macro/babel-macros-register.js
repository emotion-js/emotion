require('babel-register')
const path = require('path')
require('module-alias').addAliases({
  'babel-plugin-emotion': path.join(__dirname, '../../src')
})

module.exports = require('babel-plugin-macros')
