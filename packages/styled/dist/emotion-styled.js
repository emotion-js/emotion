var e = require('react'),
  t = require('@emotion/is-prop-valid'),
  o = require('@emotion/react'),
  r = require('@emotion/utils'),
  n = require('@emotion/serialize')
function a(e) {
  return e && 'object' == typeof e && 'default' in e ? e : { default: e }
}
function i() {
  return (i =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var o = arguments[t]
        for (var r in o)
          Object.prototype.hasOwnProperty.call(o, r) && (e[r] = o[r])
      }
      return e
    }).apply(this, arguments)
}
var s = a(t).default,
  l = function (e) {
    return 'theme' !== e
  },
  u = function (e) {
    return 'string' == typeof e && e.charCodeAt(0) > 96 ? s : l
  },
  d = function (e, t, o) {
    var r
    if (t) {
      var n = t.shouldForwardProp
      r =
        e.__emotion_forwardProp && n
          ? function (t) {
              return e.__emotion_forwardProp(t) && n(t)
            }
          : n
    }
    return 'function' != typeof r && o && (r = e.__emotion_forwardProp), r
  },
  p =
    "You have illegal escape sequence in your template literal, most likely inside content's property value.\nBecause you write your CSS inside a JavaScript string you actually have to do double escaping, so for example \"content: '\\00d7';\" should become \"content: '\\\\00d7';\".\nYou can read more about this here:\nhttps://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#ES2018_revision_of_illegal_escape_sequences",
  c = 'undefined' != typeof document,
  m = function t(a, s) {
    if ('production' !== process.env.NODE_ENV && void 0 === a)
      throw new Error(
        'You are trying to create a styled element with an undefined component.\nYou may have forgotten to import it.'
      )
    var l,
      m,
      f = a.__emotion_real === a,
      v = (f && a.__emotion_base) || a
    void 0 !== s && ((l = s.label), (m = s.target))
    var _ = d(a, s, f),
      y = _ || u(v),
      g = !y('as')
    return function () {
      var b = arguments,
        N =
          f && void 0 !== a.__emotion_styles ? a.__emotion_styles.slice(0) : []
      if (
        (void 0 !== l && N.push('label:' + l + ';'),
        null == b[0] || void 0 === b[0].raw)
      )
        N.push.apply(N, b)
      else {
        'production' !== process.env.NODE_ENV &&
          void 0 === b[0][0] &&
          console.error(p),
          N.push(b[0][0])
        for (var E = b.length, w = 1; w < E; w++)
          'production' !== process.env.NODE_ENV &&
            void 0 === b[0][w] &&
            console.error(p),
            N.push(b[w], b[0][w])
      }
      var O = o.withEmotionCache(function (t, a, i) {
        var s = (g && t.as) || v,
          l = '',
          d = [],
          p = t
        if (null == t.theme) {
          for (var f in ((p = {}), t)) p[f] = t[f]
          p.theme = e.useContext(o.ThemeContext)
        }
        'string' == typeof t.className
          ? (l = r.getRegisteredStyles(a.registered, d, t.className))
          : null != t.className && (l = t.className + ' ')
        var b = n.serializeStyles(N.concat(d), a.registered, p),
          E = r.insertStyles(a, b, 'string' == typeof s)
        ;(l += a.key + '-' + b.name), void 0 !== m && (l += ' ' + m)
        var w = g && void 0 === _ ? u(s) : y,
          O = {}
        for (var S in t) (g && 'as' === S) || (w(S) && (O[S] = t[S]))
        ;(O.className = l), (O.ref = i)
        var P = e.createElement(s, O)
        if (!c && void 0 !== E) {
          for (var k, q = b.name, C = b.next; void 0 !== C; )
            (q += ' ' + C.name), (C = C.next)
          return h(
            Fragment,
            null,
            h(
              'style',
              (((k = {})['data-emotion'] = a.key + ' ' + q),
              (k.dangerouslySetInnerHTML = { __html: E }),
              (k.nonce = a.sheet.nonce),
              k)
            ),
            P
          )
        }
        return P
      })
      return (
        (O.displayName =
          void 0 !== l
            ? l
            : 'Styled(' +
              ('string' == typeof v
                ? v
                : v.displayName || v.name || 'Component') +
              ')'),
        (O.defaultProps = a.defaultProps),
        (O.__emotion_real = O),
        (O.__emotion_base = v),
        (O.__emotion_styles = N),
        (O.__emotion_forwardProp = _),
        Object.defineProperty(O, 'toString', {
          value: function () {
            return void 0 === m && 'production' !== process.env.NODE_ENV
              ? 'NO_COMPONENT_SELECTOR'
              : '.' + m
          },
        }),
        (O.withComponent = function (e, o) {
          return t(e, i({}, s, o, { shouldForwardProp: d(O, o, !0) })).apply(
            void 0,
            N
          )
        }),
        O
      )
    }
  }.bind()
;[
  'a',
  'abbr',
  'address',
  'area',
  'article',
  'aside',
  'audio',
  'b',
  'base',
  'bdi',
  'bdo',
  'big',
  'blockquote',
  'body',
  'br',
  'button',
  'canvas',
  'caption',
  'cite',
  'code',
  'col',
  'colgroup',
  'data',
  'datalist',
  'dd',
  'del',
  'details',
  'dfn',
  'dialog',
  'div',
  'dl',
  'dt',
  'em',
  'embed',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'head',
  'header',
  'hgroup',
  'hr',
  'html',
  'i',
  'iframe',
  'img',
  'input',
  'ins',
  'kbd',
  'keygen',
  'label',
  'legend',
  'li',
  'link',
  'main',
  'map',
  'mark',
  'marquee',
  'menu',
  'menuitem',
  'meta',
  'meter',
  'nav',
  'noscript',
  'object',
  'ol',
  'optgroup',
  'option',
  'output',
  'p',
  'param',
  'picture',
  'pre',
  'progress',
  'q',
  'rp',
  'rt',
  'ruby',
  's',
  'samp',
  'script',
  'section',
  'select',
  'small',
  'source',
  'span',
  'strong',
  'style',
  'sub',
  'summary',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'time',
  'title',
  'tr',
  'track',
  'u',
  'ul',
  'var',
  'video',
  'wbr',
  'circle',
  'clipPath',
  'defs',
  'ellipse',
  'foreignObject',
  'g',
  'image',
  'line',
  'linearGradient',
  'mask',
  'path',
  'pattern',
  'polygon',
  'polyline',
  'radialGradient',
  'rect',
  'stop',
  'svg',
  'text',
  'tspan',
].forEach(function (e) {
  m[e] = m(e)
}),
  (module.exports = m)
//# sourceMappingURL=emotion-styled.js.map
