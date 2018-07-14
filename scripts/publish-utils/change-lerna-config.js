// @flow
const fs = require('fs')
const { promisify } = require('util')

let writeFile = promisify(fs.writeFile)

exports.changeLernaConfig = async function changeLerna(
  mutate /*: Object => mixed */
) {
  let lernaPath = require.resolve('../../lerna.json')

  let lerna = require(lernaPath)
  await mutate(lerna)
  await writeFile(lernaPath, JSON.stringify(lerna, null, 2) + '\n')
}
