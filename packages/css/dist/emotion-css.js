var e = require('@emotion/cache'),
  r = require('@emotion/serialize'),
  t = require('@emotion/utils')
function s(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var i = s(e)
function n(e, r) {
  if (void 0 === e.inserted[r.name]) return e.insert('', r, e.sheet, !0)
}
function a(e, r, s) {
  var i = [],
    n = t.getRegisteredStyles(e, i, s)
  return i.length < 2 ? s : n + r(i)
}
var l = function e(r) {
    for (var t = '', s = 0; s < r.length; s++) {
      var i = r[s]
      if (null != i) {
        var n = void 0
        switch (typeof i) {
          case 'boolean':
            break
          case 'object':
            if (Array.isArray(i)) n = e(i)
            else
              for (var a in ((n = ''), i))
                i[a] && a && (n && (n += ' '), (n += a))
            break
          default:
            n = i
        }
        n && (t && (t += ' '), (t += n))
      }
    }
    return t
  },
  o = (function (e) {
    var s = i.default({ key: 'css' })
    ;(s.sheet.speedy = function (e) {
      if ('production' !== process.env.NODE_ENV && 0 !== this.ctr)
        throw new Error('speedy must be changed before any rules are inserted')
      this.isSpeedy = e
    }),
      (s.compat = !0)
    var o = function () {
      var e = r.serializeStyles([].slice.call(arguments), s.registered, void 0)
      return t.insertStyles(s, e, !1), s.key + '-' + e.name
    }
    return {
      css: o,
      cx: function () {
        return a(s.registered, o, l([].slice.call(arguments)))
      },
      injectGlobal: function () {
        var e = r.serializeStyles([].slice.call(arguments), s.registered)
        n(s, e)
      },
      keyframes: function () {
        var e = r.serializeStyles([].slice.call(arguments), s.registered),
          t = 'animation-' + e.name
        return (
          n(s, {
            name: e.name,
            styles: '@keyframes ' + t + '{' + e.styles + '}',
          }),
          t
        )
      },
      hydrate: function (e) {
        e.forEach(function (e) {
          s.inserted[e] = !0
        })
      },
      flush: function () {
        ;(s.registered = {}), (s.inserted = {}), s.sheet.flush()
      },
      sheet: s.sheet,
      cache: s,
      getRegisteredStyles: t.getRegisteredStyles.bind(null, s.registered),
      merge: a.bind(null, s.registered, o),
    }
  })(),
  c = o.flush,
  u = o.hydrate,
  f = o.cx,
  d = o.merge,
  y = o.getRegisteredStyles,
  h = o.injectGlobal,
  g = o.keyframes,
  m = o.css,
  p = o.sheet
;(exports.cache = o.cache),
  (exports.css = m),
  (exports.cx = f),
  (exports.flush = c),
  (exports.getRegisteredStyles = y),
  (exports.hydrate = u),
  (exports.injectGlobal = h),
  (exports.keyframes = g),
  (exports.merge = d),
  (exports.sheet = p)
//# sourceMappingURL=emotion-css.js.map
