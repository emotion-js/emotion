import * as Babel from '@babel/standalone'
import { colors } from '../../util'
import emotionBabelPlugin from '@emotion/babel-plugin'

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

export function compile(code: string): string {
  try {
    const result = Babel.transform(code, options).code
    if (!result) throw new Error('Babel failed to compile the code.')
    console.log(result)
    return result
  } catch (e) {
    // react-live doesn't currently handle errors thrown by `transform` functions.
    // So we catch the error and return code that renders that error.
    //
    // TODO Fix https://github.com/FormidableLabs/react-live/issues/233
    // and remove this hacky code.

    const message = (e as any).message
    const messageEscaped = message.replace(/`/g, '\\`') // Escape backticks
    return `render(<div style={{ whiteSpace: 'pre-line', fontFamily: 'monospace', color: '${colors.danger}' }}>{\`${messageEscaped}\`}</div>)`
  }
}
