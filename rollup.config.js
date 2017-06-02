import fs from 'fs'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
  entry: 'src/react.js',
  external: ['react', 'prop-types', 'glam'],
  exports: 'named',
  globals: { react: 'React', 'prop-types': 'PropTypes', glam: 'glam' },
  useStrict: false,
  sourceMap: true,
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      jsnext: false,
      main: true,
      browser: true
    }),
    commonjs({
      ignoreGlobal: true,
      include: 'node_modules/**'
    })
  ],
  targets: [
    {dest: pkg.main, format: 'cjs'},
    {dest: pkg.module, format: 'es'},
    {dest: pkg['umd:main'], format: 'umd', moduleName: pkg.name}
  ]
}
