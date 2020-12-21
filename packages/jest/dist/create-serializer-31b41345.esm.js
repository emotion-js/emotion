import _extends from '@babel/runtime/helpers/esm/extends'
import _objectWithoutPropertiesLoose from '@babel/runtime/helpers/esm/objectWithoutPropertiesLoose'
import prettify from '@emotion/css-prettifier'

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
      var _iterator = node,
        _isArray = Array.isArray(_iterator),
        _i = 0,
        _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();
      ;

    ) {
      var _ref

      if (_isArray) {
        if (_i >= _iterator.length) break
        _ref = _iterator[_i++]
      } else {
        _i = _iterator.next()
        if (_i.done) break
        _ref = _i.value
      }

      var child = _ref
      getNodes(child, nodes)
    }

    return nodes
  }

  if (typeof node === 'object') {
    nodes.push(node)
  }

  if (node.children) {
    for (
      var _iterator2 = node.children,
        _isArray2 = Array.isArray(_iterator2),
        _i2 = 0,
        _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();
      ;

    ) {
      var _ref2

      if (_isArray2) {
        if (_i2 >= _iterator2.length) break
        _ref2 = _iterator2[_i2++]
      } else {
        _i2 = _iterator2.next()
        if (_i2.done) break
        _ref2 = _i2.value
      }

      var _child = _ref2
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
  return prettify(getStylesFromClassNames(classNames, elements), indentation)
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
    rest = _objectWithoutPropertiesLoose(_props, [
      'css',
      '__EMOTION_TYPE_PLEASE_DO_NOT_USE__',
      '__EMOTION_LABEL_PLEASE_DO_NOT_USE__'
    ])

  rest.css = 'unknown styles'
  return rest
}

function isShallowEnzymeElement(element, classNames) {
  var delimiter = ' '
  var childClassNames = flatMap(element.children || [], function(_ref3) {
    var _ref3$props = _ref3.props,
      props = _ref3$props === void 0 ? {} : _ref3$props
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
        return _extends({}, node, {
          props: filterEmotionProps(
            _extends({}, node.props, {
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
      return _extends({}, node, {
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
      var _iterator3 = node,
        _isArray3 = Array.isArray(_iterator3),
        _i3 = 0,
        _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();
      ;

    ) {
      var _ref4

      if (_isArray3) {
        if (_i3 >= _iterator3.length) break
        _ref4 = _iterator3[_i3++]
      } else {
        _i3 = _iterator3.next()
        if (_i3.done) break
        _ref4 = _i3.value
      }

      var child = _ref4
      clean(child, classNames)
    }

    return
  }

  if (node.children) {
    for (
      var _iterator4 = node.children,
        _isArray4 = Array.isArray(_iterator4),
        _i4 = 0,
        _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();
      ;

    ) {
      var _ref5

      if (_isArray4) {
        if (_i4 >= _iterator4.length) break
        _ref5 = _iterator4[_i4++]
      } else {
        _i4 = _iterator4.next()
        if (_i4.done) break
        _ref5 = _i4.value
      }

      var _child2 = _ref5
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
  var _ref6 = _temp === void 0 ? {} : _temp,
    classNameReplacer = _ref6.classNameReplacer,
    _ref6$DOMElements = _ref6.DOMElements,
    DOMElements = _ref6$DOMElements === void 0 ? true : _ref6$DOMElements

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

export {
  getStylesFromClassNames as a,
  getStyleElements as b,
  createSerializer as c,
  getMediaRules as d,
  findLast as f,
  getClassNamesFromNodes as g,
  hasClassNames as h
}
