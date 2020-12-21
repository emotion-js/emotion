import babelTester from 'babel-tester'
import plugin from '@emotion/babel-plugin'
import path from 'path'

babelTester(
  'emotion-babel-plugin styled',
  path.join(__dirname, 'styled-macro'),
  {
    plugins: [plugin],
    transform: (src) => src.replace(/\/macro/g, ''),
  }
)
