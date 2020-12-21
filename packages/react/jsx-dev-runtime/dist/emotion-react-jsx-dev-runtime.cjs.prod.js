'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
}),
  require('react'),
  require('@emotion/cache')

var emotionElement = require('../../dist/emotion-element-3a01c80e.cjs.prod.js')

require('@babel/runtime/helpers/extends'),
  require('@emotion/weak-memoize'),
  require('hoist-non-react-statics'),
  require('../../isolated-hoist-non-react-statics-do-not-use-this-in-your-code/dist/emotion-react-isolated-hoist-non-react-statics-do-not-use-this-in-your-code.cjs.prod.js'),
  require('@emotion/utils'),
  require('@emotion/serialize')

var ReactJSXRuntimeDev = require('react/jsx-dev-runtime'),
  Fragment = ReactJSXRuntimeDev.Fragment

function jsxDEV(type, props, key, isStaticChildren, source, self) {
  return emotionElement.hasOwnProperty.call(props, 'css')
    ? ReactJSXRuntimeDev.jsxDEV(
        emotionElement.Emotion,
        emotionElement.createEmotionProps(type, props),
        key,
        isStaticChildren,
        source,
        self
      )
    : ReactJSXRuntimeDev.jsxDEV(
        type,
        props,
        key,
        isStaticChildren,
        source,
        self
      )
}

;(exports.Fragment = Fragment), (exports.jsxDEV = jsxDEV)
