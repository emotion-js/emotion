var e = require('@emotion/sheet'),
  t = require('stylis'),
  r = require('@emotion/weak-memoize'),
  n = require('@emotion/memoize')
function o(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
var i = o(r),
  a = o(n),
  s = new WeakMap(),
  u = function (e) {
    if ('rule' === e.type && e.parent && e.length) {
      for (
        var r = e.value,
          n = e.parent,
          o = e.column === n.column && e.line === n.line;
        'rule' !== n.type;

      )
        if (!(n = n.parent)) return
      if ((1 !== e.props.length || 58 === r.charCodeAt(0) || s.get(n)) && !o) {
        s.set(e, !0)
        for (
          var i = [],
            a = (function (e, r) {
              return t.dealloc(
                (function (e, r) {
                  var n = -1,
                    o = 44
                  do {
                    switch (t.token(o)) {
                      case 0:
                        38 === o && 12 === t.peek() && (r[n] = 1),
                          (e[n] += t.identifier(t.position - 1))
                        break
                      case 2:
                        e[n] += t.delimit(o)
                        break
                      case 4:
                        if (44 === o) {
                          ;(e[++n] = 58 === t.peek() ? '&\f' : ''),
                            (r[n] = e[n].length)
                          break
                        }
                      default:
                        e[n] += t.from(o)
                    }
                  } while ((o = t.next()))
                  return e
                })(t.alloc(e), r)
              )
            })(r, i),
            u = n.props,
            l = 0,
            c = 0;
          l < a.length;
          l++
        )
          for (var p = 0; p < u.length; p++, c++)
            e.props[c] = i[l] ? a[l].replace(/&\f/g, u[p]) : u[p] + ' ' + a[l]
      }
    }
  },
  l = function (e) {
    if ('decl' === e.type) {
      var t = e.value
      108 === t.charCodeAt(0) &&
        98 === t.charCodeAt(2) &&
        ((e.return = ''), (e.value = ''))
    }
  },
  c = function (e) {
    return 105 === e.type.charCodeAt(1) && 64 === e.type.charCodeAt(0)
  },
  p = function (e) {
    ;(e.type = ''),
      (e.value = ''),
      (e.return = ''),
      (e.children = ''),
      (e.props = '')
  },
  d = function (e, t, r) {
    c(e) &&
      (e.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."
          ),
          p(e))
        : (function (e, t) {
            for (var r = e - 1; r >= 0; r--) if (!c(t[r])) return !0
            return !1
          })(t, r) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."
          ),
          p(e)))
  },
  f = 'undefined' != typeof document,
  h = f
    ? void 0
    : i.default(function () {
        return a.default(function () {
          var e = {}
          return function (t) {
            return e[t]
          }
        })
      }),
  m = [t.prefixer]
module.exports = function (r) {
  var n = r.key
  if ('production' !== process.env.NODE_ENV && !n)
    throw new Error(
      "You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements."
    )
  if (f && 'css' === n) {
    var o = document.querySelectorAll('style[data-emotion]:not([data-s])')
    Array.prototype.forEach.call(o, function (e) {
      document.head.appendChild(e), e.setAttribute('data-s', '')
    })
  }
  var i = r.stylisPlugins || m
  if ('production' !== process.env.NODE_ENV && /[^a-z-]/.test(n))
    throw new Error(
      'Emotion key must only contain lower case alphabetical characters and - but "' +
        n +
        '" was passed'
    )
  var a,
    s,
    c = {},
    p = []
  f &&
    ((a = r.container || document.head),
    Array.prototype.forEach.call(
      document.querySelectorAll('style[data-emotion]'),
      function (e) {
        var t = e.getAttribute('data-emotion').split(' ')
        if (t[0] === n) {
          for (var r = 1; r < t.length; r++) c[t[r]] = !0
          p.push(e)
        }
      }
    ))
  var y = [u, l]
  if (
    ('production' !== process.env.NODE_ENV &&
      y.push(
        (function (e) {
          return function (t, r, n) {
            if ('rule' === t.type) {
              var o,
                i = t.value.match(/(:first|:nth|:nth-last)-child/g)
              if (i && !0 !== e.compat) {
                var a = r > 0 ? n[r - 1] : null
                if (
                  a &&
                  (function (e) {
                    return (
                      !!e &&
                      'comm' === e.type &&
                      e.children.indexOf(
                        'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason'
                      ) > -1
                    )
                  })((o = a.children).length ? o[o.length - 1] : null)
                )
                  return
                i.forEach(function (e) {
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
            return b.compat
          },
        }),
        d
      ),
    f)
  ) {
    var v,
      g = [
        t.stringify,
        'production' !== process.env.NODE_ENV
          ? function (e) {
              e.root ||
                (e.return
                  ? v.insert(e.return)
                  : e.value && e.type !== t.COMMENT && v.insert(e.value + '{}'))
            }
          : t.rulesheet(function (e) {
              v.insert(e)
            }),
      ],
      E = t.middleware(y.concat(i, g))
    s = function (e, r, n, o) {
      ;(v = n),
        'production' !== process.env.NODE_ENV &&
          void 0 !== r.map &&
          (v = {
            insert: function (e) {
              n.insert(e + r.map)
            },
          }),
        t.serialize(t.compile(e ? e + '{' + r.styles + '}' : r.styles), E),
        o && (b.inserted[r.name] = !0)
    }
  } else {
    var w = t.middleware(y.concat(i, [t.stringify])),
      k = h(i)(n)
    s = function (e, r, n, o) {
      var i = r.name,
        a = (function (e, r) {
          var n = r.name
          return (
            void 0 === k[n] &&
              (k[n] = t.serialize(
                t.compile(e ? e + '{' + r.styles + '}' : r.styles),
                w
              )),
            k[n]
          )
        })(e, r)
      return void 0 === b.compat
        ? (o && (b.inserted[i] = !0),
          'development' === process.env.NODE_ENV && void 0 !== r.map
            ? a + r.map
            : a)
        : o
        ? void (b.inserted[i] = a)
        : a
    }
  }
  var b = {
    key: n,
    sheet: new e.StyleSheet({
      key: n,
      container: a,
      nonce: r.nonce,
      speedy: r.speedy,
      prepend: r.prepend,
    }),
    nonce: r.nonce,
    inserted: c,
    registered: {},
    insert: s,
  }
  return b.sheet.hydrate(p), b
}
//# sourceMappingURL=emotion-cache.js.map
