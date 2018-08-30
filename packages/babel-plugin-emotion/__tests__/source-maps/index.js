import babelTester from 'babel-tester'
import plugin from 'babel-plugin-emotion'

babelTester('source maps', __dirname, {
  plugins: [[plugin, { sourceMap: true }]],
  filename: 'source-map.test.js'
})
