module.exports = function (e) {
  var n = Object.create(null)
  return function (r) {
    return void 0 === n[r] && (n[r] = e(r)), n[r]
  }
}
//# sourceMappingURL=emotion-memoize.js.map
