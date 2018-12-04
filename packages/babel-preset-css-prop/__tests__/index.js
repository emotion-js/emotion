import babelTester from 'babel-tester'
import preset from '@emotion/babel-preset-css-prop'

babelTester('@emotion/babel-preset-css-prop', __dirname, {
  presets: [preset]
})
