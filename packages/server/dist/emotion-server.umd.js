!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(
        exports,
        require('through'),
        require('html-tokenize'),
        require('multipipe'),
        require('@emotion/css')
      )
    : 'function' == typeof define && define.amd
    ? define([
        'exports',
        'through',
        'html-tokenize',
        'multipipe',
        '@emotion/css',
      ], t)
    : t(
        ((e || self).server = {}),
        e.through,
        e.htmlTokenize,
        e.multipipe,
        e.css
      )
})(this, function (e, t, n, r, i) {
  function o(e) {
    return e && 'object' == typeof e && 'default' in e ? e : { default: e }
  }
  var u = o(t),
    s = o(n),
    d = o(r),
    c = function (e) {
      return function (t) {
        for (
          var n,
            r = new RegExp(e.key + '-([a-zA-Z0-9-_]+)', 'gm'),
            i = { html: t, ids: [], css: '' },
            o = {};
          null !== (n = r.exec(t));

        )
          void 0 === o[n[1]] && (o[n[1]] = !0)
        return (
          (i.ids = Object.keys(e.inserted).filter(function (t) {
            if (
              (void 0 !== o[t] || void 0 === e.registered[e.key + '-' + t]) &&
              !0 !== e.inserted[t]
            )
              return (i.css += e.inserted[t]), !0
          })),
          i
        )
      }
    }
  function l(e, t, n, r) {
    return (
      '<style data-emotion="' +
      e +
      ' ' +
      t.substring(1) +
      '"' +
      r +
      '>' +
      n +
      '</style>'
    )
  }
  var f = function (e, t) {
      return function (n) {
        var r = e.inserted,
          i = e.key,
          o = e.registered,
          u = new RegExp('<|' + i + '-([a-zA-Z0-9-_]+)', 'gm'),
          s = {},
          d = '',
          c = '',
          f = ''
        for (var a in r)
          if (r.hasOwnProperty(a)) {
            var y = r[a]
            !0 !== y && void 0 === o[i + '-' + a] && ((f += y), (c += ' ' + a))
          }
        '' !== f && (d = l(i, c, f, t))
        for (var v, g = '', m = '', p = 0; null !== (v = u.exec(n)); )
          if ('<' !== v[0]) {
            var h = v[1],
              x = r[h]
            !0 === x ||
              void 0 === x ||
              s[h] ||
              ((s[h] = !0), (m += x), (g += ' ' + h))
          } else
            '' !== g && ((d += l(i, g, m, t)), (g = ''), (m = '')),
              (d += n.substring(p, v.index)),
              (p = v.index)
        return d + n.substring(p)
      }
    },
    a = function (e, t) {
      return function () {
        var n = {},
          r = s.default(),
          i = u.default(
            function (r) {
              var i = r[1]
              if ('open' === r[0]) {
                for (
                  var o,
                    u = '',
                    s = {},
                    d = i.toString(),
                    c = new RegExp(e.key + '-([a-zA-Z0-9-_]+)', 'gm');
                  null !== (o = c.exec(d));

                )
                  null !== o && void 0 === n[o[1]] && (s[o[1]] = !0)
                Object.keys(e.inserted).forEach(function (t) {
                  !0 !== e.inserted[t] &&
                    void 0 === n[t] &&
                    (!0 === s[t] ||
                      (void 0 === e.registered[e.key + '-' + t] &&
                        (s[t] = !0))) &&
                    ((n[t] = !0), (u += e.inserted[t]))
                }),
                  '' !== u &&
                    this.queue(
                      '<style data-emotion="' +
                        e.key +
                        ' ' +
                        Object.keys(s).join(' ') +
                        '"' +
                        t +
                        '>' +
                        u +
                        '</style>'
                    )
              }
              this.queue(i)
            },
            function () {
              this.queue(null)
            }
          )
        return d.default(r, i)
      }
    },
    y = (function (e) {
      !0 !== e.compat && (e.compat = !0)
      var t = void 0 !== e.nonce ? ' nonce="' + e.nonce + '"' : ''
      return {
        extractCritical: c(e),
        renderStylesToString: f(e, t),
        renderStylesToNodeStream: a(e, t),
      }
    })(i.cache),
    v = y.renderStylesToString,
    g = y.renderStylesToNodeStream
  ;(e.extractCritical = y.extractCritical),
    (e.renderStylesToNodeStream = g),
    (e.renderStylesToString = v)
})
//# sourceMappingURL=emotion-server.umd.js.map
