// 👋 hey!!
// you might be reading this and seeing .esm in the filename
// and being confused why there is commonjs below this filename
// DON'T WORRY!
// this is intentional
// it's only commonjs with `preconstruct dev`
// when you run `preconstruct build`, it will be ESM
// why is it commonjs?
// we need to re-export every export from the source file
// but we can't do that with ESM without knowing what the exports are (because default exports aren't included in export/import *)
// and they could change after running `preconstruct dev` so we can't look at the file without forcing people to
// run preconstruct dev again which wouldn't be ideal
// this solution could change but for now, it's working
module.exports = require('../../src/isolated-hoist-non-react-statics-do-not-use-this-in-your-code.js')
