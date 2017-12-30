// https://github.com/developit/preact-www/blob/cb47a5015ea666930ead6eebc2917307db6c1db6/src/components/controllers/repl/worker.js
import babelPluginEmotion from 'babel-plugin-emotion'
importScripts('https://unpkg.com/babel-standalone@6.26.0/babel.min.js')
// eslint-disable-next-line no-debugger

global.window = global

addEventListener('message', ({ data }) => {
  let { id, method, params } = data
  Promise.resolve()
    .then(() => ACTIONS[method](...[].concat(params)))
    .then(result => postMessage({ id, result }))
    .catch(({ message, loc }) => postMessage({ id, error: { message, loc } }))
})

const options = {
  presets: ['es2015', 'react', 'stage-1'],
  plugins: [babelPluginEmotion]
}

const ACTIONS = {}

ACTIONS.transform = code => {
  return Babel.transform(code, options).code
}
