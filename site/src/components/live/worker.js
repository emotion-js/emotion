// https://github.com/developit/preact-www/blob/cb47a5015ea666930ead6eebc2917307db6c1db6/src/components/controllers/repl/worker.js

importScripts('https://unpkg.com/@babel/standalone@7.0.0/babel.min.js')

const babelPluginEmotion = require('babel-plugin-emotion').default

global.window = global

addEventListener('message', ({ data }) => {
  let { id, method, params } = data
  Promise.resolve()
    .then(() => ACTIONS[method](...[].concat(params)))
    .then(result => postMessage({ id, result }))
    .catch(({ message, loc }) => postMessage({ id, error: { message, loc } }))
})

const options = {
  presets: [
    'es2015',
    'react',
    [
      'stage-1',
      {
        // without this option, compilation fails even though we don't use decorators
        decoratorsLegacy: true
      }
    ]
  ],
  plugins: [[babelPluginEmotion, { sourceMap: false }]]
}

const ACTIONS = {}

ACTIONS.transform = code => {
  return Babel.transform(code, options).code
}
