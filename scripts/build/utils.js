const path = require('path')
const del = require('del')
const { promisify } = require('util')
const fs = require('fs')
const makeRollupConfig = require('./rollup.config')
const camelize = require('fbjs/lib/camelize')

const readdir = promisify(fs.readdir)

const rootPath = path.resolve(__dirname, '..', '..')

exports.rootPath = rootPath

exports.cleanDist = async function cleanDist(pkgPath) {
  await del(`${pkgPath}/dist`)
}

exports.getPackages = async function getPackages() {
  const packagePaths = (await readdir(path.join(rootPath, 'packages'))).map(
    pkg => path.join(rootPath, 'packages', pkg)
  )
  const packages = packagePaths
    .map(packagePath => {
      const fullPackagePath = path.resolve(rootPath, packagePath)
      const ret = {
        path: fullPackagePath,
        pkg: require(path.resolve(fullPackagePath, 'package.json'))
      }
      if (ret.pkg.main.includes('src')) {
        return false
      }
      ret.name = ret.pkg.name
      ret.configs = [
        {
          config: makeRollupConfig(ret),
          outputConfigs: getOutputConfigs(ret)
        }
      ]
      if (ret.pkg['umd:main']) {
        ret.configs.push({
          config: makeRollupConfig(ret, true, true),
          outputConfigs: [getUMDOutputConfig(ret)]
        })
      }
      if (ret.pkg.browser) {
        ret.configs.push({
          config: makeRollupConfig(ret, false, true),
          outputConfigs: getOutputConfigs(ret, true)
        })
      }
      return ret
    })
    .filter(Boolean)
  return packages
}

function getPath(pkg, field, isBrowser) {
  return path.resolve(
    pkg.path,
    isBrowser && pkg.pkg.browser && pkg.pkg.browser['./' + pkg.pkg[field]]
      ? pkg.pkg.browser['./' + pkg.pkg[field]]
      : pkg.pkg[field]
  )
}

function getOutputConfigs(pkg, isBrowser = false) {
  const cjsPath = getPath(pkg, 'main', isBrowser)
  let configs = [
    {
      format: 'cjs',
      sourcemap: true,
      file: cjsPath
    }
  ]
  if (pkg.pkg.module) {
    const esmPath = getPath(pkg, 'module', isBrowser)

    configs.push({
      format: 'es',
      sourcemap: true,
      file: esmPath
    })
  }
  return configs
}

function getUMDOutputConfig(pkg) {
  const UMDPath = path.resolve(pkg.path, pkg.pkg['umd:main'])
  let name = camelize(pkg.pkg.name.replace('@', '').replace('/', '-'))
  return {
    format: 'umd',
    sourcemap: true,
    file: UMDPath,
    name,
    globals: { react: 'React', '@emotion/core': 'emotionCore' }
  }
}
