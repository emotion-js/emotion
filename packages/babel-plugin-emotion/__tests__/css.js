import babelTester from 'babel-tester'
import plugin from 'babel-plugin-emotion'
import path from 'path'

babelTester(
  '@emotion/babel-plugin-core css',
  path.join(__dirname, 'css-macro'),
  {
    plugins: [plugin],
    transform: src => src.replace(/\/macro/g, '')
  }
)
