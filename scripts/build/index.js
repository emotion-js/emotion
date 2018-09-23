// @flow
const rollup = require('rollup')
const fs = require('fs')
const { promisify } = require('util')
const chalk = require('chalk')
const path = require('path')
const {
  getPackages,
  cleanDist,
  getPath,
  getDevPath,
  getProdPath
} = require('./utils')

const writeFile = promisify(fs.writeFile)

async function doBuild() {
  let packages = await getPackages()
  if (process.argv.length > 2) {
    packages = packages.filter(pkg => {
      return process.argv.indexOf(pkg.name) !== -1
    })
  }

  await Promise.all(
    packages.map(async pkg => {
      try {
        await cleanDist(pkg.path)
        let someBundle
        await Promise.all(
          pkg.configs.map(async config => {
            const bundle = await rollup.rollup(config.config)
            if (!someBundle) someBundle = bundle

            await Promise.all(
              config.outputConfigs.map(outputConfig => {
                return bundle.write(outputConfig)
              })
            )
          })
        )
        if (pkg.configs.length) {
          console.log(chalk.magenta(`Generated bundles for`, pkg.pkg.name))
        }
        let promises = []
        if (pkg.pkg.main && !pkg.pkg.main.includes('src')) {
          let filepath = getPath(pkg, 'main', false)
          let directory = path.parse(filepath).dir
          promises.push(
            writeFile(
              filepath,
              `'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./${path.relative(
    directory,
    getProdPath(filepath)
  )}');
} else {
  module.exports = require('./${path.relative(
    directory,
    getDevPath(filepath)
  )}');
}
`
            )
          )
        }

        if (someBundle && pkg.pkg.main && !pkg.pkg.main.includes('src')) {
          promises.push(
            writeFlowFile(
              getPath(pkg, 'main', false),
              someBundle.exports.includes('default')
            )
          )
        }

        await Promise.all(promises)
        console.log(chalk.magenta('Wrote flow files for', pkg.pkg.name))
      } catch (err) {
        console.error(
          'The error below was caused by the package: ',
          pkg.pkg.name
        )
        console.error(err)
        throw err
      }
    })
  )
}

async function writeFlowFile(filepath, hasDefault) {
  await writeFile(
    filepath + '.flow',
    `// @flow
export * from '../src/index.js'${
      hasDefault ? `\nexport { default } from '../src/index.js'` : ''
    }\n`
  )
}

doBuild().catch(err => {
  console.error(err)
  process.exitCode = 1
})
