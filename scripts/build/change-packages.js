// @flow
const { getPackages } = require('./utils')
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')
const writeFile = promisify(fs.writeFile)

// this is a helper script to modify the package.json contents of all the packages
// change this to do whatever modifications you need to do to all of the packages

async function changePackages() {
  const packages = await getPackages()

  await Promise.all(
    packages.map(async ({ pkg, path: pkgPath }) => {
      // you can transform the package.json contents here
      if (
        pkg.name === 'babel-plugin-emotion' ||
        pkg.name === 'eslint-plugin-emotion' ||
        pkg.browser
      ) {
        return
      }
      if (!pkg.main.includes('cjs.js')) {
        throw new Error(pkg.name + pkg.main)
      }

      pkg.browser = {
        ['./' + pkg.main]: './' + pkg.main.replace('cjs.js', 'browser.cjs.js')
      }
      if (pkg.module) {
        if (!pkg.module.includes('esm.js')) {
          throw new Error(pkg.name + pkg.module)
        }

        pkg.browser['./' + pkg.module] =
          './' + pkg.module.replace('esm.js', 'browser.esm.js')
      }

      await writeFile(
        path.resolve(pkgPath, 'package.json'),
        JSON.stringify(pkg, null, 2) + '\n'
      )
    })
  )
}

changePackages()
