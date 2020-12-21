class e {
  constructor(e) {
    ;(this._insertTag = (e) => {
      let t
      ;(t =
        0 === this.tags.length
          ? this.prepend
            ? this.container.firstChild
            : this.before
          : this.tags[this.tags.length - 1].nextSibling),
        this.container.insertBefore(e, t),
        this.tags.push(e)
    }),
      (this.isSpeedy =
        void 0 === e.speedy ? 'production' === process.env.NODE_ENV : e.speedy),
      (this.tags = []),
      (this.ctr = 0),
      (this.nonce = e.nonce),
      (this.key = e.key),
      (this.container = e.container),
      (this.prepend = e.prepend),
      (this.before = null)
  }
  hydrate(e) {
    e.forEach(this._insertTag)
  }
  insert(e) {
    this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 &&
      this._insertTag(
        (function (e) {
          let t = document.createElement('style')
          return (
            t.setAttribute('data-emotion', e.key),
            void 0 !== e.nonce && t.setAttribute('nonce', e.nonce),
            t.appendChild(document.createTextNode('')),
            t.setAttribute('data-s', ''),
            t
          )
        })(this)
      )
    const t = this.tags[this.tags.length - 1]
    if ('production' !== process.env.NODE_ENV) {
      const t = 64 === e.charCodeAt(0) && 105 === e.charCodeAt(1)
      t &&
        this._alreadyInsertedOrderInsensitiveRule &&
        console.error(
          "You're attempting to insert the following rule:\n" +
            e +
            '\n\n`@import` rules must be before all other types of rules in a stylesheet but other rules have already been inserted. Please ensure that `@import` rules are before all other rules.'
        ),
        (this._alreadyInsertedOrderInsensitiveRule =
          this._alreadyInsertedOrderInsensitiveRule || !t)
    }
    if (this.isSpeedy) {
      const s = (function (e) {
        if (e.sheet) return e.sheet
        for (let t = 0; t < document.styleSheets.length; t++)
          if (document.styleSheets[t].ownerNode === e)
            return document.styleSheets[t]
      })(t)
      try {
        s.insertRule(e, s.cssRules.length)
      } catch (t) {
        'production' === process.env.NODE_ENV ||
          /:(-moz-placeholder|-ms-input-placeholder|-moz-read-write|-moz-read-only){/.test(
            e
          ) ||
          console.error(
            `There was a problem inserting the following rule: "${e}"`,
            t
          )
      }
    } else t.appendChild(document.createTextNode(e))
    this.ctr++
  }
  flush() {
    this.tags.forEach((e) => e.parentNode.removeChild(e)),
      (this.tags = []),
      (this.ctr = 0),
      'production' !== process.env.NODE_ENV &&
        (this._alreadyInsertedOrderInsensitiveRule = !1)
  }
}
export { e as StyleSheet }
//# sourceMappingURL=emotion-sheet.modern.js.map
