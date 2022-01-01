import * as Babel from '@babel/standalone'
import { htmlEscape } from 'escape-goat'
import { colors } from '../../util'

const options = {
  presets: [
    // Convert imports to require
    [Babel.availablePresets['env'], { modules: 'commonjs' }],
    [
      Babel.availablePresets['react'],
      { runtime: 'automatic', importSource: '@emotion/react' }
    ]
  ]
}

export function compile(code: string): string {
  try {
    const result = Babel.transform(code, options).code
    if (!result) throw new Error('Babel failed to compile the code.')

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
