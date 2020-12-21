'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

require('@babel/runtime/helpers/extends')
require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
require('@emotion/css-prettifier')
var createSerializer = require('../../dist/create-serializer-1871c71e.cjs.dev.js')

var _createSerializer = createSerializer.createSerializer(),
  test = _createSerializer.test,
  serialize = _createSerializer.serialize

exports.serialize = serialize
exports.test = test
