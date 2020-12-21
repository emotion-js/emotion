import babelTester from 'babel-tester'
import plugin from '@emotion/babel-plugin'

babelTester('source maps', __dirname, {
  plugins: [[plugin, { sourceMap: true }]],
  filename: 'source-map.test.js',
})
