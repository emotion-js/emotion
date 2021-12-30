import * as Babel from '@babel/standalone'

const options = {
  presets: [
    Babel.availablePresets['env'],
    [
      Babel.availablePresets['react'],
      { runtime: 'automatic', importSource: '@emotion/react' }
    ]
  ]
}

export function compile2(code: string): string {
  const result = Babel.transform(code, options).code
  if (!result) throw new Error('Babel failed to compile the code.')
  console.log(result)
  return result
}
