!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], t)
    : t(((e || self).utils = {}))
})(this, function (e) {
  var t = 'undefined' != typeof document
  ;(e.getRegisteredStyles = function (e, t, i) {
    var n = ''
    return (
      i.split(' ').forEach(function (i) {
        void 0 !== e[i] ? t.push(e[i] + ';') : (n += i + ' ')
      }),
      n
    )
  }),
    (e.insertStyles = function (e, i, n) {
      var o = e.key + '-' + i.name
      if (
        ((!1 === n || (!1 === t && void 0 !== e.compat)) &&
          void 0 === e.registered[o] &&
          (e.registered[o] = i.styles),
        void 0 === e.inserted[i.name])
      ) {
        var d = '',
          f = i
        do {
          var r = e.insert(i === f ? '.' + o : '', f, e.sheet, !0)
          t || void 0 === r || (d += r), (f = f.next)
        } while (void 0 !== f)
        if (!t && 0 !== d.length) return d
      }
    })
})
//# sourceMappingURL=emotion-utils.umd.js.map
