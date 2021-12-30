//import Babel from '@babel/standalone'
import * as Babel from '@babel/standalone'

import babelPresetReact from '@babel/preset-react'
//import babelPluginEmotion from '@emotion/babel-plugin'

const options = {
  presets: [babelPresetReact]
  //plugins: [[babelPluginEmotion, { sourceMap: false }]]
}

export function compile2(code: string): string {
  code = `render(<b>BOLD</b>)`
  return (
    Babel.transform(code, options).code ??
    'throw new Error("compilation failed")'
  )
}
