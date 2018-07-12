require('@babel/register')
require('module-alias').addAliases(require('lerna-alias').webpack())

module.exports = require('../../../packages/babel-plugin-emotion/src')
