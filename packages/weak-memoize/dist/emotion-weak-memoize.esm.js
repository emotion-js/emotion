export default function (e) {
  var r = new WeakMap()
  return function (t) {
    if (r.has(t)) return r.get(t)
    var n = e(t)
    return r.set(t, n), n
  }
}
//# sourceMappingURL=emotion-weak-memoize.esm.js.map
