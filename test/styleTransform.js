// @flow
const path = require('path')

module.exports = {
  process(src /*: string */, filename /*: string */) {
    return `
    if (!global.stylesMocked) global.mockedCssImports = {}
    global.mockedCssImports[${JSON.stringify(
      path.basename(filename)
    )}] = ${JSON.stringify(src)}
    `
  }
}
