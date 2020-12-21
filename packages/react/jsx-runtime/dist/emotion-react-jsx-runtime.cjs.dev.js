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
var ReactJSXRuntime = require('react/jsx-runtime')

var Fragment = ReactJSXRuntime.Fragment
function jsx(type, props, key) {
  if (!emotionElement.hasOwnProperty.call(props, 'css')) {
    return ReactJSXRuntime.jsx(type, props, key)
  }

  return ReactJSXRuntime.jsx(
    emotionElement.Emotion,
    emotionElement.createEmotionProps(type, props),
    key
  )
}
function jsxs(type, props, key) {
  if (!emotionElement.hasOwnProperty.call(props, 'css')) {
    return ReactJSXRuntime.jsxs(type, props, key)
  }

  return ReactJSXRuntime.jsxs(
    emotionElement.Emotion,
    emotionElement.createEmotionProps(type, props),
    key
  )
}

exports.Fragment = Fragment
exports.jsx = jsx
exports.jsxs = jsxs
