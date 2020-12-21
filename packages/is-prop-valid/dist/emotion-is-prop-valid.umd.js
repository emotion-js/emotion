!(function (e, o) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = o(require('@emotion/memoize')))
    : 'function' == typeof define && define.amd
    ? define(['@emotion/memoize'], o)
    : ((e || self).isPropValid = o(e.memoize))
})(this, function (e) {
  function o(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e }
  }
  var t = o(e),
    n = codegen.require('./props')
  return t.default(function (e) {
    return (
      n.test(e) ||
      (111 === e.charCodeAt(0) &&
        110 === e.charCodeAt(1) &&
        e.charCodeAt(2) < 91)
    )
  })
})
//# sourceMappingURL=emotion-is-prop-valid.umd.js.map
