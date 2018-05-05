const path = require('path')
const globby = require('globby')
const del = require('del')
const makeRollupConfig = require('./rollup.config')
const camelize = require('fbjs/lib/camelize')

const rootPath = path.resolve(__dirname, '..', '..')

exports.rootPath = rootPath

exports.cleanDist = async function cleanDist(pkgPath) {
  await del(`${pkgPath}/dist`, { force: true, cwd: rootPath })
}

exports.getPackages = async function getPackages() {
  const packagePaths = await globby('packages/*/', {
    cwd: rootPath,
    nodir: false
  })
  const packages = packagePaths
    .map(packagePath => {
      const fullPackagePath = path.resolve(rootPath, packagePath)
      const ret = {
        path: fullPackagePath,
        pkg: require(path.resolve(fullPackagePath, 'package.json'))
      }
      ret.name = ret.pkg.name
      ret.config = makeRollupConfig(ret)
      ret.outputConfigs = getOutputConfigs(ret)
      if (ret.pkg['umd:main']) {
        ret.UMDConfig = makeRollupConfig(ret, true)
        ret.UMDOutputConfig = getUMDOutputConfig(ret)
      }
      return ret
    })
    .filter(pkg => pkg.name !== 'eslint-plugin-emotion')
  return packages
}

function getOutputConfigs(pkg) {
  let configs = []
  if (pkg.pkg.main) {
    const cjsPath = path.resolve(pkg.path, pkg.pkg.main)

    configs.push({
      format: 'cjs',
      sourcemap: true,
      file: cjsPath
    })
  }
  if (pkg.pkg.module) {
    const esmPath = path.resolve(pkg.path, pkg.pkg.module)

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
