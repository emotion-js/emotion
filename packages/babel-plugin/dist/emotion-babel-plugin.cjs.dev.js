'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var _createForOfIteratorHelperLoose = require('@babel/runtime/helpers/createForOfIteratorHelperLoose')
var _extends = require('@babel/runtime/helpers/extends')
var _objectWithoutPropertiesLoose = require('@babel/runtime/helpers/objectWithoutPropertiesLoose')
var syntaxJsx = require('@babel/plugin-syntax-jsx')
var nodePath = require('path')
var sourceMap = require('source-map')
var convert = require('convert-source-map')
var findRoot = require('find-root')
var memoize = require('@emotion/memoize')
var hashString = require('@emotion/hash')
var escapeRegexp = require('escape-string-regexp')
var serialize = require('@emotion/serialize')
var stylis = require('stylis')
var helperModuleImports = require('@babel/helper-module-imports')
var babelPluginMacros = require('babel-plugin-macros')

function _interopDefault(e) {
  return e && e.__esModule ? e : { default: e }
}

var _createForOfIteratorHelperLoose__default = /*#__PURE__*/ _interopDefault(
  _createForOfIteratorHelperLoose
)
var _extends__default = /*#__PURE__*/ _interopDefault(_extends)
var _objectWithoutPropertiesLoose__default = /*#__PURE__*/ _interopDefault(
  _objectWithoutPropertiesLoose
)
var syntaxJsx__default = /*#__PURE__*/ _interopDefault(syntaxJsx)
var nodePath__default = /*#__PURE__*/ _interopDefault(nodePath)
var convert__default = /*#__PURE__*/ _interopDefault(convert)
var findRoot__default = /*#__PURE__*/ _interopDefault(findRoot)
var memoize__default = /*#__PURE__*/ _interopDefault(memoize)
var hashString__default = /*#__PURE__*/ _interopDefault(hashString)
var escapeRegexp__default = /*#__PURE__*/ _interopDefault(escapeRegexp)

var invalidClassNameCharacters = /[!"#$%&'()*+,./:;<=>?@[\]^`|}~{]/g

var sanitizeLabelPart = function sanitizeLabelPart(labelPart) {
  return labelPart.trim().replace(invalidClassNameCharacters, '-')
}

function getLabel(identifierName, labelFormat, filename) {
  if (!identifierName) return null
  var sanitizedName = sanitizeLabelPart(identifierName)

  if (!labelFormat) {
    return sanitizedName
  }

  if (typeof labelFormat === 'function') {
    return labelFormat({
      name: sanitizedName,
      path: filename,
    })
  }

  var parsedPath = nodePath__default['default'].parse(filename)
  var localDirname = nodePath__default['default'].basename(parsedPath.dir)
  var localFilename = parsedPath.name

  if (localFilename === 'index') {
    localFilename = localDirname
  }

  return labelFormat
    .replace(/\[local\]/gi, sanitizedName)
    .replace(/\[filename\]/gi, sanitizeLabelPart(localFilename))
    .replace(/\[dirname\]/gi, sanitizeLabelPart(localDirname))
}

function getLabelFromPath(path, state, t) {
  return getLabel(
    getIdentifierName(path, t),
    state.opts.labelFormat,
    state.file.opts.filename
  )
}

function getDeclaratorName(path, t) {
  // $FlowFixMe
  var parent = path.findParent(function (p) {
    return (
      p.isVariableDeclarator() ||
      p.isAssignmentExpression() ||
      p.isFunctionDeclaration() ||
      p.isFunctionExpression() ||
      p.isArrowFunctionExpression() ||
      p.isObjectProperty()
    )
  })

  if (!parent) {
    return ''
  } // we probably have a css call assigned to a variable
  // so we'll just return the variable name

  if (parent.isVariableDeclarator()) {
    if (t.isIdentifier(parent.node.id)) {
      return parent.node.id.name
    }

    return ''
  }

  if (parent.isAssignmentExpression()) {
    var left = parent.node.left

    if (t.isIdentifier(left)) {
      return left.name
    }

    if (t.isMemberExpression(left)) {
      var memberExpression = left
      var name = ''

      while (true) {
        if (!t.isIdentifier(memberExpression.property)) {
          return ''
        }

        name = '' + memberExpression.property.name + (name ? '-' + name : '')

        if (t.isIdentifier(memberExpression.object)) {
          return memberExpression.object.name + '-' + name
        }

        if (!t.isMemberExpression(memberExpression.object)) {
          return ''
        }

        memberExpression = memberExpression.object
      }
    }

    return ''
  } // we probably have an inline css prop usage

  if (parent.isFunctionDeclaration()) {
    return parent.node.id.name || ''
  } // we could also have an object property

  if (parent.isObjectProperty() && !parent.node.computed) {
    return parent.node.key.name
  }

  var variableDeclarator = parent.findParent(function (p) {
    return p.isVariableDeclarator()
  })

  if (!variableDeclarator) {
    return ''
  }

  return variableDeclarator.node.id.name
}

function getIdentifierName(path, t) {
  var classOrClassPropertyParent

  if (
    t.isObjectProperty(path.parentPath) &&
    path.parentPath.node.computed === false &&
    (t.isIdentifier(path.parentPath.node.key) ||
      t.isStringLiteral(path.parentPath.node.key))
  ) {
    return path.parentPath.node.key.name || path.parentPath.node.key.value
  }

  if (path) {
    // $FlowFixMe
    classOrClassPropertyParent = path.findParent(function (p) {
      return t.isClassProperty(p) || t.isClass(p)
    })
  }

  if (classOrClassPropertyParent) {
    if (
      t.isClassProperty(classOrClassPropertyParent) &&
      classOrClassPropertyParent.node.computed === false &&
      t.isIdentifier(classOrClassPropertyParent.node.key)
    ) {
      return classOrClassPropertyParent.node.key.name
    }

    if (
      t.isClass(classOrClassPropertyParent) &&
      classOrClassPropertyParent.node.id
    ) {
      return t.isIdentifier(classOrClassPropertyParent.node.id)
        ? classOrClassPropertyParent.node.id.name
        : ''
    }
  }

  var declaratorName = getDeclaratorName(path, t) // if the name starts with _ it was probably generated by babel so we should ignore it

  if (declaratorName.charAt(0) === '_') {
    return ''
  }

  return declaratorName
}

function getGeneratorOpts(file) {
  return file.opts.generatorOpts ? file.opts.generatorOpts : file.opts
}

function makeSourceMapGenerator(file) {
  var generatorOpts = getGeneratorOpts(file)
  var filename = generatorOpts.sourceFileName
  var generator = new sourceMap.SourceMapGenerator({
    file: filename,
    sourceRoot: generatorOpts.sourceRoot,
  })
  generator.setSourceContent(filename, file.code)
  return generator
}
function getSourceMap(offset, state) {
  var generator = makeSourceMapGenerator(state.file)
  var generatorOpts = getGeneratorOpts(state.file)

  if (
    generatorOpts.sourceFileName &&
    generatorOpts.sourceFileName !== 'unknown'
  ) {
    generator.addMapping({
      generated: {
        line: 1,
        column: 0,
      },
      source: generatorOpts.sourceFileName,
      original: offset,
    })
    return convert__default['default'].fromObject(generator).toComment({
      multiline: true,
    })
  }

  return ''
}

var hashArray = function hashArray(arr) {
  return hashString__default['default'](arr.join(''))
}

var unsafeRequire = require
var getPackageRootPath = memoize__default['default'](function (filename) {
  return findRoot__default['default'](filename)
})
var separator = new RegExp(
  escapeRegexp__default['default'](nodePath__default['default'].sep),
  'g'
)

var normalizePath = function normalizePath(path) {
  return nodePath__default['default'].normalize(path).replace(separator, '/')
}

function getTargetClassName(state, t) {
  if (state.emotionTargetClassNameCount === undefined) {
    state.emotionTargetClassNameCount = 0
  }

  var hasFilepath =
    state.file.opts.filename && state.file.opts.filename !== 'unknown'
  var filename = hasFilepath ? state.file.opts.filename : '' // normalize the file path to ignore folder structure
  // outside the current node project and arch-specific delimiters

  var moduleName = ''
  var rootPath = filename

  try {
    rootPath = getPackageRootPath(filename)
    moduleName = unsafeRequire(rootPath + '/package.json').name
  } catch (err) {}

  var finalPath =
    filename === rootPath ? 'root' : filename.slice(rootPath.length)
  var positionInFile = state.emotionTargetClassNameCount++
  var stuffToHash = [moduleName]

  if (finalPath) {
    stuffToHash.push(normalizePath(finalPath))
  } else {
    stuffToHash.push(state.file.code)
  }

  var stableClassName = 'e' + hashArray(stuffToHash) + positionInFile
  return stableClassName
}

// it's meant to simplify the most common cases so i don't want to make it especially complex
// also, this will be unnecessary when prepack is ready

function simplifyObject(node, t) {
  var finalString = ''

  for (var i = 0; i < node.properties.length; i++) {
    var _ref

    var property = node.properties[i]

    if (
      !t.isObjectProperty(property) ||
      property.computed ||
      (!t.isIdentifier(property.key) && !t.isStringLiteral(property.key)) ||
      (!t.isStringLiteral(property.value) &&
        !t.isNumericLiteral(property.value) &&
        !t.isObjectExpression(property.value))
    ) {
      return node
    }

    var key = property.key.name || property.key.value

    if (key === 'styles') {
      return node
    }

    if (t.isObjectExpression(property.value)) {
      var simplifiedChild = simplifyObject(property.value, t)

      if (!t.isStringLiteral(simplifiedChild)) {
        return node
      }

      finalString += key + '{' + simplifiedChild.value + '}'
      continue
    }

    var value = property.value.value
    finalString += serialize.serializeStyles([
      ((_ref = {}), (_ref[key] = value), _ref),
    ]).styles
  }

  return t.stringLiteral(finalString)
}

var isAutoInsertedRule = function isAutoInsertedRule(element) {
  if (element.type !== 'rule' || !element.parent) {
    return false
  }

  var parent = element

  do {
    parent = parent.parent
  } while (parent && parent.type !== 'rule')

  return !!parent && element.value === parent.value
}

var toInputTree = function toInputTree(elements, tree) {
  for (var i = 0; i < elements.length; i++) {
    var element = elements[i]
    var parent = element.parent,
      children = element.children

    if (!parent) {
      tree.push(element)
    } else if (!isAutoInsertedRule(element)) {
      parent.children.push(element)
    }

    if (Array.isArray(children)) {
      element.children = []
      toInputTree(children, tree)
    }
  }

  return tree
}

var stringifyTree = function stringifyTree(elements) {
  return elements
    .map(function (element) {
      switch (element.type) {
        case 'import':
        case 'decl':
          return element.value

        case 'comm':
          // When we encounter a standard multi-line CSS comment and it contains a '@'
          // character, we keep the comment. Some Stylis plugins, such as
          // the stylis-rtl via the cssjanus plugin, use this special comment syntax
          // to control behavior (such as: /* @noflip */). We can do this
          // with standard CSS comments because they will work with compression,
          // as opposed to non-standard single-line comments that will break compressed CSS.
          return element.props === '/' && element.value.includes('@')
            ? element.value
            : ''

        case 'rule':
          return (
            element.value.replace(/&\f/g, '&') +
            '{' +
            stringifyTree(element.children) +
            '}'
          )

        default: {
          return element.value + '{' + stringifyTree(element.children) + '}'
        }
      }
    })
    .join('')
}

var interleave = function interleave(strings, interpolations) {
  return interpolations.reduce(
    function (array, interp, i) {
      return array.concat([interp], strings[i + 1])
    },
    [strings[0]]
  )
}

function getDynamicMatches(str) {
  var re = /xxx(\d+):xxx/gm
  var match
  var matches = []

  while ((match = re.exec(str)) !== null) {
    // so that flow doesn't complain
    if (match !== null) {
      matches.push({
        value: match[0],
        p1: parseInt(match[1], 10),
        index: match.index,
      })
    }
  }

  return matches
}

function replacePlaceholdersWithExpressions(str, expressions, t) {
  var matches = getDynamicMatches(str)

  if (matches.length === 0) {
    if (str === '') {
      return []
    }

    return [t.stringLiteral(str)]
  }

  var strings = []
  var finalExpressions = []
  var cursor = 0
  matches.forEach(function (_ref, i) {
    var value = _ref.value,
      p1 = _ref.p1,
      index = _ref.index
    var preMatch = str.substring(cursor, index)
    cursor = cursor + preMatch.length + value.length

    if (!preMatch && i === 0) {
      strings.push(t.stringLiteral(''))
    } else {
      strings.push(t.stringLiteral(preMatch))
    }

    finalExpressions.push(expressions[p1])

    if (i === matches.length - 1) {
      strings.push(t.stringLiteral(str.substring(index + value.length)))
    }
  })
  return interleave(strings, finalExpressions).filter(function (node) {
    return node.value !== ''
  })
}

function createRawStringFromTemplateLiteral(quasi) {
  var strs = quasi.quasis.map(function (x) {
    return x.value.cooked
  })
  var src = strs
    .reduce(function (arr, str, i) {
      arr.push(str)

      if (i !== strs.length - 1) {
        arr.push('xxx' + i + ':xxx')
      }

      return arr
    }, [])
    .join('')
    .trim()
  return src
}

function minify(path, t) {
  var quasi = path.node.quasi
  var raw = createRawStringFromTemplateLiteral(quasi)
  var minified = stringifyTree(toInputTree(stylis.compile(raw), []))
  var expressions = replacePlaceholdersWithExpressions(
    minified,
    quasi.expressions || [],
    t
  )
  path.replaceWith(t.callExpression(path.node.tag, expressions))
}

// this only works correctly in modules, but we don't run on scripts anyway, so it's fine
// the difference is that in modules template objects are being cached per call site
function getTypeScriptMakeTemplateObjectPath(path) {
  if (path.node.arguments.length === 0) {
    return null
  }

  var firstArgPath = path.get('arguments')[0]

  if (
    firstArgPath.isLogicalExpression() &&
    firstArgPath.get('left').isIdentifier() &&
    firstArgPath.get('right').isAssignmentExpression() &&
    firstArgPath.get('right.right').isCallExpression() &&
    firstArgPath.get('right.right.callee').isIdentifier() &&
    firstArgPath.node.right.right.callee.name.includes('makeTemplateObject') &&
    firstArgPath.node.right.right.arguments.length === 2
  ) {
    return firstArgPath.get('right.right')
  }

  return null
} // this is only used to prevent appending strings/expressions to arguments incorectly
// we could push them to found array expressions, as we do it for TS-transpile output ¯\_(ツ)_/¯
// it seems overly complicated though - mainly because we'd also have to check against existing stuff of a particular type (source maps & labels)
// considering Babel double-transpilation as a valid use case seems rather far-fetched

function isTaggedTemplateTranspiledByBabel(path) {
  if (path.node.arguments.length === 0) {
    return false
  }

  var firstArgPath = path.get('arguments')[0]

  if (
    !firstArgPath.isCallExpression() ||
    !firstArgPath.get('callee').isIdentifier()
  ) {
    return false
  }

  var calleeName = firstArgPath.node.callee.name

  if (!calleeName.includes('templateObject')) {
    return false
  }

  var bindingPath = path.scope.getBinding(calleeName).path

  if (!bindingPath.isFunction()) {
    return false
  }

  var functionBody = bindingPath.get('body.body')

  if (!functionBody[0].isVariableDeclaration()) {
    return false
  }

  var declarationInit = functionBody[0].get('declarations')[0].get('init')

  if (!declarationInit.isCallExpression()) {
    return false
  }

  var declarationInitArguments = declarationInit.get('arguments')

  if (
    declarationInitArguments.length === 0 ||
    declarationInitArguments.length > 2 ||
    declarationInitArguments.some(function (argPath) {
      return !argPath.isArrayExpression()
    })
  ) {
    return false
  }

  return true
}

var appendStringReturningExpressionToArguments = function appendStringReturningExpressionToArguments(
  t,
  path,
  expression
) {
  var lastIndex = path.node.arguments.length - 1
  var last = path.node.arguments[lastIndex]

  if (t.isStringLiteral(last)) {
    if (typeof expression === 'string') {
      path.node.arguments[lastIndex].value += expression
    } else {
      path.node.arguments[lastIndex] = t.binaryExpression('+', last, expression)
    }
  } else {
    var makeTemplateObjectCallPath = getTypeScriptMakeTemplateObjectPath(path)

    if (makeTemplateObjectCallPath) {
      makeTemplateObjectCallPath.get('arguments').forEach(function (argPath) {
        var elements = argPath.get('elements')
        var lastElement = elements[elements.length - 1]

        if (typeof expression === 'string') {
          lastElement.replaceWith(
            t.stringLiteral(lastElement.node.value + expression)
          )
        } else {
          lastElement.replaceWith(
            t.binaryExpression('+', lastElement.node, t.cloneNode(expression))
          )
        }
      })
    } else if (!isTaggedTemplateTranspiledByBabel(path)) {
      if (typeof expression === 'string') {
        path.node.arguments.push(t.stringLiteral(expression))
      } else {
        path.node.arguments.push(expression)
      }
    }
  }
}
var joinStringLiterals = function joinStringLiterals(expressions, t) {
  return expressions.reduce(function (finalExpressions, currentExpression, i) {
    if (!t.isStringLiteral(currentExpression)) {
      finalExpressions.push(currentExpression)
    } else if (
      t.isStringLiteral(finalExpressions[finalExpressions.length - 1])
    ) {
      finalExpressions[finalExpressions.length - 1].value +=
        currentExpression.value
    } else {
      finalExpressions.push(currentExpression)
    }

    return finalExpressions
  }, [])
}

var CSS_OBJECT_STRINGIFIED_ERROR =
  "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop)."

function createNodeEnvConditional(t, production, development) {
  return t.conditionalExpression(
    t.binaryExpression(
      '===',
      t.memberExpression(
        t.memberExpression(t.identifier('process'), t.identifier('env')),
        t.identifier('NODE_ENV')
      ),
      t.stringLiteral('production')
    ),
    production,
    development
  )
}

var transformExpressionWithStyles = function transformExpressionWithStyles(
  _ref
) {
  var babel = _ref.babel,
    state = _ref.state,
    path = _ref.path,
    shouldLabel = _ref.shouldLabel,
    _ref$sourceMap = _ref.sourceMap,
    sourceMap = _ref$sourceMap === void 0 ? '' : _ref$sourceMap
  var autoLabel = state.opts.autoLabel || 'dev-only'
  var t = babel.types

  if (t.isTaggedTemplateExpression(path)) {
    if (
      !sourceMap &&
      state.emotionSourceMap &&
      path.node.quasi.loc !== undefined
    ) {
      sourceMap = getSourceMap(path.node.quasi.loc.start, state)
    }

    minify(path, t)
  }

  if (t.isCallExpression(path)) {
    var canAppendStrings = path.node.arguments.every(function (arg) {
      return arg.type !== 'SpreadElement'
    })
    path.get('arguments').forEach(function (node) {
      if (t.isObjectExpression(node)) {
        node.replaceWith(simplifyObject(node.node, t))
      }
    })
    path.node.arguments = joinStringLiterals(path.node.arguments, t)

    if (
      !sourceMap &&
      canAppendStrings &&
      state.emotionSourceMap &&
      path.node.loc !== undefined
    ) {
      sourceMap = getSourceMap(path.node.loc.start, state)
    }

    var label =
      shouldLabel && autoLabel !== 'never'
        ? getLabelFromPath(path, state, t)
        : null

    if (
      path.node.arguments.length === 1 &&
      t.isStringLiteral(path.node.arguments[0])
    ) {
      var cssString = path.node.arguments[0].value.replace(/;$/, '')
      var res = serialize.serializeStyles([
        '' +
          cssString +
          (label && autoLabel === 'always' ? ';label:' + label + ';' : ''),
      ])
      var prodNode = t.objectExpression([
        t.objectProperty(t.identifier('name'), t.stringLiteral(res.name)),
        t.objectProperty(t.identifier('styles'), t.stringLiteral(res.styles)),
      ])

      if (!state.emotionStringifiedCssId) {
        var uid = state.file.scope.generateUidIdentifier(
          '__EMOTION_STRINGIFIED_CSS_ERROR__'
        )
        state.emotionStringifiedCssId = uid
        var cssObjectToString = t.functionDeclaration(
          uid,
          [],
          t.blockStatement([
            t.returnStatement(t.stringLiteral(CSS_OBJECT_STRINGIFIED_ERROR)),
          ])
        )
        cssObjectToString._compact = true
        state.file.path.unshiftContainer('body', [cssObjectToString])
      }

      if (label && autoLabel === 'dev-only') {
        res = serialize.serializeStyles([cssString + ';label:' + label + ';'])
      }

      var devNode = t.objectExpression(
        [
          t.objectProperty(t.identifier('name'), t.stringLiteral(res.name)),
          t.objectProperty(t.identifier('styles'), t.stringLiteral(res.styles)),
          sourceMap &&
            t.objectProperty(t.identifier('map'), t.stringLiteral(sourceMap)),
          t.objectProperty(
            t.identifier('toString'),
            t.cloneNode(state.emotionStringifiedCssId)
          ),
        ].filter(Boolean)
      )
      return createNodeEnvConditional(t, prodNode, devNode)
    }

    if (canAppendStrings && label) {
      var labelString = ';label:' + label + ';'

      switch (autoLabel) {
        case 'dev-only': {
          var labelConditional = createNodeEnvConditional(
            t,
            t.stringLiteral(''),
            t.stringLiteral(labelString)
          )
          appendStringReturningExpressionToArguments(t, path, labelConditional)
          break
        }

        case 'always':
          appendStringReturningExpressionToArguments(t, path, labelString)
          break
      }
    }

    if (sourceMap) {
      var sourceMapConditional = createNodeEnvConditional(
        t,
        t.stringLiteral(''),
        t.stringLiteral(sourceMap)
      )
      appendStringReturningExpressionToArguments(t, path, sourceMapConditional)
    }
  }
}

var getKnownProperties = function getKnownProperties(t, node) {
  return new Set(
    node.properties
      .filter(function (n) {
        return t.isObjectProperty(n) && !n.computed
      })
      .map(function (n) {
        return t.isIdentifier(n.key) ? n.key.name : n.key.value
      })
  )
}

var getStyledOptions = function getStyledOptions(t, path, state) {
  var autoLabel = state.opts.autoLabel || 'dev-only'
  var args = path.node.arguments
  var optionsArgument = args.length >= 2 ? args[1] : null
  var properties = []
  var knownProperties =
    optionsArgument && t.isObjectExpression(optionsArgument)
      ? getKnownProperties(t, optionsArgument)
      : new Set()

  if (!knownProperties.has('target')) {
    properties.push(
      t.objectProperty(
        t.identifier('target'),
        t.stringLiteral(getTargetClassName(state))
      )
    )
  }

  var label = autoLabel !== 'never' ? getLabelFromPath(path, state, t) : null

  if (label && !knownProperties.has('label')) {
    properties.push(
      t.objectProperty(t.identifier('label'), t.stringLiteral(label))
    )
  }

  if (optionsArgument) {
    if (!t.isObjectExpression(optionsArgument)) {
      return t.callExpression(state.file.addHelper('extends'), [
        t.objectExpression([]),
        t.objectExpression(properties),
        optionsArgument,
      ])
    }

    properties.unshift.apply(properties, optionsArgument.properties)
  }

  return t.objectExpression(
    // $FlowFixMe
    properties
  )
}

function addImport(state, importSource, importedSpecifier, nameHint) {
  var cacheKey = ['import', importSource, importedSpecifier].join(':')

  if (state[cacheKey] === undefined) {
    var importIdentifier

    if (importedSpecifier === 'default') {
      importIdentifier = helperModuleImports.addDefault(
        state.file.path,
        importSource,
        {
          nameHint: nameHint,
        }
      )
    } else {
      importIdentifier = helperModuleImports.addNamed(
        state.file.path,
        importedSpecifier,
        importSource,
        {
          nameHint: nameHint,
        }
      )
    }

    state[cacheKey] = importIdentifier.name
  }

  return {
    type: 'Identifier',
    name: state[cacheKey],
  }
}

function createTransformerMacro(transformers, _ref) {
  var importSource = _ref.importSource
  var macro = babelPluginMacros.createMacro(function (_ref2) {
    var path = _ref2.path,
      source = _ref2.source,
      references = _ref2.references,
      state = _ref2.state,
      babel = _ref2.babel,
      isEmotionCall = _ref2.isEmotionCall

    if (!path) {
      path = state.file.scope.path.get('body').find(function (p) {
        return p.isImportDeclaration() && p.node.source.value === source
      })
    }

    if (/\/macro$/.test(source)) {
      path
        .get('source')
        .replaceWith(babel.types.stringLiteral(source.replace(/\/macro$/, '')))
    }

    if (!isEmotionCall) {
      state.emotionSourceMap = true
    }

    Object.keys(references).forEach(function (importSpecifierName) {
      if (transformers[importSpecifierName]) {
        references[importSpecifierName].reverse().forEach(function (reference) {
          var options
          var transformer

          if (Array.isArray(transformers[importSpecifierName])) {
            transformer = transformers[importSpecifierName][0]
            options = transformers[importSpecifierName][1]
          } else {
            transformer = transformers[importSpecifierName]
            options = {}
          }

          transformer({
            state: state,
            babel: babel,
            path: path,
            importSource: importSource,
            importSpecifierName: importSpecifierName,
            options: options,
            reference: reference,
          })
        })
      }
    })
    return {
      keepImports: true,
    }
  })
  macro.transformers = transformers
  return macro
}

var isAlreadyTranspiled = function isAlreadyTranspiled(path) {
  if (!path.isCallExpression()) {
    return false
  }

  var firstArgPath = path.get('arguments.0')

  if (!firstArgPath) {
    return false
  }

  if (!firstArgPath.isConditionalExpression()) {
    return false
  }

  var alternatePath = firstArgPath.get('alternate')

  if (!alternatePath.isObjectExpression()) {
    return false
  }

  var properties = new Set(
    alternatePath.get('properties').map(function (p) {
      return p.node.key.name
    })
  )
  return ['name', 'styles'].every(function (p) {
    return properties.has(p)
  })
}

var createEmotionTransformer = function createEmotionTransformer(isPure) {
  return function (_ref) {
    var state = _ref.state,
      babel = _ref.babel,
      importSource = _ref.importSource,
      reference = _ref.reference,
      importSpecifierName = _ref.importSpecifierName
    var path = reference.parentPath

    if (isAlreadyTranspiled(path)) {
      return
    }

    if (isPure) {
      path.addComment('leading', '#__PURE__')
    }

    var node = transformExpressionWithStyles({
      babel: babel,
      state: state,
      path: path,
      shouldLabel: true,
    })

    if (node) {
      path.node.arguments[0] = node
    }
  }
}

var transformers = {
  css: createEmotionTransformer(true),
  injectGlobal: createEmotionTransformer(false),
  keyframes: createEmotionTransformer(true),
}
var createEmotionMacro = function createEmotionMacro(importSource) {
  return createTransformerMacro(transformers, {
    importSource: importSource,
  })
}

var getReferencedSpecifier = function getReferencedSpecifier(
  path,
  specifierName
) {
  var specifiers = path.get('specifiers')
  return specifierName === 'default'
    ? specifiers.find(function (p) {
        return p.isImportDefaultSpecifier()
      })
    : specifiers.find(function (p) {
        return p.node.local.name === specifierName
      })
}

var styledTransformer = function styledTransformer(_ref) {
  var state = _ref.state,
    babel = _ref.babel,
    path = _ref.path,
    importSource = _ref.importSource,
    reference = _ref.reference,
    importSpecifierName = _ref.importSpecifierName,
    _ref$options = _ref.options,
    styledBaseImport = _ref$options.styledBaseImport,
    isWeb = _ref$options.isWeb
  var t = babel.types

  var getStyledIdentifier = function getStyledIdentifier() {
    if (
      !styledBaseImport ||
      (styledBaseImport[0] === importSource &&
        styledBaseImport[1] === importSpecifierName)
    ) {
      return importSpecifierName === 'default'
        ? t.identifier(
            path.get('specifiers').find(function (p) {
              return p.isImportDefaultSpecifier()
            }).node.local.name
          )
        : t.identifier(importSpecifierName)
    }

    if (path.node) {
      var referencedSpecifier = getReferencedSpecifier(
        path,
        importSpecifierName
      )

      if (referencedSpecifier) {
        referencedSpecifier.remove()
      }

      if (!path.get('specifiers').length) {
        path.remove()
      }
    }

    var baseImportSource = styledBaseImport[0],
      baseSpecifierName = styledBaseImport[1]
    return addImport(state, baseImportSource, baseSpecifierName, 'styled')
  }

  var isCall = false

  if (
    t.isMemberExpression(reference.parent) &&
    reference.parent.computed === false
  ) {
    isCall = true

    if (
      // checks if the first character is lowercase
      // becasue we don't want to transform the member expression if
      // it's in primitives/native
      reference.parent.property.name.charCodeAt(0) > 96
    ) {
      reference.parentPath.replaceWith(
        t.callExpression(getStyledIdentifier(), [
          t.stringLiteral(reference.parent.property.name),
        ])
      )
    } else {
      reference.replaceWith(getStyledIdentifier())
    }
  } else if (
    reference.parentPath &&
    reference.parentPath.parentPath &&
    t.isCallExpression(reference.parentPath) &&
    reference.parent.callee === reference.node
  ) {
    isCall = true
    reference.replaceWith(getStyledIdentifier())
  }

  if (reference.parentPath && reference.parentPath.parentPath) {
    var styledCallPath = reference.parentPath.parentPath
    var node = transformExpressionWithStyles({
      path: styledCallPath,
      state: state,
      babel: babel,
      shouldLabel: false,
    })

    if (node && isWeb) {
      // we know the argument length will be 1 since that's the only time we will have a node since it will be static
      styledCallPath.node.arguments[0] = node
    }
  }

  if (isCall) {
    reference.addComment('leading', '#__PURE__')

    if (isWeb) {
      reference.parentPath.node.arguments[1] = getStyledOptions(
        t,
        reference.parentPath,
        state
      )
    }
  }
}
var createStyledMacro = function createStyledMacro(_ref2) {
  var importSource = _ref2.importSource,
    _ref2$originalImportS = _ref2.originalImportSource,
    originalImportSource =
      _ref2$originalImportS === void 0 ? importSource : _ref2$originalImportS,
    _ref2$baseImportName = _ref2.baseImportName,
    baseImportName =
      _ref2$baseImportName === void 0 ? 'default' : _ref2$baseImportName,
    isWeb = _ref2.isWeb
  return createTransformerMacro(
    {
      default: [
        styledTransformer,
        {
          styledBaseImport: [importSource, baseImportName],
          isWeb: isWeb,
        },
      ],
    },
    {
      importSource: originalImportSource,
    }
  )
}

var transformCssCallExpression = function transformCssCallExpression(_ref) {
  var state = _ref.state,
    babel = _ref.babel,
    path = _ref.path,
    sourceMap = _ref.sourceMap,
    _ref$annotateAsPure = _ref.annotateAsPure,
    annotateAsPure = _ref$annotateAsPure === void 0 ? true : _ref$annotateAsPure
  var node = transformExpressionWithStyles({
    babel: babel,
    state: state,
    path: path,
    shouldLabel: true,
    sourceMap: sourceMap,
  })

  if (node) {
    path.replaceWith(node)
    path.hoist()
  } else if (annotateAsPure && path.isCallExpression()) {
    path.addComment('leading', '#__PURE__')
  }
}
var transformCsslessArrayExpression = function transformCsslessArrayExpression(
  _ref2
) {
  var state = _ref2.state,
    babel = _ref2.babel,
    path = _ref2.path
  var t = babel.types
  var expressionPath = path.get('value.expression')
  var sourceMap =
    state.emotionSourceMap && path.node.loc !== undefined
      ? getSourceMap(path.node.loc.start, state)
      : ''
  expressionPath.replaceWith(
    t.callExpression(
      // the name of this identifier doesn't really matter at all
      // it'll never appear in generated code
      t.identifier('___shouldNeverAppearCSS'),
      path.node.value.expression.elements
    )
  )
  transformCssCallExpression({
    babel: babel,
    state: state,
    path: expressionPath,
    sourceMap: sourceMap,
    annotateAsPure: false,
  })

  if (t.isCallExpression(expressionPath)) {
    expressionPath.replaceWith(t.arrayExpression(expressionPath.node.arguments))
  }
}
var transformCsslessObjectExpression = function transformCsslessObjectExpression(
  _ref3
) {
  var state = _ref3.state,
    babel = _ref3.babel,
    path = _ref3.path,
    cssImport = _ref3.cssImport
  var t = babel.types
  var expressionPath = path.get('value.expression')
  var sourceMap =
    state.emotionSourceMap && path.node.loc !== undefined
      ? getSourceMap(path.node.loc.start, state)
      : ''
  expressionPath.replaceWith(
    t.callExpression(
      // the name of this identifier doesn't really matter at all
      // it'll never appear in generated code
      t.identifier('___shouldNeverAppearCSS'),
      [path.node.value.expression]
    )
  )
  transformCssCallExpression({
    babel: babel,
    state: state,
    path: expressionPath,
    sourceMap: sourceMap,
  })

  if (t.isCallExpression(expressionPath)) {
    expressionPath
      .get('callee')
      .replaceWith(
        addImport(state, cssImport.importSource, cssImport.cssExport, 'css')
      )
  }
}

var cssTransformer = function cssTransformer(_ref4) {
  var state = _ref4.state,
    babel = _ref4.babel,
    reference = _ref4.reference
  transformCssCallExpression({
    babel: babel,
    state: state,
    path: reference.parentPath,
  })
}

var globalTransformer = function globalTransformer(_ref5) {
  var state = _ref5.state,
    babel = _ref5.babel,
    reference = _ref5.reference,
    importSource = _ref5.importSource,
    options = _ref5.options
  var t = babel.types

  if (
    !t.isJSXIdentifier(reference.node) ||
    !t.isJSXOpeningElement(reference.parentPath.node)
  ) {
    return
  }

  var stylesPropPath = reference.parentPath
    .get('attributes')
    .find(function (p) {
      return t.isJSXAttribute(p.node) && p.node.name.name === 'styles'
    })

  if (!stylesPropPath) {
    return
  }

  if (t.isJSXExpressionContainer(stylesPropPath.node.value)) {
    if (t.isArrayExpression(stylesPropPath.node.value.expression)) {
      transformCsslessArrayExpression({
        state: state,
        babel: babel,
        path: stylesPropPath,
      })
    } else if (t.isObjectExpression(stylesPropPath.node.value.expression)) {
      transformCsslessObjectExpression({
        state: state,
        babel: babel,
        path: stylesPropPath,
        cssImport:
          options.cssExport !== undefined
            ? {
                importSource: importSource,
                cssExport: options.cssExport,
              }
            : {
                importSource: '@emotion/react',
                cssExport: 'css',
              },
      })
    }
  }
}

var transformers$1 = {
  // this is an empty function because this transformer is never called
  // we don't run any transforms on `jsx` directly
  // instead we use it as a hint to enable css prop optimization
  jsx: function jsx() {},
  css: cssTransformer,
  Global: globalTransformer,
}
var coreMacro = createTransformerMacro(transformers$1, {
  importSource: '@emotion/react',
})

var getCssExport = function getCssExport(reexported, importSource, mapping) {
  var cssExport = Object.keys(mapping).find(function (localExportName) {
    var _mapping$localExportN = mapping[localExportName].canonicalImport,
      packageName = _mapping$localExportN[0],
      exportName = _mapping$localExportN[1]
    return packageName === '@emotion/react' && exportName === 'css'
  })

  if (!cssExport) {
    throw new Error(
      "You have specified that '" +
        importSource +
        "' re-exports '" +
        reexported +
        "' from '@emotion/react' but it doesn't also re-export 'css' from '@emotion/react', 'css' is necessary for certain optimisations, please re-export it from '" +
        importSource +
        "'"
    )
  }

  return cssExport
}

var webStyledMacro = createStyledMacro({
  importSource: '@emotion/styled/base',
  originalImportSource: '@emotion/styled',
  isWeb: true,
})
var nativeStyledMacro = createStyledMacro({
  importSource: '@emotion/native',
  originalImportSource: '@emotion/native',
  isWeb: false,
})
var primitivesStyledMacro = createStyledMacro({
  importSource: '@emotion/primitives',
  originalImportSource: '@emotion/primitives',
  isWeb: false,
})
var vanillaEmotionMacro = createEmotionMacro('@emotion/css')
var transformersSource = {
  '@emotion/css': transformers,
  '@emotion/react': transformers$1,
  '@emotion/styled': {
    default: [
      styledTransformer,
      {
        styledBaseImport: ['@emotion/styled/base', 'default'],
        isWeb: true,
      },
    ],
  },
  '@emotion/primitives': {
    default: [
      styledTransformer,
      {
        isWeb: false,
      },
    ],
  },
  '@emotion/native': {
    default: [
      styledTransformer,
      {
        isWeb: false,
      },
    ],
  },
}
var macros = {
  core: coreMacro,
  nativeStyled: nativeStyledMacro,
  primitivesStyled: primitivesStyledMacro,
  webStyled: webStyledMacro,
  vanillaEmotion: vanillaEmotionMacro,
}
var AUTO_LABEL_VALUES = ['dev-only', 'never', 'always']
function index(babel, options) {
  if (
    options.autoLabel !== undefined &&
    !AUTO_LABEL_VALUES.includes(options.autoLabel)
  ) {
    throw new Error(
      "The 'autoLabel' option must be undefined, or one of the following: " +
        AUTO_LABEL_VALUES.map(function (s) {
          return '"' + s + '"'
        }).join(', ')
    )
  }

  var t = babel.types
  return {
    name: '@emotion',
    inherits: syntaxJsx__default['default'],
    visitor: {
      ImportDeclaration: function ImportDeclaration(path, state) {
        var macro = state.pluginMacros[path.node.source.value] // most of this is from https://github.com/kentcdodds/babel-plugin-macros/blob/master/src/index.js

        if (macro === undefined) {
          return
        }

        if (t.isImportNamespaceSpecifier(path.node.specifiers[0])) {
          return
        }

        var imports = path.node.specifiers.map(function (s) {
          return {
            localName: s.local.name,
            importedName:
              s.type === 'ImportDefaultSpecifier' ? 'default' : s.imported.name,
          }
        })
        var shouldExit = false
        var hasReferences = false
        var referencePathsByImportName = imports.reduce(function (
          byName,
          _ref
        ) {
          var importedName = _ref.importedName,
            localName = _ref.localName
          var binding = path.scope.getBinding(localName)

          if (!binding) {
            shouldExit = true
            return byName
          }

          byName[importedName] = binding.referencePaths
          hasReferences = hasReferences || Boolean(byName[importedName].length)
          return byName
        },
        {})

        if (!hasReferences || shouldExit) {
          return
        }
        /**
         * Other plugins that run before babel-plugin-macros might use path.replace, where a path is
         * put into its own replacement. Apparently babel does not update the scope after such
         * an operation. As a remedy, the whole scope is traversed again with an empty "Identifier"
         * visitor - this makes the problem go away.
         *
         * See: https://github.com/kentcdodds/import-all.macro/issues/7
         */

        state.file.scope.path.traverse({
          Identifier: function Identifier() {},
        })
        macro({
          path: path,
          references: referencePathsByImportName,
          state: state,
          babel: babel,
          isEmotionCall: true,
          isBabelMacrosCall: true,
        })
      },
      Program: function Program(path, state) {
        var macros = {}
        var jsxReactImports = [
          {
            importSource: '@emotion/react',
            export: 'jsx',
            cssExport: 'css',
          },
        ]
        state.jsxReactImport = jsxReactImports[0]
        Object.keys(state.opts.importMap || {}).forEach(function (
          importSource
        ) {
          var value = state.opts.importMap[importSource]
          var transformers = {}
          Object.keys(value).forEach(function (localExportName) {
            var _value$localExportNam = value[localExportName],
              canonicalImport = _value$localExportNam.canonicalImport,
              options = _objectWithoutPropertiesLoose__default[
                'default'
              ](_value$localExportNam, ['canonicalImport'])

            var packageName = canonicalImport[0],
              exportName = canonicalImport[1]

            if (packageName === '@emotion/react' && exportName === 'jsx') {
              jsxReactImports.push({
                importSource: importSource,
                export: localExportName,
                cssExport: getCssExport('jsx', importSource, value),
              })
              return
            }

            var packageTransformers = transformersSource[packageName]

            if (packageTransformers === undefined) {
              throw new Error(
                "There is no transformer for the export '" +
                  exportName +
                  "' in '" +
                  packageName +
                  "'"
              )
            }

            var extraOptions

            if (packageName === '@emotion/react' && exportName === 'Global') {
              // this option is not supposed to be set in importMap
              extraOptions = {
                cssExport: getCssExport('Global', importSource, value),
              }
            } else if (
              packageName === '@emotion/styled' &&
              exportName === 'default'
            ) {
              // this is supposed to override defaultOptions value
              // and let correct value to be set if coming in options
              extraOptions = {
                styledBaseImport: undefined,
              }
            }

            var _ref2 = Array.isArray(packageTransformers[exportName]) // $FlowFixMe
                ? packageTransformers[exportName]
                : [packageTransformers[exportName]],
              exportTransformer = _ref2[0],
              defaultOptions = _ref2[1]

            transformers[localExportName] = [
              exportTransformer,
              _extends__default['default'](
                {},
                defaultOptions,
                extraOptions,
                options
              ),
            ]
          })
          macros[importSource] = createTransformerMacro(transformers, {
            importSource: importSource,
          })
        })
        state.pluginMacros = _extends__default['default'](
          {
            '@emotion/styled': webStyledMacro,
            '@emotion/react': coreMacro,
            '@emotion/primitives': primitivesStyledMacro,
            '@emotion/native': nativeStyledMacro,
            '@emotion/css': vanillaEmotionMacro,
          },
          macros
        )

        var _loop = function _loop() {
          var node = _step.value

          if (t.isImportDeclaration(node)) {
            var jsxReactImport = jsxReactImports.find(function (thing) {
              return (
                node.source.value === thing.importSource &&
                node.specifiers.some(function (x) {
                  return (
                    t.isImportSpecifier(x) &&
                    x.imported.name === thing['export']
                  )
                })
              )
            })

            if (jsxReactImport) {
              state.jsxReactImport = jsxReactImport
              return 'break'
            }
          }
        }

        for (
          var _iterator = _createForOfIteratorHelperLoose__default['default'](
              path.node.body
            ),
            _step;
          !(_step = _iterator()).done;

        ) {
          var _ret = _loop()

          if (_ret === 'break') break
        }

        if (state.opts.cssPropOptimization === false) {
          state.transformCssProp = false
        } else {
          state.transformCssProp = true
        }

        if (state.opts.sourceMap === false) {
          state.emotionSourceMap = false
        } else {
          state.emotionSourceMap = true
        }
      },
      JSXAttribute: function JSXAttribute(path, state) {
        if (path.node.name.name !== 'css' || !state.transformCssProp) {
          return
        }

        if (t.isJSXExpressionContainer(path.node.value)) {
          if (t.isArrayExpression(path.node.value.expression)) {
            transformCsslessArrayExpression({
              state: state,
              babel: babel,
              path: path,
            })
          } else if (t.isObjectExpression(path.node.value.expression)) {
            transformCsslessObjectExpression({
              state: state,
              babel: babel,
              path: path,
              cssImport: state.jsxReactImport,
            })
          }
        }
      },
      CallExpression: {
        exit: function exit(path, state) {
          try {
            if (
              path.node.callee &&
              path.node.callee.property &&
              path.node.callee.property.name === 'withComponent'
            ) {
              switch (path.node.arguments.length) {
                case 1:
                case 2: {
                  path.node.arguments[1] = getStyledOptions(t, path, state)
                }
              }
            }
          } catch (e) {
            throw path.buildCodeFrameError(e)
          }
        },
      },
    },
  }
}

exports.default = index
exports.macros = macros
