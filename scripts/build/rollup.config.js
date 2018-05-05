const resolve = require('rollup-plugin-node-resolve')
const uglify = require('rollup-plugin-uglify')
const babel = require('rollup-plugin-babel')
const alias = require('rollup-plugin-alias')
const cjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const path = require('path')
const lernaAliases = require('lerna-alias').rollup

function getChildPeerDeps(finalPeerDeps, depKeys) {
  depKeys.forEach(key => {
    const pkgJson = require(`${key}/package.json`)
    if (pkgJson.peerDependencies) {
      finalPeerDeps.push(...Object.keys(pkgJson.peerDependencies))
      getChildPeerDeps(finalPeerDeps, Object.keys(pkgJson.peerDependencies))
    }
  })
}

module.exports = (data, isUMD = false) => {
  const { pkg } = data
  const external = []
  if (pkg.peerDependencies) {
    external.push(...Object.keys(pkg.peerDependencies))
  }
  if (pkg.dependencies && !isUMD) {
    external.push(...Object.keys(pkg.dependencies))
  }
  getChildPeerDeps(external, [
    ...new Set(
      external.concat((pkg.dependencies && Object.keys(pkg.dependencies)) || [])
    )
  ])

  const config = {
    input: path.resolve(data.path, 'src', 'index.js'),
    external: [...external, 'react', 'preact', 'prop-types', 'fs', 'path'],
    plugins: [
      cjs({
        exclude: [path.join(__dirname, '..', '..', 'packages', '*/src/**/*')]
      }),
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
          '@babel/react',
          '@babel/flow'
        ],
        plugins: [
          '@babel/plugin-transform-flow-strip-types',
          require('./add-basic-constructor-to-react-component'),
          'codegen',
          // 'closure-elimination',
          ['@babel/proposal-class-properties', { loose: true }],
          '@babel/plugin-proposal-object-rest-spread'
        ],
        babelrc: false
      }),
      isUMD && alias(lernaAliases()),
      isUMD &&
        pkg.dependencies &&
        resolve({ only: Object.keys(pkg.dependencies) }),
      isUMD && replace({ 'process.env.NODE_ENV': '"production"' }),
      isUMD && uglify()
    ].filter(Boolean)
  }

  return config
}
