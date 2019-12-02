let simpleMappings = {
  '@emotion/core': '@emotion/react',
  emotion: '@emotion/css',
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
      }
    }
  }
}
