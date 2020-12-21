'use strict'

Object.defineProperty(exports, '__esModule', { value: true })

var importFromEmotion = {
  meta: {
    fixable: 'code',
  },
  create: function create(context) {
    return {
      ImportDeclaration: function ImportDeclaration(node) {
        if (
          node.source.value === 'react-emotion' &&
          node.specifiers.some(function (x) {
            return x.type !== 'ImportDefaultSpecifier'
          })
        ) {
          context.report({
            node: node.source,
            message:
              "emotion's exports should be imported directly from emotion rather than from react-emotion",
            fix: function fix(fixer) {
              if (node.specifiers[0].type === 'ImportNamespaceSpecifier') {
                return
              } // default specifiers are always first

              if (node.specifiers[0].type === 'ImportDefaultSpecifier') {
                return fixer.replaceText(
                  node,
                  'import ' +
                    node.specifiers[0].local.name +
                    " from '@emotion/styled';\nimport { " +
                    node.specifiers
                      .filter(function (x) {
                        return x.type === 'ImportSpecifier'
                      })
                      .map(function (x) {
                        return x.local.name === x.imported.name
                          ? x.local.name
                          : x.imported.name + ' as ' + x.local.name
                      })
                      .join(', ') +
                    " } from 'emotion';"
                )
              }

              return fixer.replaceText(node.source, "'emotion'")
            },
          })
        }
      },
    }
  },
}

var noVanilla = {
  meta: {
    fixable: 'code',
  },
  create: function create(context) {
    return {
      ImportDeclaration: function ImportDeclaration(node) {
        if (node.source.value === '@emotion/css') {
          context.report({
            node: node.source,
            message: 'Vanilla emotion should not be used',
          })
        }
      },
    }
  },
}

/**
 * @fileoverview Choose between string or object syntax
 * @author alex-pex
 */
function isStringStyle(node) {
  // shorthand notation
  // eg: styled.h1` color: red; `
  if (
    node.tag.type === 'MemberExpression' &&
    node.tag.object.name === 'styled'
  ) {
    // string syntax used
    return true
  } // full notation
  // eg: styled('h1')` color: red; `

  if (node.tag.type === 'CallExpression' && node.tag.callee.name === 'styled') {
    // string syntax used
    return true
  }

  return false
}

function isObjectStyle(node) {
  // shorthand notation
  // eg: styled.h1({ color: 'red' })
  if (
    node.callee.type === 'MemberExpression' &&
    node.callee.object.name === 'styled'
  ) {
    // object syntax used
    return true
  } // full notation
  // eg: styled('h1')({ color: 'red' })

  if (
    node.callee.type === 'CallExpression' &&
    node.callee.callee.name === 'styled'
  ) {
    // object syntax used
    return true
  }

  return false
} // ------------------------------------------------------------------------------
// Rule Definition
// ------------------------------------------------------------------------------

var MSG_PREFER_STRING_STYLE = 'Styles should be written using strings.'
var MSG_PREFER_OBJECT_STYLE = 'Styles should be written using objects.'
var MSG_PREFER_WRAPPING_WITH_CSS =
  'Prefer wrapping your string styles with `css` call.'

var checkCssPropExpressionPreferringObject = function checkCssPropExpressionPreferringObject(
  context,
  node
) {
  switch (node.type) {
    case 'ArrayExpression':
      node.elements.forEach(function (element) {
        return checkCssPropExpressionPreferringObject(context, element)
      })
      return

    case 'CallExpression':
      context.report({
        node: node,
        message: MSG_PREFER_OBJECT_STYLE,
      })
      return

    case 'TaggedTemplateExpression':
      context.report({
        node: node,
        message: MSG_PREFER_OBJECT_STYLE,
      })
      return

    case 'Literal':
      // validating other literal types seems out of scope of this plugin
      if (typeof node.value !== 'string') {
        return
      }

      context.report({
        node: node,
        message: MSG_PREFER_OBJECT_STYLE,
      })
  }
}

var createPreferredObjectVisitor = function createPreferredObjectVisitor(
  context
) {
  return {
    TaggedTemplateExpression: function TaggedTemplateExpression(node) {
      if (isStringStyle(node)) {
        context.report({
          node: node,
          message: MSG_PREFER_OBJECT_STYLE,
        })
      }
    },
    JSXAttribute: function JSXAttribute(node) {
      if (node.name.name !== 'css') {
        return
      }

      switch (node.value.type) {
        case 'Literal':
          // validating other literal types seems out of scope of this plugin
          if (typeof node.value.value !== 'string') {
            return
          }

          context.report({
            node: node.value,
            message: MSG_PREFER_OBJECT_STYLE,
          })
          return

        case 'JSXExpressionContainer':
          checkCssPropExpressionPreferringObject(context, node.value.expression)
      }
    },
  }
}

var checkCssPropExpressionPreferringString = function checkCssPropExpressionPreferringString(
  context,
  node
) {
  switch (node.type) {
    case 'ArrayExpression':
      node.elements.forEach(function (element) {
        return checkCssPropExpressionPreferringString(context, element)
      })
      return

    case 'ObjectExpression':
      context.report({
        node: node,
        message: MSG_PREFER_STRING_STYLE,
      })
      return

    case 'Literal':
      // validating other literal types seems out of scope of this plugin
      if (typeof node.value !== 'string') {
        return
      }

      context.report({
        node: node,
        message: MSG_PREFER_WRAPPING_WITH_CSS,
      })
  }
}

var createPreferredStringVisitor = function createPreferredStringVisitor(
  context
) {
  return {
    CallExpression: function CallExpression(node) {
      if (isObjectStyle(node)) {
        context.report({
          node: node,
          message: MSG_PREFER_STRING_STYLE,
        })
      }
    },
    JSXAttribute: function JSXAttribute(node) {
      if (node.name.name !== 'css') {
        return
      }

      switch (node.value.type) {
        case 'Literal':
          // validating other literal types seems out of scope of this plugin
          if (typeof node.value.value !== 'string') {
            return
          }

          context.report({
            node: node.value,
            message: MSG_PREFER_WRAPPING_WITH_CSS,
          })
          return

        case 'JSXExpressionContainer':
          checkCssPropExpressionPreferringString(context, node.value.expression)
      }
    },
  }
}

var syntaxPreference = {
  meta: {
    docs: {
      description: 'Choose between string or object styles',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: null,
    // or "code" or "whitespace"
    schema: [
      {
        enum: ['string', 'object'],
      },
    ],
  },
  create: function create(context) {
    var preferredSyntax = context.options[0]

    switch (preferredSyntax) {
      case 'object':
        return createPreferredObjectVisitor(context)

      case 'string':
        return createPreferredStringVisitor(context)

      default:
        return {}
    }
  },
}

var styledImport = {
  meta: {
    fixable: 'code',
  },
  create: function create(context) {
    return {
      ImportDeclaration: function ImportDeclaration(node) {
        if (node.source.value === 'react-emotion') {
          var newImportPath = '@emotion/styled'
          context.report({
            node: node.source,
            message: 'styled should be imported from @emotion/styled',
            fix:
              node.specifiers.length === 1 &&
              node.specifiers[0].type === 'ImportDefaultSpecifier'
                ? function (fixer) {
                    return fixer.replaceText(
                      node.source,
                      "'" + newImportPath + "'"
                    )
                  }
                : undefined,
          })
        }
      },
    }
  },
}

var JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/ // TODO: handling this case
// <div css={`color:hotpink;`} />
// to
// <div css={css`color:hotpink;`} /> + import { css }

var jsxImport = {
  meta: {
    fixable: 'code',
  },
  create: function create(context) {
    return {
      JSXAttribute: function JSXAttribute(node) {
        if (node.name.name !== 'css') {
          return
        }

        var hasJsxImport = false
        var emotionCoreNode = null
        var local = null
        var sourceCode = context.getSourceCode()
        sourceCode.ast.body.forEach(function (x) {
          if (
            x.type === 'ImportDeclaration' &&
            (x.source.value === '@emotion/react' ||
              x.source.value === '@emotion/core')
          ) {
            emotionCoreNode = x

            if (
              x.specifiers.length === 1 &&
              x.specifiers[0].type === 'ImportNamespaceSpecifier'
            ) {
              hasJsxImport = true
              local = x.specifiers[0].local.name + '.jsx'
            } else {
              var jsxSpecifier = x.specifiers.find(function (x) {
                return x.type === 'ImportSpecifier' && x.imported.name === 'jsx'
              })

              if (jsxSpecifier) {
                hasJsxImport = true
                local = jsxSpecifier.local.name
              }
            }
          }
        })
        var hasSetPragma = false

        if (context.settings.react && context.settings.react.pragma === 'jsx') {
          hasSetPragma = true
        }

        var pragma = sourceCode.getAllComments().find(function (node) {
          return JSX_ANNOTATION_REGEX.test(node.value)
        })
        var match = pragma && pragma.value.match(JSX_ANNOTATION_REGEX)

        if (match && (match[1] === local || (!local && match[1] === 'jsx'))) {
          hasSetPragma = true
        }

        if (!hasJsxImport || !hasSetPragma) {
          context.report({
            node: node,
            message:
              'The css prop can only be used if jsx from @emotion/react is imported and it is set as the jsx pragma',
            fix: function fix(fixer) {
              if (hasJsxImport) {
                return fixer.insertTextBefore(
                  emotionCoreNode,
                  '/** @jsx ' + local + ' */\n'
                )
              }

              if (hasSetPragma) {
                if (emotionCoreNode) {
                  var lastSpecifier =
                    emotionCoreNode.specifiers[
                      emotionCoreNode.specifiers.length - 1
                    ]

                  if (lastSpecifier.type === 'ImportDefaultSpecifier') {
                    return fixer.insertTextAfter(lastSpecifier, ', { jsx }')
                  }

                  return fixer.insertTextAfter(lastSpecifier, ', jsx')
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
            },
          })
          return
        }

        if (
          node.value.type === 'JSXExpressionContainer' &&
          node.value.expression.type === 'TemplateLiteral'
        ) {
          var cssSpecifier = emotionCoreNode.specifiers.find(function (x) {
            return x.imported.name === 'css'
          })
          context.report({
            node: node,
            message:
              'Template literals should be replaced with tagged template literals using `css` when using the css prop',
            fix: function fix(fixer) {
              if (cssSpecifier) {
                return fixer.insertTextBefore(
                  node.value.expression,
                  cssSpecifier.local.name
                )
              }

              var lastSpecifier =
                emotionCoreNode.specifiers[
                  emotionCoreNode.specifiers.length - 1
                ]

              if (
                context.getScope().variables.some(function (x) {
                  return x.name === 'css'
                })
              ) {
                return [
                  fixer.insertTextAfter(lastSpecifier, ', css as _css'),
                  fixer.insertTextBefore(node.value.expression, '_css'),
                ]
              }

              return [
                fixer.insertTextAfter(lastSpecifier, ', css'),
                fixer.insertTextBefore(node.value.expression, 'css'),
              ]
            },
          })
        }
      },
    }
  },
}

var simpleMappings = {
  '@emotion/core': '@emotion/react',
  emotion: '@emotion/css',
  'emotion/macro': '@emotion/css/macro',
  '@emotion/styled-base': '@emotion/styled/base',
  'jest-emotion': '@emotion/jest',
  'babel-plugin-emotion': '@emotion/babel-plugin',
  'eslint-plugin-emotion': '@emotion/eslint-plugin',
  'create-emotion-server': '@emotion/server/create-instance',
  'create-emotion': '@emotion/css/create-instance',
  'emotion-server': '@emotion/server',
}
var pkgRenaming = {
  meta: {
    fixable: 'code',
  },
  create: function create(context) {
    return {
      ImportDeclaration: function ImportDeclaration(node) {
        var maybeMapping = simpleMappings[node.source.value]

        if (maybeMapping !== undefined) {
          context.report({
            node: node.source,
            message:
              JSON.stringify(node.source.value) +
              ' has been renamed to ' +
              JSON.stringify(maybeMapping) +
              ', please import it from ' +
              JSON.stringify(maybeMapping) +
              ' instead',
            fix: function fix(fixer) {
              return fixer.replaceText(node.source, "'" + maybeMapping + "'")
            },
          })
        }

        if (
          (node.source.value === '@emotion/css' ||
            node.source.value === '@emotion/css/macro') &&
          node.specifiers.length === 1 &&
          node.specifiers[0].type === 'ImportDefaultSpecifier'
        ) {
          var replacement =
            node.source.value === '@emotion/css'
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
            fix: function fix(fixer) {
              return fixer.replaceText(
                node,
                'import { css' +
                  (node.specifiers[0].local.name === 'css'
                    ? ''
                    : ' as ' + node.specifiers[0].local.name) +
                  " } from '" +
                  replacement +
                  "'"
              )
            },
          })
        }

        if (node.source.value === 'emotion-theming') {
          context.report({
            node: node.source,
            message:
              '"emotion-theming" has been moved into "@emotion/react", please import its exports from "@emotion/react"',
            fix: function fix(fixer) {
              return fixer.replaceText(node.source, "'@emotion/react'")
            },
          })
        }
      },
    }
  },
}

var rules = {
  'import-from-emotion': importFromEmotion,
  'no-vanilla': noVanilla,
  'syntax-preference': syntaxPreference,
  'styled-import': styledImport,
  'jsx-import': jsxImport,
  'pkg-renaming': pkgRenaming,
}

exports.rules = rules
