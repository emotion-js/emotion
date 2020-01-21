import babelTester from 'babel-tester'
import plugin from 'babel-plugin-emotion'

babelTester('@emotion/babel-plugin-core', __dirname, {
  // we add a duplicate of our own plugin
  // users may run babel twice, and our plugin should be smart enough to not duplicate fields
  plugins: [plugin, [plugin, undefined, 'emotion-copy']]
})
