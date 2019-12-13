import babelTester from 'babel-tester'
import plugin from '@emotion/babel-plugin'

babelTester('@emotion/babel-plugin', __dirname, {
  plugins: [plugin]
})
