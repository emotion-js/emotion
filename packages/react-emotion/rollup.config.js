import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import alias from 'rollup-plugin-alias'
import path from 'path'
import pkg from './package.json'

const config = {
  entry: './src/index.js',
  external: ['react', 'emotion', 'emotion-utils'],
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
    })
  ],
  targets: [
    { dest: pkg.main, format: 'cjs' },
    { dest: pkg.module, format: 'es' }
  ]
}

if (process.env.UMD) {
  config.external = ['react']
  config.globals = { react: 'React' }
  config.plugins.push(
    resolve(),
    alias({
      emotion: path.resolve(__dirname, '../emotion/src/index.js'),
      'emotion-utils': path.resolve(__dirname, '../emotion-utils/src/index.js')
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    uglify()
  )
  config.targets = [
    { dest: './dist/DO-NOT-USE.min.js', format: 'umd', moduleName: pkg.name }
  ]
}

export default config
