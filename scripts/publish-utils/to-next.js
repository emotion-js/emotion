// @flow
const fs = require('fs')
const { promisify } = require('util')

let writeFile = promisify(fs.writeFile)

async function changeToNextPackages() {
  let lernaPath = require.resolve('../../lerna.json')
  let rootPkgJsonPath = require.resolve('../../lerna.json')
  let rootPkgJson = require(rootPkgJsonPath)

  let lerna = require(lernaPath)
  lerna.version = 'independent'
  rootPkgJson.workspaces = ['packages-next/*']
  await Promise.all([
    writeFile(lernaPath, JSON.stringify(lerna, null, 2) + '\n'),
    writeFile(rootPkgJsonPath, JSON.stringify(rootPkgJson, null, 2) + '\n')
  ])
}
changeToNextPackages()
