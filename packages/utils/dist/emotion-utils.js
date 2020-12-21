var e = 'undefined' != typeof document
;(exports.getRegisteredStyles = function (e, t, i) {
  var r = ''
  return (
    i.split(' ').forEach(function (i) {
      void 0 !== e[i] ? t.push(e[i] + ';') : (r += i + ' ')
    }),
    r
  )
}),
  (exports.insertStyles = function (t, i, r) {
    var n = t.key + '-' + i.name
    if (
      ((!1 === r || (!1 === e && void 0 !== t.compat)) &&
        void 0 === t.registered[n] &&
        (t.registered[n] = i.styles),
      void 0 === t.inserted[i.name])
    ) {
      var o = '',
        s = i
      do {
        var d = t.insert(i === s ? '.' + n : '', s, t.sheet, !0)
        e || void 0 === d || (o += d), (s = s.next)
      } while (void 0 !== s)
      if (!e && 0 !== o.length) return o
    }
  })
//# sourceMappingURL=emotion-utils.js.map
