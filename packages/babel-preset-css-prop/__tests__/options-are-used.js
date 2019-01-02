import babelTester from 'babel-tester'
import preset from '@emotion/babel-preset-css-prop'

babelTester('options are used', __dirname, {
  presets: [
    [
      preset,
      {
        sourceMap: false,
        labelFormat: '[dirname]--[filename]--[local]'
      }
    ]
  ]
})
