// some of this is from https://github.com/styled-components/styled-components/blob/master/benchmarks/run-headless.js
// @flow
const path = require('path')
const puppeteer = require('puppeteer')
const { createServer } = require('http-server')

let libraries = ['emotion-css-func', 'emotion-css-prop']
let tests = ['Mount deep tree', 'Mount wide tree', 'Update dynamic styles']
let tracing = process.argv.some(arg => arg.includes('tracing'))

if (tracing) {
  console.log(
    '\nTracing enabled. (note that this might impact benchmark results, we recommend leaving this turned off unless you need a trace)'
  )
}

;(async () => {
  let server = createServer({ root: path.join(__dirname, 'dist') })
  await new Promise((resolve, reject) => {
    server.listen(57322, 'localhost', err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
  console.log('\nStarting headless browser...')
  const browser = await puppeteer.launch()

  console.log(
    'Running benchmarks... (this may take a minute or two; do not use your machine while these are running!)'
  )

  for (let library of libraries) {
    for (let test of tests) {
      await runTest(browser, library, test)
    }
  }
  console.log('Done!')
  await browser.close()
  await new Promise((resolve, reject) => {
    server.close(err => {
      if (err) {
        reject(err)
      }
      resolve()
    })
  })
})()

async function runTest(browser, library, test) {
  let page = await browser.newPage()
  await page.goto(`http://localhost:57322`)

  await page.waitForSelector('[data-testid="library-picker"]')
  await page.select('[data-testid="library-picker"]', library)

  let traceFile = `${test.toLowerCase().replace(/\s/g, '-')}-trace.json`
  await page.select('[data-testid="benchmark-picker"]', test)
  await page.waitForSelector('[data-testid="run-button"]')
  if (tracing) {
    await page.tracing.start({ path: traceFile })
  }
  await page.click('[data-testid="run-button"]')
  await page.waitForSelector(`[data-testid="run-result"]`)
  if (tracing) {
    await page.tracing.stop()
  }
  const result = await page.$eval(
    `[data-testid="run-result"]`,
    node => node.innerText
  )
  console.log(`\n---${library} - ${test}---`)
  console.log(result)
  if (tracing) {
    console.log('Trace written to', traceFile)
  }
  page.close()
}
