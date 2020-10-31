import babelTester from 'babel-tester'
import preset from '@emotion/babel-preset-css-prop'

babelTester('automatic runtime', __dirname, {
  filename: '/test/path/to/some/file.js',
  presets: [
    [
      preset,
      {
        sourceMap: false,
        runtime: 'automatic',
        development: true
      }
    ]
  ]
})
