'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
}),
  require('react'),
  require('@emotion/cache')

var emotionElement = require('../../dist/emotion-element-c1792f78.cjs.prod.js')

require('@babel/runtime/helpers/extends'),
  require('@emotion/weak-memoize'),
  require('hoist-non-react-statics'),
  require('../../isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.cjs.prod.js'),
  require('@emotion/utils'),
  require('@emotion/serialize')

var ReactJSXRuntime = require('react/jsx-runtime'),
  Fragment = ReactJSXRuntime.Fragment

function jsx(type, props, key) {
  return emotionElement.hasOwnProperty.call(props, 'css')
    ? ReactJSXRuntime.jsx(
        emotionElement.Emotion,
        emotionElement.createEmotionProps(type, props),
        key
      )
    : ReactJSXRuntime.jsx(type, props, key)
}

function jsxs(type, props, key) {
  return emotionElement.hasOwnProperty.call(props, 'css')
    ? ReactJSXRuntime.jsxs(
        emotionElement.Emotion,
        emotionElement.createEmotionProps(type, props),
        key
      )
    : ReactJSXRuntime.jsxs(type, props, key)
}

;(exports.Fragment = Fragment), (exports.jsx = jsx), (exports.jsxs = jsxs)
