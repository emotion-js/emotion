!(function (e, n) {
  'object' == typeof exports && 'undefined' != typeof module
    ? n(
        exports,
        require('@emotion/hash'),
        require('@emotion/unitless'),
        require('@emotion/memoize')
      )
    : 'function' == typeof define && define.amd
    ? define([
        'exports',
        '@emotion/hash',
        '@emotion/unitless',
        '@emotion/memoize',
      ], n)
    : n(((e || self).serialize = {}), e.hashString, e.unitless, e.memoize)
})(this, function (e, n, o, t) {
  function r(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e }
  }
  var i = r(n),
    s = r(o),
    a =
      "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",
    l = /[A-Z]|^ms/g,
    c = /_EMO_([^_]+?)_([^]*?)_EMO_/g,
    u = function (e) {
      return 45 === e.charCodeAt(1)
    },
    p = function (e) {
      return null != e && 'boolean' != typeof e
    },
    d = r(t).default(function (e) {
      return u(e) ? e : e.replace(l, '-$&').toLowerCase()
    }),
    f = function (e, n) {
      switch (e) {
        case 'animation':
        case 'animationName':
          if ('string' == typeof n)
            return n.replace(c, function (e, n, o) {
              return (_ = { name: n, styles: o, next: _ }), n
            })
      }
      return 1 === s.default[e] || u(e) || 'number' != typeof n || 0 === n
        ? n
        : n + 'px'
    }
  if ('production' !== process.env.NODE_ENV) {
    var m = /(attr|calc|counters?|url)\(/,
      v = [
        'normal',
        'none',
        'counter',
        'open-quote',
        'close-quote',
        'no-open-quote',
        'no-close-quote',
        'initial',
        'inherit',
        'unset',
      ],
      h = f,
      y = /^-ms-/,
      g = /-(.)/g,
      E = {}
    f = function (e, n) {
      if (
        'content' === e &&
        ('string' != typeof n ||
          (-1 === v.indexOf(n) &&
            !m.test(n) &&
            (n.charAt(0) !== n.charAt(n.length - 1) ||
              ('"' !== n.charAt(0) && "'" !== n.charAt(0)))))
      )
        throw new Error(
          "You seem to be using a value for 'content' without quotes, try replacing it with `content: '\"" +
            n +
            '"\'`'
        )
      var o = h(e, n)
      return (
        '' === o ||
          u(e) ||
          -1 === e.indexOf('-') ||
          void 0 !== E[e] ||
          ((E[e] = !0),
          console.error(
            'Using kebab-case for css properties in objects is not supported. Did you mean ' +
              e.replace(y, 'ms-').replace(g, function (e, n) {
                return n.toUpperCase()
              }) +
              '?'
          )),
        o
      )
    }
  }
  function b(e, n, o) {
    if (null == o) return ''
    if (void 0 !== o.__emotion_styles) {
      if (
        'production' !== process.env.NODE_ENV &&
        'NO_COMPONENT_SELECTOR' === o.toString()
      )
        throw new Error(
          'Component selectors can only be used in conjunction with @emotion/babel-plugin.'
        )
      return o
    }
    switch (typeof o) {
      case 'boolean':
        return ''
      case 'object':
        if (1 === o.anim)
          return (_ = { name: o.name, styles: o.styles, next: _ }), o.name
        if (void 0 !== o.styles) {
          var t = o.next
          if (void 0 !== t)
            for (; void 0 !== t; )
              (_ = { name: t.name, styles: t.styles, next: _ }), (t = t.next)
          var r = o.styles + ';'
          return (
            'production' !== process.env.NODE_ENV &&
              void 0 !== o.map &&
              (r += o.map),
            r
          )
        }
        return (function (e, n, o) {
          var t = ''
          if (Array.isArray(o))
            for (var r = 0; r < o.length; r++) t += b(e, n, o[r]) + ';'
          else
            for (var i in o) {
              var s = o[i]
              if ('object' != typeof s)
                null != n && void 0 !== n[s]
                  ? (t += i + '{' + n[s] + '}')
                  : p(s) && (t += d(i) + ':' + f(i, s) + ';')
              else {
                if (
                  'NO_COMPONENT_SELECTOR' === i &&
                  'production' !== process.env.NODE_ENV
                )
                  throw new Error(
                    'Component selectors can only be used in conjunction with @emotion/babel-plugin.'
                  )
                if (
                  !Array.isArray(s) ||
                  'string' != typeof s[0] ||
                  (null != n && void 0 !== n[s[0]])
                ) {
                  var a = b(e, n, s)
                  switch (i) {
                    case 'animation':
                    case 'animationName':
                      t += d(i) + ':' + a + ';'
                      break
                    default:
                      'production' !== process.env.NODE_ENV &&
                        'undefined' === i &&
                        console.error(
                          "You have passed in falsy value as style object's key (can happen when in example you pass unexported component as computed key)."
                        ),
                        (t += i + '{' + a + '}')
                  }
                } else
                  for (var l = 0; l < s.length; l++)
                    p(s[l]) && (t += d(i) + ':' + f(i, s[l]) + ';')
              }
            }
          return t
        })(e, n, o)
      case 'function':
        if (void 0 !== e) {
          var i = _,
            s = o(e)
          return (_ = i), b(e, n, s)
        }
        'production' !== process.env.NODE_ENV &&
          console.error(
            "Functions that are interpolated in css calls will be stringified.\nIf you want to have a css call based on props, create a function that returns a css call like this\nlet dynamicStyle = (props) => css`color: ${props.color}`\nIt can be called directly with props or interpolated in a styled call like this\nlet SomeComponent = styled('div')`${dynamicStyle}`"
          )
        break
      case 'string':
        if ('production' !== process.env.NODE_ENV) {
          var a = [],
            l = o.replace(c, function (e, n, o) {
              var t = 'animation' + a.length
              return (
                a.push(
                  'const ' +
                    t +
                    ' = keyframes`' +
                    o.replace(/^@keyframes animation-\w+/, '') +
                    '`'
                ),
                '${' + t + '}'
              )
            })
          a.length &&
            console.error(
              '`keyframes` output got interpolated into plain string, please wrap it with `css`.\n\nInstead of doing this:\n\n' +
                [].concat(a, ['`' + l + '`']).join('\n') +
                '\n\nYou should wrap it with `css` like this:\n\ncss`' +
                l +
                '`'
            )
        }
    }
    if (null == n) return o
    var u = n[o]
    return void 0 !== u ? u : o
  }
  var N,
    _,
    w = /label:\s*([^\s;\n{]+)\s*;/g
  'production' !== process.env.NODE_ENV &&
    (N = /\/\*#\ssourceMappingURL=data:application\/json;\S+\s+\*\//g),
    (e.serializeStyles = function (e, n, o) {
      if (
        1 === e.length &&
        'object' == typeof e[0] &&
        null !== e[0] &&
        void 0 !== e[0].styles
      )
        return e[0]
      var t = !0,
        r = ''
      _ = void 0
      var s,
        l = e[0]
      null == l || void 0 === l.raw
        ? ((t = !1), (r += b(o, n, l)))
        : ('production' !== process.env.NODE_ENV &&
            void 0 === l[0] &&
            console.error(a),
          (r += l[0]))
      for (var c = 1; c < e.length; c++)
        (r += b(o, n, e[c])),
          t &&
            ('production' !== process.env.NODE_ENV &&
              void 0 === l[c] &&
              console.error(a),
            (r += l[c]))
      'production' !== process.env.NODE_ENV &&
        (r = r.replace(N, function (e) {
          return (s = e), ''
        })),
        (w.lastIndex = 0)
      for (var u, p = ''; null !== (u = w.exec(r)); ) p += '-' + u[1]
      var d = i.default(r) + p
      return 'production' !== process.env.NODE_ENV
        ? {
            name: d,
            styles: r,
            map: s,
            next: _,
            toString: function () {
              return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."
            },
          }
        : { name: d, styles: r, next: _ }
    })
})
//# sourceMappingURL=emotion-serialize.umd.js.map
