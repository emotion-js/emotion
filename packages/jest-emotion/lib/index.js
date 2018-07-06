'use strict';

exports.__esModule = true;
exports.getStyles = getStyles;
exports.createSerializer = createSerializer;

var _css = require('css');

var css = _interopRequireWildcard(_css);

var _replaceClassNames = require('./replace-class-names');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function getNodes(node) {
  var nodes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

  if (node.children) {
    for (var _iterator = node.children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var child = _ref;

      getNodes(child, nodes);
    }
  }

  if (typeof node === 'object') {
    nodes.push(node);
  }

  return nodes;
}

function getClassNames(selectors, classes) {
  return classes ? selectors.concat(classes.split(' ')) : selectors;
}

function getClassNamesFromProps(selectors, props) {
  return getClassNames(selectors, props.className || props.class);
}

function getClassNamesFromDOMElement(selectors, node) {
  return getClassNames(selectors, node.getAttribute('class'));
}

function getClassNamesFromNodes(nodes) {
  return nodes.reduce(function (selectors, node) {
    return isReactElement(node) ? getClassNamesFromProps(selectors, node.props) : getClassNamesFromDOMElement(selectors, node);
  }, []);
}

function getStyles(emotion) {
  return Object.keys(emotion.caches.inserted).reduce(function (style, current) {
    if (emotion.caches.inserted[current] === true) {
      return style;
    }
    return style + emotion.caches.inserted[current];
  }, '');
}

function isReactElement(val) {
  return val.$$typeof === Symbol.for('react.test.json');
}

var domElementPattern = /^((HTML|SVG)\w*)?Element$/;

function isDOMElement(val) {
  return val.nodeType === 1 && val.constructor && val.constructor.name && domElementPattern.test(val.constructor.name);
}

function createSerializer(emotion) {
  var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      classNameReplacer = _ref2.classNameReplacer,
      _ref2$DOMElements = _ref2.DOMElements,
      DOMElements = _ref2$DOMElements === undefined ? true : _ref2$DOMElements;

  function print(val, printer) {
    var nodes = getNodes(val);
    markNodes(nodes);
    var classNames = getClassNamesFromNodes(nodes);
    var styles = getStylesFromClassNames(classNames);
    var printedVal = printer(val);
    return (0, _replaceClassNames.replaceClassNames)(classNames, styles, printedVal, emotion.caches.key, classNameReplacer);
  }

  function test(val) {
    return val && !val.withEmotionStyles && (DOMElements ? isReactElement(val) || isDOMElement(val) : isReactElement(val));
  }

  function markNodes(nodes) {
    nodes.forEach(function (node) {
      node.withEmotionStyles = true;
    });
  }

  function getStylesFromClassNames(classNames) {
    var styles = '';
    // This could be done in a more efficient way
    // but it would be a breaking change to do so
    // because it would change the ordering of styles
    Object.keys(emotion.caches.registered).forEach(function (className) {
      var indexOfClassName = classNames.indexOf(className);
      if (indexOfClassName !== -1) {
        var nameWithoutKey = classNames[indexOfClassName].substring(emotion.caches.key.length + 1);
        // $FlowFixMe
        styles += emotion.caches.inserted[nameWithoutKey];
      }
    });
    var prettyStyles = void 0;
    try {
      prettyStyles = css.stringify(css.parse(styles));
    } catch (e) {
      console.error(e);
      throw new Error('There was an error parsing css in jest-emotion: "' + styles + '"');
    }
    return prettyStyles;
  }

  return { test: test, print: print };
}