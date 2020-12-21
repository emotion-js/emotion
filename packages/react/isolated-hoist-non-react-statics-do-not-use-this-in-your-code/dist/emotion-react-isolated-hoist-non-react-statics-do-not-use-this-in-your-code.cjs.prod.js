'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var hoistNonReactStatics$1 = require('hoist-non-react-statics')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var hoistNonReactStatics__default = _interopDefault(hoistNonReactStatics$1),
  hoistNonReactStatics = function(targetComponent, sourceComponent) {
    return hoistNonReactStatics__default.default(
      targetComponent,
      sourceComponent
    )
  }

exports.default = hoistNonReactStatics
