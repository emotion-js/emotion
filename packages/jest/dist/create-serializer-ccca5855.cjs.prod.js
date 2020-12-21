'use strict'

var _extends = require('@babel/runtime/helpers/extends'),
  _objectWithoutPropertiesLoose = require('@babel/runtime/helpers/objectWithoutPropertiesLoose'),
  _createForOfIteratorHelperLoose = require('@babel/runtime/helpers/createForOfIteratorHelperLoose'),
  prettify = require('@emotion/css-prettifier')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var _extends__default = _interopDefault(_extends),
  _objectWithoutPropertiesLoose__default = _interopDefault(
    _objectWithoutPropertiesLoose
  ),
  _createForOfIteratorHelperLoose__default = _interopDefault(
    _createForOfIteratorHelperLoose
  ),
  prettify__default = _interopDefault(prettify)

function defaultClassNameReplacer(className, index) {
  return 'emotion-' + index
}

var componentSelectorClassNamePattern = /^e[a-zA-Z0-9]+[0-9]+$/,
  replaceClassNames = function(
    classNames,
    styles,
    code,
    keys,
    classNameReplacer
  ) {
    void 0 === classNameReplacer &&
      (classNameReplacer = defaultClassNameReplacer)
    var index = 0,
      keyPattern = new RegExp('^(' + keys.join('|') + ')-')
    return classNames.reduce(function(acc, className) {
      if (
        keyPattern.test(className) ||
        componentSelectorClassNamePattern.test(className)
      ) {
        var escapedRegex = new RegExp(
          className.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&'),
          'g'
        )
        return acc.replace(escapedRegex, classNameReplacer(className, index++))
      }
      return acc
    }, styles + (styles ? '\n\n' : '') + code)
  },
  isBrowser = 'undefined' != typeof document

function last(arr) {
  return arr.length > 0 ? arr[arr.length - 1] : void 0
}

function flatMap(arr, iteratee) {
  var _ref
  return (_ref = []).concat.apply(_ref, arr.map(iteratee))
}

function findLast(arr, predicate) {
  for (var i = arr.length - 1; i >= 0; i--) if (predicate(arr[i])) return arr[i]
}

function findIndexFrom(arr, fromIndex, predicate) {
  for (var i = fromIndex; i < arr.length; i++) if (predicate(arr[i])) return i
  return -1
}

function getClassNames(selectors, classes) {
  return classes ? selectors.concat(classes.split(' ')) : selectors
}

function getClassNamesFromTestRenderer(selectors, _ref2) {
  var _ref2$props = _ref2.props,
    props = void 0 === _ref2$props ? {} : _ref2$props
  return getClassNames(selectors, props.className || props.class)
}

function shouldDive(node) {
  return 'function' == typeof node.dive && 'string' != typeof node.type()
}

function isTagWithClassName(node) {
  return node.prop('className') && 'string' == typeof node.type()
}

function findNodeWithClassName(node) {
  var found = node.findWhere(isTagWithClassName)
  return found.length ? found.first() : null
}

function getClassNameProp(node) {
  return (node && node.prop('className')) || ''
}

function getClassNamesFromEnzyme(selectors, node) {
  return getClassNames(
    selectors,
    getClassNameProp(
      findNodeWithClassName(shouldDive(node) ? node.dive() : node)
    )
  )
}

function getClassNamesFromCheerio(selectors, node) {
  return getClassNames(selectors, node.attr('class'))
}

function getClassNamesFromDOMElement(selectors, node) {
  return getClassNames(selectors, node.getAttribute('class'))
}

function isReactElement(val) {
  return (
    val.$$typeof === Symbol.for('react.test.json') ||
    val.$$typeof === Symbol.for('react.element')
  )
}

function isEmotionCssPropElementType(val) {
  return (
    val.$$typeof === Symbol.for('react.element') &&
    val.type.$$typeof === Symbol.for('react.forward_ref') &&
    'EmotionCssPropInternal' === val.type.displayName
  )
}

function isEmotionCssPropEnzymeElement(val) {
  return (
    val.$$typeof === Symbol.for('react.test.json') &&
    'EmotionCssPropInternal' === val.type
  )
}

var domElementPattern = /^((HTML|SVG)\w*)?Element$/

function isDOMElement(val) {
  return (
    1 === val.nodeType &&
    val.constructor &&
    val.constructor.name &&
    domElementPattern.test(val.constructor.name)
  )
}

function isEnzymeElement(val) {
  return 'function' == typeof val.findWhere
}

function isCheerioElement(val) {
  return '[cheerio object]' === val.cheerio
}

function getClassNamesFromNodes(nodes) {
  return nodes.reduce(function(selectors, node) {
    return isEnzymeElement(node)
      ? getClassNamesFromEnzyme(selectors, node)
      : isCheerioElement(node)
        ? getClassNamesFromCheerio(selectors, node)
        : isReactElement(node)
          ? getClassNamesFromTestRenderer(selectors, node)
          : getClassNamesFromDOMElement(selectors, node)
  }, [])
}

var keyframesPattern = /^@keyframes\s+(animation-[^{\s]+)+/,
  removeCommentPattern = /\/\*[\s\S]*?\*\//g,
  getElementRules = function(element) {
    var nonSpeedyRule = element.textContent
    return nonSpeedyRule
      ? [nonSpeedyRule]
      : element.sheet
        ? [].slice.call(element.sheet.cssRules).map(function(cssRule) {
            return cssRule.cssText
          })
        : []
  },
  getKeyframesMap = function(rules) {
    return rules.reduce(function(keyframes, rule) {
      var match = rule.match(keyframesPattern)
      if (null !== match) {
        var name = match[1]
        void 0 === keyframes[name] && (keyframes[name] = ''),
          (keyframes[name] += rule)
      }
      return keyframes
    }, {})
  }

function getStylesFromClassNames(classNames, elements) {
  if (!classNames.length) return ''
  var keys = getKeys(elements)
  if (!keys.length) return ''
  var targetClassName = classNames.find(function(className) {
      return /^e[a-z0-9]+$/.test(className)
    }),
    keyPattern = '(' + keys.join('|') + ')-',
    classNamesRegExp = new RegExp(
      targetClassName
        ? '^(' + keyPattern + '|' + targetClassName + ')'
        : '^' + keyPattern
    ),
    filteredClassNames = classNames.filter(function(className) {
      return classNamesRegExp.test(className)
    })
  if (!filteredClassNames.length) return ''
  var selectorPattern = new RegExp(
      '\\.(?:' +
        filteredClassNames
          .map(function(cls) {
            return '(' + cls + ')'
          })
          .join('|') +
        ')'
    ),
    rules = flatMap(elements, getElementRules),
    styles = rules
      .map(function(rule) {
        var match = rule.match(selectorPattern)
        return match ? [rule, findIndexFrom(match, 1, Boolean)] : null
      })
      .filter(Boolean)
      .sort(function(_ref3, _ref4) {
        _ref3[0]
        var classNameIndexA = _ref3[1]
        _ref4[0]
        return classNameIndexA - _ref4[1]
      })
      .map(function(_ref5) {
        return _ref5[0]
      })
      .join(''),
    keyframesMap = getKeyframesMap(rules),
    keyframeNameKeys = Object.keys(keyframesMap),
    keyframesStyles = ''
  if (keyframeNameKeys.length) {
    var keyframesNamePattern = new RegExp(keyframeNameKeys.join('|'), 'g'),
      keyframesNameCache = {},
      index = 0
    ;(styles = styles.replace(keyframesNamePattern, function(name) {
      return (
        void 0 === keyframesNameCache[name] &&
          ((keyframesNameCache[name] = 'animation-' + index++),
          (keyframesStyles += keyframesMap[name])),
        keyframesNameCache[name]
      )
    })),
      (keyframesStyles = keyframesStyles.replace(keyframesNamePattern, function(
        value
      ) {
        return keyframesNameCache[value]
      }))
  }
  return (keyframesStyles + styles).replace(removeCommentPattern, '')
}

function getStyleElements() {
  if (!isBrowser)
    throw new Error(
      'jest-emotion requires jsdom. See https://jestjs.io/docs/en/configuration#testenvironment-string for more information.'
    )
  return Array.from(document.querySelectorAll('style[data-emotion]'))
}

var unique = function(arr) {
  return Array.from(new Set(arr))
}

function getKeys(elements) {
  return unique(
    elements.map(function(element) {
      return element.getAttribute('data-emotion')
    })
  ).filter(Boolean)
}

function hasClassNames(classNames, selectors, target) {
  return selectors.some(function(selector) {
    if (!target) {
      var lastCls = last(selector.split(' '))
      return !!lastCls && classNames.includes(lastCls.slice(1))
    }
    return target instanceof RegExp
      ? target.test(selector)
      : selector.includes(target)
  })
}

function getMediaRules(rules, media) {
  return flatMap(
    rules.filter(function(rule) {
      return (
        '@media' === rule.type &&
        rule.value.replace(/\s/g, '').includes(media.replace(/\s/g, ''))
      )
    }),
    function(media) {
      return media.children
    }
  )
}

function isPrimitive(test) {
  return test !== Object(test)
}

function hasIntersection(left, right) {
  return left.some(function(value) {
    return right.includes(value)
  })
}

function getNodes(node, nodes) {
  if ((void 0 === nodes && (nodes = []), Array.isArray(node))) {
    for (
      var _step,
        _iterator = _createForOfIteratorHelperLoose__default.default(node);
      !(_step = _iterator()).done;

    ) {
      getNodes(_step.value, nodes)
    }
    return nodes
  }
  if (('object' == typeof node && nodes.push(node), node.children))
    for (
      var _step2,
        _iterator2 = _createForOfIteratorHelperLoose__default.default(
          node.children
        );
      !(_step2 = _iterator2()).done;

    ) {
      getNodes(_step2.value, nodes)
    }
  return nodes
}

function copyProps(target, source) {
  return Object.defineProperties(
    target,
    Object.getOwnPropertyDescriptors(source)
  )
}

function deepTransform(node, transform) {
  if (Array.isArray(node))
    return node.map(function(child) {
      return deepTransform(child, transform)
    })
  var transformed = transform(node)
  return transformed !== node && transformed.children
    ? copyProps(transformed, {
        children: flatMap(
          deepTransform(transformed.children, transform),
          function(id) {
            return id
          }
        )
      })
    : transformed
}

function getPrettyStylesFromClassNames(classNames, elements, indentation) {
  return prettify__default.default(
    getStylesFromClassNames(classNames, elements),
    indentation
  )
}

function filterEmotionProps(props) {
  void 0 === props && (props = {})
  var _props = props,
    rest = (_props.css,
    _props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__,
    _props.__EMOTION_LABEL_PLEASE_DO_NOT_USE__,
    _objectWithoutPropertiesLoose__default.default(_props, [
      'css',
      '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
      '__EMOTION_LABEL_PLEASE_DO_NOT_USE__'
    ]))
  return (rest.css = 'unknown styles'), rest
}

function isShallowEnzymeElement(element, classNames) {
  return !hasIntersection(
    classNames,
    flatMap(element.children || [], function(_ref) {
      var _ref$props = _ref.props
      return ((void 0 === _ref$props ? {} : _ref$props).className || '').split(
        ' '
      )
    }).filter(Boolean)
  )
}

var createConvertEmotionElements = function(keys, printer) {
  return function(node) {
    if (isPrimitive(node)) return node
    if (isEmotionCssPropEnzymeElement(node)) {
      var expectedClassNames = flatMap(
        (node.props.css.name || '').split(' '),
        function(cssClassName) {
          return keys.map(function(key) {
            return key + '-' + cssClassName
          })
        }
      )
      if (isShallowEnzymeElement(node, expectedClassNames)) {
        var _className = [node.props.className]
            .concat(expectedClassNames)
            .filter(Boolean)
            .join(' '),
          emotionType = node.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__,
          type = 'string' == typeof emotionType ? emotionType : emotionType.name
        return _extends__default.default({}, node, {
          props: filterEmotionProps(
            _extends__default.default({}, node.props, {
              className: _className
            })
          ),
          type: type
        })
      }
      return node.children
    }
    return isEmotionCssPropElementType(node)
      ? _extends__default.default({}, node, {
          props: filterEmotionProps(node.props),
          type: node.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__
        })
      : isReactElement(node)
        ? copyProps({}, node)
        : node
  }
}

function clean(node, classNames) {
  if (Array.isArray(node))
    for (
      var _step3,
        _iterator3 = _createForOfIteratorHelperLoose__default.default(node);
      !(_step3 = _iterator3()).done;

    ) {
      clean(_step3.value, classNames)
    }
  else {
    if (node.children)
      for (
        var _step4,
          _iterator4 = _createForOfIteratorHelperLoose__default.default(
            node.children
          );
        !(_step4 = _iterator4()).done;

      ) {
        clean(_step4.value, classNames)
      }
    if (node.props) {
      var _className2 = node.props.className
      if (_className2)
        hasIntersection(_className2.split(' '), classNames) &&
          delete node.props.css
      else delete node.props.className
    }
  }
}

function createSerializer(_temp) {
  var _ref2 = void 0 === _temp ? {} : _temp,
    classNameReplacer = _ref2.classNameReplacer,
    _ref2$DOMElements = _ref2.DOMElements,
    DOMElements = void 0 === _ref2$DOMElements || _ref2$DOMElements,
    cache = new WeakSet()
  return {
    test: function(val) {
      return (
        val &&
        !(function(val) {
          return cache.has(val)
        })(val) &&
        (isReactElement(val) || (DOMElements && isDOMElement(val)))
      )
    },
    serialize: function(val, config, indentation, depth, refs, printer) {
      var elements = getStyleElements(),
        keys = getKeys(elements),
        converted = deepTransform(val, createConvertEmotionElements(keys)),
        nodes = getNodes(converted),
        classNames = getClassNamesFromNodes(nodes),
        styles = getPrettyStylesFromClassNames(
          classNames,
          elements,
          config.indent
        )
      clean(converted, classNames), nodes.forEach(cache.add, cache)
      var printedVal = printer(converted, config, indentation, depth, refs)
      return (
        nodes.forEach(cache.delete, cache),
        replaceClassNames(
          classNames,
          styles,
          printedVal,
          keys,
          classNameReplacer
        )
      )
    }
  }
}

;(exports.createSerializer = createSerializer),
  (exports.findLast = findLast),
  (exports.getClassNamesFromNodes = getClassNamesFromNodes),
  (exports.getMediaRules = getMediaRules),
  (exports.getStyleElements = getStyleElements),
  (exports.getStylesFromClassNames = getStylesFromClassNames),
  (exports.hasClassNames = hasClassNames)
