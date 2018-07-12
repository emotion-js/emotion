require('@babel/register')
require('module-alias').addAliases(require('lerna-alias').webpack())

module.exports = require('babel-plugin-emotion')
