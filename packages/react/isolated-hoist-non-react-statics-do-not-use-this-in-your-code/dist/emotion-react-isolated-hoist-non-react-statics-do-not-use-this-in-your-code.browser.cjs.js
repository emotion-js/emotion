'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var hoistNonReactStatics$1 = require('hoist-non-react-statics')

function _interopDefault(e) {
  return e && e.__esModule ? e : { default: e }
}

var hoistNonReactStatics__default = /*#__PURE__*/ _interopDefault(
  hoistNonReactStatics$1
)

// this file isolates this package that is not tree-shakeable
// and if this module doesn't actually contain any logic of its own
// then Rollup just use 'hoist-non-react-statics' directly in other chunks

var hoistNonReactStatics = function(targetComponent, sourceComponent) {
  return hoistNonReactStatics__default['default'](
    targetComponent,
    sourceComponent
  )
}

exports.default = hoistNonReactStatics
