import babelTester from 'babel-tester'
import plugin from '@emotion/babel-plugin'

babelTester('babel-plugin-emotion', __dirname, {
  plugins: [plugin]
})
