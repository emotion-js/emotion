!(function (e, t) {
  'object' == typeof exports && 'undefined' != typeof module
    ? t(exports)
    : 'function' == typeof define && define.amd
    ? define(['exports'], t)
    : t(((e || self).sheet = {}))
})(this, function (e) {
  e.StyleSheet = (function () {
    function e(e) {
      var t = this
      ;(this._insertTag = function (e) {
        t.container.insertBefore(
          e,
          0 === t.tags.length
            ? t.prepend
              ? t.container.firstChild
              : t.before
            : t.tags[t.tags.length - 1].nextSibling
        ),
          t.tags.push(e)
      }),
        (this.isSpeedy =
          void 0 === e.speedy
            ? 'production' === process.env.NODE_ENV
            : e.speedy),
        (this.tags = []),
        (this.ctr = 0),
        (this.nonce = e.nonce),
        (this.key = e.key),
        (this.container = e.container),
        (this.prepend = e.prepend),
        (this.before = null)
    }
    var t = e.prototype
    return (
      (t.hydrate = function (e) {
        e.forEach(this._insertTag)
      }),
      (t.insert = function (e) {
        this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 &&
          this._insertTag(
            (function (e) {
              var t = document.createElement('style')
              return (
                t.setAttribute('data-emotion', e.key),
                void 0 !== e.nonce && t.setAttribute('nonce', e.nonce),
                t.appendChild(document.createTextNode('')),
                t.setAttribute('data-s', ''),
                t
              )
            })(this)
          )
        var t = this.tags[this.tags.length - 1]
        if ('production' !== process.env.NODE_ENV) {
          var n = 64 === e.charCodeAt(0) && 105 === e.charCodeAt(1)
          n &&
            this._alreadyInsertedOrderInsensitiveRule &&
            console.error(
              "You're attempting to insert the following rule:\n" +
                e +
                '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.'
            ),
            (this._alreadyInsertedOrderInsensitiveRule =
              this._alreadyInsertedOrderInsensitiveRule || !n)
        }
        if (this.isSpeedy) {
          var r = (function (e) {
            if (e.sheet) return e.sheet
            for (var t = 0; t < document.styleSheets.length; t++)
              if (document.styleSheets[t].ownerNode === e)
                return document.styleSheets[t]
          })(t)
          try {
            r.insertRule(e, r.cssRules.length)
          } catch (t) {
            'production' === process.env.NODE_ENV ||
              /:(-moz-placeholder|-ms-input-placeholder|-moz-read-write|-moz-read-only){/.test(
                e
              ) ||
              console.error(
                'There was a problem inserting the following rule: "' + e + '"',
                t
              )
          }
        } else t.appendChild(document.createTextNode(e))
        this.ctr++
      }),
      (t.flush = function () {
        this.tags.forEach(function (e) {
          return e.parentNode.removeChild(e)
        }),
          (this.tags = []),
          (this.ctr = 0),
          'production' !== process.env.NODE_ENV &&
            (this._alreadyInsertedOrderInsensitiveRule = !1)
      }),
      e
    )
  })()
})
//# sourceMappingURL=emotion-sheet.umd.js.map
