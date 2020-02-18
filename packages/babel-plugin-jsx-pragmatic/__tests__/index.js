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
        import: '___EmotionJSX',
        fragment: {
          module: 'react',
          import: 'React'
        }
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
  expect(() => {
    transformSync('<></>', {
      filename: __filename,
      plugins: [
        [
          jsxPragmatic,
          {
            import: '___EmotionJSX',
            module: '@emotion/core',
            fragment: { export: 'default' }
          }
        ]
      ]
    })
  }).toThrow(
    '@emotion/babel-plugin-jsx-pragmatic: You must specify `fragment.module` and `fragment.import`'
  )
})
