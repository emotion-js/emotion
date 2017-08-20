import babel from 'rollup-plugin-babel'
import alias from 'rollup-plugin-alias'
import pkg from './package.json'

export default {
  entry: '../react-emotion/src/index.js',
  external: ['preact', 'emotion', 'emotion-utils'],
  exports: 'named',
  sourceMap: true,
  plugins: [
    babel({
      presets: [
        ['env', { loose: true, modules: false }],
        'stage-0',
        'react',
        'flow'
      ],
      plugins: ['babel-plugin-preval'],
      babelrc: false
    }),
    alias({
      react: 'preact'
    }),
  ],
  targets: [
    { dest: pkg.main, format: 'cjs' },
    { dest: pkg.module, format: 'es' }
  ]
}
