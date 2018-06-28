// @flow
const { getPackages } = require('./utils')
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')
const writeFile = promisify(fs.writeFileSync)

async function changePackages() {
  const packages = await getPackages()

  await Promise.all(
    packages.map(async ({ pkg, path: pkgPath }) => {
      // you can transform the package.json contents here
      let devDeps = pkg.devDependencies
      if (pkg.devDependencies) {
        delete devDeps['npm-run-all']
        delete devDeps['cross-env']
        delete devDeps['babel-cli']
        delete devDeps['rollup']
        delete devDeps.rimraf
        if (Object.keys(devDeps).length === 0) {
          delete pkg.devDependencies
        }
      }
      let scripts = pkg.scripts
      if (pkg.scripts) {
        delete scripts.build
        delete scripts.clean
        delete scripts.rollup
        delete scripts.babel
        delete scripts.watch
        if (Object.keys(scripts).length === 0) {
          delete pkg.scripts
        }
      }

      await writeFile(
        path.resolve(pkgPath, 'package.json'),
        JSON.stringify(pkg, null, 2) + '\n'
      )
    })
  )
}

changePackages()
