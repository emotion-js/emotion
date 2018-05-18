import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import replace from 'rollup-plugin-replace'
import babel from 'rollup-plugin-babel'
import alias from 'rollup-plugin-alias'
import cjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import path from 'path'
import getLernaPackages from 'get-lerna-packages'
import { rollup as lernaAliases } from 'lerna-alias'

const flatMap = (iteratee, arr) => [].concat(...arr.map(iteratee))
const uniq = arr => [...new Set(arr)]

const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return id => pattern.test(id)
}

const pkg = require(path.resolve(process.cwd(), './package.json'))

const basePlugins = [
  cjs({ exclude: [path.join(__dirname, 'packages', '*/src/**/*')] }),
  json(),
  resolve(),
  babel({
    presets: [
      [
        '@babel/env',
        {
          loose: true,
          modules: false,
          exclude: ['transform-typeof-symbol']
        }
      ],
      '@babel/stage-0',
      '@babel/react',
      '@babel/flow'
    ],
    plugins: ['codegen', 'closure-elimination'],
    babelrc: false
  })
]

const baseConfig = {
  input: './src/index.js',
  exports: 'named',
  sourcemap: true
}

const baseExternal = ['react', 'prop-types', 'preact']

const mainConfig = Object.assign({}, baseConfig, {
  external: makeExternalPredicate(
    uniq(
      baseExternal
        .concat(Object.keys(pkg.dependencies || {}))
        .concat(
          flatMap(
            dir =>
              Object.keys(
                require(`${dir}/package.json`).peerDependencies || {}
              ),
            getLernaPackages()
          )
        )
    )
  ),
  plugins: basePlugins,
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' }
  ]
})

const umdConfig = Object.assign({}, baseConfig, {
  plugins: [alias(lernaAliases())].concat(basePlugins).concat(
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    uglify()
  ),
  output: [
    {
      file: './dist/emotion.umd.min.js',
      format: 'umd',
      name: pkg.name
    }
  ],
  globals: { react: 'React', 'prop-types': 'PropTypes', preact: 'preact' },
  external: makeExternalPredicate(
    uniq(baseExternal.concat(Object.keys(pkg.peerDependencies || {})))
  )
})

export default [mainConfig, umdConfig]
