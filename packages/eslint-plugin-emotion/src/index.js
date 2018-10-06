exports.rules = {
  'import-from-emotion': require('./rules/import-from-emotion'),
  'no-vanilla': require('./rules/no-vanilla'),
  'syntax-preference': require('./rules/syntax-preference'),
  styled: require('eslint-plugin-emotion/src/rules/styled-import'),
  jsx: require('eslint-plugin-emotion/src/rules/jsx-import')
}
