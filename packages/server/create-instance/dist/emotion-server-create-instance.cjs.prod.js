'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var through = require('through'),
  tokenize = require('html-tokenize'),
  pipe = require('multipipe')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var through__default = _interopDefault(through),
  tokenize__default = _interopDefault(tokenize),
  pipe__default = _interopDefault(pipe),
  createExtractCritical = function(cache) {
    return function(html) {
      for (
        var match,
          RGX = new RegExp(cache.key + '-([a-zA-Z0-9-_]+)', 'gm'),
          o = {
            html: html,
            ids: [],
            css: ''
          },
          ids = {};
        null !== (match = RGX.exec(html));

      )
        void 0 === ids[match[1]] && (ids[match[1]] = !0)
      return (
        (o.ids = Object.keys(cache.inserted).filter(function(id) {
          if (
            (void 0 !== ids[id] ||
              void 0 === cache.registered[cache.key + '-' + id]) &&
            !0 !== cache.inserted[id]
          )
            return (o.css += cache.inserted[id]), !0
        })),
        o
      )
    }
  }

function generateStyleTag(cssKey, ids, styles, nonceString) {
  return (
    '<style data-emotion="' +
    cssKey +
    ' ' +
    ids.substring(1) +
    '"' +
    nonceString +
    '>' +
    styles +
    '</style>'
  )
}

var createRenderStylesToString = function(cache, nonceString) {
    return function(html) {
      var inserted = cache.inserted,
        cssKey = cache.key,
        registered = cache.registered,
        regex = new RegExp('<|' + cssKey + '-([a-zA-Z0-9-_]+)', 'gm'),
        seen = {},
        result = '',
        globalIds = '',
        globalStyles = ''
      for (var id in inserted)
        if (inserted.hasOwnProperty(id)) {
          var style = inserted[id]
          !0 !== style &&
            void 0 === registered[cssKey + '-' + id] &&
            ((globalStyles += style), (globalIds += ' ' + id))
        }
      '' !== globalStyles &&
        (result = generateStyleTag(
          cssKey,
          globalIds,
          globalStyles,
          nonceString
        ))
      for (
        var match, ids = '', styles = '', lastInsertionPoint = 0;
        null !== (match = regex.exec(html));

      )
        if ('<' !== match[0]) {
          var _id = match[1],
            _style = inserted[_id]
          !0 === _style ||
            void 0 === _style ||
            seen[_id] ||
            ((seen[_id] = !0), (styles += _style), (ids += ' ' + _id))
        } else
          '' !== ids &&
            ((result += generateStyleTag(cssKey, ids, styles, nonceString)),
            (ids = ''),
            (styles = '')),
            (result += html.substring(lastInsertionPoint, match.index)),
            (lastInsertionPoint = match.index)
      return (result += html.substring(lastInsertionPoint))
    }
  },
  createRenderStylesToNodeStream = function(cache, nonceString) {
    return function() {
      var insed = {},
        tokenStream = tokenize__default.default(),
        inlineStream = through__default.default(
          function(thing) {
            var type = thing[0],
              data = thing[1]
            if ('open' === type) {
              for (
                var match,
                  css = '',
                  ids = {},
                  fragment = data.toString(),
                  regex = new RegExp(cache.key + '-([a-zA-Z0-9-_]+)', 'gm');
                null !== (match = regex.exec(fragment));

              )
                null !== match &&
                  void 0 === insed[match[1]] &&
                  (ids[match[1]] = !0)
              Object.keys(cache.inserted).forEach(function(id) {
                !0 !== cache.inserted[id] &&
                  void 0 === insed[id] &&
                  (!0 === ids[id] ||
                    (void 0 === cache.registered[cache.key + '-' + id] &&
                      (ids[id] = !0))) &&
                  ((insed[id] = !0), (css += cache.inserted[id]))
              }),
                '' !== css &&
                  this.queue(
                    '<style data-emotion="' +
                      cache.key +
                      ' ' +
                      Object.keys(ids).join(' ') +
                      '"' +
                      nonceString +
                      '>' +
                      css +
                      '</style>'
                  )
            }
            this.queue(data)
          },
          function() {
            this.queue(null)
          }
        )
      return pipe__default.default(tokenStream, inlineStream)
    }
  }

function createEmotionServer(cache) {
  !0 !== cache.compat && (cache.compat = !0)
  var nonceString = void 0 !== cache.nonce ? ' nonce="' + cache.nonce + '"' : ''
  return {
    extractCritical: createExtractCritical(cache),
    renderStylesToString: createRenderStylesToString(cache, nonceString),
    renderStylesToNodeStream: createRenderStylesToNodeStream(cache, nonceString)
  }
}

exports.default = createEmotionServer
