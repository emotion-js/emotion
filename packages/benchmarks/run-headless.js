const puppeteer = require('puppeteer')
const Table = require('cli-table')
const path = require('path')

// need to add a timeout if it never completes
// needs error handling

async function run() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(`file://${path.resolve(__dirname, './dist/index.html')}`)

  const results = []
  let done = false
  page.on('console', result => {
    if (result && result.name) {
      console.log(`${result.name}: Mean ${result.mean}ms`)
      results.push(result)
      if (done) {
        browser.close()
        const table = new Table()
        table.push(['Benchmark', 'Mean (ms)'])
        table.push(...results.map(res => [res.name, res.mean]))
        console.log(table.toString())
      }
    }
    if (result === 'done') {
      done = true
    }
  })
}

run()
