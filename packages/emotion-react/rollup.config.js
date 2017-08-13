import babel from 'rollup-plugin-babel'

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
    { dest: './dist/index.cjs.js', format: 'cjs' },
    { dest: './dist/index.es.js', format: 'es' }
  ]
}

export default config
