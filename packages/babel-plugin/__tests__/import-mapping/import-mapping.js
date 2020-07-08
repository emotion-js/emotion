import babelTester from 'babel-tester'
import plugin from '@emotion/babel-plugin'

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
              canonicalImport: ['@emotion/react', 'jsx']
            },
            someCssFromCore: {
              canonicalImport: ['@emotion/react', 'css']
            },
            SomeGlobalFromCore: {
              canonicalImport: ['@emotion/react', 'Global']
            }
          },

          'package-three': {
            something: {
              canonicalImport: ['@emotion/css', 'css']
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
