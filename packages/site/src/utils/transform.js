import { transform as _transform, registerPlugin } from 'babel-standalone'
import babelPluginEmotion from 'babel-plugin-emotion'

registerPlugin('babel-plugin-emotion', babelPluginEmotion)

const options = {
  presets: ['es2015', 'react', 'stage-1'],
  plugins: [['babel-plugin-emotion', { autoImportCssProp: false }]]
}
module.exports = {
  transform(code) {
    const transformed = _transform(code, options)
    return transformed
  }
}
