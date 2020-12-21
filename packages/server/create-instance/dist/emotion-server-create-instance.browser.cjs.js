'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var through = require('through');
var tokenize = require('html-tokenize');
var pipe = require('multipipe');

function _interopDefault (e) { return e && e.__esModule ? e : { 'default': e }; }

var through__default = /*#__PURE__*/_interopDefault(through);
var tokenize__default = /*#__PURE__*/_interopDefault(tokenize);
var pipe__default = /*#__PURE__*/_interopDefault(pipe);

var createExtractCritical = function createExtractCritical(cache) {
  return function (html) {
    // parse out ids from html
    // reconstruct css/rules/cache to pass
    var RGX = new RegExp(cache.key + "-([a-zA-Z0-9-_]+)", 'gm');
    var o = {
      html: html,
      ids: [],
      css: ''
    };
    var match;
    var ids = {};

    while ((match = RGX.exec(html)) !== null) {
      // $FlowFixMe
      if (ids[match[1]] === undefined) {
        // $FlowFixMe
        ids[match[1]] = true;
      }
    }

    o.ids = Object.keys(cache.inserted).filter(function (id) {
      if ((ids[id] !== undefined || cache.registered[cache.key + "-" + id] === undefined) && cache.inserted[id] !== true) {
        o.css += cache.inserted[id];
        return true;
      }
    });
    return o;
  };
};

function generateStyleTag(cssKey, ids, styles, nonceString) {
  return "<style data-emotion=\"" + cssKey + " " + ids.substring(1) + "\"" + nonceString + ">" + styles + "</style>";
}

var createRenderStylesToString = function createRenderStylesToString(cache, nonceString) {
  return function (html) {
    var inserted = cache.inserted,
        cssKey = cache.key,
        registered = cache.registered;
    var regex = new RegExp("<|" + cssKey + "-([a-zA-Z0-9-_]+)", 'gm');
    var seen = {};
    var result = '';
    var globalIds = '';
    var globalStyles = '';

    for (var id in inserted) {
      // eslint-disable-next-line no-prototype-builtins
      if (inserted.hasOwnProperty(id)) {
        var style = inserted[id];
        var key = cssKey + "-" + id;

        if (style !== true && registered[key] === undefined) {
          globalStyles += style;
          globalIds += " " + id;
        }
      }
    }

    if (globalStyles !== '') {
      result = generateStyleTag(cssKey, globalIds, globalStyles, nonceString);
    }

    var ids = '';
    var styles = '';
    var lastInsertionPoint = 0;
    var match;

    while ((match = regex.exec(html)) !== null) {
      // $FlowFixMe
      if (match[0] === '<') {
        if (ids !== '') {
          result += generateStyleTag(cssKey, ids, styles, nonceString);
          ids = '';
          styles = '';
        } // $FlowFixMe


        result += html.substring(lastInsertionPoint, match.index); // $FlowFixMe

        lastInsertionPoint = match.index;
        continue;
      } // $FlowFixMe


      var _id = match[1];
      var _style = inserted[_id];

      if (_style === true || _style === undefined || seen[_id]) {
        continue;
      }

      seen[_id] = true;
      styles += _style;
      ids += " " + _id;
    }

    result += html.substring(lastInsertionPoint);
    return result;
  };
};

var createRenderStylesToNodeStream = function createRenderStylesToNodeStream(cache, nonceString) {
  return function () {
    var insed = {};
    var tokenStream = tokenize__default['default']();
    var inlineStream = through__default['default'](function write(thing) {
      var type = thing[0],
          data = thing[1];

      if (type === 'open') {
        var css = '';
        var ids = {};
        var match;
        var fragment = data.toString();
        var regex = new RegExp(cache.key + "-([a-zA-Z0-9-_]+)", 'gm');

        while ((match = regex.exec(fragment)) !== null) {
          if (match !== null && insed[match[1]] === undefined) {
            ids[match[1]] = true;
          }
        }

        Object.keys(cache.inserted).forEach(function (id) {
          if (cache.inserted[id] !== true && insed[id] === undefined && (ids[id] === true || cache.registered[cache.key + "-" + id] === undefined && (ids[id] = true))) {
            insed[id] = true; // $FlowFixMe flow thinks emotion.caches.inserted[id] can be true even though it's checked earlier

            css += cache.inserted[id];
          }
        });

        if (css !== '') {
          this.queue("<style data-emotion=\"" + cache.key + " " + Object.keys(ids).join(' ') + "\"" + nonceString + ">" + css + "</style>");
        }
      }

      this.queue(data);
    }, function end() {
      this.queue(null);
    });
    return pipe__default['default'](tokenStream, inlineStream);
  };
};

function createEmotionServer (cache) {
  if (cache.compat !== true) {
    // is this good? should we do this automatically?
    // this is only for when using the new apis (not emotion or create-emotion)
    cache.compat = true;
  }

  var nonceString = cache.nonce !== undefined ? " nonce=\"" + cache.nonce + "\"" : '';
  return {
    extractCritical: createExtractCritical(cache),
    renderStylesToString: createRenderStylesToString(cache, nonceString),
    renderStylesToNodeStream: createRenderStylesToNodeStream(cache, nonceString)
  };
}

exports.default = createEmotionServer;
