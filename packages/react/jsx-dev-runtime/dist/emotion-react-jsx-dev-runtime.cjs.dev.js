'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

require('react')
require('@emotion/cache')
var emotionElement = require('../../dist/emotion-element-cb6e9ca7.cjs.dev.js')
require('@babel/runtime/helpers/extends')
require('@emotion/weak-memoize')
require('hoist-non-react-statics')
require('../../isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.cjs.dev.js')
require('@emotion/utils')
require('@emotion/serialize')
var ReactJSXRuntimeDev = require('react/jsx-dev-runtime')

var Fragment = ReactJSXRuntimeDev.Fragment
function jsxDEV(type, props, key, isStaticChildren, source, self) {
  if (!emotionElement.hasOwnProperty.call(props, 'css')) {
    return ReactJSXRuntimeDev.jsxDEV(
      type,
      props,
      key,
      isStaticChildren,
      source,
      self
    )
  }

  return ReactJSXRuntimeDev.jsxDEV(
    emotionElement.Emotion,
    emotionElement.createEmotionProps(type, props),
    key,
    isStaticChildren,
    source,
    self
  )
}

exports.Fragment = Fragment
exports.jsxDEV = jsxDEV
