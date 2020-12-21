'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var createInstance_dist_emotionServerCreateInstance = require('../create-instance/dist/emotion-server-create-instance.browser.cjs.js');
require('through');
require('html-tokenize');
require('multipipe');
var css = require('@emotion/css');

var _createEmotionServer = createInstance_dist_emotionServerCreateInstance['default'](css.cache),
    extractCritical = _createEmotionServer.extractCritical,
    renderStylesToString = _createEmotionServer.renderStylesToString,
    renderStylesToNodeStream = _createEmotionServer.renderStylesToNodeStream;

exports.extractCritical = extractCritical;
exports.renderStylesToNodeStream = renderStylesToNodeStream;
exports.renderStylesToString = renderStylesToString;
