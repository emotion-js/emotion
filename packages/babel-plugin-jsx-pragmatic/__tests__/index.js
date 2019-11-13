import babelTester from 'babel-tester'
import jsxPragmatic from '@emotion/babel-plugin-jsx-pragmatic'
import { transformSync } from '@babel/core'

babelTester('@emotion/babel-plugin-jsx-pragmatic', __dirname, {
  plugins: [
    [
      jsxPragmatic,
      {
        export: 'jsx',
        module: '@emotion/core',
        import: '___EmotionJSX'
      }
    ]
  ]
})

test('babel-plugin-jsx-pragmatic should throw error when invalid options', () => {
  expect(() => {
    transformSync('<></>', {
      filename: __filename,
      plugins: [[jsxPragmatic, { export: 'jsx' }]]
    })
  }).toThrow(
    '@emotion/babel-plugin-jsx-pragmatic: You must specify `module` and `import`'
  )
})
