import babelTester from 'babel-tester'
import plugin from '@emotion/babel-plugin'

babelTester('@emotion/babel-plugin', __dirname, {
  // we add a duplicate of our own plugin
  // users may run babel twice, and our plugin should be smart enough to not duplicate fields
  plugins: [plugin, [plugin, undefined, 'emotion-copy']],
})
