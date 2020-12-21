import { StyleSheet as e } from '@emotion/sheet'
import {
  dealloc as t,
  alloc as r,
  next as n,
  token as o,
  from as a,
  peek as i,
  delimit as s,
  identifier as u,
  position as c,
  stringify as l,
  COMMENT as p,
  rulesheet as f,
  middleware as d,
  prefixer as h,
  serialize as m,
  compile as v,
} from 'stylis'
import y from '@emotion/weak-memoize'
import g from '@emotion/memoize'
var E = new WeakMap(),
  w = function (e) {
    if ('rule' === e.type && e.parent && e.length) {
      for (
        var l = e.value,
          p = e.parent,
          f = e.column === p.column && e.line === p.line;
        'rule' !== p.type;

      )
        if (!(p = p.parent)) return
      if ((1 !== e.props.length || 58 === l.charCodeAt(0) || E.get(p)) && !f) {
        E.set(e, !0)
        for (
          var d = [],
            h = (function (e, l) {
              return t(
                (function (e, t) {
                  var r = -1,
                    l = 44
                  do {
                    switch (o(l)) {
                      case 0:
                        38 === l && 12 === i() && (t[r] = 1), (e[r] += u(c - 1))
                        break
                      case 2:
                        e[r] += s(l)
                        break
                      case 4:
                        if (44 === l) {
                          ;(e[++r] = 58 === i() ? '&\f' : ''),
                            (t[r] = e[r].length)
                          break
                        }
                      default:
                        e[r] += a(l)
                    }
                  } while ((l = n()))
                  return e
                })(r(e), l)
              )
            })(l, d),
            m = p.props,
            v = 0,
            y = 0;
          v < h.length;
          v++
        )
          for (var g = 0; g < m.length; g++, y++)
            e.props[y] = d[v] ? h[v].replace(/&\f/g, m[g]) : m[g] + ' ' + h[v]
      }
    }
  },
  b = function (e) {
    if ('decl' === e.type) {
      var t = e.value
      108 === t.charCodeAt(0) &&
        98 === t.charCodeAt(2) &&
        ((e.return = ''), (e.value = ''))
    }
  },
  k = function (e) {
    return 105 === e.type.charCodeAt(1) && 64 === e.type.charCodeAt(0)
  },
  N = function (e) {
    ;(e.type = ''),
      (e.value = ''),
      (e.return = ''),
      (e.children = ''),
      (e.props = '')
  },
  A = function (e, t, r) {
    k(e) &&
      (e.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."
          ),
          N(e))
        : (function (e, t) {
            for (var r = e - 1; r >= 0; r--) if (!k(t[r])) return !0
            return !1
          })(t, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."
          ),
          N(e)))
  },
  O = 'undefined' != typeof document,
  C = O
    ? void 0
    : y(function () {
        return g(function () {
          var e = {}
          return function (t) {
            return e[t]
          }
        })
      }),
  D = [h]
export default function (t) {
  var r = t.key
  if ('production' !== process.env.NODE_ENV && !r)
    throw new Error(
      "You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements."
    )
  if (O && 'css' === r) {
    var n = document.querySelectorAll('style[data-emotion]:not([data-s])')
    Array.prototype.forEach.call(n, function (e) {
      document.head.appendChild(e), e.setAttribute('data-s', '')
    })
  }
  var o = t.stylisPlugins || D
  if ('production' !== process.env.NODE_ENV && /[^a-z-]/.test(r))
    throw new Error(
      'Emotion key must only contain lower case alphabetical characters and - but "' +
        r +
        '" was passed'
    )
  var a,
    i,
    s = {},
    u = []
  O &&
    ((a = t.container || document.head),
    Array.prototype.forEach.call(
      document.querySelectorAll('style[data-emotion]'),
      function (e) {
        var t = e.getAttribute('data-emotion').split(' ')
        if (t[0] === r) {
          for (var n = 1; n < t.length; n++) s[t[n]] = !0
          u.push(e)
        }
      }
    ))
  var c = [w, b]
  if (
    ('production' !== process.env.NODE_ENV &&
      c.push(
        (function (e) {
          return function (t, r, n) {
            if ('rule' === t.type) {
              var o,
                a = t.value.match(/(:first|:nth|:nth-last)-child/g)
              if (a && !0 !== e.compat) {
                var i = r > 0 ? n[r - 1] : null
                if (
                  i &&
                  (function (e) {
                    return (
                      !!e &&
                      'comm' === e.type &&
                      e.children.indexOf(
                        'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason'
                      ) > -1
                    )
                  })((o = i.children).length ? o[o.length - 1] : null)
                )
                  return
                a.forEach(function (e) {
                  console.error(
                    'The pseudo class "' +
                      e +
                      '" is potentially unsafe when doing server-side rendering. Try changing it to "' +
                      e.split('-child')[0] +
                      '-of-type".'
                  )
                })
              }
            }
          }
        })({
          get compat() {
            return N.compat
          },
        }),
        A
      ),
    O)
  ) {
    var h,
      y = [
        l,
        'production' !== process.env.NODE_ENV
          ? function (e) {
              e.root ||
                (e.return
                  ? h.insert(e.return)
                  : e.value && e.type !== p && h.insert(e.value + '{}'))
            }
          : f(function (e) {
              h.insert(e)
            }),
      ],
      g = d(c.concat(o, y))
    i = function (e, t, r, n) {
      ;(h = r),
        'production' !== process.env.NODE_ENV &&
          void 0 !== t.map &&
          (h = {
            insert: function (e) {
              r.insert(e + t.map)
            },
          }),
        m(v(e ? e + '{' + t.styles + '}' : t.styles), g),
        n && (N.inserted[t.name] = !0)
    }
  } else {
    var E = d(c.concat(o, [l])),
      k = C(o)(r)
    i = function (e, t, r, n) {
      var o = t.name,
        a = (function (e, t) {
          var r = t.name
          return (
            void 0 === k[r] &&
              (k[r] = m(v(e ? e + '{' + t.styles + '}' : t.styles), E)),
            k[r]
          )
        })(e, t)
      return void 0 === N.compat
        ? (n && (N.inserted[o] = !0),
          'development' === process.env.NODE_ENV && void 0 !== t.map
            ? a + t.map
            : a)
        : n
        ? void (N.inserted[o] = a)
        : a
    }
  }
  var N = {
    key: r,
    sheet: new e({
      key: r,
      container: a,
      nonce: t.nonce,
      speedy: t.speedy,
      prepend: t.prepend,
    }),
    nonce: t.nonce,
    inserted: s,
    registered: {},
    insert: i,
  }
  return N.sheet.hydrate(u), N
}
//# sourceMappingURL=emotion-cache.esm.js.map
