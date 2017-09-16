const puppeteer = require('puppeteer')
const Chart = require('pwmetrics/lib/chart/chart')
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
    console.log(result)
    if (result && result.name) {
      results.push(result)
      if (done) {
        browser.close()
        const chart = new Chart({
          xlabel: 'Time (ms)',
          direction: 'x',
          lmargin: 18
        })
        results.forEach(result => {
          chart.addBar({
            size: result.mean,
            label: /\[(.*)\]/.exec(result.name)[1],
            barLabel: `${result.mean}ms ${/(.*)\[/.exec(result.name)[1]}`,
            color: result.name.indexOf('Deep') ? 'red' : 'cyan'
          })
        })
        chart.draw()
      }
    }
    if (result === 'done') {
      done = true
    }
  })
}

run()
