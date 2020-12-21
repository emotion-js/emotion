'use strict'

Object.defineProperty(exports, '__esModule', {
  value: !0
})

var importFromEmotion = {
    meta: {
      fixable: 'code'
    },
    create: function(context) {
      return {
        ImportDeclaration: function(node) {
          'react-emotion' === node.source.value &&
            node.specifiers.some(function(x) {
              return 'ImportDefaultSpecifier' !== x.type
            }) &&
            context.report({
              node: node.source,
              message:
                "emotion's exports should be imported directly from emotion rather than from react-emotion",
              fix: function(fixer) {
                if ('ImportNamespaceSpecifier' !== node.specifiers[0].type)
                  return 'ImportDefaultSpecifier' === node.specifiers[0].type
                    ? fixer.replaceText(
                        node,
                        'import ' +
                          node.specifiers[0].local.name +
                          " from '@emotion/styled';\nimport { " +
                          node.specifiers
                            .filter(function(x) {
                              return 'ImportSpecifier' === x.type
                            })
                            .map(function(x) {
                              return x.local.name === x.imported.name
                                ? x.local.name
                                : x.imported.name + ' as ' + x.local.name
                            })
                            .join(', ') +
                          " } from 'emotion';"
                      )
                    : fixer.replaceText(node.source, "'emotion'")
              }
            })
        }
      }
    }
  },
  noVanilla = {
    meta: {
      fixable: 'code'
    },
    create: function(context) {
      return {
        ImportDeclaration: function(node) {
          '@emotion/css' === node.source.value &&
            context.report({
              node: node.source,
              message: 'Vanilla emotion should not be used'
            })
        }
      }
    }
  }

function isStringStyle(node) {
  return (
    ('MemberExpression' === node.tag.type &&
      'styled' === node.tag.object.name) ||
    ('CallExpression' === node.tag.type && 'styled' === node.tag.callee.name)
  )
}

function isObjectStyle(node) {
  return (
    ('MemberExpression' === node.callee.type &&
      'styled' === node.callee.object.name) ||
    ('CallExpression' === node.callee.type &&
      'styled' === node.callee.callee.name)
  )
}

var MSG_PREFER_STRING_STYLE = 'Styles should be written using strings.',
  MSG_PREFER_OBJECT_STYLE = 'Styles should be written using objects.',
  MSG_PREFER_WRAPPING_WITH_CSS =
    'Prefer wrapping your string styles with `css` call.',
  checkCssPropExpressionPreferringObject = function checkCssPropExpressionPreferringObject(
    context,
    node
  ) {
    switch (node.type) {
      case 'ArrayExpression':
        return void node.elements.forEach(function(element) {
          return checkCssPropExpressionPreferringObject(context, element)
        })

      case 'CallExpression':
      case 'TaggedTemplateExpression':
        return void context.report({
          node: node,
          message: MSG_PREFER_OBJECT_STYLE
        })

      case 'Literal':
        if ('string' != typeof node.value) return
        context.report({
          node: node,
          message: MSG_PREFER_OBJECT_STYLE
        })
    }
  },
  createPreferredObjectVisitor = function(context) {
    return {
      TaggedTemplateExpression: function(node) {
        isStringStyle(node) &&
          context.report({
            node: node,
            message: MSG_PREFER_OBJECT_STYLE
          })
      },
      JSXAttribute: function(node) {
        if ('css' === node.name.name)
          switch (node.value.type) {
            case 'Literal':
              if ('string' != typeof node.value.value) return
              return void context.report({
                node: node.value,
                message: MSG_PREFER_OBJECT_STYLE
              })

            case 'JSXExpressionContainer':
              checkCssPropExpressionPreferringObject(
                context,
                node.value.expression
              )
          }
      }
    }
  },
  checkCssPropExpressionPreferringString = function checkCssPropExpressionPreferringString(
    context,
    node
  ) {
    switch (node.type) {
      case 'ArrayExpression':
        return void node.elements.forEach(function(element) {
          return checkCssPropExpressionPreferringString(context, element)
        })

      case 'ObjectExpression':
        return void context.report({
          node: node,
          message: MSG_PREFER_STRING_STYLE
        })

      case 'Literal':
        if ('string' != typeof node.value) return
        context.report({
          node: node,
          message: MSG_PREFER_WRAPPING_WITH_CSS
        })
    }
  },
  createPreferredStringVisitor = function(context) {
    return {
      CallExpression: function(node) {
        isObjectStyle(node) &&
          context.report({
            node: node,
            message: MSG_PREFER_STRING_STYLE
          })
      },
      JSXAttribute: function(node) {
        if ('css' === node.name.name)
          switch (node.value.type) {
            case 'Literal':
              if ('string' != typeof node.value.value) return
              return void context.report({
                node: node.value,
                message: MSG_PREFER_WRAPPING_WITH_CSS
              })

            case 'JSXExpressionContainer':
              checkCssPropExpressionPreferringString(
                context,
                node.value.expression
              )
          }
      }
    }
  },
  syntaxPreference = {
    meta: {
      docs: {
        description: 'Choose between string or object styles',
        category: 'Stylistic Issues',
        recommended: !1
      },
      fixable: null,
      schema: [
        {
          enum: ['string', 'object']
        }
      ]
    },
    create: function(context) {
      switch (context.options[0]) {
        case 'object':
          return createPreferredObjectVisitor(context)

        case 'string':
          return createPreferredStringVisitor(context)

        default:
          return {}
      }
    }
  },
  styledImport = {
    meta: {
      fixable: 'code'
    },
    create: function(context) {
      return {
        ImportDeclaration: function(node) {
          if ('react-emotion' === node.source.value) {
            context.report({
              node: node.source,
              message: 'styled should be imported from @emotion/styled',
              fix:
                1 === node.specifiers.length &&
                'ImportDefaultSpecifier' === node.specifiers[0].type
                  ? function(fixer) {
                      return fixer.replaceText(node.source, "'@emotion/styled'")
                    }
                  : void 0
            })
          }
        }
      }
    }
  },
  JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/,
  jsxImport = {
    meta: {
      fixable: 'code'
    },
    create: function(context) {
      return {
        JSXAttribute: function(node) {
          if ('css' === node.name.name) {
            var hasJsxImport = !1,
              emotionCoreNode = null,
              local = null,
              sourceCode = context.getSourceCode()
            sourceCode.ast.body.forEach(function(x) {
              if (
                'ImportDeclaration' === x.type &&
                ('@emotion/react' === x.source.value ||
                  '@emotion/core' === x.source.value)
              )
                if (
                  ((emotionCoreNode = x),
                  1 === x.specifiers.length &&
                    'ImportNamespaceSpecifier' === x.specifiers[0].type)
                )
                  (hasJsxImport = !0),
                    (local = x.specifiers[0].local.name + '.jsx')
                else {
                  var jsxSpecifier = x.specifiers.find(function(x) {
                    return (
                      'ImportSpecifier' === x.type && 'jsx' === x.imported.name
                    )
                  })
                  jsxSpecifier &&
                    ((hasJsxImport = !0), (local = jsxSpecifier.local.name))
                }
            })
            var hasSetPragma = !1
            context.settings.react &&
              'jsx' === context.settings.react.pragma &&
              (hasSetPragma = !0)
            var pragma = sourceCode.getAllComments().find(function(node) {
                return JSX_ANNOTATION_REGEX.test(node.value)
              }),
              match = pragma && pragma.value.match(JSX_ANNOTATION_REGEX)
            if (
              (match &&
                (match[1] === local || (!local && 'jsx' === match[1])) &&
                (hasSetPragma = !0),
              hasJsxImport && hasSetPragma)
            ) {
              if (
                'JSXExpressionContainer' === node.value.type &&
                'TemplateLiteral' === node.value.expression.type
              ) {
                var cssSpecifier = emotionCoreNode.specifiers.find(function(x) {
                  return 'css' === x.imported.name
                })
                context.report({
                  node: node,
                  message:
                    'Template literals should be replaced with tagged template literals using `css` when using the css prop',
                  fix: function(fixer) {
                    if (cssSpecifier)
                      return fixer.insertTextBefore(
                        node.value.expression,
                        cssSpecifier.local.name
                      )
                    var lastSpecifier =
                      emotionCoreNode.specifiers[
                        emotionCoreNode.specifiers.length - 1
                      ]
                    return context.getScope().variables.some(function(x) {
                      return 'css' === x.name
                    })
                      ? [
                          fixer.insertTextAfter(lastSpecifier, ', css as _css'),
                          fixer.insertTextBefore(node.value.expression, '_css')
                        ]
                      : [
                          fixer.insertTextAfter(lastSpecifier, ', css'),
                          fixer.insertTextBefore(node.value.expression, 'css')
                        ]
                  }
                })
              }
            } else
              context.report({
                node: node,
                message:
                  'The css prop can only be used if jsx from @emotion/react is imported and it is set as the jsx pragma',
                fix: function(fixer) {
                  if (hasJsxImport)
                    return fixer.insertTextBefore(
                      emotionCoreNode,
                      '/** @jsx ' + local + ' */\n'
                    )
                  if (hasSetPragma) {
                    if (emotionCoreNode) {
                      var lastSpecifier =
                        emotionCoreNode.specifiers[
                          emotionCoreNode.specifiers.length - 1
                        ]
                      return 'ImportDefaultSpecifier' === lastSpecifier.type
                        ? fixer.insertTextAfter(lastSpecifier, ', { jsx }')
                        : fixer.insertTextAfter(lastSpecifier, ', jsx')
                    }
                    return fixer.insertTextBefore(
                      sourceCode.ast.body[0],
                      "import { jsx } from '@emotion/react'\n"
                    )
                  }
                  return fixer.insertTextBefore(
                    sourceCode.ast.body[0],
                    "/** @jsx jsx */\nimport { jsx } from '@emotion/react'\n"
                  )
                }
              })
          }
        }
      }
    }
  },
  simpleMappings = {
    '@emotion/core': '@emotion/react',
    emotion: '@emotion/css',
    'emotion/macro': '@emotion/css/macro',
    '@emotion/styled-base': '@emotion/styled/base',
    'jest-emotion': '@emotion/jest',
    'babel-plugin-emotion': '@emotion/babel-plugin',
    'eslint-plugin-emotion': '@emotion/eslint-plugin',
    'create-emotion-server': '@emotion/server/create-instance',
    'create-emotion': '@emotion/css/create-instance',
    'emotion-server': '@emotion/server'
  },
  pkgRenaming = {
    meta: {
      fixable: 'code'
    },
    create: function(context) {
      return {
        ImportDeclaration: function(node) {
          var maybeMapping = simpleMappings[node.source.value]
          if (
            (void 0 !== maybeMapping &&
              context.report({
                node: node.source,
                message:
                  JSON.stringify(node.source.value) +
                  ' has been renamed to ' +
                  JSON.stringify(maybeMapping) +
                  ', please import it from ' +
                  JSON.stringify(maybeMapping) +
                  ' instead',
                fix: function(fixer) {
                  return fixer.replaceText(
                    node.source,
                    "'" + maybeMapping + "'"
                  )
                }
              }),
            ('@emotion/css' === node.source.value ||
              '@emotion/css/macro' === node.source.value) &&
              1 === node.specifiers.length &&
              'ImportDefaultSpecifier' === node.specifiers[0].type)
          ) {
            var replacement =
              '@emotion/css' === node.source.value
                ? '@emotion/react'
                : '@emotion/react/macro'
            context.report({
              node: node.source,
              message:
                'The default export of "' +
                node.source.value +
                '" in Emotion 10 has been moved to a named export, `css`, from "' +
                replacement +
                '" in Emotion 11, please import it from "' +
                replacement +
                '"',
              fix: function(fixer) {
                return fixer.replaceText(
                  node,
                  'import { css' +
                    ('css' === node.specifiers[0].local.name
                      ? ''
                      : ' as ' + node.specifiers[0].local.name) +
                    " } from '" +
                    replacement +
                    "'"
                )
              }
            })
          }
          'emotion-theming' === node.source.value &&
            context.report({
              node: node.source,
              message:
                '"emotion-theming" has been moved into "@emotion/react", please import its exports from "@emotion/react"',
              fix: function(fixer) {
                return fixer.replaceText(node.source, "'@emotion/react'")
              }
            })
        }
      }
    }
  },
  rules = {
    'import-from-emotion': importFromEmotion,
    'no-vanilla': noVanilla,
    'syntax-preference': syntaxPreference,
    'styled-import': styledImport,
    'jsx-import': jsxImport,
    'pkg-renaming': pkgRenaming
  }

exports.rules = rules
