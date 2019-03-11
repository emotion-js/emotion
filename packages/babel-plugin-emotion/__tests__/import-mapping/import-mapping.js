import babelTester from 'babel-tester'
import plugin from 'babel-plugin-emotion'

babelTester('import mapping', __dirname, {
  plugins: [
    [
      plugin,
      {
        importMap: {
          'package-one': {
            nonDefaultStyled: {
              canonicalImport: ['@emotion/styled', 'default']
            },
            someCssFromCore: {
              canonicalImport: ['@emotion/core', 'css']
            }
          },
          'package-two': {},

          'package-three': {},
          'package-four': {}
        }
      }
    ]
  ]
})
