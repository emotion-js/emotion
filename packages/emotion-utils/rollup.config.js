import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

export default {
  entry: './src/index.js',
  exports: 'named',
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
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs({
      ignoreGlobal: true,
      include: 'node_modules/**'
    })
  ],
  targets: [
    { dest: './dist/index.cjs.js', format: 'cjs' },
    { dest: './dist/index.es.js', format: 'es' }
  ]
}
