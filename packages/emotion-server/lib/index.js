'use strict';

exports.__esModule = true;
exports.renderStylesToNodeStream = exports.renderStylesToString = exports.extractCritical = undefined;

var _createEmotionServer2 = require('create-emotion-server');

var _createEmotionServer3 = _interopRequireDefault(_createEmotionServer2);

var _emotion = require('emotion');

var emotion = _interopRequireWildcard(_emotion);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _createEmotionServer = (0, _createEmotionServer3.default)(emotion),
    extractCritical = _createEmotionServer.extractCritical,
    renderStylesToString = _createEmotionServer.renderStylesToString,
    renderStylesToNodeStream = _createEmotionServer.renderStylesToNodeStream;

exports.extractCritical = extractCritical;
exports.renderStylesToString = renderStylesToString;
exports.renderStylesToNodeStream = renderStylesToNodeStream;