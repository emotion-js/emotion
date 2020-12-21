'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var sheet = require('@emotion/sheet'),
  stylis = require('stylis'),
  weakMemoize = require('@emotion/weak-memoize'),
  memoize = require('@emotion/memoize')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var weakMemoize__default = _interopDefault(weakMemoize),
  memoize__default = _interopDefault(memoize),
  last = function(arr) {
    return arr.length ? arr[arr.length - 1] : null
  },
  toRules = function(parsed, points) {
    var index = -1,
      character = 44
    do {
      switch (stylis.token(character)) {
        case 0:
          38 === character && 12 === stylis.peek() && (points[index] = 1),
            (parsed[index] += stylis.identifier(stylis.position - 1))
          break

        case 2:
          parsed[index] += stylis.delimit(character)
          break

        case 4:
          if (44 === character) {
            ;(parsed[++index] = 58 === stylis.peek() ? '&\f' : ''),
              (points[index] = parsed[index].length)
            break
          }

        default:
          parsed[index] += stylis.from(character)
      }
    } while ((character = stylis.next()))
    return parsed
  },
  getRules = function(value, points) {
    return stylis.dealloc(toRules(stylis.alloc(value), points))
  },
  fixedElements = new WeakMap(),
  compat = function(element) {
    if ('rule' === element.type && element.parent && element.length) {
      for (
        var value = element.value,
          parent = element.parent,
          isImplicitRule =
            element.column === parent.column && element.line === parent.line;
        'rule' !== parent.type;

      )
        if (!(parent = parent.parent)) return
      if (
        (1 !== element.props.length ||
          58 === value.charCodeAt(0) ||
          fixedElements.get(parent)) &&
        !isImplicitRule
      ) {
        fixedElements.set(element, !0)
        for (
          var points = [],
            rules = getRules(value, points),
            parentRules = parent.props,
            i = 0,
            k = 0;
          i < rules.length;
          i++
        )
          for (var j = 0; j < parentRules.length; j++, k++)
            element.props[k] = points[i]
              ? rules[i].replace(/&\f/g, parentRules[j])
              : parentRules[j] + ' ' + rules[i]
      }
    }
  },
  removeLabel = function(element) {
    if ('decl' === element.type) {
      var value = element.value
      108 === value.charCodeAt(0) &&
        98 === value.charCodeAt(2) &&
        ((element.return = ''), (element.value = ''))
    }
  },
  ignoreFlag =
    'emotion-disable-server-rendering-unsafe-selector-warning-please-do-not-use-this-the-warning-exists-for-a-reason',
  isIgnoringComment = function(element) {
    return (
      !!element &&
      'comm' === element.type &&
      element.children.indexOf(ignoreFlag) > -1
    )
  },
  createUnsafeSelectorsAlarm = function(cache) {
    return function(element, index, children) {
      if ('rule' === element.type) {
        var unsafePseudoClasses = element.value.match(
          /(:first|:nth|:nth-last)-child/g
        )
        if (unsafePseudoClasses && !0 !== cache.compat) {
          var prevElement = index > 0 ? children[index - 1] : null
          if (prevElement && isIgnoringComment(last(prevElement.children)))
            return
          unsafePseudoClasses.forEach(function(unsafePseudoClass) {
            console.error(
              'The pseudo class "' +
                unsafePseudoClass +
                '" is potentially unsafe when doing server-side rendering. Try changing it to "' +
                unsafePseudoClass.split('-child')[0] +
                '-of-type".'
            )
          })
        }
      }
    }
  },
  isImportRule = function(element) {
    return (
      105 === element.type.charCodeAt(1) && 64 === element.type.charCodeAt(0)
    )
  },
  isPrependedWithRegularRules = function(index, children) {
    for (var i = index - 1; i >= 0; i--)
      if (!isImportRule(children[i])) return !0
    return !1
  },
  nullifyElement = function(element) {
    ;(element.type = ''),
      (element.value = ''),
      (element.return = ''),
      (element.children = ''),
      (element.props = '')
  },
  incorrectImportAlarm = function(element, index, children) {
    isImportRule(element) &&
      (element.parent
        ? (console.error(
            "`@import` rules can't be nested inside other rules. Please move it to the top level and put it before regular rules. Keep in mind that they can only be used within global styles."
          ),
          nullifyElement(element))
        : isPrependedWithRegularRules(index, children) &&
          (console.error(
            "`@import` rules can't be after other rules. Please put your `@import` rules before your other rules."
          ),
          nullifyElement(element)))
  },
  isBrowser = 'undefined' != typeof document,
  getServerStylisCache = isBrowser
    ? void 0
    : weakMemoize__default.default(function() {
        return memoize__default.default(function() {
          var cache = {}
          return function(name) {
            return cache[name]
          }
        })
      }),
  defaultStylisPlugins = [stylis.prefixer],
  createCache = function(options) {
    var key = options.key
    if (isBrowser && 'css' === key) {
      var ssrStyles = document.querySelectorAll(
        'style[data-emotion]:not([data-s])'
      )
      Array.prototype.forEach.call(ssrStyles, function(node) {
        document.head.appendChild(node), node.setAttribute('data-s', '')
      })
    }
    var stylisPlugins = options.stylisPlugins || defaultStylisPlugins
    var container,
      _insert,
      inserted = {},
      nodesToHydrate = []
    isBrowser &&
      ((container = options.container || document.head),
      Array.prototype.forEach.call(
        document.querySelectorAll('style[data-emotion]'),
        function(node) {
          var attrib = node.getAttribute('data-emotion').split(' ')
          if (attrib[0] === key) {
            for (var i = 1; i < attrib.length; i++) inserted[attrib[i]] = !0
            nodesToHydrate.push(node)
          }
        }
      ))
    var omnipresentPlugins = [compat, removeLabel]
    if (isBrowser) {
      var currentSheet,
        finalizingPlugins = [
          stylis.stringify,
          stylis.rulesheet(function(rule) {
            currentSheet.insert(rule)
          })
        ],
        serializer = stylis.middleware(
          omnipresentPlugins.concat(stylisPlugins, finalizingPlugins)
        )
      _insert = function(selector, serialized, sheet, shouldCache) {
        var styles
        ;(currentSheet = sheet),
          (styles = selector
            ? selector + '{' + serialized.styles + '}'
            : serialized.styles),
          stylis.serialize(stylis.compile(styles), serializer),
          shouldCache && (cache.inserted[serialized.name] = !0)
      }
    } else {
      var _finalizingPlugins = [stylis.stringify],
        _serializer = stylis.middleware(
          omnipresentPlugins.concat(stylisPlugins, _finalizingPlugins)
        ),
        serverStylisCache = getServerStylisCache(stylisPlugins)(key),
        getRules = function(selector, serialized) {
          var styles,
            name = serialized.name
          return (
            void 0 === serverStylisCache[name] &&
              (serverStylisCache[name] = ((styles = selector
                ? selector + '{' + serialized.styles + '}'
                : serialized.styles),
              stylis.serialize(stylis.compile(styles), _serializer))),
            serverStylisCache[name]
          )
        }
      _insert = function(selector, serialized, sheet, shouldCache) {
        var name = serialized.name,
          rules = getRules(selector, serialized)
        return void 0 === cache.compat
          ? (shouldCache && (cache.inserted[name] = !0), rules)
          : shouldCache
            ? void (cache.inserted[name] = rules)
            : rules
      }
    }
    var cache = {
      key: key,
      sheet: new sheet.StyleSheet({
        key: key,
        container: container,
        nonce: options.nonce,
        speedy: options.speedy,
        prepend: options.prepend
      }),
      nonce: options.nonce,
      inserted: inserted,
      registered: {},
      insert: _insert
    }
    return cache.sheet.hydrate(nodesToHydrate), cache
  }

exports.default = createCache
