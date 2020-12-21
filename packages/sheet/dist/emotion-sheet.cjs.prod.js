'use strict'

function sheetForTag(tag) {
  if (tag.sheet) return tag.sheet
  for (var i = 0; i < document.styleSheets.length; i++)
    if (document.styleSheets[i].ownerNode === tag)
      return document.styleSheets[i]
}

function createStyleElement(options) {
  var tag = document.createElement('style')
  return (
    tag.setAttribute('data-emotion', options.key),
    void 0 !== options.nonce && tag.setAttribute('nonce', options.nonce),
    tag.appendChild(document.createTextNode('')),
    tag.setAttribute('data-s', ''),
    tag
  )
}

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var StyleSheet = (function() {
  function StyleSheet(options) {
    var _this = this
    ;(this._insertTag = function(tag) {
      var before
      ;(before =
        0 === _this.tags.length
          ? _this.prepend
            ? _this.container.firstChild
            : _this.before
          : _this.tags[_this.tags.length - 1].nextSibling),
        _this.container.insertBefore(tag, before),
        _this.tags.push(tag)
    }),
      (this.isSpeedy = void 0 === options.speedy || options.speedy),
      (this.tags = []),
      (this.ctr = 0),
      (this.nonce = options.nonce),
      (this.key = options.key),
      (this.container = options.container),
      (this.prepend = options.prepend),
      (this.before = null)
  }
  var _proto = StyleSheet.prototype
  return (
    (_proto.hydrate = function(nodes) {
      nodes.forEach(this._insertTag)
    }),
    (_proto.insert = function(rule) {
      this.ctr % (this.isSpeedy ? 65e3 : 1) == 0 &&
        this._insertTag(createStyleElement(this))
      var tag = this.tags[this.tags.length - 1]
      if (this.isSpeedy) {
        var sheet = sheetForTag(tag)
        try {
          sheet.insertRule(rule, sheet.cssRules.length)
        } catch (e) {
          0
        }
      } else tag.appendChild(document.createTextNode(rule))
      this.ctr++
    }),
    (_proto.flush = function() {
      this.tags.forEach(function(tag) {
        return tag.parentNode.removeChild(tag)
      }),
        (this.tags = []),
        (this.ctr = 0)
    }),
    StyleSheet
  )
})()

exports.StyleSheet = StyleSheet
