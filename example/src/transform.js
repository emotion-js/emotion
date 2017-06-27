import { registerPlugin, transform as _transform } from 'babel-standalone'

registerPlugin('emotion/babel', require('emotion/babel'))

export const transform = (code) => _transform(code, {
  presets: ['es2015', 'react', 'stage-1'],
  plugins: ['emotion/babel'] }
  )
