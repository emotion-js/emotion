import babelTester from 'babel-tester'
import plugin from 'babel-plugin-emotion'
import path from 'path'

babelTester(
  'emotion-babel-plugin Global',
  path.join(__dirname, 'global-macro'),
  {
    plugins: [plugin],
    transform: src => src.replace(/\/macro/g, '')
  }
)
