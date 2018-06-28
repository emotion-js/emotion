const rollup = require('rollup')
const chalk = require('chalk')
const path = require('path')
const ms = require('ms')
const { getPackages, cleanDist } = require('./utils')

function relativePath(id) {
  return path.relative(process.cwd(), id)
}

async function watch() {
  const packages = await getPackages()
  await Promise.all(
    packages.map(async pkg => {
      await cleanDist(pkg.path)
    })
  )
  let configs = packages.reduce((configs, pkg) => {
    return configs.concat(
      pkg.configs.map(config => {
        return Object.assign({}, config.config, {
          output: config.outputConfigs
        })
      })
    )
  }, [])
  const watcher = rollup.watch(configs)
  watcher.on('event', event => {
    // https://github.com/rollup/rollup/blob/aed954e4e6e8beabd47268916ff0955fbb20682d/bin/src/run/watch.ts#L71-L115
    switch (event.code) {
      case 'FATAL': {
        console.error(chalk.red('There was a fatal error...'))
        console.error(event.error)
        process.exit(1)
      }

      case 'ERROR': {
        console.error(chalk.red('There was an error...'))
        console.error(event.error)
        break
      }

      case 'START':
        console.log(chalk.underline(`started watching...`))
        break

      case 'BUNDLE_START': {
        console.log(
          chalk.cyan(
            `bundles ${chalk.bold(
              typeof event.input === 'string'
                ? relativePath(event.input)
                : event.input.map(relativePath).join(', ')
            )} → ${chalk.bold(event.output.map(relativePath).join(', '))}...`
          )
        )
        break
      }

      case 'BUNDLE_END': {
        console.log(
          chalk.green(
            `created ${chalk.bold(
              event.output.map(relativePath).join(', ')
            )} in ${chalk.bold(ms(event.duration))}`
          )
        )
        break
      }

      case 'END': {
        console.log(chalk.cyan(`waiting for changes...`))
      }
    }
  })
}

watch()
