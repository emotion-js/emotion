import { AST_NODE_TYPES, TSESTree } from '@typescript-eslint/utils'
import { createRule, REPO_URL } from '../utils'

const JSX_ANNOTATION_REGEX = /\*?\s*@jsx\s+([^\s]+)/
const JSX_IMPORT_SOURCE_REGEX = /\*?\s*@jsxImportSource\s+([^\s]+)/

// TODO: handling this case
// <div css={`color:hotpink;`} />
// to
// <div css={css`color:hotpink;`} /> + import { css }

declare module '@typescript-eslint/utils/dist/ts-eslint/Rule' {
  export interface SharedConfigurationSettings {
    react?: { pragma?: string }
  }
}

type JSXConfig = {
  runtime: string
  importSource?: string
}

type RuleOptions = [(JSXConfig | string)?]

const messages = {
  cssProp: `The css prop can only be used if jsxImportSource is set to {{ importSource }}`,
  cssPropWithPragma: `The css prop can only be used if jsx from @emotion/react is imported and it is set as the jsx pragma`,
  templateLiterals: `Template literals should be replaced with tagged template literals using \`css\` when using the css prop`
}

export default createRule<RuleOptions, keyof typeof messages>({
  name: __filename,
  meta: {
    docs: {
      description: 'Ensure jsx from @emotion/react is imported',
      recommended: false
    },
    fixable: 'code',
    messages,
    schema: {
      type: 'array',
      items: {
        oneOf: [
          {
            type: 'string'
          },
          {
            type: 'object',
            properties: {
              runtime: { type: 'string' },
              importSource: { type: 'string' }
            },
            required: ['runtime'],
            additionalProperties: false
          }
        ]
      },
      uniqueItems: true,
      minItems: 0
    },
    type: 'problem'
  },
  defaultOptions: [],
  create(context) {
    const jsxRuntimeMode = context.options.find(
      (option): option is JSXConfig =>
        typeof option === 'object' && option.runtime === 'automatic'
    )

    if (jsxRuntimeMode) {
      return {
        JSXAttribute(node) {
          if (node.name.name !== 'css') {
            return
          }
          const importSource = jsxRuntimeMode?.importSource || '@emotion/react'
          let jsxImportSourcePragmaComment: TSESTree.Comment | null = null
          let jsxImportSourceMatch
          let validJsxImportSource = false
          let sourceCode = context.getSourceCode()
          let pragma = sourceCode.getAllComments().find(comment => {
            if (JSX_IMPORT_SOURCE_REGEX.test(comment.value)) {
              jsxImportSourcePragmaComment = comment
              return true
            }
          })
          jsxImportSourceMatch =
            pragma && pragma.value.match(JSX_IMPORT_SOURCE_REGEX)
          if (
            jsxImportSourceMatch &&
            jsxImportSourceMatch[1] === importSource
          ) {
            validJsxImportSource = true
          }
          if (!jsxImportSourceMatch) {
            context.report({
              node,
              messageId: 'cssProp',
              data: { importSource },
              fix(fixer) {
                return fixer.insertTextBefore(
                  sourceCode.ast.body[0],
                  `/** @jsxImportSource ${importSource} */\n`
                )
              }
            })
          } else if (!validJsxImportSource && jsxImportSourcePragmaComment) {
            context.report({
              node,
              messageId: 'cssProp',
              data: { importSource },
              fix(fixer) {
                /* istanbul ignore if */
                if (jsxImportSourcePragmaComment === null) {
                  throw new Error(
                    `Unexpected null when attempting to fix ${context.getFilename()} - please file a github issue at ${REPO_URL}`
                  )
                }

                return fixer.replaceText(
                  jsxImportSourcePragmaComment,
                  `/** @jsxImportSource ${importSource} */`
                )
              }
            })
          }
        }
      }
    }

    return {
      JSXAttribute(node) {
        if (node.name.name !== 'css') {
          return
        }
        let hasJsxImport = false
        let emotionCoreNode = null as TSESTree.ImportDeclaration | null
        let local: string | null = null
        let sourceCode = context.getSourceCode()
        sourceCode.ast.body.forEach(x => {
          if (
            x.type === AST_NODE_TYPES.ImportDeclaration &&
            (x.source.value === '@emotion/react' ||
              x.source.value === '@emotion/core')
          ) {
            emotionCoreNode = x

            if (
              x.specifiers.length === 1 &&
              x.specifiers[0].type === AST_NODE_TYPES.ImportNamespaceSpecifier
            ) {
              hasJsxImport = true
              local = x.specifiers[0].local.name + '.jsx'
            } else {
              let jsxSpecifier = x.specifiers.find(
                x =>
                  x.type === AST_NODE_TYPES.ImportSpecifier &&
                  x.imported.name === 'jsx'
              )
              if (jsxSpecifier) {
                hasJsxImport = true
                local = jsxSpecifier.local.name
              }
            }
          }
        })
        let hasSetPragma = false
        if (context.settings.react && context.settings.react.pragma === 'jsx') {
          hasSetPragma = true
        }
        let pragma = sourceCode
          .getAllComments()
          .find(node => JSX_ANNOTATION_REGEX.test(node.value))
        let match = pragma && pragma.value.match(JSX_ANNOTATION_REGEX)
        if (match && (match[1] === local || (!local && match[1] === 'jsx'))) {
          hasSetPragma = true
        }

        if (!hasJsxImport || !hasSetPragma) {
          context.report({
            node,
            messageId: 'cssPropWithPragma',
            fix(fixer) {
              if (hasJsxImport) {
                /* istanbul ignore if */
                if (emotionCoreNode === null) {
                  throw new Error(
                    `Unexpected null when attempting to fix ${context.getFilename()} - please file a github issue at ${REPO_URL}`
                  )
                }

                return fixer.insertTextBefore(
                  emotionCoreNode,
                  `/** @jsx ${local} */\n`
                )
              }
              if (hasSetPragma) {
                if (emotionCoreNode) {
                  let lastSpecifier =
                    emotionCoreNode.specifiers[
                      emotionCoreNode.specifiers.length - 1
                    ]

                  if (
                    lastSpecifier.type === AST_NODE_TYPES.ImportDefaultSpecifier
                  ) {
                    return fixer.insertTextAfter(lastSpecifier, ', { jsx }')
                  }

                  return fixer.insertTextAfter(lastSpecifier, ', jsx')
                }

                return fixer.insertTextBefore(
                  sourceCode.ast.body[0],
                  `import { jsx } from '@emotion/react'\n`
                )
              }
              return fixer.insertTextBefore(
                sourceCode.ast.body[0],
                `/** @jsx jsx */\nimport { jsx } from '@emotion/react'\n`
              )
            }
          })
          return
        }

        /* istanbul ignore if */
        if (emotionCoreNode === null) {
          throw new Error(
            `Unexpected null when attempting to fix ${context.getFilename()} - please file a github issue at ${REPO_URL}`
          )
        }

        const { specifiers } = emotionCoreNode
        const { value } = node

        if (
          value &&
          value.type === AST_NODE_TYPES.JSXExpressionContainer &&
          value.expression.type === AST_NODE_TYPES.TemplateLiteral
        ) {
          let cssSpecifier = specifiers.find(
            x =>
              x.type === AST_NODE_TYPES.ImportSpecifier &&
              x.imported.name === 'css'
          )
          context.report({
            node,
            messageId: 'templateLiterals',
            fix(fixer) {
              if (cssSpecifier) {
                return fixer.insertTextBefore(
                  value.expression,
                  cssSpecifier.local.name
                )
              }
              let lastSpecifier = specifiers[specifiers.length - 1]

              if (context.getScope().variables.some(x => x.name === 'css')) {
                return [
                  fixer.insertTextAfter(lastSpecifier, `, css as _css`),
                  fixer.insertTextBefore(value.expression, '_css')
                ]
              }
              return [
                fixer.insertTextAfter(lastSpecifier, `, css`),
                fixer.insertTextBefore(value.expression, 'css')
              ]
            }
          })
        }
      }
    }
  }
})
