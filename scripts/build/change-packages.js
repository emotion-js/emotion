// @flow
const { getPackages } = require('./utils')
const { promisify } = require('util')
const fs = require('fs')
const path = require('path')
const writeFile = promisify(fs.writeFileSync)

let pkgsThatShouldHaveUMDBuilds = [
  'emotion',
  'react-emotion',
  'preact-emotion',
  'emotion-theming',
  'create-emotion',
  'create-emotion-styled'
]

async function changePackages() {
  const packages = await getPackages()

  await Promise.all(
    packages.map(async ({ pkg, path: pkgPath }) => {
      // you can transform the package.json contents here
      if (pkgsThatShouldHaveUMDBuilds.includes(pkg.name)) {
        pkg['umd:main'] = './dist/emotion.umd.min.js'
      }

      await writeFile(
        path.resolve(pkgPath, 'package.json'),
        JSON.stringify(pkg, null, 2) + '\n'
      )
    })
  )
}

changePackages()
