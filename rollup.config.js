import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import alias from 'rollup-plugin-alias'
import cjs from 'rollup-plugin-commonjs'
import path from 'path'

const pkg = require(path.resolve(process.cwd(), './package.json'))

const config = {
  input: './src/index.js',
  external: [
    'react',
    'emotion',
    'emotion-utils',
    'prop-types',
    'hoist-non-react-statics',
    'stylis-rule-sheet'
  ],
  exports: 'named',
  sourcemap: true,
  plugins: [
    resolve(),
    babel({
      presets: [
        [
          'env',
          {
            loose: true,
            modules: false,
            exclude: ['transform-es2015-typeof-symbol']
          }
        ],
        'stage-0',
        'react',
        'flow'
      ],
      plugins: ['codegen', 'external-helpers'],
      babelrc: false
    }),
    cjs()
  ],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ]
}

if (process.env.UMD) {
  config.external = ['react', 'prop-types']
  config.globals = { react: 'React', 'prop-types': 'PropTypes' }
  config.plugins.push(
    alias({
      emotion: path.resolve(__dirname, './packages/emotion/src/index.js'),
      'emotion-utils': path.resolve(
        __dirname,
        './packages/emotion-utils/src/index.js'
      )
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    uglify()
  )
  config.output = [
    {
      file: './dist/emotion.umd.min.js',
      format: 'umd',
      name: pkg.name
    }
  ]
}

if (pkg.name === 'preact-emotion') {
  config.input = '../react-emotion/src/index.js'
  config.external = ['preact', 'emotion-utils', 'emotion']
  config.plugins.unshift(alias({ react: 'preact' }))
}

export default config
