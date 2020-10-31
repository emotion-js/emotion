import babelTester from 'babel-tester'
import preset from '@emotion/babel-preset-css-prop'

babelTester('automatic runtime', __dirname, {
  presets: [
    [
      preset,
      {
        sourceMap: false,
        runtime: 'automatic'
      }
    ]
  ]
})
