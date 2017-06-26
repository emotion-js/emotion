import fs from 'fs'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import babel from 'rollup-plugin-babel'

const pkg = JSON.parse(fs.readFileSync('./package.json'))

export default {
  entry: 'src/styled.js',
  external: ['react'],
  exports: 'named',
  globals: { react: 'React' },
  useStrict: false,
  sourceMap: true,
  plugins: [
    babel(),
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
    {dest: pkg['main'], format: 'umd', moduleName: pkg.name}
  ]
}
