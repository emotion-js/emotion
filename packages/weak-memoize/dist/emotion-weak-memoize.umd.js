!(function (e, n) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = n())
    : 'function' == typeof define && define.amd
    ? define(n)
    : ((e || self).weakMemoize = n())
})(this, function () {
  return function (e) {
    var n = new WeakMap()
    return function (t) {
      if (n.has(t)) return n.get(t)
      var o = e(t)
      return n.set(t, o), o
    }
  }
})
//# sourceMappingURL=emotion-weak-memoize.umd.js.map
