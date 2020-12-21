module.exports = function (e) {
  var r = new WeakMap()
  return function (n) {
    if (r.has(n)) return r.get(n)
    var t = e(n)
    return r.set(n, t), t
  }
}
//# sourceMappingURL=emotion-weak-memoize.js.map
