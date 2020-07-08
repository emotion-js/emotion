/* global Babel */
import babelPluginEmotion from '@emotion/babel-plugin'

Babel.registerPlugin('@emotion/babel-plugin', babelPluginEmotion)

const options = {
  presets: ['es2015', 'react', 'stage-1'],
  plugins: ['@emotion/babel-plugin']
}
module.exports = {
  transform(code) {
    const transformed = Babel.transform(code, options)
    return transformed
  }
}
