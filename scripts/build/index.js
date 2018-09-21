// @flow
const rollup = require('rollup')
const fs = require('fs')
const { promisify } = require('util')
const chalk = require('chalk')
const { getPackages, cleanDist } = require('./utils')

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
        if (someBundle) {
          await writeFlowFiles(
            pkg.configs[0].outputConfigs.map(({ file }) => file),
            someBundle.exports
          )
          console.log(chalk.magenta('Wrote flow files for', pkg.pkg.name))
        }
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

async function writeFlowFiles(paths, exportNames) {
  return Promise.all(
    paths.map(async path => {
      await writeFile(
        path + '.flow',
        `// @flow
export * from '../src/index.js'${
          exportNames.indexOf('default') !== -1
            ? `\nexport { default } from '../src/index.js'`
            : ''
        }\n`
      )
    })
  )
}

doBuild().catch(err => {
  console.error(err)
  process.exitCode = 1
})
