!(function (e, n) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
    ? define(n)
    : ((e || self).memoize = n())
})(this, function () {
  return function (e) {
    var n = Object.create(null)
    return function (o) {
      return void 0 === n[o] && (n[o] = e(o)), n[o]
    }
  }
})
//# sourceMappingURL=emotion-memoize.umd.js.map
