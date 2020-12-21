'use strict'

var _extends = require('@babel/runtime/helpers/extends')
var _objectWithoutPropertiesLoose = require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
var _createForOfIteratorHelperLoose = require('@babel/runtime/helpers/createForOfIteratorHelperLoose')
var prettify = require('@emotion/css-prettifier')

function _interopDefault(e) {
  return e && e.__esModule ? e : { default: e }
}

var _extends__default = /*#__PURE__*/ _interopDefault(_extends)
var _objectWithoutPropertiesLoose__default = /*#__PURE__*/ _interopDefault(
  _objectWithoutPropertiesLoose
)
var _createForOfIteratorHelperLoose__default = /*#__PURE__*/ _interopDefault(
  _createForOfIteratorHelperLoose
)
var prettify__default = /*#__PURE__*/ _interopDefault(prettify)

function defaultClassNameReplacer(className, index) {
  return 'emotion-' + index
}

var componentSelectorClassNamePattern = /^e[a-zA-Z0-9]+[0-9]+$/
var replaceClassNames = function replaceClassNames(
  classNames,
  styles,
  code,
  keys,
  classNameReplacer
) {
  if (classNameReplacer === void 0) {
    classNameReplacer = defaultClassNameReplacer
  }

  var index = 0
  var keyPattern = new RegExp('^(' + keys.join('|') + ')-')
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
  }, '' + styles + (styles ? '\n\n' : '') + code)
}

var isBrowser = typeof document !== 'undefined'

function last(arr) {
  return arr.length > 0 ? arr[arr.length - 1] : undefined
}

function flatMap(arr, iteratee) {
  var _ref

  return (_ref = []).concat.apply(_ref, arr.map(iteratee))
}
function findLast(arr, predicate) {
  for (var i = arr.length - 1; i >= 0; i--) {
    if (predicate(arr[i])) {
      return arr[i]
    }
  }
}
function findIndexFrom(arr, fromIndex, predicate) {
  for (var i = fromIndex; i < arr.length; i++) {
    if (predicate(arr[i])) {
      return i
    }
  }

  return -1
}

function getClassNames(selectors, classes) {
  return classes ? selectors.concat(classes.split(' ')) : selectors
}

function getClassNamesFromTestRenderer(selectors, _ref2) {
  var _ref2$props = _ref2.props,
    props = _ref2$props === void 0 ? {} : _ref2$props
  return getClassNames(selectors, props.className || props['class'])
}

function shouldDive(node) {
  return typeof node.dive === 'function' && typeof node.type() !== 'string'
}

function isTagWithClassName(node) {
  return node.prop('className') && typeof node.type() === 'string'
}

function findNodeWithClassName(node) {
  // Find the first node with a className prop
  var found = node.findWhere(isTagWithClassName)
  return found.length ? found.first() : null
}

function getClassNameProp(node) {
  return (node && node.prop('className')) || ''
}

function getClassNamesFromEnzyme(selectors, node) {
  // We need to dive in to get the className if we have a styled element from a shallow render
  var isShallow = shouldDive(node)
  var nodeWithClassName = findNodeWithClassName(isShallow ? node.dive() : node)
  return getClassNames(selectors, getClassNameProp(nodeWithClassName))
}

function getClassNamesFromCheerio(selectors, node) {
  var classes = node.attr('class')
  return getClassNames(selectors, classes)
}

function getClassNamesFromDOMElement(selectors, node) {
  return getClassNames(selectors, node.getAttribute('class'))
}

function isReactElement(val) {
  return (
    val.$$typeof === Symbol['for']('react.test.json') ||
    val.$$typeof === Symbol['for']('react.element')
  )
}
function isEmotionCssPropElementType(val) {
  return (
    val.$$typeof === Symbol['for']('react.element') &&
    val.type.$$typeof === Symbol['for']('react.forward_ref') &&
    val.type.displayName === 'EmotionCssPropInternal'
  )
}
function isEmotionCssPropEnzymeElement(val) {
  return (
    val.$$typeof === Symbol['for']('react.test.json') &&
    val.type === 'EmotionCssPropInternal'
  )
}
var domElementPattern = /^((HTML|SVG)\w*)?Element$/
function isDOMElement(val) {
  return (
    val.nodeType === 1 &&
    val.constructor &&
    val.constructor.name &&
    domElementPattern.test(val.constructor.name)
  )
}

function isEnzymeElement(val) {
  return typeof val.findWhere === 'function'
}

function isCheerioElement(val) {
  return val.cheerio === '[cheerio object]'
}

function getClassNamesFromNodes(nodes) {
  return nodes.reduce(function(selectors, node) {
    if (isEnzymeElement(node)) {
      return getClassNamesFromEnzyme(selectors, node)
    } else if (isCheerioElement(node)) {
      return getClassNamesFromCheerio(selectors, node)
    } else if (isReactElement(node)) {
      return getClassNamesFromTestRenderer(selectors, node)
    }

    return getClassNamesFromDOMElement(selectors, node)
  }, [])
}
var keyframesPattern = /^@keyframes\s+(animation-[^{\s]+)+/
var removeCommentPattern = /\/\*[\s\S]*?\*\//g

var getElementRules = function getElementRules(element) {
  var nonSpeedyRule = element.textContent

  if (nonSpeedyRule) {
    return [nonSpeedyRule]
  }

  if (!element.sheet) {
    return []
  } // $FlowFixMe - flow doesn't know about `cssRules` property

  return [].slice.call(element.sheet.cssRules).map(function(cssRule) {
    return cssRule.cssText
  })
}

var getKeyframesMap = function getKeyframesMap(rules) {
  return rules.reduce(function(keyframes, rule) {
    var match = rule.match(keyframesPattern)

    if (match !== null) {
      var name = match[1]

      if (keyframes[name] === undefined) {
        keyframes[name] = ''
      }

      keyframes[name] += rule
    }

    return keyframes
  }, {})
}

function getStylesFromClassNames(classNames, elements) {
  if (!classNames.length) {
    return ''
  }

  var keys = getKeys(elements)

  if (!keys.length) {
    return ''
  }

  var targetClassName = classNames.find(function(className) {
    return /^e[a-z0-9]+$/.test(className)
  })
  var keyPattern = '(' + keys.join('|') + ')-'
  var classNamesRegExp = new RegExp(
    targetClassName
      ? '^(' + keyPattern + '|' + targetClassName + ')'
      : '^' + keyPattern
  )
  var filteredClassNames = classNames.filter(function(className) {
    return classNamesRegExp.test(className)
  })

  if (!filteredClassNames.length) {
    return ''
  }

  var selectorPattern = new RegExp(
    '\\.(?:' +
      filteredClassNames
        .map(function(cls) {
          return '(' + cls + ')'
        })
        .join('|') +
      ')'
  )
  var rules = flatMap(elements, getElementRules)
  var styles = rules
    .map(function(rule) {
      var match = rule.match(selectorPattern)

      if (!match) {
        return null
      } // `selectorPattern` represents all emotion-generated class names
      // each possible class name is wrapped in a capturing group
      // and those groups appear in the same order as they appear in the DOM within class attributes
      // because we've gathered them from the DOM in such order
      // given that information we can sort matched rules based on the capturing group that has been matched
      // to end up with styles in a stable order

      var matchedCapturingGroupIndex = findIndexFrom(match, 1, Boolean)
      return [rule, matchedCapturingGroupIndex]
    })
    .filter(Boolean)
    .sort(function(_ref3, _ref4) {
      var ruleA = _ref3[0],
        classNameIndexA = _ref3[1]
      var ruleB = _ref4[0],
        classNameIndexB = _ref4[1]
      return classNameIndexA - classNameIndexB
    })
    .map(function(_ref5) {
      var rule = _ref5[0]
      return rule
    })
    .join('')
  var keyframesMap = getKeyframesMap(rules)
  var keyframeNameKeys = Object.keys(keyframesMap)
  var keyframesStyles = ''

  if (keyframeNameKeys.length) {
    var keyframesNamePattern = new RegExp(keyframeNameKeys.join('|'), 'g')
    var keyframesNameCache = {}
    var index = 0
    styles = styles.replace(keyframesNamePattern, function(name) {
      if (keyframesNameCache[name] === undefined) {
        keyframesNameCache[name] = 'animation-' + index++
        keyframesStyles += keyframesMap[name]
      }

      return keyframesNameCache[name]
    })
    keyframesStyles = keyframesStyles.replace(keyframesNamePattern, function(
      value
    ) {
      return keyframesNameCache[value]
    })
  }

  return (keyframesStyles + styles).replace(removeCommentPattern, '')
}
function getStyleElements() {
  if (!isBrowser) {
    throw new Error(
      'jest-emotion requires jsdom. See https://jestjs.io/docs/en/configuration#testenvironment-string for more information.'
    )
  }

  var elements = Array.from(document.querySelectorAll('style[data-emotion]')) // $FlowFixMe

  return elements
}

var unique = function unique(arr) {
  return Array.from(new Set(arr))
}

function getKeys(elements) {
  var keys = unique(
    elements.map(function(element) {
      return (
        // $FlowFixMe we know it exists since we query for elements with this attribute
        element.getAttribute('data-emotion')
      )
    })
  ).filter(Boolean)
  return keys
}
function hasClassNames(classNames, selectors, target) {
  // selectors is the classNames of specific css rule
  return selectors.some(function(selector) {
    // if no target, use className of the specific css rule and try to find it
    // in the list of received node classNames to make sure this css rule
    // applied for root element
    if (!target) {
      var lastCls = last(selector.split(' '))

      if (!lastCls) {
        return false
      }

      return classNames.includes(lastCls.slice(1))
    } // check if selector (className) of specific css rule match target

    return target instanceof RegExp
      ? target.test(selector)
      : selector.includes(target)
  })
}
function getMediaRules(rules, media) {
  return flatMap(
    rules.filter(function(rule) {
      if (rule.type !== '@media') {
        return false
      }

      return rule.value.replace(/\s/g, '').includes(media.replace(/\s/g, ''))
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
  if (nodes === void 0) {
    nodes = []
  }

  if (Array.isArray(node)) {
    for (
      var _iterator = _createForOfIteratorHelperLoose__default['default'](node),
        _step;
      !(_step = _iterator()).done;

    ) {
      var child = _step.value
      getNodes(child, nodes)
    }

    return nodes
  }

  if (typeof node === 'object') {
    nodes.push(node)
  }

  if (node.children) {
    for (
      var _iterator2 = _createForOfIteratorHelperLoose__default['default'](
          node.children
        ),
        _step2;
      !(_step2 = _iterator2()).done;

    ) {
      var _child = _step2.value
      getNodes(_child, nodes)
    }
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
  if (Array.isArray(node)) {
    return node.map(function(child) {
      return deepTransform(child, transform)
    })
  }

  var transformed = transform(node)

  if (transformed !== node && transformed.children) {
    return copyProps(transformed, {
      // flatMap to allow a child of <A><B /><C /></A> to be transformed to <B /><C />
      children: flatMap(
        deepTransform(transformed.children, transform),
        function(id) {
          return id
        }
      )
    })
  }

  return transformed
}

function getPrettyStylesFromClassNames(classNames, elements, indentation) {
  return prettify__default['default'](
    getStylesFromClassNames(classNames, elements),
    indentation
  )
}

function filterEmotionProps(props) {
  if (props === void 0) {
    props = {}
  }

  var _props = props,
    css = _props.css,
    __EMOTION_TYPE_PLEASE_DO_NOT_USE__ =
      _props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__,
    __EMOTION_LABEL_PLEASE_DO_NOT_USE__ =
      _props.__EMOTION_LABEL_PLEASE_DO_NOT_USE__,
    rest = _objectWithoutPropertiesLoose__default['default'](_props, [
      'css',
      '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
      '__EMOTION_LABEL_PLEASE_DO_NOT_USE__'
    ])

  rest.css = 'unknown styles'
  return rest
}

function isShallowEnzymeElement(element, classNames) {
  var delimiter = ' '
  var childClassNames = flatMap(element.children || [], function(_ref) {
    var _ref$props = _ref.props,
      props = _ref$props === void 0 ? {} : _ref$props
    return (props.className || '').split(delimiter)
  }).filter(Boolean)
  return !hasIntersection(classNames, childClassNames)
}

var createConvertEmotionElements = function createConvertEmotionElements(
  keys,
  printer
) {
  return function(node) {
    if (isPrimitive(node)) {
      return node
    }

    if (isEmotionCssPropEnzymeElement(node)) {
      var cssClassNames = (node.props.css.name || '').split(' ')
      var expectedClassNames = flatMap(cssClassNames, function(cssClassName) {
        return keys.map(function(key) {
          return key + '-' + cssClassName
        })
      }) // if this is a shallow element, we need to manufacture the className
      // since the underlying component is not rendered.

      if (isShallowEnzymeElement(node, expectedClassNames)) {
        var _className = [node.props.className]
          .concat(expectedClassNames)
          .filter(Boolean)
          .join(' ')

        var emotionType = node.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__ // emotionType will be a string for DOM elements

        var type =
          typeof emotionType === 'string' ? emotionType : emotionType.name
        return _extends__default['default']({}, node, {
          props: filterEmotionProps(
            _extends__default['default']({}, node.props, {
              className: _className
            })
          ),
          type: type
        })
      } else {
        return node.children
      }
    }

    if (isEmotionCssPropElementType(node)) {
      return _extends__default['default']({}, node, {
        props: filterEmotionProps(node.props),
        type: node.props.__EMOTION_TYPE_PLEASE_DO_NOT_USE__
      })
    }

    if (isReactElement(node)) {
      return copyProps({}, node)
    }

    return node
  }
}

function clean(node, classNames) {
  if (Array.isArray(node)) {
    for (
      var _iterator3 = _createForOfIteratorHelperLoose__default['default'](
          node
        ),
        _step3;
      !(_step3 = _iterator3()).done;

    ) {
      var child = _step3.value
      clean(child, classNames)
    }

    return
  }

  if (node.children) {
    for (
      var _iterator4 = _createForOfIteratorHelperLoose__default['default'](
          node.children
        ),
        _step4;
      !(_step4 = _iterator4()).done;

    ) {
      var _child2 = _step4.value
      clean(_child2, classNames)
    }
  }

  if (node.props) {
    var _className2 = node.props.className

    if (!_className2) {
      // if it's empty, remove it
      delete node.props.className
    } else {
      var hasKnownClass = hasIntersection(_className2.split(' '), classNames)

      if (hasKnownClass) {
        delete node.props.css
      }
    }
  }
}

function createSerializer(_temp) {
  var _ref2 = _temp === void 0 ? {} : _temp,
    classNameReplacer = _ref2.classNameReplacer,
    _ref2$DOMElements = _ref2.DOMElements,
    DOMElements = _ref2$DOMElements === void 0 ? true : _ref2$DOMElements

  var cache = new WeakSet()

  var isTransformed = function isTransformed(val) {
    return cache.has(val)
  }

  function serialize(val, config, indentation, depth, refs, printer) {
    var elements = getStyleElements()
    var keys = getKeys(elements)
    var convertEmotionElements = createConvertEmotionElements(keys)
    var converted = deepTransform(val, convertEmotionElements)
    var nodes = getNodes(converted)
    var classNames = getClassNamesFromNodes(nodes)
    var styles = getPrettyStylesFromClassNames(
      classNames,
      elements,
      config.indent
    )
    clean(converted, classNames)
    nodes.forEach(cache.add, cache)
    var printedVal = printer(converted, config, indentation, depth, refs)
    nodes.forEach(cache['delete'], cache)
    return replaceClassNames(
      classNames,
      styles,
      printedVal,
      keys,
      classNameReplacer
    )
  }

  return {
    test: function test(val) {
      return (
        val &&
        !isTransformed(val) &&
        (isReactElement(val) || (DOMElements && isDOMElement(val)))
      )
    },
    serialize: serialize
  }
}

exports.createSerializer = createSerializer
exports.findLast = findLast
exports.getClassNamesFromNodes = getClassNamesFromNodes
exports.getMediaRules = getMediaRules
exports.getStyleElements = getStyleElements
exports.getStylesFromClassNames = getStylesFromClassNames
exports.hasClassNames = hasClassNames
