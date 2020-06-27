import babelTester from 'babel-tester'
import plugin from '@emotion/babel-plugin'
import path from 'path'

babelTester('emotion-babel-plugin css', path.join(__dirname, 'css-macro'), {
  plugins: [plugin],
  transform: src => src.replace(/\/macro/g, '')
})
