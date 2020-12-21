import babelTester from 'babel-tester'
import plugin from '@emotion/babel-plugin'

babelTester('disable source map', __dirname, {
  plugins: [[plugin, { sourceMap: false }]],
})
