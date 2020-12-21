!(function (e, r) {
  'object' == typeof exports && 'undefined' != typeof module
    ? r(
        exports,
        require('@emotion/css-prettifier'),
        require('chalk'),
        require('stylis'),
        require('specificity')
      )
    : 'function' == typeof define && define.amd
    ? define([
        'exports',
        '@emotion/css-prettifier',
        'chalk',
        'stylis',
        'specificity',
      ], r)
    : r(((e || self).jest = {}), e.prettify, e.chalk, e.stylis, e.specificity)
})(this, function (e, r, t, n, o) {
  function i(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e }
  }
  var u = i(r),
    c = i(t)
  function a() {
    return (a =
      Object.assign ||
      function (e) {
        for (var r = 1; r < arguments.length; r++) {
          var t = arguments[r]
          for (var n in t)
            Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n])
        }
        return e
      }).apply(this, arguments)
  }
  function f(e, r) {
    ;(null == r || r > e.length) && (r = e.length)
    for (var t = 0, n = new Array(r); t < r; t++) n[t] = e[t]
    return n
  }
  function s(e, r) {
    var t
    if ('undefined' == typeof Symbol || null == e[Symbol.iterator]) {
      if (
        Array.isArray(e) ||
        (t = (function (e, r) {
          if (e) {
            if ('string' == typeof e) return f(e, r)
            var t = Object.prototype.toString.call(e).slice(8, -1)
            return (
              'Object' === t && e.constructor && (t = e.constructor.name),
              'Map' === t || 'Set' === t
                ? Array.from(e)
                : 'Arguments' === t ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                ? f(e, r)
                : void 0
            )
          }
        })(e)) ||
        (r && e && 'number' == typeof e.length)
      ) {
        t && (e = t)
        var n = 0
        return function () {
          return n >= e.length ? { done: !0 } : { done: !1, value: e[n++] }
        }
      }
      throw new TypeError(
        'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
      )
    }
    return (t = e[Symbol.iterator]()).next.bind(t)
  }
  function l(e, r) {
    return 'emotion-' + r
  }
  var p = /^e[a-zA-Z0-9]+[0-9]+$/,
    d = 'undefined' != typeof document
  function m(e, r) {
    var t
    return (t = []).concat.apply(t, e.map(r))
  }
  function y(e, r) {
    return r ? e.concat(r.split(' ')) : e
  }
  function v(e) {
    return e.prop('className') && 'string' == typeof e.type()
  }
  function h(e) {
    return (
      e.$$typeof === Symbol.for('react.test.json') ||
      e.$$typeof === Symbol.for('react.element')
    )
  }
  var g = /^((HTML|SVG)\w*)?Element$/
  function _(e) {
    return e.reduce(function (e, r) {
      return 'function' == typeof r.findWhere
        ? (function (e, r) {
            return y(
              e,
              (function (e) {
                return (e && e.prop('className')) || ''
              })(
                (function (e) {
                  var r = e.findWhere(v)
                  return r.length ? r.first() : null
                })(
                  (function (e) {
                    return (
                      'function' == typeof e.dive && 'string' != typeof e.type()
                    )
                  })(r)
                    ? r.dive()
                    : r
                )
              )
            )
          })(e, r)
        : '[cheerio object]' === r.cheerio
        ? (function (e, r) {
            return y(e, r.attr('class'))
          })(e, r)
        : h(r)
        ? (function (e, r) {
            var t = r.props,
              n = void 0 === t ? {} : t
            return y(e, n.className || n.class)
          })(e, r)
        : (function (e, r) {
            return y(e, r.getAttribute('class'))
          })(e, r)
    }, [])
  }
  var E = /^@keyframes\s+(animation-[^{\s]+)+/,
    b = /\/\*[\s\S]*?\*\//g,
    O = function (e) {
      var r = e.textContent
      return r
        ? [r]
        : e.sheet
        ? [].slice.call(e.sheet.cssRules).map(function (e) {
            return e.cssText
          })
        : []
    }
  function j(e, r) {
    if (!e.length) return ''
    var t = A(r)
    if (!t.length) return ''
    var n = e.find(function (e) {
        return /^e[a-z0-9]+$/.test(e)
      }),
      o = '(' + t.join('|') + ')-',
      i = new RegExp(n ? '^(' + o + '|' + n + ')' : '^' + o),
      u = e.filter(function (e) {
        return i.test(e)
      })
    if (!u.length) return ''
    var c = new RegExp(
        '\\.(?:' +
          u
            .map(function (e) {
              return '(' + e + ')'
            })
            .join('|') +
          ')'
      ),
      a = m(r, O),
      f = a
        .map(function (e) {
          var r = e.match(c)
          return r
            ? [
                e,
                (function (e, r, t) {
                  for (var n = 1; n < e.length; n++) if (t(e[n])) return n
                  return -1
                })(r, 0, Boolean),
              ]
            : null
        })
        .filter(Boolean)
        .sort(function (e, r) {
          return e[1] - r[1]
        })
        .map(function (e) {
          return e[0]
        })
        .join(''),
      s = (function (e) {
        return e.reduce(function (e, r) {
          var t = r.match(E)
          if (null !== t) {
            var n = t[1]
            void 0 === e[n] && (e[n] = ''), (e[n] += r)
          }
          return e
        }, {})
      })(a),
      l = Object.keys(s),
      p = ''
    if (l.length) {
      var d = new RegExp(l.join('|'), 'g'),
        y = {},
        v = 0
      ;(f = f.replace(d, function (e) {
        return (
          void 0 === y[e] && ((y[e] = 'animation-' + v++), (p += s[e])), y[e]
        )
      })),
        (p = p.replace(d, function (e) {
          return y[e]
        }))
    }
    return (p + f).replace(b, '')
  }
  function S() {
    if (!d)
      throw new Error(
        'jest-emotion requires jsdom. See https://jestjs.io/docs/en/configuration#testenvironment-string for more information.'
      )
    return Array.from(document.querySelectorAll('style[data-emotion]'))
  }
  function A(e) {
    var r
    return ((r = e.map(function (e) {
      return e.getAttribute('data-emotion')
    })),
    Array.from(new Set(r))).filter(Boolean)
  }
  function N(e, r) {
    return e.some(function (e) {
      return r.includes(e)
    })
  }
  function w(e, r) {
    if ((void 0 === r && (r = []), Array.isArray(e))) {
      for (var t, n = s(e); !(t = n()).done; ) w(t.value, r)
      return r
    }
    if (('object' == typeof e && r.push(e), e.children))
      for (var o, i = s(e.children); !(o = i()).done; ) w(o.value, r)
    return r
  }
  function T(e, r) {
    return Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
  }
  function $(e, r) {
    if (Array.isArray(e))
      return e.map(function (e) {
        return $(e, r)
      })
    var t = r(e)
    return t !== e && t.children
      ? T(t, {
          children: m($(t.children, r), function (e) {
            return e
          }),
        })
      : t
  }
  function x(e) {
    void 0 === e && (e = {})
    var r = (function (e, r) {
      if (null == e) return {}
      var t,
        n,
        o = {},
        i = Object.keys(e)
      for (n = 0; n < i.length; n++) r.indexOf((t = i[n])) >= 0 || (o[t] = e[t])
      return o
    })(e, [
      'css',
      '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
      '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
    ])
    return (r.css = 'unknown styles'), r
  }
  function P(e, r) {
    if (Array.isArray(e)) for (var t, n = s(e); !(t = n()).done; ) P(t.value, r)
    else {
      if (e.children)
        for (var o, i = s(e.children); !(o = i()).done; ) P(o.value, r)
      if (e.props) {
        var u = e.props.className
        u ? N(u.split(' '), r) && delete e.props.css : delete e.props.className
      }
    }
  }
  var R = {
    toHaveStyleRule: function (e, r, t, i) {
      void 0 === i && (i = {})
      var u = i.target,
        a = i.media,
        f = _([e]),
        s = j(f, S()),
        l = n.compile(s)
      a &&
        (l = (function (e, r) {
          return m(
            e.filter(function (e) {
              return (
                '@media' === e.type &&
                e.value.replace(/\s/g, '').includes(r.replace(/\s/g, ''))
              )
            }),
            function (e) {
              return e.children
            }
          )
        })(l, a))
      var p = l
        .filter(function (e) {
          return (
            'rule' === e.type &&
            (function (e, r, t) {
              return r.some(function (r) {
                if (!t) {
                  var n =
                    (o = r.split(' ')).length > 0 ? o[o.length - 1] : void 0
                  return !!n && e.includes(n.slice(1))
                }
                var o
                return t instanceof RegExp ? t.test(r) : r.includes(t)
              })
            })(f, e.props, u)
          )
        })
        .reduce(function (e, t) {
          var n = (function (e, t) {
            for (var n = e.length - 1; n >= 0; n--)
              if ('decl' === (o = e[n]).type && o.props === r) return e[n]
            var o
          })(t.children)
          return n
            ? e.concat(
                t.props.map(function (e) {
                  return { selector: e, declaration: n }
                })
              )
            : e
        }, [])
        .sort(function (e, r) {
          return o.compare(e.selector, r.selector)
        })
        .pop()
      if (!p)
        return {
          pass: !1,
          message: function () {
            return 'Property not found: ' + r
          },
        }
      var d = p.declaration,
        y = (function (e, r) {
          return r instanceof RegExp
            ? r.test(e.children)
            : (t = r) &&
              '[object Function]' ===
                Object.prototype.toString.apply(t.asymmetricMatch)
            ? r.asymmetricMatch(e.children)
            : r === e.children
          var t
        })(d, t)
      return {
        pass: y,
        message: function () {
          return (
            'Expected ' +
            r +
            (y ? ' not ' : ' ') +
            'to match:\n  ' +
            c.default.green(t) +
            '\nReceived:\n  ' +
            c.default.red(d.children)
          )
        },
      }
    },
  }
  ;(e.createSerializer = function (e) {
    var r = void 0 === e ? {} : e,
      t = r.classNameReplacer,
      n = r.DOMElements,
      o = void 0 === n || n,
      i = new WeakSet()
    return {
      test: function (e) {
        return (
          e &&
          !(function (e) {
            return i.has(e)
          })(e) &&
          (h(e) ||
            (o &&
              (function (e) {
                return (
                  1 === e.nodeType &&
                  e.constructor &&
                  e.constructor.name &&
                  g.test(e.constructor.name)
                )
              })(e)))
        )
      },
      serialize: function (e, r, n, o, c, f) {
        var s = S(),
          d = A(s),
          y = $(
            e,
            (function (e, r) {
              return function (r) {
                if ((t = r) !== Object(t)) return r
                var t, n
                if (
                  (n = r).$$typeof === Symbol.for('react.test.json') &&
                  'EmotionCssPropInternal' === n.type
                ) {
                  var o = m((r.props.css.name || '').split(' '), function (r) {
                    return e.map(function (e) {
                      return e + '-' + r
                    })
                  })
                  if (
                    N(
                      o,
                      m(r.children || [], function (e) {
                        var r = e.props
                        return ((void 0 === r ? {} : r).className || '').split(
                          ' '
                        )
                      }).filter(Boolean)
                    )
                  )
                    return r.children
                  var i = [r.props.className]
                      .concat(o)
                      .filter(Boolean)
                      .join(' '),
                    u = r.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__,
                    c = 'string' == typeof u ? u : u.name
                  return a({}, r, {
                    props: x(a({}, r.props, { className: i })),
                    type: c,
                  })
                }
                return (function (e) {
                  return (
                    e.$$typeof === Symbol.for('react.element') &&
                    e.type.$$typeof === Symbol.for('react.forward_ref') &&
                    'EmotionCssPropInternal' === e.type.displayName
                  )
                })(r)
                  ? a({}, r, {
                      props: x(r.props),
                      type: r.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__,
                    })
                  : h(r)
                  ? T({}, r)
                  : r
              }
            })(d)
          ),
          v = w(y),
          g = _(v),
          E = (function (e, r, t) {
            return u.default(j(e, r), t)
          })(g, s, r.indent)
        P(y, g), v.forEach(i.add, i)
        var b = f(y, r, n, o, c)
        return (
          v.forEach(i.delete, i),
          (function (e, r, t, n, o) {
            void 0 === o && (o = l)
            var i = 0,
              u = new RegExp('^(' + n.join('|') + ')-')
            return e.reduce(function (e, r) {
              if (u.test(r) || p.test(r)) {
                var t = new RegExp(
                  r.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
                  'g'
                )
                return e.replace(t, o(r, i++))
              }
              return e
            }, r + (r ? '\n\n' : '') + t)
          })(g, E, b, d, t)
        )
      },
    }
  }),
    (e.matchers = R)
})
//# sourceMappingURL=emotion-jest.umd.js.map
