// @flow
const fs = require('fs')
const { promisify } = require('util')

let writeFile = promisify(fs.writeFile)

async function changeToNextPackages() {
  let lernaPath = require.resolve('../../lerna.json')

  let lerna = require(lernaPath)
  lerna.version = 'independent'
  lerna.packages = ['packages-next/*']
  await writeFile(lernaPath, JSON.stringify(lerna, null, 2) + '\n')
}
changeToNextPackages()
