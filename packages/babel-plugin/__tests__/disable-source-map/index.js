import babelTester from 'babel-tester'
import plugin from 'babel-plugin-emotion'

babelTester('disable source map', __dirname, {
  plugins: [[plugin, { sourceMap: false }]]
})
