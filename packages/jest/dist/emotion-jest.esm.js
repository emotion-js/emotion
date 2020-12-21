import r from '@emotion/css-prettifier'
import e from 'chalk'
import { compile as n } from 'stylis'
import { compare as t } from 'specificity'
function o() {
  return (o =
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
function i(r, e) {
  ;(null == e || e > r.length) && (e = r.length)
  for (var n = 0, t = new Array(e); n < e; n++) t[n] = r[n]
  return t
}
function u(r, e) {
  var n
  if ('undefined' == typeof Symbol || null == r[Symbol.iterator]) {
    if (
      Array.isArray(r) ||
      (n = (function (r, e) {
        if (r) {
          if ('string' == typeof r) return i(r, e)
          var n = Object.prototype.toString.call(r).slice(8, -1)
          return (
            'Object' === n && r.constructor && (n = r.constructor.name),
            'Map' === n || 'Set' === n
              ? Array.from(r)
              : 'Arguments' === n ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
              ? i(r, e)
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
function c(r, e) {
  return 'emotion-' + e
}
var a = /^e[a-zA-Z0-9]+[0-9]+$/,
  f = 'undefined' != typeof document
function s(r, e) {
  var n
  return (n = []).concat.apply(n, r.map(e))
}
function l(r, e) {
  return e ? r.concat(e.split(' ')) : r
}
function p(r) {
  return r.prop('className') && 'string' == typeof r.type()
}
function m(r) {
  return (
    r.$$typeof === Symbol.for('react.test.json') ||
    r.$$typeof === Symbol.for('react.element')
  )
}
var d = /^((HTML|SVG)\w*)?Element$/
function v(r) {
  return r.reduce(function (r, e) {
    return 'function' == typeof e.findWhere
      ? (function (r, e) {
          return l(
            r,
            (function (r) {
              return (r && r.prop('className')) || ''
            })(
              (function (r) {
                var e = r.findWhere(p)
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
          return l(r, e.attr('class'))
        })(r, e)
      : m(e)
      ? (function (r, e) {
          var n = e.props,
            t = void 0 === n ? {} : n
          return l(r, t.className || t.class)
        })(r, e)
      : (function (r, e) {
          return l(r, e.getAttribute('class'))
        })(r, e)
  }, [])
}
var y = /^@keyframes\s+(animation-[^{\s]+)+/,
  h = /\/\*[\s\S]*?\*\//g,
  g = function (r) {
    var e = r.textContent
    return e
      ? [e]
      : r.sheet
      ? [].slice.call(r.sheet.cssRules).map(function (r) {
          return r.cssText
        })
      : []
  }
function _(r, e) {
  if (!r.length) return ''
  var n = b(e)
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
    a = s(e, g),
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
    l = (function (r) {
      return r.reduce(function (r, e) {
        var n = e.match(y)
        if (null !== n) {
          var t = n[1]
          void 0 === r[t] && (r[t] = ''), (r[t] += e)
        }
        return r
      }, {})
    })(a),
    p = Object.keys(l),
    m = ''
  if (p.length) {
    var d = new RegExp(p.join('|'), 'g'),
      v = {},
      _ = 0
    ;(f = f.replace(d, function (r) {
      return void 0 === v[r] && ((v[r] = 'animation-' + _++), (m += l[r])), v[r]
    })),
      (m = m.replace(d, function (r) {
        return v[r]
      }))
  }
  return (m + f).replace(h, '')
}
function E() {
  if (!f)
    throw new Error(
      'jest-emotion requires jsdom. See https://jestjs.io/docs/en/configuration#testenvironment-string for more information.'
    )
  return Array.from(document.querySelectorAll('style[data-emotion]'))
}
function b(r) {
  var e
  return ((e = r.map(function (r) {
    return r.getAttribute('data-emotion')
  })),
  Array.from(new Set(e))).filter(Boolean)
}
function O(r, e) {
  return r.some(function (r) {
    return e.includes(r)
  })
}
function S(r, e) {
  if ((void 0 === e && (e = []), Array.isArray(r))) {
    for (var n, t = u(r); !(n = t()).done; ) S(n.value, e)
    return e
  }
  if (('object' == typeof r && e.push(r), r.children))
    for (var o, i = u(r.children); !(o = i()).done; ) S(o.value, e)
  return e
}
function j(r, e) {
  return Object.defineProperties(r, Object.getOwnPropertyDescriptors(e))
}
function A(r, e) {
  if (Array.isArray(r))
    return r.map(function (r) {
      return A(r, e)
    })
  var n = e(r)
  return n !== r && n.children
    ? j(n, {
        children: s(A(n.children, e), function (r) {
          return r
        }),
      })
    : n
}
function N(r) {
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
function w(r, e) {
  if (Array.isArray(r)) for (var n, t = u(r); !(n = t()).done; ) w(n.value, e)
  else {
    if (r.children)
      for (var o, i = u(r.children); !(o = i()).done; ) w(o.value, e)
    if (r.props) {
      var c = r.props.className
      c ? O(c.split(' '), e) && delete r.props.css : delete r.props.className
    }
  }
}
function $(e) {
  var n = void 0 === e ? {} : e,
    t = n.classNameReplacer,
    i = n.DOMElements,
    u = void 0 === i || i,
    f = new WeakSet()
  return {
    test: function (r) {
      return (
        r &&
        !(function (r) {
          return f.has(r)
        })(r) &&
        (m(r) ||
          (u &&
            (function (r) {
              return (
                1 === r.nodeType &&
                r.constructor &&
                r.constructor.name &&
                d.test(r.constructor.name)
              )
            })(r)))
      )
    },
    serialize: function (e, n, i, u, l, p) {
      var d = E(),
        y = b(d),
        h = A(
          e,
          (function (r, e) {
            return function (e) {
              if ((n = e) !== Object(n)) return e
              var n, t
              if (
                (t = e).$$typeof === Symbol.for('react.test.json') &&
                'EmotionCssPropInternal' === t.type
              ) {
                var i = s((e.props.css.name || '').split(' '), function (e) {
                  return r.map(function (r) {
                    return r + '-' + e
                  })
                })
                if (
                  O(
                    i,
                    s(e.children || [], function (r) {
                      var e = r.props
                      return ((void 0 === e ? {} : e).className || '').split(
                        ' '
                      )
                    }).filter(Boolean)
                  )
                )
                  return e.children
                var u = [e.props.className].concat(i).filter(Boolean).join(' '),
                  c = e.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__,
                  a = 'string' == typeof c ? c : c.name
                return o({}, e, {
                  props: N(o({}, e.props, { className: u })),
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
                ? o({}, e, {
                    props: N(e.props),
                    type: e.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__,
                  })
                : m(e)
                ? j({}, e)
                : e
            }
          })(y)
        ),
        g = S(h),
        $ = v(g),
        T = (function (e, n, t) {
          return r(_(e, n), t)
        })($, d, n.indent)
      w(h, $), g.forEach(f.add, f)
      var x = p(h, n, i, u, l)
      return (
        g.forEach(f.delete, f),
        (function (r, e, n, t, o) {
          void 0 === o && (o = c)
          var i = 0,
            u = new RegExp('^(' + t.join('|') + ')-')
          return r.reduce(function (r, e) {
            if (u.test(e) || a.test(e)) {
              var n = new RegExp(
                e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
                'g'
              )
              return r.replace(n, o(e, i++))
            }
            return r
          }, e + (e ? '\n\n' : '') + n)
        })($, T, x, y, t)
      )
    },
  }
}
var T = {
  toHaveStyleRule: function (r, o, i, u) {
    void 0 === u && (u = {})
    var c = u.target,
      a = u.media,
      f = v([r]),
      l = _(f, E()),
      p = n(l)
    a &&
      (p = (function (r, e) {
        return s(
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
      })(p, a))
    var m = p
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
      .reduce(function (r, e) {
        var n = (function (r, e) {
          for (var n = r.length - 1; n >= 0; n--)
            if ('decl' === (t = r[n]).type && t.props === o) return r[n]
          var t
        })(e.children)
        return n
          ? r.concat(
              e.props.map(function (r) {
                return { selector: r, declaration: n }
              })
            )
          : r
      }, [])
      .sort(function (r, e) {
        return t(r.selector, e.selector)
      })
      .pop()
    if (!m)
      return {
        pass: !1,
        message: function () {
          return 'Property not found: ' + o
        },
      }
    var d = m.declaration,
      y = (function (r, e) {
        return e instanceof RegExp
          ? e.test(r.children)
          : (n = e) &&
            '[object Function]' ===
              Object.prototype.toString.apply(n.asymmetricMatch)
          ? e.asymmetricMatch(r.children)
          : e === r.children
        var n
      })(d, i)
    return {
      pass: y,
      message: function () {
        return (
          'Expected ' +
          o +
          (y ? ' not ' : ' ') +
          'to match:\n  ' +
          e.green(i) +
          '\nReceived:\n  ' +
          e.red(d.children)
        )
      },
    }
  },
}
export { $ as createSerializer, T as matchers }
//# sourceMappingURL=emotion-jest.esm.js.map
