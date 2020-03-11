import babelTester from 'babel-tester'
import preset from '@emotion/babel-preset-css-prop'

babelTester('options-with-css-prop-only', __dirname, {
  presets: [
    [
      preset,
      {
        sourceMap: false,
        cssPropOnly: true
      }
    ]
  ]
})
