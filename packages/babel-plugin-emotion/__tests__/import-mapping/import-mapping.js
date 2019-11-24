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
            }
          },
          'package-two': {
            someJsx: {
              canonicalImport: ['@emotion/core', 'jsx']
            },
            someCssFromCore: {
              canonicalImport: ['@emotion/core', 'css']
            },
            SomeGlobalFromCore: {
              canonicalImport: ['@emotion/core', 'Global']
            }
          },

          'package-three': {
            something: {
              canonicalImport: ['emotion', 'css']
            }
          },
          'package-four': {
            nonDefaultStyled: {
              canonicalImport: ['@emotion/styled', 'default'],
              styledBaseImport: ['package-four/base', 'something']
            }
          }
        }
      }
    ]
  ]
})
