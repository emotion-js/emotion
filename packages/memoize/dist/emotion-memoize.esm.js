function t(t) {
  var e = Object.create(null)
  return function (n) {
    return void 0 === e[n] && (e[n] = t(n)), e[n]
  }
}
export default t
//# sourceMappingURL=emotion-memoize.esm.js.map
