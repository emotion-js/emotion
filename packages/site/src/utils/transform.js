/* global Babel */
import babelPluginEmotion from 'babel-plugin-emotion'

Babel.registerPlugin('babel-plugin-emotion', babelPluginEmotion)

const options = {
  presets: ['es2015', 'react', 'stage-1'],
  plugins: ['babel-plugin-emotion']
}
module.exports = {
  transform(code) {
    const transformed = Babel.transform(code, options)
    return transformed
  }
}
