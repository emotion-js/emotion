'use strict';

exports.__esModule = true;

var _through = require('through');

var _through2 = _interopRequireDefault(_through);

var _htmlTokenize = require('html-tokenize');

var _htmlTokenize2 = _interopRequireDefault(_htmlTokenize);

var _multipipe = require('multipipe');

var _multipipe2 = _interopRequireDefault(_multipipe);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createRenderStylesToNodeStream = function createRenderStylesToNodeStream(emotion, nonceString) {
  return function () {
    var insed = {};
    var tokenStream = (0, _htmlTokenize2.default)();

    var inlineStream = (0, _through2.default)(function write(thing) {
      var type = thing[0],
          data = thing[1];

      if (type === 'open') {
        var css = '';
        var ids = {};

        var match = void 0;
        var fragment = data.toString();
        var regex = new RegExp(emotion.caches.key + '-([a-zA-Z0-9-]+)', 'gm');
        while ((match = regex.exec(fragment)) !== null) {
          if (match !== null && insed[match[1]] === undefined) {
            ids[match[1]] = true;
          }
        }
        Object.keys(emotion.caches.inserted).forEach(function (id) {
          if (emotion.caches.inserted[id] !== true && insed[id] === undefined && (ids[id] === true || emotion.caches.registered[emotion.caches.key + '-' + id] === undefined && (ids[id] = true))) {
            insed[id] = true;
            // $FlowFixMe flow thinks emotion.caches.inserted[id] can be true even though it's checked earlier
            css += emotion.caches.inserted[id];
          }
        });

        if (css !== '') {
          this.queue('<style data-emotion-' + emotion.caches.key + '="' + Object.keys(ids).join(' ') + '"' + nonceString + '>' + css + '</style>');
        }
      }
      this.queue(data);
    }, function end() {
      this.queue(null);
    });

    return (0, _multipipe2.default)(tokenStream, inlineStream);
  };
};

exports.default = createRenderStylesToNodeStream;