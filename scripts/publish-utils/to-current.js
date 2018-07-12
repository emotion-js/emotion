// @flow
const fs = require('fs')
const { promisify } = require('util')

let writeFile = promisify(fs.writeFile)

async function changeToCurrentPackages() {
  let rootPkgJsonPath = require.resolve('../../lerna.json')
  let rootPkgJson = require(rootPkgJsonPath)

  rootPkgJson.workspaces = ['packages/*']
  await writeFile(rootPkgJsonPath, JSON.stringify(rootPkgJson, null, 2) + '\n')
}
changeToCurrentPackages()
