const resolve = require('rollup-plugin-node-resolve')
const { uglify } = require('rollup-plugin-uglify')
const babel = require('rollup-plugin-babel')
const alias = require('rollup-plugin-alias')
const cjs = require('rollup-plugin-commonjs')
const replace = require('rollup-plugin-replace')
const path = require('path')
const lernaAliases = require('lerna-alias').rollup

// this makes sure nested imports of external packages are external
const makeExternalPredicate = externalArr => {
  if (externalArr.length === 0) {
    return () => false
  }
  const pattern = new RegExp(`^(${externalArr.join('|')})($|/)`)
  return id => pattern.test(id)
}

function getChildPeerDeps(finalPeerDeps, depKeys) {
  depKeys.forEach(key => {
    const pkgJson = require(key + '/package.json')
    if (pkgJson.peerDependencies) {
      finalPeerDeps.push(...Object.keys(pkgJson.peerDependencies))
      getChildPeerDeps(finalPeerDeps, Object.keys(pkgJson.peerDependencies))
    }
    if (pkgJson.dependencies) {
      getChildPeerDeps(finalPeerDeps, Object.keys(pkgJson.dependencies))
    }
  })
}

module.exports = (data, isUMD = false, isBrowser = false) => {
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
  external.push('fs', 'path')

  const config = {
    input: path.resolve(data.path, 'src', 'index.js'),
    external: makeExternalPredicate(external),
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
          ['@babel/proposal-class-properties', { loose: true }],
          require('./fix-dce-for-classes-with-statics'),
          isBrowser && require('./inline-isBrowser'),
          isBrowser &&
            (babel => {
              let t = babel.types
              return {
                // for @emotion/utils
                visitor: {
                  VariableDeclarator(path, state) {
                    if (t.isIdentifier(path.node.id)) {
                      if (path.node.id.name === 'isBrowser') {
                        path.get('init').replaceWith(t.booleanLiteral(true))
                      }
                      if (path.node.id.name === 'shouldSerializeToReactTree') {
                        path.get('init').replaceWith(t.booleanLiteral(false))
                      }
                    }
                  },
                  ReferencedIdentifier(path, node) {
                    if (path.node.name === 'shouldSerializeToReactTree') {
                      path.replaceWith(t.booleanLiteral(false))
                    }
                  }
                }
              }
            }),
          '@babel/plugin-proposal-object-rest-spread'
        ].filter(Boolean),
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
