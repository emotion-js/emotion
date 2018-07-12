import babelTester from 'babel-tester'
import plugin from '@emotion/babel-plugin-core'

babelTester('@emotion/babel-plugin-core', __dirname, {
  plugins: [[plugin, { sourceMap: true }]],
  filename: 'source-map.test.js'
})
