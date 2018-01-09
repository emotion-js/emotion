const puppeteer = require('puppeteer')
const Table = require('cli-table')
const path = require('path')

const sendResult = require('./send-results')

const {
  TRAVIS_BRANCH = 'test',
  TRAVIS_COMMIT = 'test',
  TRAVIS_COMMIT_MESSAGE = 'test',
  TRAVIS_PULL_REQUEST = 'test',
} = process.env

// need to add a timeout if it never completes
// needs error handling

async function run() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`file://${path.resolve(__dirname, './dist/index.html')}`)

  const results = []
  let done = false
  page.on('console', async result => {
    if (result && result.name) {
      console.log(`${result.name}: Mean ${result.mean}ms`)
      results.push(result)
      if (done) {
        try {
          await sendResult({
            branch: TRAVIS_BRANCH,
            commit: TRAVIS_COMMIT,
            commitMessage: TRAVIS_COMMIT_MESSAGE,
            pr: TRAVIS_PULL_REQUEST,
            results: results.map(r => ({
              name: r.name,
              duration: parseInt(r.mean, 10),
              type: r.name.toLowerCase().includes('deep')
                ? 'DEEP'
                : r.name.toLowerCase().includes('wide') ? 'WIDE' : 'TRIANGLE',
            })),
          })
        } catch (e) {
          console.log('graphql failed')
          console.log(e.message)
        }

        const table = new Table()
        table.push(['Benchmark', 'Mean (ms)'])
        table.push(...results.map(res => [res.name, res.mean]))
        console.log(table.toString())
        await browser.close()
      }
    }
    if (result === 'done') {
      done = true
    }
  })
}

run()
