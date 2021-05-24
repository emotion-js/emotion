let simpleMappings = {
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
}

export default {
  meta: {
    fixable: 'code'
  },
  create(context) {
    return {
      ImportDeclaration(node) {
        let maybeMapping = simpleMappings[node.source.value]
        if (maybeMapping !== undefined) {
          context.report({
            node: node.source,
            message: `${JSON.stringify(
              node.source.value
            )} has been renamed to ${JSON.stringify(
              maybeMapping
            )}, please import it from ${JSON.stringify(maybeMapping)} instead`,
            fix: fixer => fixer.replaceText(node.source, `'${maybeMapping}'`)
          })
        }
        if (
          (node.source.value === '@emotion/css' ||
            node.source.value === '@emotion/css/macro') &&
          node.specifiers.length === 1 &&
          node.specifiers[0].type === 'ImportDefaultSpecifier'
        ) {
          let replacement =
            node.source.value === '@emotion/css'
              ? '@emotion/react'
              : '@emotion/react/macro'
          context.report({
            node: node.source,
            message: `The default export of "${node.source.value}" in Emotion 10 has been moved to a named export, \`css\`, from "${replacement}" in Emotion 11, please import it from "${replacement}"`,
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
            message: `"emotion-theming" has been moved into "@emotion/react", please import its exports from "@emotion/react"`,
            fix: fixer => fixer.replaceText(node.source, `'@emotion/react'`)
          })
        }
      }
    }
  }
}
