'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var _createForOfIteratorHelperLoose = require('@babel/runtime/helpers/createForOfIteratorHelperLoose'),
  _extends = require('@babel/runtime/helpers/extends'),
  _objectWithoutPropertiesLoose = require('@babel/runtime/helpers/objectWithoutPropertiesLoose'),
  syntaxJsx = require('@babel/plugin-syntax-jsx'),
  nodePath = require('path'),
  sourceMap = require('source-map'),
  convert = require('convert-source-map'),
  findRoot = require('find-root'),
  memoize = require('@emotion/memoize'),
  hashString = require('@emotion/hash'),
  escapeRegexp = require('escape-string-regexp'),
  serialize = require('@emotion/serialize'),
  stylis = require('stylis'),
  helperModuleImports = require('@babel/helper-module-imports'),
  babelPluginMacros = require('babel-plugin-macros')

function _interopDefault(e) {
  return e && e.__esModule
    ? e
    : {
        default: e
      }
}

var _createForOfIteratorHelperLoose__default = _interopDefault(
    _createForOfIteratorHelperLoose
  ),
  _extends__default = _interopDefault(_extends),
  _objectWithoutPropertiesLoose__default = _interopDefault(
    _objectWithoutPropertiesLoose
  ),
  syntaxJsx__default = _interopDefault(syntaxJsx),
  nodePath__default = _interopDefault(nodePath),
  convert__default = _interopDefault(convert),
  findRoot__default = _interopDefault(findRoot),
  memoize__default = _interopDefault(memoize),
  hashString__default = _interopDefault(hashString),
  escapeRegexp__default = _interopDefault(escapeRegexp),
  invalidClassNameCharacters = /[!"#$%&'()*+,./:;<=>?@[\]^`|}~{]/g,
  sanitizeLabelPart = function(labelPart) {
    return labelPart.trim().replace(invalidClassNameCharacters, '-')
  }

function getLabel(identifierName, labelFormat, filename) {
  if (!identifierName) return null
  var sanitizedName = sanitizeLabelPart(identifierName)
  if (!labelFormat) return sanitizedName
  if ('function' == typeof labelFormat)
    return labelFormat({
      name: sanitizedName,
      path: filename
    })
  var parsedPath = nodePath__default.default.parse(filename),
    localDirname = nodePath__default.default.basename(parsedPath.dir),
    localFilename = parsedPath.name
  return (
    'index' === localFilename && (localFilename = localDirname),
    labelFormat
      .replace(/\[local\]/gi, sanitizedName)
      .replace(/\[filename\]/gi, sanitizeLabelPart(localFilename))
      .replace(/\[dirname\]/gi, sanitizeLabelPart(localDirname))
  )
}

function getLabelFromPath(path, state, t) {
  return getLabel(
    getIdentifierName(path, t),
    state.opts.labelFormat,
    state.file.opts.filename
  )
}

function getDeclaratorName(path, t) {
  var parent = path.findParent(function(p) {
    return (
      p.isVariableDeclarator() ||
      p.isAssignmentExpression() ||
      p.isFunctionDeclaration() ||
      p.isFunctionExpression() ||
      p.isArrowFunctionExpression() ||
      p.isObjectProperty()
    )
  })
  if (!parent) return ''
  if (parent.isVariableDeclarator())
    return t.isIdentifier(parent.node.id) ? parent.node.id.name : ''
  if (parent.isAssignmentExpression()) {
    var left = parent.node.left
    if (t.isIdentifier(left)) return left.name
    if (t.isMemberExpression(left))
      for (var memberExpression = left, name = ''; ; ) {
        if (!t.isIdentifier(memberExpression.property)) return ''
        if (
          ((name = memberExpression.property.name + (name ? '-' + name : '')),
          t.isIdentifier(memberExpression.object))
        )
          return memberExpression.object.name + '-' + name
        if (!t.isMemberExpression(memberExpression.object)) return ''
        memberExpression = memberExpression.object
      }
    return ''
  }
  if (parent.isFunctionDeclaration()) return parent.node.id.name || ''
  if (parent.isObjectProperty() && !parent.node.computed)
    return parent.node.key.name
  var variableDeclarator = parent.findParent(function(p) {
    return p.isVariableDeclarator()
  })
  return variableDeclarator ? variableDeclarator.node.id.name : ''
}

function getIdentifierName(path, t) {
  var classOrClassPropertyParent
  if (
    t.isObjectProperty(path.parentPath) &&
    !1 === path.parentPath.node.computed &&
    (t.isIdentifier(path.parentPath.node.key) ||
      t.isStringLiteral(path.parentPath.node.key))
  )
    return path.parentPath.node.key.name || path.parentPath.node.key.value
  if (
    (path &&
      (classOrClassPropertyParent = path.findParent(function(p) {
        return t.isClassProperty(p) || t.isClass(p)
      })),
    classOrClassPropertyParent)
  ) {
    if (
      t.isClassProperty(classOrClassPropertyParent) &&
      !1 === classOrClassPropertyParent.node.computed &&
      t.isIdentifier(classOrClassPropertyParent.node.key)
    )
      return classOrClassPropertyParent.node.key.name
    if (
      t.isClass(classOrClassPropertyParent) &&
      classOrClassPropertyParent.node.id
    )
      return t.isIdentifier(classOrClassPropertyParent.node.id)
        ? classOrClassPropertyParent.node.id.name
        : ''
  }
  var declaratorName = getDeclaratorName(path, t)
  return '_' === declaratorName.charAt(0) ? '' : declaratorName
}

function getGeneratorOpts(file) {
  return file.opts.generatorOpts ? file.opts.generatorOpts : file.opts
}

function makeSourceMapGenerator(file) {
  var generatorOpts = getGeneratorOpts(file),
    filename = generatorOpts.sourceFileName,
    generator = new sourceMap.SourceMapGenerator({
      file: filename,
      sourceRoot: generatorOpts.sourceRoot
    })
  return generator.setSourceContent(filename, file.code), generator
}

function getSourceMap(offset, state) {
  var generator = makeSourceMapGenerator(state.file),
    generatorOpts = getGeneratorOpts(state.file)
  return generatorOpts.sourceFileName &&
    'unknown' !== generatorOpts.sourceFileName
    ? (generator.addMapping({
        generated: {
          line: 1,
          column: 0
        },
        source: generatorOpts.sourceFileName,
        original: offset
      }),
      convert__default.default.fromObject(generator).toComment({
        multiline: !0
      }))
    : ''
}

var hashArray = function(arr) {
    return hashString__default.default(arr.join(''))
  },
  unsafeRequire = require,
  getPackageRootPath = memoize__default.default(function(filename) {
    return findRoot__default.default(filename)
  }),
  separator = new RegExp(
    escapeRegexp__default.default(nodePath__default.default.sep),
    'g'
  ),
  normalizePath = function(path) {
    return nodePath__default.default.normalize(path).replace(separator, '/')
  }

function getTargetClassName(state, t) {
  void 0 === state.emotionTargetClassNameCount &&
    (state.emotionTargetClassNameCount = 0)
  var filename =
      state.file.opts.filename && 'unknown' !== state.file.opts.filename
        ? state.file.opts.filename
        : '',
    moduleName = '',
    rootPath = filename
  try {
    ;(rootPath = getPackageRootPath(filename)),
      (moduleName = unsafeRequire(rootPath + '/package.json').name)
  } catch (err) {}
  var finalPath =
      filename === rootPath ? 'root' : filename.slice(rootPath.length),
    positionInFile = state.emotionTargetClassNameCount++,
    stuffToHash = [moduleName]
  return (
    finalPath
      ? stuffToHash.push(normalizePath(finalPath))
      : stuffToHash.push(state.file.code),
    'e' + hashArray(stuffToHash) + positionInFile
  )
}

function simplifyObject(node, t) {
  for (var finalString = '', i = 0; i < node.properties.length; i++) {
    var _ref,
      property = node.properties[i]
    if (
      !t.isObjectProperty(property) ||
      property.computed ||
      (!t.isIdentifier(property.key) && !t.isStringLiteral(property.key)) ||
      (!t.isStringLiteral(property.value) &&
        !t.isNumericLiteral(property.value) &&
        !t.isObjectExpression(property.value))
    )
      return node
    var key = property.key.name || property.key.value
    if ('styles' === key) return node
    if (t.isObjectExpression(property.value)) {
      var simplifiedChild = simplifyObject(property.value, t)
      if (!t.isStringLiteral(simplifiedChild)) return node
      finalString += key + '{' + simplifiedChild.value + '}'
    } else {
      var value = property.value.value
      finalString += serialize.serializeStyles([
        ((_ref = {}), (_ref[key] = value), _ref)
      ]).styles
    }
  }
  return t.stringLiteral(finalString)
}

var isAutoInsertedRule = function(element) {
    if ('rule' !== element.type || !element.parent) return !1
    var parent = element
    do {
      parent = parent.parent
    } while (parent && 'rule' !== parent.type)
    return !!parent && element.value === parent.value
  },
  toInputTree = function toInputTree(elements, tree) {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i],
        parent = element.parent,
        children = element.children
      parent
        ? isAutoInsertedRule(element) || parent.children.push(element)
        : tree.push(element),
        Array.isArray(children) &&
          ((element.children = []), toInputTree(children, tree))
    }
    return tree
  },
  stringifyTree = function stringifyTree(elements) {
    return elements
      .map(function(element) {
        switch (element.type) {
          case 'import':
          case 'decl':
            return element.value

          case 'comm':
            return '/' === element.props && element.value.includes('@')
              ? element.value
              : ''

          case 'rule':
            return (
              element.value.replace(/&\f/g, '&') +
              '{' +
              stringifyTree(element.children) +
              '}'
            )

          default:
            return element.value + '{' + stringifyTree(element.children) + '}'
        }
      })
      .join('')
  },
  interleave = function(strings, interpolations) {
    return interpolations.reduce(
      function(array, interp, i) {
        return array.concat([interp], strings[i + 1])
      },
      [strings[0]]
    )
  }

function getDynamicMatches(str) {
  for (
    var match, re = /xxx(\d+):xxx/gm, matches = [];
    null !== (match = re.exec(str));

  )
    null !== match &&
      matches.push({
        value: match[0],
        p1: parseInt(match[1], 10),
        index: match.index
      })
  return matches
}

function replacePlaceholdersWithExpressions(str, expressions, t) {
  var matches = getDynamicMatches(str)
  if (0 === matches.length) return '' === str ? [] : [t.stringLiteral(str)]
  var strings = [],
    finalExpressions = [],
    cursor = 0
  return (
    matches.forEach(function(_ref, i) {
      var value = _ref.value,
        p1 = _ref.p1,
        index = _ref.index,
        preMatch = str.substring(cursor, index)
      ;(cursor = cursor + preMatch.length + value.length),
        preMatch || 0 !== i
          ? strings.push(t.stringLiteral(preMatch))
          : strings.push(t.stringLiteral('')),
        finalExpressions.push(expressions[p1]),
        i === matches.length - 1 &&
          strings.push(t.stringLiteral(str.substring(index + value.length)))
    }),
    interleave(strings, finalExpressions).filter(function(node) {
      return '' !== node.value
    })
  )
}

function createRawStringFromTemplateLiteral(quasi) {
  var strs = quasi.quasis.map(function(x) {
    return x.value.cooked
  })
  return strs
    .reduce(function(arr, str, i) {
      return (
        arr.push(str),
        i !== strs.length - 1 && arr.push('xxx' + i + ':xxx'),
        arr
      )
    }, [])
    .join('')
    .trim()
}

function minify(path, t) {
  var quasi = path.node.quasi,
    raw = createRawStringFromTemplateLiteral(quasi),
    expressions = replacePlaceholdersWithExpressions(
      stringifyTree(toInputTree(stylis.compile(raw), [])),
      quasi.expressions || [],
      t
    )
  path.replaceWith(t.callExpression(path.node.tag, expressions))
}

function getTypeScriptMakeTemplateObjectPath(path) {
  if (0 === path.node.arguments.length) return null
  var firstArgPath = path.get('arguments')[0]
  return firstArgPath.isLogicalExpression() &&
    firstArgPath.get('left').isIdentifier() &&
    firstArgPath.get('right').isAssignmentExpression() &&
    firstArgPath.get('right.right').isCallExpression() &&
    firstArgPath.get('right.right.callee').isIdentifier() &&
    firstArgPath.node.right.right.callee.name.includes('makeTemplateObject') &&
    2 === firstArgPath.node.right.right.arguments.length
    ? firstArgPath.get('right.right')
    : null
}

function isTaggedTemplateTranspiledByBabel(path) {
  if (0 === path.node.arguments.length) return !1
  var firstArgPath = path.get('arguments')[0]
  if (
    !firstArgPath.isCallExpression() ||
    !firstArgPath.get('callee').isIdentifier()
  )
    return !1
  var calleeName = firstArgPath.node.callee.name
  if (!calleeName.includes('templateObject')) return !1
  var bindingPath = path.scope.getBinding(calleeName).path
  if (!bindingPath.isFunction()) return !1
  var functionBody = bindingPath.get('body.body')
  if (!functionBody[0].isVariableDeclaration()) return !1
  var declarationInit = functionBody[0].get('declarations')[0].get('init')
  if (!declarationInit.isCallExpression()) return !1
  var declarationInitArguments = declarationInit.get('arguments')
  return !(
    0 === declarationInitArguments.length ||
    declarationInitArguments.length > 2 ||
    declarationInitArguments.some(function(argPath) {
      return !argPath.isArrayExpression()
    })
  )
}

var appendStringReturningExpressionToArguments = function(t, path, expression) {
    var lastIndex = path.node.arguments.length - 1,
      last = path.node.arguments[lastIndex]
    if (t.isStringLiteral(last))
      'string' == typeof expression
        ? (path.node.arguments[lastIndex].value += expression)
        : (path.node.arguments[lastIndex] = t.binaryExpression(
            '+',
            last,
            expression
          ))
    else {
      var makeTemplateObjectCallPath = getTypeScriptMakeTemplateObjectPath(path)
      makeTemplateObjectCallPath
        ? makeTemplateObjectCallPath
            .get('arguments')
            .forEach(function(argPath) {
              var elements = argPath.get('elements'),
                lastElement = elements[elements.length - 1]
              'string' == typeof expression
                ? lastElement.replaceWith(
                    t.stringLiteral(lastElement.node.value + expression)
                  )
                : lastElement.replaceWith(
                    t.binaryExpression(
                      '+',
                      lastElement.node,
                      t.cloneNode(expression)
                    )
                  )
            })
        : isTaggedTemplateTranspiledByBabel(path) ||
          ('string' == typeof expression
            ? path.node.arguments.push(t.stringLiteral(expression))
            : path.node.arguments.push(expression))
    }
  },
  joinStringLiterals = function(expressions, t) {
    return expressions.reduce(function(finalExpressions, currentExpression, i) {
      return (
        t.isStringLiteral(currentExpression) &&
        t.isStringLiteral(finalExpressions[finalExpressions.length - 1])
          ? (finalExpressions[finalExpressions.length - 1].value +=
              currentExpression.value)
          : finalExpressions.push(currentExpression),
        finalExpressions
      )
    }, [])
  },
  CSS_OBJECT_STRINGIFIED_ERROR =
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

var transformExpressionWithStyles = function(_ref) {
    var babel = _ref.babel,
      state = _ref.state,
      path = _ref.path,
      shouldLabel = _ref.shouldLabel,
      _ref$sourceMap = _ref.sourceMap,
      sourceMap = void 0 === _ref$sourceMap ? '' : _ref$sourceMap,
      autoLabel = state.opts.autoLabel || 'dev-only',
      t = babel.types
    if (
      (t.isTaggedTemplateExpression(path) &&
        (!sourceMap &&
          state.emotionSourceMap &&
          void 0 !== path.node.quasi.loc &&
          (sourceMap = getSourceMap(path.node.quasi.loc.start, state)),
        minify(path, t)),
      t.isCallExpression(path))
    ) {
      var canAppendStrings = path.node.arguments.every(function(arg) {
        return 'SpreadElement' !== arg.type
      })
      path.get('arguments').forEach(function(node) {
        t.isObjectExpression(node) &&
          node.replaceWith(simplifyObject(node.node, t))
      }),
        (path.node.arguments = joinStringLiterals(path.node.arguments, t)),
        !sourceMap &&
          canAppendStrings &&
          state.emotionSourceMap &&
          void 0 !== path.node.loc &&
          (sourceMap = getSourceMap(path.node.loc.start, state))
      var label =
        shouldLabel && 'never' !== autoLabel
          ? getLabelFromPath(path, state, t)
          : null
      if (
        1 === path.node.arguments.length &&
        t.isStringLiteral(path.node.arguments[0])
      ) {
        var cssString = path.node.arguments[0].value.replace(/;$/, ''),
          res = serialize.serializeStyles([
            cssString +
              (label && 'always' === autoLabel ? ';label:' + label + ';' : '')
          ]),
          prodNode = t.objectExpression([
            t.objectProperty(t.identifier('name'), t.stringLiteral(res.name)),
            t.objectProperty(
              t.identifier('styles'),
              t.stringLiteral(res.styles)
            )
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
              t.returnStatement(t.stringLiteral(CSS_OBJECT_STRINGIFIED_ERROR))
            ])
          )
          ;(cssObjectToString._compact = !0),
            state.file.path.unshiftContainer('body', [cssObjectToString])
        }
        label &&
          'dev-only' === autoLabel &&
          (res = serialize.serializeStyles([
            cssString + ';label:' + label + ';'
          ]))
        var devNode = t.objectExpression(
          [
            t.objectProperty(t.identifier('name'), t.stringLiteral(res.name)),
            t.objectProperty(
              t.identifier('styles'),
              t.stringLiteral(res.styles)
            ),
            sourceMap &&
              t.objectProperty(t.identifier('map'), t.stringLiteral(sourceMap)),
            t.objectProperty(
              t.identifier('toString'),
              t.cloneNode(state.emotionStringifiedCssId)
            )
          ].filter(Boolean)
        )
        return createNodeEnvConditional(t, prodNode, devNode)
      }
      if (canAppendStrings && label) {
        var labelString = ';label:' + label + ';'
        switch (autoLabel) {
          case 'dev-only':
            var labelConditional = createNodeEnvConditional(
              t,
              t.stringLiteral(''),
              t.stringLiteral(labelString)
            )
            appendStringReturningExpressionToArguments(
              t,
              path,
              labelConditional
            )
            break

          case 'always':
            appendStringReturningExpressionToArguments(t, path, labelString)
        }
      }
      if (sourceMap) {
        var sourceMapConditional = createNodeEnvConditional(
          t,
          t.stringLiteral(''),
          t.stringLiteral(sourceMap)
        )
        appendStringReturningExpressionToArguments(
          t,
          path,
          sourceMapConditional
        )
      }
    }
  },
  getKnownProperties = function(t, node) {
    return new Set(
      node.properties
        .filter(function(n) {
          return t.isObjectProperty(n) && !n.computed
        })
        .map(function(n) {
          return t.isIdentifier(n.key) ? n.key.name : n.key.value
        })
    )
  },
  getStyledOptions = function(t, path, state) {
    var autoLabel = state.opts.autoLabel || 'dev-only',
      args = path.node.arguments,
      optionsArgument = args.length >= 2 ? args[1] : null,
      properties = [],
      knownProperties =
        optionsArgument && t.isObjectExpression(optionsArgument)
          ? getKnownProperties(t, optionsArgument)
          : new Set()
    knownProperties.has('target') ||
      properties.push(
        t.objectProperty(
          t.identifier('target'),
          t.stringLiteral(getTargetClassName(state))
        )
      )
    var label = 'never' !== autoLabel ? getLabelFromPath(path, state, t) : null
    if (
      (label &&
        !knownProperties.has('label') &&
        properties.push(
          t.objectProperty(t.identifier('label'), t.stringLiteral(label))
        ),
      optionsArgument)
    ) {
      if (!t.isObjectExpression(optionsArgument))
        return t.callExpression(state.file.addHelper('extends'), [
          t.objectExpression([]),
          t.objectExpression(properties),
          optionsArgument
        ])
      properties.unshift.apply(properties, optionsArgument.properties)
    }
    return t.objectExpression(properties)
  }

function addImport(state, importSource, importedSpecifier, nameHint) {
  var importIdentifier,
    cacheKey = ['import', importSource, importedSpecifier].join(':')
  void 0 === state[cacheKey] &&
    ((importIdentifier =
      'default' === importedSpecifier
        ? helperModuleImports.addDefault(state.file.path, importSource, {
            nameHint: nameHint
          })
        : helperModuleImports.addNamed(
            state.file.path,
            importedSpecifier,
            importSource,
            {
              nameHint: nameHint
            }
          )),
    (state[cacheKey] = importIdentifier.name))
  return {
    type: 'Identifier',
    name: state[cacheKey]
  }
}

function createTransformerMacro(transformers, _ref) {
  var importSource = _ref.importSource,
    macro = babelPluginMacros.createMacro(function(_ref2) {
      var path = _ref2.path,
        source = _ref2.source,
        references = _ref2.references,
        state = _ref2.state,
        babel = _ref2.babel,
        isEmotionCall = _ref2.isEmotionCall
      return (
        path ||
          (path = state.file.scope.path.get('body').find(function(p) {
            return p.isImportDeclaration() && p.node.source.value === source
          })),
        /\/macro$/.test(source) &&
          path
            .get('source')
            .replaceWith(
              babel.types.stringLiteral(source.replace(/\/macro$/, ''))
            ),
        isEmotionCall || (state.emotionSourceMap = !0),
        Object.keys(references).forEach(function(importSpecifierName) {
          transformers[importSpecifierName] &&
            references[importSpecifierName]
              .reverse()
              .forEach(function(reference) {
                var options, transformer
                Array.isArray(transformers[importSpecifierName])
                  ? ((transformer = transformers[importSpecifierName][0]),
                    (options = transformers[importSpecifierName][1]))
                  : ((transformer = transformers[importSpecifierName]),
                    (options = {})),
                  transformer({
                    state: state,
                    babel: babel,
                    path: path,
                    importSource: importSource,
                    importSpecifierName: importSpecifierName,
                    options: options,
                    reference: reference
                  })
              })
        }),
        {
          keepImports: !0
        }
      )
    })
  return (macro.transformers = transformers), macro
}

var isAlreadyTranspiled = function(path) {
    if (!path.isCallExpression()) return !1
    var firstArgPath = path.get('arguments.0')
    if (!firstArgPath) return !1
    if (!firstArgPath.isConditionalExpression()) return !1
    var alternatePath = firstArgPath.get('alternate')
    if (!alternatePath.isObjectExpression()) return !1
    var properties = new Set(
      alternatePath.get('properties').map(function(p) {
        return p.node.key.name
      })
    )
    return ['name', 'styles'].every(function(p) {
      return properties.has(p)
    })
  },
  createEmotionTransformer = function(isPure) {
    return function(_ref) {
      var state = _ref.state,
        babel = _ref.babel,
        reference = (_ref.importSource, _ref.reference),
        path = (_ref.importSpecifierName, reference.parentPath)
      if (!isAlreadyTranspiled(path)) {
        isPure && path.addComment('leading', '#__PURE__')
        var node = transformExpressionWithStyles({
          babel: babel,
          state: state,
          path: path,
          shouldLabel: !0
        })
        node && (path.node.arguments[0] = node)
      }
    }
  },
  transformers = {
    css: createEmotionTransformer(!0),
    injectGlobal: createEmotionTransformer(!1),
    keyframes: createEmotionTransformer(!0)
  },
  createEmotionMacro = function(importSource) {
    return createTransformerMacro(transformers, {
      importSource: importSource
    })
  },
  getReferencedSpecifier = function(path, specifierName) {
    var specifiers = path.get('specifiers')
    return 'default' === specifierName
      ? specifiers.find(function(p) {
          return p.isImportDefaultSpecifier()
        })
      : specifiers.find(function(p) {
          return p.node.local.name === specifierName
        })
  },
  styledTransformer = function(_ref) {
    var state = _ref.state,
      babel = _ref.babel,
      path = _ref.path,
      importSource = _ref.importSource,
      reference = _ref.reference,
      importSpecifierName = _ref.importSpecifierName,
      _ref$options = _ref.options,
      styledBaseImport = _ref$options.styledBaseImport,
      isWeb = _ref$options.isWeb,
      t = babel.types,
      getStyledIdentifier = function() {
        if (
          !styledBaseImport ||
          (styledBaseImport[0] === importSource &&
            styledBaseImport[1] === importSpecifierName)
        )
          return 'default' === importSpecifierName
            ? t.identifier(
                path.get('specifiers').find(function(p) {
                  return p.isImportDefaultSpecifier()
                }).node.local.name
              )
            : t.identifier(importSpecifierName)
        if (path.node) {
          var referencedSpecifier = getReferencedSpecifier(
            path,
            importSpecifierName
          )
          referencedSpecifier && referencedSpecifier.remove(),
            path.get('specifiers').length || path.remove()
        }
        var baseImportSource = styledBaseImport[0],
          baseSpecifierName = styledBaseImport[1]
        return addImport(state, baseImportSource, baseSpecifierName, 'styled')
      },
      isCall = !1
    if (
      (t.isMemberExpression(reference.parent) &&
      !1 === reference.parent.computed
        ? ((isCall = !0),
          reference.parent.property.name.charCodeAt(0) > 96
            ? reference.parentPath.replaceWith(
                t.callExpression(getStyledIdentifier(), [
                  t.stringLiteral(reference.parent.property.name)
                ])
              )
            : reference.replaceWith(getStyledIdentifier()))
        : reference.parentPath &&
          reference.parentPath.parentPath &&
          t.isCallExpression(reference.parentPath) &&
          reference.parent.callee === reference.node &&
          ((isCall = !0), reference.replaceWith(getStyledIdentifier())),
      reference.parentPath && reference.parentPath.parentPath)
    ) {
      var styledCallPath = reference.parentPath.parentPath,
        node = transformExpressionWithStyles({
          path: styledCallPath,
          state: state,
          babel: babel,
          shouldLabel: !1
        })
      node && isWeb && (styledCallPath.node.arguments[0] = node)
    }
    isCall &&
      (reference.addComment('leading', '#__PURE__'),
      isWeb &&
        (reference.parentPath.node.arguments[1] = getStyledOptions(
          t,
          reference.parentPath,
          state
        )))
  },
  createStyledMacro = function(_ref2) {
    var importSource = _ref2.importSource,
      _ref2$originalImportS = _ref2.originalImportSource,
      originalImportSource =
        void 0 === _ref2$originalImportS ? importSource : _ref2$originalImportS,
      _ref2$baseImportName = _ref2.baseImportName,
      baseImportName =
        void 0 === _ref2$baseImportName ? 'default' : _ref2$baseImportName,
      isWeb = _ref2.isWeb
    return createTransformerMacro(
      {
        default: [
          styledTransformer,
          {
            styledBaseImport: [importSource, baseImportName],
            isWeb: isWeb
          }
        ]
      },
      {
        importSource: originalImportSource
      }
    )
  },
  transformCssCallExpression = function(_ref) {
    var state = _ref.state,
      babel = _ref.babel,
      path = _ref.path,
      sourceMap = _ref.sourceMap,
      _ref$annotateAsPure = _ref.annotateAsPure,
      annotateAsPure = void 0 === _ref$annotateAsPure || _ref$annotateAsPure,
      node = transformExpressionWithStyles({
        babel: babel,
        state: state,
        path: path,
        shouldLabel: !0,
        sourceMap: sourceMap
      })
    node
      ? (path.replaceWith(node), path.hoist())
      : annotateAsPure &&
        path.isCallExpression() &&
        path.addComment('leading', '#__PURE__')
  },
  transformCsslessArrayExpression = function(_ref2) {
    var state = _ref2.state,
      babel = _ref2.babel,
      path = _ref2.path,
      t = babel.types,
      expressionPath = path.get('value.expression'),
      sourceMap =
        state.emotionSourceMap && void 0 !== path.node.loc
          ? getSourceMap(path.node.loc.start, state)
          : ''
    expressionPath.replaceWith(
      t.callExpression(
        t.identifier('___shouldNeverAppearCSS'),
        path.node.value.expression.elements
      )
    ),
      transformCssCallExpression({
        babel: babel,
        state: state,
        path: expressionPath,
        sourceMap: sourceMap,
        annotateAsPure: !1
      }),
      t.isCallExpression(expressionPath) &&
        expressionPath.replaceWith(
          t.arrayExpression(expressionPath.node.arguments)
        )
  },
  transformCsslessObjectExpression = function(_ref3) {
    var state = _ref3.state,
      babel = _ref3.babel,
      path = _ref3.path,
      cssImport = _ref3.cssImport,
      t = babel.types,
      expressionPath = path.get('value.expression'),
      sourceMap =
        state.emotionSourceMap && void 0 !== path.node.loc
          ? getSourceMap(path.node.loc.start, state)
          : ''
    expressionPath.replaceWith(
      t.callExpression(t.identifier('___shouldNeverAppearCSS'), [
        path.node.value.expression
      ])
    ),
      transformCssCallExpression({
        babel: babel,
        state: state,
        path: expressionPath,
        sourceMap: sourceMap
      }),
      t.isCallExpression(expressionPath) &&
        expressionPath
          .get('callee')
          .replaceWith(
            addImport(state, cssImport.importSource, cssImport.cssExport, 'css')
          )
  },
  cssTransformer = function(_ref4) {
    var state = _ref4.state,
      babel = _ref4.babel,
      reference = _ref4.reference
    transformCssCallExpression({
      babel: babel,
      state: state,
      path: reference.parentPath
    })
  },
  globalTransformer = function(_ref5) {
    var state = _ref5.state,
      babel = _ref5.babel,
      reference = _ref5.reference,
      importSource = _ref5.importSource,
      options = _ref5.options,
      t = babel.types
    if (
      t.isJSXIdentifier(reference.node) &&
      t.isJSXOpeningElement(reference.parentPath.node)
    ) {
      var stylesPropPath = reference.parentPath
        .get('attributes')
        .find(function(p) {
          return t.isJSXAttribute(p.node) && 'styles' === p.node.name.name
        })
      stylesPropPath &&
        t.isJSXExpressionContainer(stylesPropPath.node.value) &&
        (t.isArrayExpression(stylesPropPath.node.value.expression)
          ? transformCsslessArrayExpression({
              state: state,
              babel: babel,
              path: stylesPropPath
            })
          : t.isObjectExpression(stylesPropPath.node.value.expression) &&
            transformCsslessObjectExpression({
              state: state,
              babel: babel,
              path: stylesPropPath,
              cssImport:
                void 0 !== options.cssExport
                  ? {
                      importSource: importSource,
                      cssExport: options.cssExport
                    }
                  : {
                      importSource: '@emotion/react',
                      cssExport: 'css'
                    }
            }))
    }
  },
  transformers$1 = {
    jsx: function() {},
    css: cssTransformer,
    Global: globalTransformer
  },
  coreMacro = createTransformerMacro(transformers$1, {
    importSource: '@emotion/react'
  }),
  getCssExport = function(reexported, importSource, mapping) {
    var cssExport = Object.keys(mapping).find(function(localExportName) {
      var _mapping$localExportN = mapping[localExportName].canonicalImport,
        packageName = _mapping$localExportN[0],
        exportName = _mapping$localExportN[1]
      return '@emotion/react' === packageName && 'css' === exportName
    })
    if (!cssExport)
      throw new Error(
        "You have specified that '" +
          importSource +
          "' re-exports '" +
          reexported +
          "' from '@emotion/react' but it doesn't also re-export 'css' from '@emotion/react', 'css' is necessary for certain optimisations, please re-export it from '" +
          importSource +
          "'"
      )
    return cssExport
  },
  webStyledMacro = createStyledMacro({
    importSource: '@emotion/styled/base',
    originalImportSource: '@emotion/styled',
    isWeb: !0
  }),
  nativeStyledMacro = createStyledMacro({
    importSource: '@emotion/native',
    originalImportSource: '@emotion/native',
    isWeb: !1
  }),
  primitivesStyledMacro = createStyledMacro({
    importSource: '@emotion/primitives',
    originalImportSource: '@emotion/primitives',
    isWeb: !1
  }),
  vanillaEmotionMacro = createEmotionMacro('@emotion/css'),
  transformersSource = {
    '@emotion/css': transformers,
    '@emotion/react': transformers$1,
    '@emotion/styled': {
      default: [
        styledTransformer,
        {
          styledBaseImport: ['@emotion/styled/base', 'default'],
          isWeb: !0
        }
      ]
    },
    '@emotion/primitives': {
      default: [
        styledTransformer,
        {
          isWeb: !1
        }
      ]
    },
    '@emotion/native': {
      default: [
        styledTransformer,
        {
          isWeb: !1
        }
      ]
    }
  },
  macros = {
    core: coreMacro,
    nativeStyled: nativeStyledMacro,
    primitivesStyled: primitivesStyledMacro,
    webStyled: webStyledMacro,
    vanillaEmotion: vanillaEmotionMacro
  },
  AUTO_LABEL_VALUES = ['dev-only', 'never', 'always']

function index(babel, options) {
  if (
    void 0 !== options.autoLabel &&
    !AUTO_LABEL_VALUES.includes(options.autoLabel)
  )
    throw new Error(
      "The 'autoLabel' option must be undefined, or one of the following: " +
        AUTO_LABEL_VALUES.map(function(s) {
          return '"' + s + '"'
        }).join(', ')
    )
  var t = babel.types
  return {
    name: '@emotion',
    inherits: syntaxJsx__default.default,
    visitor: {
      ImportDeclaration: function(path, state) {
        var macro = state.pluginMacros[path.node.source.value]
        if (
          void 0 !== macro &&
          !t.isImportNamespaceSpecifier(path.node.specifiers[0])
        ) {
          var imports = path.node.specifiers.map(function(s) {
              return {
                localName: s.local.name,
                importedName:
                  'ImportDefaultSpecifier' === s.type
                    ? 'default'
                    : s.imported.name
              }
            }),
            shouldExit = !1,
            hasReferences = !1,
            referencePathsByImportName = imports.reduce(function(byName, _ref) {
              var importedName = _ref.importedName,
                localName = _ref.localName,
                binding = path.scope.getBinding(localName)
              return binding
                ? ((byName[importedName] = binding.referencePaths),
                  (hasReferences =
                    hasReferences || Boolean(byName[importedName].length)),
                  byName)
                : ((shouldExit = !0), byName)
            }, {})
          hasReferences &&
            !shouldExit &&
            (state.file.scope.path.traverse({
              Identifier: function() {}
            }),
            macro({
              path: path,
              references: referencePathsByImportName,
              state: state,
              babel: babel,
              isEmotionCall: !0,
              isBabelMacrosCall: !0
            }))
        }
      },
      Program: function(path, state) {
        var macros = {},
          jsxReactImports = [
            {
              importSource: '@emotion/react',
              export: 'jsx',
              cssExport: 'css'
            }
          ]
        ;(state.jsxReactImport = jsxReactImports[0]),
          Object.keys(state.opts.importMap || {}).forEach(function(
            importSource
          ) {
            var value = state.opts.importMap[importSource],
              transformers = {}
            Object.keys(value).forEach(function(localExportName) {
              var _value$localExportNam = value[localExportName],
                canonicalImport = _value$localExportNam.canonicalImport,
                options = _objectWithoutPropertiesLoose__default.default(
                  _value$localExportNam,
                  ['canonicalImport']
                ),
                packageName = canonicalImport[0],
                exportName = canonicalImport[1]
              if ('@emotion/react' !== packageName || 'jsx' !== exportName) {
                var extraOptions,
                  packageTransformers = transformersSource[packageName]
                if (void 0 === packageTransformers)
                  throw new Error(
                    "There is no transformer for the export '" +
                      exportName +
                      "' in '" +
                      packageName +
                      "'"
                  )
                '@emotion/react' === packageName && 'Global' === exportName
                  ? (extraOptions = {
                      cssExport: getCssExport('Global', importSource, value)
                    })
                  : '@emotion/styled' === packageName &&
                    'default' === exportName &&
                    (extraOptions = {
                      styledBaseImport: void 0
                    })
                var _ref2 = Array.isArray(packageTransformers[exportName])
                    ? packageTransformers[exportName]
                    : [packageTransformers[exportName]],
                  exportTransformer = _ref2[0],
                  defaultOptions = _ref2[1]
                transformers[localExportName] = [
                  exportTransformer,
                  _extends__default.default(
                    {},
                    defaultOptions,
                    extraOptions,
                    options
                  )
                ]
              } else
                jsxReactImports.push({
                  importSource: importSource,
                  export: localExportName,
                  cssExport: getCssExport('jsx', importSource, value)
                })
            }),
              (macros[importSource] = createTransformerMacro(transformers, {
                importSource: importSource
              }))
          }),
          (state.pluginMacros = _extends__default.default(
            {
              '@emotion/styled': webStyledMacro,
              '@emotion/react': coreMacro,
              '@emotion/primitives': primitivesStyledMacro,
              '@emotion/native': nativeStyledMacro,
              '@emotion/css': vanillaEmotionMacro
            },
            macros
          ))
        for (
          var _step,
            _loop = function() {
              var node = _step.value
              if (t.isImportDeclaration(node)) {
                var jsxReactImport = jsxReactImports.find(function(thing) {
                  return (
                    node.source.value === thing.importSource &&
                    node.specifiers.some(function(x) {
                      return (
                        t.isImportSpecifier(x) &&
                        x.imported.name === thing.export
                      )
                    })
                  )
                })
                if (jsxReactImport)
                  return (state.jsxReactImport = jsxReactImport), 'break'
              }
            },
            _iterator = _createForOfIteratorHelperLoose__default.default(
              path.node.body
            );
          !(_step = _iterator()).done;

        ) {
          if ('break' === _loop()) break
        }
        !1 === state.opts.cssPropOptimization
          ? (state.transformCssProp = !1)
          : (state.transformCssProp = !0),
          !1 === state.opts.sourceMap
            ? (state.emotionSourceMap = !1)
            : (state.emotionSourceMap = !0)
      },
      JSXAttribute: function(path, state) {
        'css' === path.node.name.name &&
          state.transformCssProp &&
          t.isJSXExpressionContainer(path.node.value) &&
          (t.isArrayExpression(path.node.value.expression)
            ? transformCsslessArrayExpression({
                state: state,
                babel: babel,
                path: path
              })
            : t.isObjectExpression(path.node.value.expression) &&
              transformCsslessObjectExpression({
                state: state,
                babel: babel,
                path: path,
                cssImport: state.jsxReactImport
              }))
      },
      CallExpression: {
        exit: function(path, state) {
          try {
            if (
              path.node.callee &&
              path.node.callee.property &&
              'withComponent' === path.node.callee.property.name
            )
              switch (path.node.arguments.length) {
                case 1:
                case 2:
                  path.node.arguments[1] = getStyledOptions(t, path, state)
              }
          } catch (e) {
            throw path.buildCodeFrameError(e)
          }
        }
      }
    }
  }
}

;(exports.default = index), (exports.macros = macros)
