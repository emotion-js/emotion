import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import pkg from './package.json'

export default {
  entry: 'src/index.js',
  external: ['react'],
  exports: 'named',
  globals: { react: 'React' },
  useStrict: false,
  sourceMap: true,
  plugins: [
    babel({
      presets: [
        ['env', { loose: true, modules: false }],
        'stage-0',
        'react',
        'flow'
      ],
      babelrc: false
    }),
    resolve({
      jsnext: false,
      main: true,
      browser: true
    }),
    commonjs({
      ignoreGlobal: true,
      include: 'node_modules/**'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    uglify()
  ],
  targets: [
    { dest: './dist/DO-NOT-USE.min.js', format: 'umd', moduleName: pkg.name }
  ]
}
