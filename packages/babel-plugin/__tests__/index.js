import babelTester from 'babel-tester'
import plugin from 'babel-plugin-emotion'

babelTester('babel-plugin-emotion', __dirname, {
  plugins: [plugin]
})
