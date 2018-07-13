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
      if (pkg.repository) {
        pkg.repository = pkg.repository.replace(
          'https://github.com/emotion-js/next/tree/master/packages',
          'https://github.com/emotion-js/emotion/tree/master/next-packages'
        )
      }

      await writeFile(
        path.resolve(pkgPath, 'package.json'),
        JSON.stringify(pkg, null, 2) + '\n'
      )
    })
  )
}

changePackages()
