import e from '@emotion/cache'
import { serializeStyles as r } from '@emotion/serialize'
import { getRegisteredStyles as t, insertStyles as n } from '@emotion/utils'
function s(e, r) {
  if (void 0 === e.inserted[r.name]) return e.insert('', r, e.sheet, !0)
}
function i(e, r, n) {
  var s = [],
    i = t(e, s, n)
  return s.length < 2 ? n : i + r(s)
}
var a = function e(r) {
    for (var t = '', n = 0; n < r.length; n++) {
      var s = r[n]
      if (null != s) {
        var i = void 0
        switch (typeof s) {
          case 'boolean':
            break
          case 'object':
            if (Array.isArray(s)) i = e(s)
            else
              for (var a in ((i = ''), s))
                s[a] && a && (i && (i += ' '), (i += a))
            break
          default:
            i = s
        }
        i && (t && (t += ' '), (t += i))
      }
    }
    return t
  },
  o = (function (o) {
    var c = e({ key: 'css' })
    ;(c.sheet.speedy = function (e) {
      if ('production' !== process.env.NODE_ENV && 0 !== this.ctr)
        throw new Error('speedy must be changed before any rules are inserted')
      this.isSpeedy = e
    }),
      (c.compat = !0)
    var l = function () {
      var e = r([].slice.call(arguments), c.registered, void 0)
      return n(c, e, !1), c.key + '-' + e.name
    }
    return {
      css: l,
      cx: function () {
        return i(c.registered, l, a([].slice.call(arguments)))
      },
      injectGlobal: function () {
        var e = r([].slice.call(arguments), c.registered)
        s(c, e)
      },
      keyframes: function () {
        var e = r([].slice.call(arguments), c.registered),
          t = 'animation-' + e.name
        return (
          s(c, {
            name: e.name,
            styles: '@keyframes ' + t + '{' + e.styles + '}',
          }),
          t
        )
      },
      hydrate: function (e) {
        e.forEach(function (e) {
          c.inserted[e] = !0
        })
      },
      flush: function () {
        ;(c.registered = {}), (c.inserted = {}), c.sheet.flush()
      },
      sheet: c.sheet,
      cache: c,
      getRegisteredStyles: t.bind(null, c.registered),
      merge: i.bind(null, c.registered, l),
    }
  })(),
  c = o.flush,
  l = o.hydrate,
  f = o.cx,
  u = o.merge,
  d = o.getRegisteredStyles,
  m = o.injectGlobal,
  h = o.keyframes,
  g = o.css,
  y = o.sheet,
  v = o.cache
export {
  v as cache,
  g as css,
  f as cx,
  c as flush,
  d as getRegisteredStyles,
  l as hydrate,
  m as injectGlobal,
  h as keyframes,
  u as merge,
  y as sheet,
}
//# sourceMappingURL=emotion-css.esm.js.map
