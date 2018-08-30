import babelTester from 'babel-tester'
import plugin from 'babel-plugin-emotion'
import path from 'path'

babelTester(
  '@emotion/babel-plugin-core styled',
  path.join(
    __dirname,
    '..',
    '..',
    '..',
    'next-packages',
    'styled.macro',
    '__tests__'
  ),
  {
    plugins: [plugin],
    transform: src => src.replace(/\.macro/g, '')
  }
)
