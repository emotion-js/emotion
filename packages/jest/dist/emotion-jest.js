var r = require('@emotion/css-prettifier'),
  e = require('chalk'),
  n = require('stylis'),
  t = require('specificity')
function o(r) {
  return r && 'object' == typeof r && 'default' in r ? r : { default: r }
}
var i = o(r),
  u = o(e)
function c() {
  return (c =
    Object.assign ||
    function (r) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e]
        for (var t in n)
          Object.prototype.hasOwnProperty.call(n, t) && (r[t] = n[t])
      }
      return r
    }).apply(this, arguments)
}
function a(r, e) {
  ;(null == e || e > r.length) && (e = r.length)
  for (var n = 0, t = new Array(e); n < e; n++) t[n] = r[n]
  return t
}
function f(r, e) {
  var n
  if ('undefined' == typeof Symbol || null == r[Symbol.iterator]) {
    if (
      Array.isArray(r) ||
      (n = (function (r, e) {
        if (r) {
          if ('string' == typeof r) return a(r, e)
          var n = Object.prototype.toString.call(r).slice(8, -1)
          return (
            'Object' === n && r.constructor && (n = r.constructor.name),
            'Map' === n || 'Set' === n
              ? Array.from(r)
              : 'Arguments' === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? a(r, e)
              : void 0
          )
        }
      })(r)) ||
      (e && r && 'number' == typeof r.length)
    ) {
      n && (r = n)
      var t = 0
      return function () {
        return t >= r.length ? { done: !0 } : { done: !1, value: r[t++] }
      }
    }
    throw new TypeError(
      'Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    )
  }
  return (n = r[Symbol.iterator]()).next.bind(n)
}
function s(r, e) {
  return 'emotion-' + e
}
var l = /^e[a-zA-Z0-9]+[0-9]+$/,
  p = 'undefined' != typeof document
function d(r, e) {
  var n
  return (n = []).concat.apply(n, r.map(e))
}
function m(r, e) {
  return e ? r.concat(e.split(' ')) : r
}
function v(r) {
  return r.prop('className') && 'string' == typeof r.type()
}
function y(r) {
  return (
    r.$$typeof === Symbol.for('react.test.json') ||
    r.$$typeof === Symbol.for('react.element')
  )
}
var h = /^((HTML|SVG)\w*)?Element$/
function g(r) {
  return r.reduce(function (r, e) {
    return 'function' == typeof e.findWhere
      ? (function (r, e) {
          return m(
            r,
            (function (r) {
              return (r && r.prop('className')) || ''
            })(
              (function (r) {
                var e = r.findWhere(v)
                return e.length ? e.first() : null
              })(
                (function (r) {
                  return (
                    'function' == typeof r.dive && 'string' != typeof r.type()
                  )
                })(e)
                  ? e.dive()
                  : e
              )
            )
          )
        })(r, e)
      : '[cheerio object]' === e.cheerio
      ? (function (r, e) {
          return m(r, e.attr('class'))
        })(r, e)
      : y(e)
      ? (function (r, e) {
          var n = e.props,
            t = void 0 === n ? {} : n
          return m(r, t.className || t.class)
        })(r, e)
      : (function (r, e) {
          return m(r, e.getAttribute('class'))
        })(r, e)
  }, [])
}
var _ = /^@keyframes\s+(animation-[^{\s]+)+/,
  E = /\/\*[\s\S]*?\*\//g,
  b = function (r) {
    var e = r.textContent
    return e
      ? [e]
      : r.sheet
      ? [].slice.call(r.sheet.cssRules).map(function (r) {
          return r.cssText
        })
      : []
  }
function O(r, e) {
  if (!r.length) return ''
  var n = j(e)
  if (!n.length) return ''
  var t = r.find(function (r) {
      return /^e[a-z0-9]+$/.test(r)
    }),
    o = '(' + n.join('|') + ')-',
    i = new RegExp(t ? '^(' + o + '|' + t + ')' : '^' + o),
    u = r.filter(function (r) {
      return i.test(r)
    })
  if (!u.length) return ''
  var c = new RegExp(
      '\\.(?:' +
        u
          .map(function (r) {
            return '(' + r + ')'
          })
          .join('|') +
        ')'
    ),
    a = d(e, b),
    f = a
      .map(function (r) {
        var e = r.match(c)
        return e
          ? [
              r,
              (function (r, e, n) {
                for (var t = 1; t < r.length; t++) if (n(r[t])) return t
                return -1
              })(e, 0, Boolean),
            ]
          : null
      })
      .filter(Boolean)
      .sort(function (r, e) {
        return r[1] - e[1]
      })
      .map(function (r) {
        return r[0]
      })
      .join(''),
    s = (function (r) {
      return r.reduce(function (r, e) {
        var n = e.match(_)
        if (null !== n) {
          var t = n[1]
          void 0 === r[t] && (r[t] = ''), (r[t] += e)
        }
        return r
      }, {})
    })(a),
    l = Object.keys(s),
    p = ''
  if (l.length) {
    var m = new RegExp(l.join('|'), 'g'),
      v = {},
      y = 0
    ;(f = f.replace(m, function (r) {
      return void 0 === v[r] && ((v[r] = 'animation-' + y++), (p += s[r])), v[r]
    })),
      (p = p.replace(m, function (r) {
        return v[r]
      }))
  }
  return (p + f).replace(E, '')
}
function S() {
  if (!p)
    throw new Error(
      'jest-emotion requires jsdom. See https://jestjs.io/docs/en/configuration#testenvironment-string for more information.'
    )
  return Array.from(document.querySelectorAll('style[data-emotion]'))
}
function j(r) {
  var e
  return ((e = r.map(function (r) {
    return r.getAttribute('data-emotion')
  })),
  Array.from(new Set(e))).filter(Boolean)
}
function A(r, e) {
  return r.some(function (r) {
    return e.includes(r)
  })
}
function N(r, e) {
  if ((void 0 === e && (e = []), Array.isArray(r))) {
    for (var n, t = f(r); !(n = t()).done; ) N(n.value, e)
    return e
  }
  if (('object' == typeof r && e.push(r), r.children))
    for (var o, i = f(r.children); !(o = i()).done; ) N(o.value, e)
  return e
}
function w(r, e) {
  return Object.defineProperties(r, Object.getOwnPropertyDescriptors(e))
}
function $(r, e) {
  if (Array.isArray(r))
    return r.map(function (r) {
      return $(r, e)
    })
  var n = e(r)
  return n !== r && n.children
    ? w(n, {
        children: d($(n.children, e), function (r) {
          return r
        }),
      })
    : n
}
function T(r) {
  void 0 === r && (r = {})
  var e = (function (r, e) {
    if (null == r) return {}
    var n,
      t,
      o = {},
      i = Object.keys(r)
    for (t = 0; t < i.length; t++) e.indexOf((n = i[t])) >= 0 || (o[n] = r[n])
    return o
  })(r, [
    'css',
    '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
    '__EMOTION_LABEL_PLEASE_DO_NOT_USE__',
  ])
  return (e.css = 'unknown styles'), e
}
function x(r, e) {
  if (Array.isArray(r)) for (var n, t = f(r); !(n = t()).done; ) x(n.value, e)
  else {
    if (r.children)
      for (var o, i = f(r.children); !(o = i()).done; ) x(o.value, e)
    if (r.props) {
      var u = r.props.className
      u ? A(u.split(' '), e) && delete r.props.css : delete r.props.className
    }
  }
}
var P = {
  toHaveStyleRule: function (r, e, o, i) {
    void 0 === i && (i = {})
    var c = i.target,
      a = i.media,
      f = g([r]),
      s = O(f, S()),
      l = n.compile(s)
    a &&
      (l = (function (r, e) {
        return d(
          r.filter(function (r) {
            return (
              '@media' === r.type &&
              r.value.replace(/\s/g, '').includes(e.replace(/\s/g, ''))
            )
          }),
          function (r) {
            return r.children
          }
        )
      })(l, a))
    var p = l
      .filter(function (r) {
        return (
          'rule' === r.type &&
          (function (r, e, n) {
            return e.some(function (e) {
              if (!n) {
                var t = (o = e.split(' ')).length > 0 ? o[o.length - 1] : void 0
                return !!t && r.includes(t.slice(1))
              }
              var o
              return n instanceof RegExp ? n.test(e) : e.includes(n)
            })
          })(f, r.props, c)
        )
      })
      .reduce(function (r, n) {
        var t = (function (r, n) {
          for (var t = r.length - 1; t >= 0; t--)
            if ('decl' === (o = r[t]).type && o.props === e) return r[t]
          var o
        })(n.children)
        return t
          ? r.concat(
              n.props.map(function (r) {
                return { selector: r, declaration: t }
              })
            )
          : r
      }, [])
      .sort(function (r, e) {
        return t.compare(r.selector, e.selector)
      })
      .pop()
    if (!p)
      return {
        pass: !1,
        message: function () {
          return 'Property not found: ' + e
        },
      }
    var m = p.declaration,
      v = (function (r, e) {
        return e instanceof RegExp
          ? e.test(r.children)
          : (n = e) &&
            '[object Function]' ===
              Object.prototype.toString.apply(n.asymmetricMatch)
          ? e.asymmetricMatch(r.children)
          : e === r.children
        var n
      })(m, o)
    return {
      pass: v,
      message: function () {
        return (
          'Expected ' +
          e +
          (v ? ' not ' : ' ') +
          'to match:\n  ' +
          u.default.green(o) +
          '\nReceived:\n  ' +
          u.default.red(m.children)
        )
      },
    }
  },
}
;(exports.createSerializer = function (r) {
  var e = void 0 === r ? {} : r,
    n = e.classNameReplacer,
    t = e.DOMElements,
    o = void 0 === t || t,
    u = new WeakSet()
  return {
    test: function (r) {
      return (
        r &&
        !(function (r) {
          return u.has(r)
        })(r) &&
        (y(r) ||
          (o &&
            (function (r) {
              return (
                1 === r.nodeType &&
                r.constructor &&
                r.constructor.name &&
                h.test(r.constructor.name)
              )
            })(r)))
      )
    },
    serialize: function (r, e, t, o, a, f) {
      var p = S(),
        m = j(p),
        v = $(
          r,
          (function (r, e) {
            return function (e) {
              if ((n = e) !== Object(n)) return e
              var n, t
              if (
                (t = e).$$typeof === Symbol.for('react.test.json') &&
                'EmotionCssPropInternal' === t.type
              ) {
                var o = d((e.props.css.name || '').split(' '), function (e) {
                  return r.map(function (r) {
                    return r + '-' + e
                  })
                })
                if (
                  A(
                    o,
                    d(e.children || [], function (r) {
                      var e = r.props
                      return ((void 0 === e ? {} : e).className || '').split(
                        ' '
                      )
                    }).filter(Boolean)
                  )
                )
                  return e.children
                var i = [e.props.className].concat(o).filter(Boolean).join(' '),
                  u = e.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__,
                  a = 'string' == typeof u ? u : u.name
                return c({}, e, {
                  props: T(c({}, e.props, { className: i })),
                  type: a,
                })
              }
              return (function (r) {
                return (
                  r.$$typeof === Symbol.for('react.element') &&
                  r.type.$$typeof === Symbol.for('react.forward_ref') &&
                  'EmotionCssPropInternal' === r.type.displayName
                )
              })(e)
                ? c({}, e, {
                    props: T(e.props),
                    type: e.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__,
                  })
                : y(e)
                ? w({}, e)
                : e
            }
          })(m)
        ),
        h = N(v),
        _ = g(h),
        E = (function (r, e, n) {
          return i.default(O(r, e), n)
        })(_, p, e.indent)
      x(v, _), h.forEach(u.add, u)
      var b = f(v, e, t, o, a)
      return (
        h.forEach(u.delete, u),
        (function (r, e, n, t, o) {
          void 0 === o && (o = s)
          var i = 0,
            u = new RegExp('^(' + t.join('|') + ')-')
          return r.reduce(function (r, e) {
            if (u.test(e) || l.test(e)) {
              var n = new RegExp(
                e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
                'g'
              )
              return r.replace(n, o(e, i++))
            }
            return r
          }, e + (e ? '\n\n' : '') + n)
        })(_, E, b, m, n)
      )
    },
  }
}),
  (exports.matchers = P)
//# sourceMappingURL=emotion-jest.js.map
