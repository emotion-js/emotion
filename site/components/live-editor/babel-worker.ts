// Reference: https://github.com/developit/preact-www/blob/cb47a5015ea666930ead6eebc2917307db6c1db6/src/components/controllers/repl/worker.js

import Babel from '@babel/standalone'
import babelPresetEnv from '@babel/preset-env'
import babelPresetReact from '@babel/preset-env'
import {
  CompileFailureMessage,
  CompileRequestMessage,
  CompileSuccessMessage
} from './types'
//import babelPluginEmotion from '@emotion/babel-plugin'

const options = {
  presets: [babelPresetEnv, babelPresetReact]
  //plugins: [[babelPluginEmotion, { sourceMap: false }]]
}

addEventListener('message', ({ data }: MessageEvent<CompileRequestMessage>) => {
  const { id, code } = data

  try {
    const result = Babel.transform(code, options)
    const message: CompileSuccessMessage = { id, type: 'success', result }
    postMessage(message)
  } catch (error) {
    const message: CompileFailureMessage = {
      id,
      type: 'failure',
      error
    }
    postMessage(message)
  }
})
