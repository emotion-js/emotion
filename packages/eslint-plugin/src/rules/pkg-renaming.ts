import { AST_NODE_TYPES } from '@typescript-eslint/utils'
import { createRule } from '../utils'

const simpleMappings = new Map<unknown, string>([
  ['@emotion/core', '@emotion/react'],
  ['emotion', '@emotion/css'],
  ['emotion/macro', '@emotion/css/macro'],
  ['@emotion/styled-base', '@emotion/styled/base'],
  ['jest-emotion', '@emotion/jest'],
  ['babel-plugin-emotion', '@emotion/babel-plugin'],
  ['eslint-plugin-emotion', '@emotion/eslint-plugin'],
  ['create-emotion-server', '@emotion/server/create-instance'],
  ['create-emotion', '@emotion/css/create-instance'],
  ['emotion-server', '@emotion/server']
])

const messages = {
  renamePackage: `{{ beforeName }} has been renamed to {{ afterName }}, please import it from {{ afterName }} instead`,
  exportChange: `The default export of "{{ name }}" in Emotion 10 has been moved to a named export, \`css\`, from "{{ replacement }}" in Emotion 11, please import it from "{{ replacement }}"`,
  emotionTheming: `"emotion-theming" has been moved into "@emotion/react", please import its exports from "@emotion/react"`
}

export default createRule<never[], keyof typeof messages>({
  name: __filename,
  meta: {
    docs: {
      description: 'Internal rule',
      recommended: false
    },
    fixable: 'code',
    messages,
    schema: [],
    type: 'problem'
  },
  defaultOptions: [],
  create(context) {
    return {
      ImportDeclaration(node) {
        const maybeMapping = simpleMappings.get(node.source.value)
        if (maybeMapping !== undefined) {
          context.report({
            node: node.source,
            messageId: 'renamePackage',
            data: {
              beforeName: JSON.stringify(node.source.value),
              afterName: JSON.stringify(maybeMapping)
            },
            fix: fixer => fixer.replaceText(node.source, `'${maybeMapping}'`)
          })
        }
        if (
          (node.source.value === '@emotion/css' ||
            node.source.value === '@emotion/css/macro') &&
          node.specifiers.length === 1 &&
          node.specifiers[0].type === AST_NODE_TYPES.ImportDefaultSpecifier
        ) {
          let replacement =
            node.source.value === '@emotion/css'
              ? '@emotion/react'
              : '@emotion/react/macro'
          context.report({
            node: node.source,
            messageId: 'exportChange',
            data: {
              name: node.source.value,
              replacement
            },
            fix: fixer =>
              fixer.replaceText(
                node,
                `import { css${
                  node.specifiers[0].local.name === 'css'
                    ? ''
                    : ` as ${node.specifiers[0].local.name}`
                } } from '${replacement}'`
              )
          })
        }
        if (node.source.value === 'emotion-theming') {
          context.report({
            node: node.source,
            messageId: 'emotionTheming',
            fix: fixer => fixer.replaceText(node.source, `'@emotion/react'`)
          })
        }
      }
    }
  }
})
