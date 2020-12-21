'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

require('@babel/runtime/helpers/extends')
require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
require('@emotion/css-prettifier')
require('../../dist/create-serializer-1871c71e.cjs.dev.js')
require('enzyme-to-json')
var createEnzymeSerializer = require('../../dist/create-enzyme-serializer-ad6e4672.cjs.dev.js')

var _createEnzymeSerializ = createEnzymeSerializer.createEnzymeSerializer(),
  test = _createEnzymeSerializ.test,
  serialize = _createEnzymeSerializ.serialize

exports.serialize = serialize
exports.test = test
