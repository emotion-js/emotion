var e = 'undefined' != typeof document
function i(e, i, r) {
  var t = ''
  return (
    r.split(' ').forEach(function (r) {
      void 0 !== e[r] ? i.push(e[r] + ';') : (t += r + ' ')
    }),
    t
  )
}
var r = function (i, r, t) {
  var n = i.key + '-' + r.name
  if (
    ((!1 === t || (!1 === e && void 0 !== i.compat)) &&
      void 0 === i.registered[n] &&
      (i.registered[n] = r.styles),
    void 0 === i.inserted[r.name])
  ) {
    var o = '',
      d = r
    do {
      var v = i.insert(r === d ? '.' + n : '', d, i.sheet, !0)
      e || void 0 === v || (o += v), (d = d.next)
    } while (void 0 !== d)
    if (!e && 0 !== o.length) return o
  }
}
export { i as getRegisteredStyles, r as insertStyles }
//# sourceMappingURL=emotion-utils.esm.js.map
