import * as Babel from '@babel/standalone'
import emotionBabelPlugin from '@emotion/babel-plugin'
import {
  CompilationFailureMessage,
  CompilationRequestMessage,
  CompilationSuccessMessage
} from './message'

const options = {
  presets: [
    // Convert imports to require
    [Babel.availablePresets['env'], { modules: 'commonjs' }],
    [
      Babel.availablePresets['react'],
      { runtime: 'automatic', importSource: '@emotion/react' }
    ]
  ],
  plugins: [[emotionBabelPlugin, { sourceMap: false }]]
}

function compile(code: string): string {
  const result = Babel.transform(code, options).code
  if (!result) throw new Error('Babel failed to compile the code.')

  return result
}

function hasMessageProperty(e: any): e is { message: string } {
  return typeof e.message === 'string'
}

addEventListener(
  'message',
  ({ data }: MessageEvent<CompilationRequestMessage>) => {
    const { id, code } = data

    try {
      const compiledCode = compile(code)

      const response: CompilationSuccessMessage = {
        id,
        type: 'success',
        compiledCode
      }
      postMessage(response)
    } catch (e) {
      const errorMessage: string = hasMessageProperty(e)
        ? e.message
        : 'There was an unknown error while compiling your code.'

      const response: CompilationFailureMessage = {
        id,
        type: 'failure',
        errorMessage
      }
      postMessage(response)
    }
  }
)
