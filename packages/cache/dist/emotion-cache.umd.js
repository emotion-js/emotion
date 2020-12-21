!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? (module.exports = t(
        require('@emotion/sheet'),
        require('stylis'),
        require('@emotion/weak-memoize'),
        require('@emotion/memoize')
      ))
    : 'function' == typeof define && define.amd
    ? define([
        '@emotion/sheet',
        'stylis',
        '@emotion/weak-memoize',
        '@emotion/memoize',
      ], t)
    : ((e || self).cache = t(e.sheet, e.stylis, e.weakMemoize, e.memoize))
})(this, function (e, t, n, r) {
  function o(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e }
  }
  var i = o(n),
    a = o(r),
    s = new WeakMap(),
    u = function (e) {
      if ('rule' === e.type && e.parent && e.length) {
        for (
          var n = e.value,
            r = e.parent,
            o = e.column === r.column && e.line === r.line;
          'rule' !== r.type;

        )
          if (!(r = r.parent)) return
        if (
          (1 !== e.props.length || 58 === n.charCodeAt(0) || s.get(r)) &&
          !o
        ) {
          s.set(e, !0)
          for (
            var i = [],
              a = (function (e, n) {
                return t.dealloc(
                  (function (e, n) {
                    var r = -1,
                      o = 44
                    do {
                      switch (t.token(o)) {
                        case 0:
                          38 === o && 12 === t.peek() && (n[r] = 1),
                            (e[r] += t.identifier(t.position - 1))
                          break
                        case 2:
                          e[r] += t.delimit(o)
                          break
                        case 4:
                          if (44 === o) {
                            ;(e[++r] = 58 === t.peek() ? '&\f' : ''),
                              (n[r] = e[r].length)
                            break
                          }
                        default:
                          e[r] += t.from(o)
                      }
                    } while ((o = t.next()))
                    return e
                  })(t.alloc(e), n)
                )
              })(n, i),
              u = r.props,
              l = 0,
              c = 0;
            l < a.length;
            l++
          )
            for (var f = 0; f < u.length; f++, c++)
              e.props[c] = i[l] ? a[l].replace(/&\f/g, u[f]) : u[f] + ' ' + a[l]
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
    f = function (e) {
      ;(e.type = ''),
        (e.value = ''),
        (e.return = ''),
        (e.children = ''),
        (e.props = '')
    },
    d = function (e, t, n) {
      c(e) &&
        (e.parent
          ? (console.error(
              "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."
            ),
            f(e))
          : (function (e, t) {
              for (var n = e - 1; n >= 0; n--) if (!c(t[n])) return !0
              return !1
            })(t, n) &&
            (console.error(
              "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."
            ),
            f(e)))
    },
    p = 'undefined' != typeof document,
    h = p
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
  return function (n) {
    var r = n.key
    if ('production' !== process.env.NODE_ENV && !r)
      throw new Error(
        "You have to configure `key` for your cache. Please make sure it's unique (and not equal to 'css') as it's used for linking styles to your cache.\nIf multiple caches share the same key they might \"fight\" for each other's style elements."
      )
    if (p && 'css' === r) {
      var o = document.querySelectorAll('style[data-emotion]:not([data-s])')
      Array.prototype.forEach.call(o, function (e) {
        document.head.appendChild(e), e.setAttribute('data-s', '')
      })
    }
    var i = n.stylisPlugins || m
    if ('production' !== process.env.NODE_ENV && /[^a-z-]/.test(r))
      throw new Error(
        'Emotion key must only contain lower case alphabetical characters and - but "' +
          r +
          '" was passed'
      )
    var a,
      s,
      c = {},
      f = []
    p &&
      ((a = n.container || document.head),
      Array.prototype.forEach.call(
        document.querySelectorAll('style[data-emotion]'),
        function (e) {
          var t = e.getAttribute('data-emotion').split(' ')
          if (t[0] === r) {
            for (var n = 1; n < t.length; n++) c[t[n]] = !0
            f.push(e)
          }
        }
      ))
    var y = [u, l]
    if (
      ('production' !== process.env.NODE_ENV &&
        y.push(
          (function (e) {
            return function (t, n, r) {
              if ('rule' === t.type) {
                var o,
                  i = t.value.match(/(:first|:nth|:nth-last)-child/g)
                if (i && !0 !== e.compat) {
                  var a = n > 0 ? r[n - 1] : null
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
              return k.compat
            },
          }),
          d
        ),
      p)
    ) {
      var v,
        g = [
          t.stringify,
          'production' !== process.env.NODE_ENV
            ? function (e) {
                e.root ||
                  (e.return
                    ? v.insert(e.return)
                    : e.value &&
                      e.type !== t.COMMENT &&
                      v.insert(e.value + '{}'))
              }
            : t.rulesheet(function (e) {
                v.insert(e)
              }),
        ],
        w = t.middleware(y.concat(i, g))
      s = function (e, n, r, o) {
        ;(v = r),
          'production' !== process.env.NODE_ENV &&
            void 0 !== n.map &&
            (v = {
              insert: function (e) {
                r.insert(e + n.map)
              },
            }),
          t.serialize(t.compile(e ? e + '{' + n.styles + '}' : n.styles), w),
          o && (k.inserted[n.name] = !0)
      }
    } else {
      var E = t.middleware(y.concat(i, [t.stringify])),
        b = h(i)(r)
      s = function (e, n, r, o) {
        var i = n.name,
          a = (function (e, n) {
            var r = n.name
            return (
              void 0 === b[r] &&
                (b[r] = t.serialize(
                  t.compile(e ? e + '{' + n.styles + '}' : n.styles),
                  E
                )),
              b[r]
            )
          })(e, n)
        return void 0 === k.compat
          ? (o && (k.inserted[i] = !0),
            'development' === process.env.NODE_ENV && void 0 !== n.map
              ? a + n.map
              : a)
          : o
          ? void (k.inserted[i] = a)
          : a
      }
    }
    var k = {
      key: r,
      sheet: new e.StyleSheet({
        key: r,
        container: a,
        nonce: n.nonce,
        speedy: n.speedy,
        prepend: n.prepend,
      }),
      nonce: n.nonce,
      inserted: c,
      registered: {},
      insert: s,
    }
    return k.sheet.hydrate(f), k
  }
})
//# sourceMappingURL=emotion-cache.umd.js.map
