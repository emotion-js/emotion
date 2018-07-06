'use strict';

var _extractCritical = require('./extract-critical');

var _extractCritical2 = _interopRequireDefault(_extractCritical);

var _inline = require('./inline');

var _inline2 = _interopRequireDefault(_inline);

var _stream = require('./stream');

var _stream2 = _interopRequireDefault(_stream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = function (emotion) {
  var nonceString = emotion.caches.nonce !== undefined ? ' nonce="' + emotion.caches.nonce + '"' : '';
  return {
    extractCritical: (0, _extractCritical2.default)(emotion),
    renderStylesToString: (0, _inline2.default)(emotion, nonceString),
    renderStylesToNodeStream: (0, _stream2.default)(emotion, nonceString)
  };
};