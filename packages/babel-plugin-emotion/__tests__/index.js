import babelTester from 'babel-tester'
import plugin from 'babel-plugin-emotion'

babelTester('@emotion/babel-plugin-core', __dirname, {
  plugins: [plugin]
})
