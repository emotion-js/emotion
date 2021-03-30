// @refresh reset
// https://github.com/developit/preact-www/blob/cb47a5015ea666930ead6eebc2917307db6c1db6/src/components/controllers/repl/worker.js
// eslint-disable-next-line no-undef
importScripts('https://unpkg.com/@babel/standalone@7.7.3/babel.min.js')

const babelPresetEnv = require('@babel/preset-env').default
const babelPresetReact = require('@babel/preset-react').default
const babelPluginEmotion = require('@emotion/babel-plugin').default

// eslint-disable-next-line no-undef
global.window = global

// eslint-disable-next-line no-restricted-globals
addEventListener('message', ({ data }) => {
  let { id, method, params } = data
  Promise.resolve()
    .then(() => ACTIONS[method](...[].concat(params)))
    .then(result => postMessage({ id, result }))
    .catch(({ message, loc }) => postMessage({ id, error: { message, loc } }))
})

const options = {
  presets: [babelPresetEnv, babelPresetReact],
  plugins: [[babelPluginEmotion, { sourceMap: false }]]
}

const ACTIONS = {}

ACTIONS.transform = code => {
  // eslint-disable-next-line no-undef
  return Babel.transform(code, options).code
}
