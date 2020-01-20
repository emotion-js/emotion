import babelTester from 'babel-tester'
import plugin from 'babel-plugin-emotion'

const pluginCopy = t => {
  const result = { ...plugin(t) }

  result.name = result.name + '-copy'

  return result
}

babelTester('@emotion/babel-plugin-core', __dirname, {
  // we add a duplicate of our own plugin
  // users may run babel twice, and our plugin should be smart enough to not duplicate fields
  plugins: [plugin, pluginCopy]
})
