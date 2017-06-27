const path = require('path')

module.exports = {
  process (src, filename) {
    return `
    if (!global.stylesMocked) global.mockedCssImports = {}
    global.mockedCssImports[${JSON.stringify(path.basename(filename))}] = ${JSON.stringify(src)}
    `
  }
}
