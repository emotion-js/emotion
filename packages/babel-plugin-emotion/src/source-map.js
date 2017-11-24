// @flow
import { SourceMapGenerator } from 'source-map'
import convert from 'convert-source-map'
import type { EmotionBabelPluginPass } from './index'
import type { BabelFile } from 'babel-flow-types'

export function makeSourceMapGenerator(file: BabelFile) {
  const filename = file.opts.sourceFileName
  const generator = new SourceMapGenerator({
    file: filename,
    sourceRoot: file.opts.sourceRoot
  })

  generator.setSourceContent(filename, file.code)
  return generator
}

export function addSourceMaps(
  offset: { line: number, column: number },
  state: EmotionBabelPluginPass
) {
  const generator = makeSourceMapGenerator(state.file)
  generator.addMapping({
    generated: {
      line: 1,
      column: 0
    },
    source: state.file.opts.sourceFileName,
    original: offset
  })
  return '\n' + convert.fromObject(generator).toComment({ multiline: true })
}
